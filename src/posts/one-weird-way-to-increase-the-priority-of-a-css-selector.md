---
layout: "base.njk"

title: CSS 선택자의 우선순위를 높이는 이상한 한 가지 방법
date: 2024-08-29

wip: true
---

CSS로 스타일링을 하다보면 간혹 UI 라이브러리를 사용해 적용한 컴포넌트에 UI 라이브러리에서 제공하는 스타일이 아닌, 조금 스타일 수정을 하고 싶을 때가 있습니다.
UI 라이브러리를 통해 적용한 버튼 컴포넌트가 있다고 가정해봅시다.

```html
<button 
  type="button"
  class="rich-btn"
>
  Click Me
</button>
```

```css
.rich-btn {
  background: none;
  border: none;
  background-color: #0075ff;
  color: #fff;
  padding: .5rem;
  border-radius: 6px;
}
```
