---
title: Vue에서 앵커 스크롤이 안되는 이슈 해결하기
date: 2024-11-02
---

사용자가 URL에 해시 값을 추가해 특정 페이지로 들어오면, 브라우저는 자동으로 해당 해시 값과 일치하는 ID를 가진 요소로 스크롤을 이동시킵니다.
SSR(Server Side Rendering) 기반 웹 페이지에서는 브라우저가 페이지에 처음 접근할 때 HTML이 이미 로드되어 있어 이 기능이 잘 작동합니다.
하지만 Vue와 같은 CSR(Client Side Rendering) 기반 웹 페이지에서는 브라우저가 해시 값에 맞는 ID를 찾으려 할 때, 해당 요소가 아직 로드되지 않았을 수 있습니다.
이 경우, 브라우저는 ID를 찾지 못해 페이지 최상단을 보여줍니다.
이 글에서는 Vue에서도 브라우저가 ID를 찾아 해당 앵커로 스크롤 이동이 문제없이 작동하도록 하는 방법을 알아보겠습니다.

Vue에서는 라우팅을 `vue-router`가 관리하며, 이 설정 안에 있는 `scrollBehavior` 옵션을 통해 브라우저의 스크롤 동작을 조정할 수 있습니다.

```javascript
// router/index.js
export createRouter({
  /**
   * 다른 vue-router 옵션
   */
  scrollBehavior(to, from, savedPosition) {
    // savedPosition이 있으면 해당 위치로 이동
    // 새로고침 시 매번 앵커로 이동하는 것을 방지
    if (savedPosition) {
      return savedPosition
    }

    function findEl(hash, x = 0) {
      return document.querySelector(hash) || 
        new Promise((resolve) => {
          // 50번 이상 시도해도 요소를 찾지 못하면 포기
          if (x > 50) {
            return resolve()
          }

          // 100ms마다 hash 값과 동일 한 id를 가진 요소를 
          // 찾을 때까지 재귀적으로 호출
          setTimeout(() => {
            resolve(findEl(hash, ++x))
          }, 100)
        })
    }

    if (to.hash) {
      // 해시가 있는 경우 해당 해시를 가진 요소 찾음
      const el = await findEl(to.hash)

      // 스크롤 동작 설정을 지원하는 브라우저인지 확인
      if ('scrollBehavior' in document.documentElement.style) {
        return window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
      } else {
        return window.scrollTo({ top: el.offsetTop })
      }
    }

    // 해시가 없는 경우 페이지 최상단으로 이동
    return { top: 0, left: 0 }
  }
})
```

위 코드의 핵심은 `findEl` 함수입니다. 이 함수는 100ms마다 URL 해시와 일치하는 ID를 가진 요소를 찾습니다.
그리고 50번을 시도해도 스크롤 이동시킬 요소를 찾지 못하면, 스크롤을 페이지 최상단으로 이동시킵니다.

사실 이 방식은  페이지 로드가 완전히 끝났음을 보장하지 못 합니다. 다만, 5초 내에 스크롤을 이동시킬 요소를 찾지 못하면 해당 요소가 없거나 페이지에 문제가 있다고 판단할 수 있습니다.
물론 페이지 로드를 완벽히 보장하는 다른 방법들이 있겠지만, 이는 필요한 기능에 비해 복잡도가 높아 질 수 없기 때문에 이 방식이 더 적절하다고 생각합니다.

```javascript
function findEl(hash, x = 0) {
  return document.querySelector(hash) || 
    new Promise((resolve) => {
      if (x > 50) {
        return resolve()
      }

      setTimeout(() => {
        resolve(findEl(hash, ++x))
      }, 100)
    })
}
```

아래는 타입스크립트로 작성한 코드입니다:

```typescript
// router/index.ts
export createRouter({
  /**
   * 다른 vue-router 옵션
   */
  async scrollBehavior (to, _, savedPosition){
    if (savedPosition){
      return savedPosition
    }

    function findEl(
      hash: string,
      x: number = 1,
    ): HTMLElement | Promise<HTMLElement | undefined> {
      return (
        (document.querySelector(hash) as HTMLElement) ||
        new Promise((resolve) => {
          if (x > 50) {
            return resolve(undefined);
          }

          setTimeout(() => {
            resolve(findEl(hash, ++x));
          }, 100);
        })
      );
    }


    if (to.hash) {
      let el = await findEl(to.hash)

      if ('scrollBehavior' in document.documentElement.style) {
        return window.scrollTo({ top: el?.offsetTop, behavior: 'smooth' })
      } else {
        return window.scrollTo({ top: el?.offsetTop })
      }
    }


    return { top: 0, left: 0 }
  }
})
```

### 참고자료

-[Nuxt.js Smooth Scrolling with Hash Links](https://dev.to/dimer191996/nuxt-js-smooth-scrolling-with-hash-links-94a?ref=dailydev)