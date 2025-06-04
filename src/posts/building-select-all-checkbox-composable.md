---
layout: "base.njk"
title: "Vue에서 체크박스 전체 선택 Composable 만들기"
date: 2025-05-27
---

체크박스 전체 선택 기능은 매우 자주 사용되지만, 매번 구현할 때마다 은근히 손이 많이 가는 부분입니다. 이번 글에서는 이 기능을 Vue에서 Composable 형태로 구현해, 다양한 Vue 프로젝트에서 손쉽게 활용할 수 있도록 정리해보았습니다.

## UI 구조 살펴보기

먼저, 일반적인 체크박스 UI 구조를 살펴보겠습니다. 전체 선택 기능은 보통 다음과 같은 형태로 구성됩니다:

- 상단에 위치한 "전체 선택" 체크박스
- 그 아래에 나열된 개별 항목 체크박스들

그리고 동작 방식은 다음과 같습니다:

- 전체 선택 시 → 모든 항목이 체크됨
- 전체 선택 해제 시 → 모든 항목이 해제됨
- 일부 항목만 선택된 경우 → "전체 선택" 체크박스는 `indeterminate` 상태가 됨

<figure style="text-align:center;">
<img src="/assets/images/building-select-all-checkbox-composable/checkbox-select-all.gif" alt="Checkbox 전체 선택 기능 예제" style="display: inline-flex;"/>
<figcaption>Checkbox 전체 선택 기능 예제</figcaption>
</figure>

## 기본 와이어프레임

이제, 체크박스 전체 선택 기능을 구현하기 위해 필요한 기본적인 와이어프레임을 작성해보겠습니다.

```vue
<script setup lang="ts">
import { ref } from 'vue';

const options = ref(['option1', 'option2', 'option3']);
const selectedOptions = ref<string[]>([]);

const checkedAll = ref(false);
const indeterminate = ref(false);
</script>

<template>
  <div>
    <input 
      type="checkbox" 
      v-model="checkedAll" 
      :indeterminate="indeterminate" 
    />
    <label>Select All</label>

    <div v-for="option in options" :key="option">
      <input 
        type="checkbox" 
        v-model="selectedOptions" 
        :value="option" 
      />
      <label>{% raw %}{{ option }}{% endraw %}</label>
    </div>
  </div>
</template>
```

## Composable 뼈대 만들기

`checkedAll`과 `indeterminate`를 관리하는 로직을 Composable로 분리합니다.

```typescript
// src/composables/useCheckboxSelectAll.ts
import { type Ref, ref } from 'vue';

export function useCheckboxSelectAll<T>(
  options: Ref<T[]>,
  selected: Ref<T[]>
) {
  const checkedAll = ref(false);
  const indeterminate = ref(false);

  return { checkedAll, indeterminate };
}

```

컴포넌트에서는 이렇게 사용할 수 있습니다:

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { useCheckboxSelectAll } from '@/composables/useCheckboxSelectAll';

const options = ref(['option1', 'option2', 'option3']);
const selectedOptions = ref<string[]>([]);

const { checkedAll, indeterminate } = useCheckboxSelectAll(options, selectedOptions);
</script>
```

## 반응형(Reactivity) 추가하기

`checkedAll`과 `indeterminate`를 `computed`로 실시간으로 상태가 변경되도록 만듭니다.

```typescript
import { type Ref, computed } from 'vue';

export function useCheckboxSelectAll<T>(
  options: Ref<T[]>,
  selected: Ref<T[]>
) {
  // 선택된 항목이 있고, 전체 항목 수와 같을 때 `true`
  const checkedAll = computed(
    () => selected.value.length > 0 
      && selected.value.length === options.value.length
  );

  // 선택된 항목이 있고, 전체 항목 수와 다를 때 `true`
  const indeterminate = computed(
    () => selected.value.length > 0 
      && selected.value.length < options.value.length
  );

  return { checkedAll, indeterminate };
}
```

## checkedAll을 쓰기 가능(writable)하게 만들기

`computed`는 기본적으로 읽기 전용이기 때문에 현재 상태에서 `v-model`에 연결할 경우 에러가 발생합니다.
<figure style="text-align:center;">
<img src="/assets/images/building-select-all-checkbox-composable/write-operation-failed.png" alt="Computed는 쓰기 불가능해서 발생한 에러" style="display: inline-flex;"/>
<figcaption>Computed는 쓰기 불가능해서 발생한 에러</figcaption>
</figure>

따라서 `computed`에 `set` 함수를 정의해 `checkedAll`을 **writable**하게 만들어 줍니다.

```typescript
const checkedAll = computed({
  get() {
    return selected.value.length > 0 
      && selected.value.length === options.value.length;
  },
  set(value: boolean) {
    if (value) {
      selected.value = options.value;
    } else {
      selected.value = [];
    }
  }
});
```

## indeterminate 상태인 경우 추가 처리

문제가 하나 있습니다. `indeterminate` 상태에서 전체 선택 체크박스를 클릭하면, 원래는 모든 항목이 해제되어야 하지만 현재는 모두 선택되어 버립니다.
이를 해결하기 위해 `indeterminate` 상태인 경우 전체 선택 체크박스 상태가 `true`가 되도록 합니다. 그러면 사용자가 한 번 더 클릭했을 때 비로소 `false`가 되면서 전체 항목이 해제됩니다.
추가적으로 `indeterminate` 상태인 경우에는 전체 선택이 안되도록 `set` 함수에 방어 코드를 추가합니다.

<figure style="text-align:center;">
<img src="/assets/images/building-select-all-checkbox-composable/indeterminate-issue.gif" alt="현재 발생하는 indeterminate 상태일 때 이슈" style="display: inline-flex;"/>
<figcaption>현재 발생하는 indeterminate 상태일 때 이슈</figcaption>
</figure>

```typescript
const checkedAll = computed({
  get() {
    if (indeterminate.value) {
      return true;
    }

    return selected.value.length > 0 
      && selected.value.length < options.value.length;
  },
  set(value) {
    if (value && !indeterminate.value) {
      selected.value = options.value;
    } else {
      selected.value = [];
    }
  }
})
```

## 최종 코드

```typescript
// src/composables/useCheckboxSelectAll.ts
import { type Ref, ref } from 'vue';
export function useCheckboxSelectAll<T>(
  options: Ref<Array<T>>, 
  selected: Ref<Array<T>>
) {
  const checkedAll = computed({
    get() {
      if (indeterminate.value) {
        return true;
      }

      return selected.value.length > 0 
        && selected.value.length < options.value.length;
    },
    set(value) {
      if (value && !indeterminate.value) {
        selected.value = options.value;
      } else {
        selected.value = [];
      }
    }
  })

  const indeterminate = computed(() => selected.value.length > 0 
    && selected.value.length < options.value.length);

  return {
    checkedAll,
    indeterminate,
  }
}
```

```vue
<script setup lang="ts">
import { ref} from 'vue';

const options = ref<Array<string>>(['option1', 'option2', 'option3']);
const selectedOptions = ref<Array<string>>([]);

const { checkedAll, indeterminate } = 
  useCheckboxSelectAll(options, selectedOptions);
</script>

<template>
  <div>
    <div>
      <input 
        type="checkbox" 
        v-model="checkedAll" 
        :indeterminate="indeterminate" 
      />
      <label>Select All</label>
    </div>
    <div>
      <div v-for="option in options" :key="option">
        <input 
          type="checkbox" 
          v-model="selectedOptions" 
          :value="option" 
        />
        <label>{% raw %}{{ option }}{% endraw %}</label>
      </div>
    </div>
  </div>
</template>
```

Stackblitz에서 코드를 확인할 수 있습니다: [StackBlitz 예제 보기](https://stackblitz.com/~/github.com/Heunsig/select-all-checkbox-example)

## 마무리

Checkbox의 전체 선택 기능은 UI 구성에서 자주 등장하지만, 막상 구현해보면 고려해야 할 요소들이 제법 많습니다.
이번 글에서는 이 기능을 Composable로 만들어, 반복 구현 없이 Vue 프로젝트 전반에서 재사용할 수 있도록 정리해보았습니다.
이제 `useCheckboxSelectAll`을 적용하면 어떤 리스트 컴포넌트에도 간단하게 전체 선택 기능을 도입할 수 있습니다.
