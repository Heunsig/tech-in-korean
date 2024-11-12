---
layout: "base.njk"
title: "Building a Vue Component with Render Functions"
date: 2024-11-12
---

While building a sign-up form, I wanted to find a more noticeable way to alert users when form validation fails. I decided that, if the "Save" button is clicked and validation fails, it should turn red and shake slightly for a brief moment.

Initially, I used the CSS `animation` property to add a shaking effect to the "Save" button. However, I wanted to expand this functionality to make it easily reusable across other HTML elements and components. Thus, I decided to create a Vue component that could provide this shake effect, naming it `Shaker`. The requirements for the `Shaker` component were as follows:

1. It should be able to apply the shaking effect to any HTML element or component.
2. The usage should be intuitive.
3. The component should not alter the parent element structure of the HTML element or component it applies to.

In the end, I wanted to use the `Shaker` component as shown below, ensuring that the parent structure of the HTML element or component inside the `<slot />` remains unchanged.

```html
<Shaker
  is-shaking
>
  <button>Save</button>
</Shaker>
```

## First Attempt: Implementing with SFC

My first attempt was to implement the component in a standard Vue Single File Component (SFC) format:

```html
<!-- components/Shaker.vue -->
<template>
  <div class="shaker shaker--shaking">
    <slot />
  </div>
</template>
```

However, this approach introduced a new parent element `<div class="shaker shaker--shaking">` around the element inside the `<slot />`, altering the original HTML structure and causing unintended side effects.
<figure>
<img src="/assets/images/building-vue-components-with-render-function/changed-parent-dom.png" alt="DOM structure" />
<figcaption>The parent element of &lt;button&gt;Save&lt;/button&gt; becomes &lt;div class="shaker shaker--shaking"&gt;.</figcaption>
</figure>

To resolve this, I tried to maintain the original HTML structure by removing `<div class="shaker shaker--shaking">` and using only `<slot />`.

```html
<!-- components/Shaker.vue -->
<template>
  <!-- Unable to apply class attribute -->
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

However, I couldn’t apply a `class` attribute to `<slot />`, so this approach was unworkable.

## Solution: Implementing with Render Functions

Since I couldn’t achieve the desired `Shaker` component with a standard SFC approach, I decided to use a [Render Function](https://vuejs.org/guide/extras/render-function.html) to create the `Shaker` component.

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

Using a Render Function allows us to apply the shake effect seamlessly to the element inside the `<slot />` without altering its parent structure, creating a flexible and reusable `Shaker` component for various scenarios.

With the `Shaker` component built as described above, you can easily apply the shaking effect to any element placed inside the `Shaker` component.

You can view the code on StackBlitz: [View StackBlitz Example](https://stackblitz.com/~/github.com/Heunsig/shaker-component)

```html
<script setup>
import { ref } from 'vue';
import Shaker from './components/Shaker.vue';

const isShaking = ref(true);
</script>

<template>
  <Shaker
    v-model="isShaking"
  >
    <button>Save</button>
  </Shaker>
</template>
```
