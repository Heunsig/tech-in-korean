---
layout: "base.njk"
title: "Vue에서 Checkbox 전체 선택/해제 Composable 만들기"
date: 2025-05-25
wip: true
---

Checkbox의 전체 선택 기능은 자주 쓰이지만, 매번 구현하려다 보면 은근히 까다롭게 느껴질 때가 많습니다. 이번 글에서는 이 기능을 Vue에서 Composable 형태로 만들어, 어디서든 간편하게 재사용할 수 있도록 정리해보겠습니다.

## UI 구조 살펴보기

보통 전체 선택 기능은 다음과 같은 구조로 되어 있습니다.

- 맨 위에 "전체 선택" 체크박스
- 아래에 개별 옵션 체크박스들 나열

동작 방식은 다음과 같습니다:

- 전부 선택 → 아래 항목이 모두 체크
- 전부 해제 → 아래 항목이 모두 해제
- 일부만 선택 → "전체 선택" 체크박스가 indeterminate(대시'-') 상태

<figure style="text-align:center;">
<img src="/assets/images/building-select-all-checkbox-composable/checkbox-select-all.gif" alt="Checkbox 전체 선택 기능 예제" style="display: inline-flex;"/>
<figcaption>Checkbox 전체 선택 기능 예제</figcaption>
</figure>

## 기본 와이어프레임

먼저, 특별한 로직 없이 뼈대부터 잡아보겠습니다.

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
      <label>{{ option }}</label>
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

## 반응형(Reactivity)으로 만들기

`checkedAll`과 `indeterminate`를 `computed`로 실시간으로 반응하도록 만듭니다.

```typescript
import { type Ref, computed } from 'vue';

export function useCheckboxSelectAll<T>(
  options: Ref<T[]>,
  selected: Ref<T[]>
) {
  const checkedAll = computed(
    () => selected.value.length > 0 && selected.value.length === options.value.length
  );
  const indeterminate = computed(
    () => selected.value.length > 0 && selected.value.length < options.value.length
  );

  return { checkedAll, indeterminate };
}
```
- `checkedAll`: 선택된 항목이 있고, 전체 항목 수와 같을 때 `true`
- `indeterminate`: 선택된 항목이 있고, 전체 항목 수와 다를 때 `true`

## checkedAll을 쓰기 가능(writable)하게 만들기기

`computed`는 기본적으로 읽기 전용이기 때문에 `set` 함수를 정의해 `v-model`에 연결할 수 있도록 합니다.

```typescript
const checkedAll = computed({
  get() {
    return selected.value.length > 0 &&
           selected.value.length === options.value.length;
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

그런데 문제 하나가 남아 있습니다. indeterminate 상태에서 전체 선택 체크박스를 클릭하면, 원래는 모든 항목이 해제되어야 하지만 실제로는 모두 선택되어 버립니다.
이를 막기 위해 `indeterminate`일 때는 우선 전체 선택 체크박스를 `true`가 되도록 해주고, 사용자가 한 번 더 클릭하면 그제야 `false`로 바뀌어 전부 해제되도록 처리해 줍니다.
추가적으로 `indeterminate` 상태인 경우에는 전체 선택이 안되도록 `set` 함수에 방어 코드를 추가합니다.

```typescript
const checkedAll = computed({
  get() {
    if (indeterminate.value) {
      return true;
    }

    return selected.value.length > 0 && selected.value.length < options.value.length;
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
export function useCheckboxSelectAll<T>(options: Ref<Array<T>>, selected: Ref<Array<T>>) {
  const checkedAll = computed({
    get() {
      if (indeterminate.value) {
        return true;
      }

      return selected.value.length > 0 && selected.value.length < options.value.length;
    },
    set(value) {
      if (value && !indeterminate.value) {
        selected.value = options.value;
      } else {
        selected.value = [];
      }
    }
  })

  const indeterminate = computed(() => selected.value.length > 0 && selected.value.length < options.value.length);

  return {
    checkedAll,
    indeterminate,
  }
}
```

```vue
<script setup lang="ts">
import { ref} from 'vue';

const options = ref<Array<string>>(['option1', 'option2', 'option3', 'option4', 'option5']);
const selectedOptions = ref<Array<string>>([]);

const { checkedAll, indeterminate } = useCheckboxSelectAll(options, selectedOptions);
</script>

<template>
  <div>
    <div>
      <input type="checkbox" v-model="checkedAll" :indeterminate="indeterminate" />
      <label>Select All</label>
    </div>
    <div>
      <div v-for="option in options" :key="option">
        <input type="checkbox" v-model="selectedOptions" :value="option" />
        <label>{{ option }}</label>
      </div>
    </div>
  </div>
</template>
```

## 마무리

Checkbox 전체 선택 기능은 단순해 보이지만, 실제로 구현해보면 신경 써야 할 부분이 꽤 많습니다. 이번 글에서는 이 기능을 Composable로 분리하여, 다양한 곳에서 간편하게 재사용할 수 있도록 구성해보았습니다.
이제 `useCheckboxSelectAll`을 사용하면 어떤 리스트든 손쉽게 전체 선택 기능을 적용할 수 있습니다.