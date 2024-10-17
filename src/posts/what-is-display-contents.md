---
layout: "base.njk"
title: "display: contents?"
date: 2024-10-16
wip: true
---

CSS `display` 속성 중에 `contents` 라는 속성이 있습니다. 아마 굉장히 생소한 속성일 것인데요. 이번글에서 `display: contents` 속성이 무엇이고, 어떻게 활용할 수 있는지 알아보겠습니다.


## `display: contents` 란?
먼저 [Can I use 'display: contents'?](https://caniuse.com/?search=display%3A%20contents)를 살펴보면 안타깝게도 메이저 브라우저에서 완벽하게 지원하지 않는 것을 확인할 수 있습니다. 하지만 지원 내용을 좀 더 자세히 살펴보면 `display: contents`를 `button`에 적용이 안되는 것이고, 일반적인 상황에서는 사용할 수 있습니다.

`display: contents` 는 부모 Element가 자식 Element의 컨테이너 역할을 하지 않게 만듭니다. 
먼저 간단한 예제를 통해 `display: contents` 속성이 어떻게 동작하는지 알아보겠습니다.

아래와 같이 부모 Element와 자식 Element가 있습니다.

```html
<div class="parent">
  <div class="child">Child 1</div>
  <div class="child">Child 2</div>
  <div class="child">Child 3</div>
</div>
```

```css
.parent {
  background-color: #00dfff;
  padding: 1rem;
}
```
이렇게 적용을 하면 아래와 같은 모습을 볼 수 있습니다.
<figure>
<img src="/assets/images/what-is-display-contents/before_display_contents.png" alt="display: contents 적용 전" />
<figcaption>`display: contents`를 적용하기 이전 화면</figcaption>
</figure>

여기에서 `.parent`에 `display: contents`를 적용해봅시다.
```css
.parent {
  display: contents;
  background-color: #00dfff;
  padding: 1rem;
}
```

`display: contents`를 적용하게 되면 `.parent` 가 사라지고 `.child`가 `body` 바로 아래 위치하게 됩니다. 즉, `.parent`가 `.child`를 감싸는 역할을 하지 않게 됩니다.
<figure>
<img src="/assets/images/what-is-display-contents/after_display_contents.png" alt="display: contents 적용 후" />
<figcaption>`display: contents`를 적용 후 화면</figcaption>
</figure>

<iframe style="height: 20rem; width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/heunsig/embed/PoMmjQV?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/heunsig/pen/PoMmjQV">
  Untitled</a> by Heunsig (<a href="https://codepen.io/heunsig">@heunsig</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## `display: contents` 활용방법

부모의 역할을 하지 않게 만들어주는 css가 왜 필요한지 궁금증이 생기실겁니다. 기능적으로만 봐서는 왜 필요하지? 라는 생각이 들 수 있습니다. 하지만 `display: contents`는 다음과 같은 상황에서 유용하게 사용될 수 있습니다.

### 사용 예시 1
