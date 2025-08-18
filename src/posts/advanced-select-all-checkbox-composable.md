---
layout: "base.njk"
title: "Advanced Vue 체크박스 전체 선택 Composable 만들기"
date: 2025-08-18
---

[Vue에서 체크박스 전체 선택 Composable 만들기](/posts/building-select-all-checkbox-composable) 글에서 기본적인 체크박스 전체 선택 기능을 구현했었습니다.  

이번 글에서는 여기서 한 단계 더 발전시켜, `indeterminate` 기능을 옵션으로 선택할 수 있도록 개선해보겠습니다. 이제 `useCheckboxSelectAll` composable에서 `options.useIndeterminate` 속성이 `false`로 설정되면, `indeterminate` 상태는 사용하지 않게 됩니다. 이 옵션은 기본값으로 `true`로 설정되어 있습니다.

```typescript
// @/composables/useCheckboxSelectAll.ts
import { type Ref, computed } from "vue";

function useCheckboxSelectAllCore<T>(items: Ref<T[]>, selected: Ref<T[]>, useIndeterminate: boolean) {
  const indeterminate = computed(() => {
    return selected.value.length > 0 && selected.value.length < items.value.length
  })

  const checkedAll = computed({
    get() {
      if (useIndeterminate && indeterminate.value) {
        return true
      }
      
      return selected.value.length > 0 && selected.value.length === items.value.length
    }, 
    async set(value: boolean) {
      if (value && (!useIndeterminate || !indeterminate.value)) {
        selected.value = items.value
      } else {
        selected.value = []
      }
    }
  })

  return {
    checkedAll,
    indeterminate,
  }
}

// options 없이 호출하는 경우 - 기본적으로 indeterminate 포함
export function useCheckboxSelectAll<T>(
  items: Ref<T[]>, 
  selected: Ref<T[]>
): { checkedAll: Ref<boolean>; indeterminate: Ref<boolean> }

// useIndeterminate: true인 경우
export function useCheckboxSelectAll<T>(
  items: Ref<T[]>, 
  selected: Ref<T[]>, 
  options: { useIndeterminate: true }
): { checkedAll: Ref<boolean>; indeterminate: Ref<boolean> }

// useIndeterminate: false인 경우
export function useCheckboxSelectAll<T>(
  items: Ref<T[]>, 
  selected: Ref<T[]>, 
  options: { useIndeterminate: false }
): { checkedAll: Ref<boolean> }

// 실제 구현
export function useCheckboxSelectAll<T>(
  items: Ref<T[]>, 
  selected: Ref<T[]>, 
  options?: { useIndeterminate?: boolean }
): { checkedAll: Ref<boolean>; indeterminate?: Ref<boolean> } {
  const { useIndeterminate = true } = options || {}
  const result = useCheckboxSelectAllCore(items, selected, useIndeterminate)

  if (useIndeterminate) {
    return result
  } else {
    return {
      checkedAll: result.checkedAll,
    }
  }
}
```


아래는 예제 코드입니다:

```vue
<script setup lang="ts">
import { ref } from "vue"
import { useCheckboxSelectAll } from "@/composables/useCheckboxSelectAll"

const items = ref([
  { id: 1, name: "사과" },
  { id: 2, name: "배" },
  { id: 3, name: "포도" },
])

const selected = ref<typeof items.value>([])

// indeterminate 기능을 끄고 사용
const { checkedAll } = useCheckboxSelectAll(items, selected, {
  useIndeterminate: false,
})
</script>

<template>
  <div>
    <!-- 전체 선택 체크박스 -->
    <label>
      <input 
        type="checkbox" 
        v-model="checkedAll" 
      />
      전체 선택
    </label>

    <ul>
      <li v-for="item in items" :key="item.id">
        <label>
          <input 
            type="checkbox" 
            :value="item" 
            v-model="selected" 
          />
          {{ item.name }}
        </label>
      </li>
    </ul>
  </div>
</template>

```
