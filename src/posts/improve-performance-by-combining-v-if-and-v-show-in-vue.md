---
layout: "base.njk"
title: "Vue에서 v-if와 v-show를 함께 사용하여 성능 최적화하기"
date: 2025-01-25
wip: true
---

Vue에서 컴포넌트의 화면 표시 여부를 제어할 때 사용하는 `v-if`와 `v-show`는 비슷해 보이지만, 렌더링 방식에서 중요한 차이가 있습니다.

* `v-if`: 조건이 `true`일 때 Vue [라이프 사이클](https://vuejs.org/guide/essentials/lifecycle.html#lifecycle-diagram)을 거쳐 컴포넌트를 렌더링 합니다. 그리고 조건이 `false`가 되면 컴포넌트는 DOM에서 완전히 제거됩니다.
* `v-show`: 조건의 `true`, `false` 여부와 관계없이 최초에 Vue 라이프 사이클을 거쳐 컴포넌트를 렌더링합니다. 이후 CSS의 `display` 속성을 활용하여 화면 표시 여부를 제어합니다. 

이 차이로 인해 `v-if`와 `v-show`는 각각 다음과 같은 장단점이 있습니다.

* `v-if`: 조건이 `false`일 때 렌더링을 하지 않기 때문에 당장 화면에 보이지 않아도 되는 불필요한 컴포넌트의 렌더링을 막을 수 있습니다. 하지만 `true`가 될 때마다 컴포넌트가 매번 Vue 라이프사이클을 타게 되어 성능에 영향을 줄 수 있습니다.
* `v-show`: 이미 렌더링된 상태에서 CSS 속성만 변경하므로 상태 전환이 빠릅니다. 하지만 초기 렌더링 시 화면에 보이지 않는 컴포넌트까지 렌더링되므로 불필요한 리소스가 사용될 수 있습니다.

## 예제: `v-if`와 `v-show`를 사용해서 탭 컴포넌트 구현하기
 
`v-if`와 `v-show`를 각각 사용하여 탭 컴포넌트 구현을 해보겠습니다. 탭 컴포넌트는 `TabContent1`과 `TabContent2`로 구성되어 있으며, `activeTab` 변수에 따라 활성화된 탭을 화면에 보여줍니다.

### `v-if`를 사용한 구현

```vue
<script setup>
const activeTab = ref('tab1');
// 다른  코드...
</script>

<template>
  <div>
    <TabContent1 v-if="activeTab === 'tab1'"/>
    <TabContent2 v-if="activeTab === 'tab2'"/>
  </div>
</template>
```
`v-if`를 사용하면 `activeTab` 값이 바뀔 때마다 탭 컴포넌트가 새로 렌더링됩니다. 만약 각 컴포넌트가 무겁다면 성능에 문제가 있을 수 있습니다.

### `v-show`를 사용한 구현

```vue
<script setup>
const activeTab = ref('Tab1');
// 다른 코드...
</script>

<template>
  <div>
    <TabContent1 v-show="activeTab === 'Tab1'"/>
    <TabContent2 v-show="activeTab === 'Tab2'"/>
  </div>
</template>
```
`v-show`를 사용하면 초기 화면 렌더링 시 `TabContent1`과 `TabContent2`가 모두 렌더링됩니다. 이후 `activeTab` 값에 따라 `display` 속성을 조정해 화면에 표시할 탭이 결정됩니다. 이 때문에 `v-show`의 값이 변경되어도 Vue의 라이프사이클이 다시 실행되지 않습니다. 하지만 초기 렌더링 시 화면에 필요하지 않은 컴포넌트까지 모두 렌더링되므로, 불필요한 리소스가 사용될 수 있습니다

## 해결방법: `v-if`와 `v-show`를 함께 사용

`v-if`와 `v-show`를 함께 사용하면 위 두 가지 방식의 장점을 조합하여 성능을 최적화할 수 있습니다.

> 아래의 코드는 대략적인 상황을 보여주기 위한 코드입니다. 자세한 코드는 [예제 코드](https://stackblitz.com/~/github.com/Heunsig/combining-v-if-and-v-show)를 참고해주세요. 

```vue
<script setup>
const isTabContent1Rendered = ref(true);
const isTabContent2Rendered = ref(false);
const activeTab = ref('tab1');
// 다른 코드...
</script>

<template>
  <div>
    <TabContent1 
      v-if="isTabContent1Rendered" 
      v-show="activeTab === 'tab1'"
    />
    <TabContent2 
      v-if="isTabContent2Rendered" 
      v-show="activeTab === 'tab2'"
    />
  </div>
</template>
```
이 코드는 다음과 같이 작동합니다:

1. 최초에는 `isTabContent1Rendered`가 `true`로 설정되어 있고 `activeTab`이 `tab1`이므로 `TabContent1`만 렌더링됩니다.
2. `activeTab`이 `tab2`로 변경되면 `isTabContent2Rendered`가 `true`로 설정되며 `TabContent2`가 렌더링됩니다.
3. 이미 렌더링된 `TabContent1`은 언마운트되지 않고 DOM에 남아있으며, `display: none`을 통해 화면에서 숨겨질 뿐입니다.
4. 이후 `activeTab`의 값이 다시 `tab1`로 바뀌어도 `TabContent1`은 `display: block`이 되면서 Vue 라이프사이클을 거치지 않고 바로 화면에 표시됩니다.

## 마무리
`v-if`와 `v-show`를 적절히 조합하면 효과적인 성능 최적화를 할 수 있습니다. 특히 무거운 컴포넌트를 조건부로 렌더링해야 할 때 이 접근 방식을 활용하면 좋습니다.
