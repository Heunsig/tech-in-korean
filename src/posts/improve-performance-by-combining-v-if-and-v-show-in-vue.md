---
layout: "base.njk"
title: "Vue에서 v-if와 v-show를 함께 사용하여 성능 향상시키기"
date: 2025-01-25
wip: true
---

Vue에는 `v-if`와 `v-show` 라는 조건문 렌더링 구문이 있습니다. `v-if`와 `v-show` 모두 특정 컴포넌트를 화면에 보여줄 지 말지를 결정할 수 있게 합니다.
하지만 이 두 Syntax에는 차이가 있습니다. `v-if`의 경우 조건이 `true` 일 때 a block을 렌더링을 합니다. 반면 `v-show`로 설정을 하면 이미 렌더링은 되어 있는 상태이지만 `display: none` 속성을 적용하여 화면에 보여줄 지 말지를 결정할 수 있습니다.
그래서 `v-if`의 경우 `false`에서 `true`로 변경 될 때 [Vue 라이프 사이클](https://vuejs.org/guide/essentials/lifecycle.html#lifecycle-diagram)을 매번 타게 됩니다. 반면 `v-show`의 경우 화면에 보이지 않더라도 이미 렌더링이 된 상태이기 때문에 이미 Vue 라이프 사이클은 한번 탄 상태이며 display: none을 통해 화면에 보여줄 지 말지만 결정합니다.

그래서 단순히 화면에 보이는 여부만을 봤을 때 `v-if`를 사용해서 컴포넌트를 렌더링을 하는 것은 매번 라이프사이클을 타기 때문에 성능에 문제가 있을 수 있습니다. 하지만 또 `v-show`는 최초에 화면에 보이지 않는 불필요한 렌더링도 다 같이 해버리기 때문에 또 성능에 문제가 있을 수 있습니다.

탭 컴포넌트가 있다고 가정해봅시다. 탭은 Tab1, Tab2로 구성되어 있습니다. 탭 기능을 구현하기위해 일단 `v-if`를 사용해서 구현한다고 가정해봅시다. `activeTab`이 `Tab1`일 때 `Tab1` 컴포넌트를 렌더링하고, `Tab2`일 때 `Tab2` 컴포넌트를 렌더링하는 것입니다. Tab 컴포넌트가 light한 경우에는 사실 큰 문제가 되지 않습니다. 매번 Vue 라이프 사이클을 탄다고 하더라고 큰 문제가 되지 않습니다. 하지만 activeTab의 값이 변경할 때마다 Vue 라이프 사이클이 타게됩니다.

```vue
<script setup>
const activeTab = ref('Tab1');
</script>

<template>
  <div>
    <TabContent1 v-if="activeTab === 'Tab1'"/>
    <TabContent2 v-else-if="activeTab === 'Tab2'"/>
  </div>
</template>
```


다음으로는 `v-show`를 사용해서 구현해봅시다. 해당 화면이 브라우저에 출력이 될 때 이미 Tab1과 Tab2 컴포넌트는 Vue 라이프 사이클을 지난 후 렌더링이 완료된 상태입니다. 다만 현재 activeTab이 `Tab1`이기 때문에 TabContent1만 화면에 보일 뿐입니다. TabContent1, 2가 가벼운 컴포넌트라면 이것 또한 큰 문제가 되지 않습니다. 오히려 탭을 자주 바꾸는 상황이라면 `v-show`를 사용하는 것이 더 좋을 수 있습니다. 왜냐하면 매번 Vue 라이프 사이클을 타지 않기 때문입니다. 하지만 TabContent1, 2가 무거운 컴포넌트라면 화면이 최초로 출력될 때 화면에 보이지 않는 불필요한 컴포넌트들까지 렌더링이 되는 문제가 생기게 됩니다. 이 예제에서는 TabContent 컴포넌트가 2개 밖에 없지만 10개, 20개가 있다고 가정해본다면 이것 또한 끔찍한 일 입니다.

```vue
<script setup>
const activeTab = ref('Tab1');
</script>

<template>
  <div>
    <TabContent1 v-show="activeTab === 'Tab1'"/>
    <TabContent2 v-show="activeTab === 'Tab2'"/>
  </div>
</template>
```

## 해결방법

`v-if`와 `v-show`를 함께 사용하는 것입니다.

```vue
<script setup>
const isTabContent1Rendered = ref(true);
const isTabContent2Rendered = ref(false);
const activeTab = ref('Tab1');
</script>

<template>
  <div>
    <TabContent1 v-if="isTabContent1Rendered" v-show="activeTab === 'Tab1'"/>
    <TabContent2 v-if="isTabContent2Rendered" v-show="activeTab === 'Tab2'"/>
  </div>
</template>
```

위의 코드는 대략적인 상황을 보여주기 위한 코드입니다. 좀 더 자세한 코드는 아래 링크를 참고해주세요.
TabContent 컴포넌트에 일단 `v-if` 를 사용해서 불필요한 렌더링을 막습니다. 위의 예제로 보면 TabContent1은 isTabContent1Rendered가 true이기 때문에 Vue 라이프 사이클이 돌아가는 렌더링이 되지만 TabContent2는 렌더링이 되지 않습니다. 이 때 activeTab이 Tab1에서 Tab2로 바뀌게 되면 isTabContent2Rendered가 true가 되고 TabContent2 또한 렌더링이 디고, activeTab이 Tab2이기 때문에 TabContent2가 화면에 보이게 됩니다.
그럼 다시 Tab2 -> Tab1으로 바꿔봅시다. 이제 isTabContent1Rendered는 이미 true가 된 상태이기 때문에 TabContent1은 unmount가 되지 않고 그냥 display: none으로 화면에서만 사라진 상태이기 때문에 display: block이되면서 Vue 라이프 사이클이 돌아기지 않고 display: block으로 그냥 화면에 보이게만 됩니다. 이렇게 v-if와 v-show를 같이 사용하면 특수한 상황에 성능 최적화가 필요할 때 잘 활용할 수 있습니다.

[예제 코드](https://github.com/joshua1988/vue-camp/tree/master/example/06-v-if-v-show)
