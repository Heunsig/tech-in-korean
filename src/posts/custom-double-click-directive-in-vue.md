---
layout: "base.njk"
title: "Vue에서 더블 클릭 디렉티브 만들기"
date: 2025-01-02
wip: true
---

Vue에서는 현재(v3.5) 더블클릭 이벤트를 지원하지 않습니다. 하지만 Web API에서 더블클릭 이벤트를 지원하고 있습니다. 
이 글에서는 Vue에서 더블클릭 이벤트를 처리하는 방법을 설명합니다.

```html
// Import this file into your Vue application to use the directive
import { DirectiveBinding } from 'vue';

const vDblClick = {
  // Called when the directive is first bound to the element
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    if (typeof binding.value !== 'function') {
      console.warn('[v-dblclick] The provided expression must be a function');
      return;
    }

    // Store the handler in the element to allow unbinding later
    el.__dblClickHandler__ = (event: MouseEvent) => {
      binding.value(event);
    };

    // Attach the event listener
    el.addEventListener('dblclick', el.__dblClickHandler__);
  },

  // Called when the directive is unbound from the element
  unmounted(el: HTMLElement) {
    // Remove the event listener
    if (el.__dblClickHandler__) {
      el.removeEventListener('dblclick', el.__dblClickHandler__);
      delete el.__dblClickHandler__;
    }
  },
};

// Add a type declaration for the custom property
declare global {
  interface HTMLElement {
    __dblClickHandler__?: (event: MouseEvent) => void;
  }
}

// Register the directive globally or use it locally in components
export default {
  install(app: any) {
    app.directive('dblclick', vDblClick);
  },
};

// Usage Example:
// <template>
//   <button v-dblclick="onDoubleClick">Double Click Me!</button>
// </template>

// <script lang="ts">
// import DblClickDirective from './directives/vDblClick';
//
// export default {
//   directives: { dblclick: DblClickDirective },
//   methods: {
//     onDoubleClick(event: MouseEvent) {
//       console.log('Button double-clicked!', event);
//     },
//   },
// };
// </script>
```

