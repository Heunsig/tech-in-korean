---
layout: "base.njk"
title: "Render Function으로 Vue 컴포넌트 만들기"
date: 2024-11-12
wip: true
---

회원가입 폼을 만들면서, 폼 검증 실패 시 사용자에게 더 명확하게 알릴 방법이 필요했습니다. 최종적으로 "저장" 버튼을 눌렀을 때 실패하면 버튼이 빨간색으로 변하면서 약간의 시간 동안 좌우로 흔들리는 효과를 주기로 했습니다.

처음에는 CSS `animation` 속성을 사용해 "저장" 버튼에 흔들림 효과를 주려고 했지만, 이를 다른 HTML 요소나 컴포넌트에도 쉽게 적용할 수 있도록 확장하고 싶었습니다. 그래서 흔들림 효과를 줄 수 있는 Vue 컴포넌트를 만들어보기로 했고, 이 컴포넌트의 이름을 `Shaker`라고 정했습니다. `Shaker` 컴포넌트에 필요한 요구사항은 다음과 같습니다:

1. 어떤 HTML 요소나 컴포넌트에도 흔들림 효과를 적용할 수 있어야 한다.
2. 사용법이 직관적이어야 한다.
3. 흔들림 효과를 적용한 HTML 요소나 컴포넌트의 부모 요소에 영향을 주지 않아야 한다.

결론적으로 `Shaker` 컴포넌트를 아래와 같이 사용하고 싶었고, `<slot/>` 에 들어가는 HTML 요소나 컴포넌트의 부모 요소 구조가 변경되지 않기를 원했습니다.

```html
<Shaker
  is-shaking
>
  <button>저장</button>
</Shaker>
```

## 첫번째 시도: SFC로 구현하기

첫 번째 시도는 일반적인 Vue 컴포넌트 형식으로 구현하는 것이었습니다:

```html
<!-- components/Shaker.vue -->
<template>
  <div class="shaker shaker--shaking">
    <slot />
  </div>
</template>
```

하지만 이렇게 구현하면 `<div class="shaker shaker--shaking">`가  `<slot/>`에 들어오는 요소의 부모 요소가 되어, 기존 HTML 구조가 변경되고 의도치 않은 사이드 이펙트가 생길 수 있었습니다.
<figure>
<img src="/assets/images/building-vue-components-with-render-function/shaker-dom.png" alt="DOM 구조" />
<figcaption>&lt;button&gt;저장&lt;/button&gt;의 부모 요소가 &lt;div class="shaker shaker--shaking"&gt;가 되어버립니다.</figcaption>
</figure>

이를 해결하기 위해 `<div class="shaker shaker--shaking">`를 사용하지 않고 `<slot />` 만을 사용해 기존 HTML 구조를 유지하고자 했습니다.

```html
<!-- components/Shaker.vue -->
<template>
  <!-- class 속성 적용 불가 -->
  <slot 
    class="shaker shaker--shaking"
  />
</template>
<style>
.shaker.shaker--shaking {
  animation: horizontal-shaking 0.25s infinite;
}
</style>
```

하지만 `<slot />`에는 `class` 속성을 적용할 수 없기 때문에 이 방법은 사용할 수 없었습니다.

## 결론: Render Function으로 구현하기

일반적인 SFC 방식으로는 원하는 `Shaker` 컴포넌트를 구현할 수 없었기 때문에, [Render Function](https://vuejs.org/guide/extras/render-function.html)을 사용하여 `Shaker` 컴포넌트를 만들기로 했습니다.

Stackblitz에서 코드를 확인할 수 있습니다: [StackBlitz 예제 보기](https://stackblitz.com/~/github.com/Heunsig/shaker-component)

```html
<!-- components/Shaker.vue -->
<script setup>
import { useSlots, h } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});
const emits = defineEmits(['update:modelValue']);
const slots = useSlots();

function startShaking() {
  setTimeout(() => {
    emits('update:modelValue', false);
  }, 500);
}

function render() {
  if (!slots.default) return;

  if (props.modelValue) {
    startShaking();
  }

  return slots.default().map(element => {
    return h(element, { 
      class: props.modelValue ? 'shaker shaker--shaking' : undefined 
    })
  });
}
</script>

<template>
  <render/>
</template>

<style scoped>
:global(.shaker.shaker--shaking){
  animation: horizontal-shaking 0.25s infinite;
}

@keyframes horizontal-shaking {
  0% { transform: translateX(0) }
  25% { transform: translateX(5px) }
  50% { transform: translateX(-5px) }
  75% { transform: translateX(5px) }
  100% { transform: translateX(0) }
}
</style>
```

이렇게 하면, Render Function을 통해 `<slot />`에 들어오는 요소의 부모 요소에 영향을 주지 않으면서, 손쉽게 흔들림 효과를 적용할 수 있는 `Shaker` 컴포넌트를 만들 수 있었습니다.


