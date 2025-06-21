---
layout: "base.njk"
title: "SASS Variables 보다 CSS Native Variables를 선호하는 이유"
date: 2023-10-08
---

SASS를 사용하고 있지만 SASS의 Variable이 아닌 CSS의 Variable (공식적으로는 [CSS Custom Properties](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_cascading_variables/Using_CSS_custom_properties))를 사용해야하는 이유가 무엇인지 알아보겠습니다.

## 변수 정의 방법

첫번째로 기본적인 CSS 와 SASS의 Variable(이하 변수) 선언 및 사용 방법에 대해 알아보겠습니다.

### SASS (SCSS)
```scss
$color-primary: hsl(220, 90%, 56%);

.link {
  color: $color-primary;
}
```

### CSS
```css
:root {
  --color-primary: hsl(220, 90%, 56%);
}

.link {
  color: var(--color-primary);
}
```

이제 Navtive CSS에서도 SASS와 같은 CSS Preprocessor(전처리기) 없이도 변수를 선언해서 사용할 수 있습니다. 그렇다면 CSS와 SASS의 변수 시스템은 동일할까요? 그렇지 않습니다.

SASS 변수와 달리 CSS 변수는 몇가지 특징이 있습니다.
- 변수를 특정 Element 범위 안에서만 사용하도록 할 수 있다.
- 종석적(Cascade) 규칙이 적용된다.
- 변수 값을 변경하면 스타일이 동적으로 변경된다.
- Javascript에서 조작할 수 있다.

SASS 변수와 달리 CSS Navtive 변수로 할 수 있는 ㅁ쳐가지 실용적인 예를 살펴 보겠습니다.

## 1. 훨씬 적은 코드로 Color 테마를 만들 수 있다.
아래와 같은 컴포넌트가 있고 Light/Dark 테마를 만든다고 가정해봅시다:
```html
<section data-theme="dark">
  <div class="component">
    <div class="child" data-theme="default"></div>
  </div>
</section>
```

다음은 SASS 변수를 사용해서 테마를 구현한 코드입니다:
```scss
/* light */
$color-primary: blue;
$color-text: black;
$color-bg: white;

/* dark*/
$color-primary-dark: red;
$color-text-dark: white;
$color-bg-dark: black;

.component {
  color: $color-text;
  background-color: $color-bg;

  a {
    color: $color-primary;
  }
}

.component--dark {
  color: $color-text-dark;
  background-color: $color-bg-dark;

  a {
    color: $color-primary-dark;
  }
}
```
Light 테마에서 사용하는 변수와 Dark 테마에서 사용하는 변수를 각각 정의해야 합니다. 또한, Dark 테마에서 색상이 바뀌는 부분들을 찾아서 Dark 테마 변수로 변경해야 합니다.

예제와 같은 간단한 코드에서는 큰 문제가 없을 수 있지만, 실제 프로젝트에서는 굉장히 많은 변수를 정의해야하고, 많은 프로퍼티를 변경해야 합니다. 이럴 경우 해당 작업은 매우 번거로울 뿐만 아니라 많은 버그를 발생시킬 수 있습니다.

다음으로는 CSS로 구현해보겠습니다:
```css
:root {
	--color-primary: blue;
	--color-text: black;
	--color-bg: white;
}

.component {
	color: var(	--color-text);
	background-color: var(--color-bg);

	a {
		color: var(--color-primary);
	}
}

.component--dark {
	--color-primary: red;
	--color-text: white;
	--color-bg: black;
}
```
CSS 변수를 사용하게 되면 각 테마를 위한 새로운 색상 변수를 만들 필요가 없습니다. 그냥 Dark 테마 Selector에 각 변수들의 값만 변경해주면 됩니다.

## 2. 폰트 크기를 쉽게 스케일 업/다운 할 수 있다.

타이포그래피를 조화롭게 스타일링하기 위해서는 각 폰트 크기를 유형별 변수로 만들어 사용할 수 있습니다. 이를 통해 타이포그래피 스타일링이 쉬워지며, 일관된 디자인을 구현할 수 있습니다.

다음은 SASS 변수를 사용하여 폰트 유형별로 변수를 만든 방법입니다:
```scss
$text-xs: 0.694em;
$text-sm: 0.833em;
$text-base-size: 1em;
$text-md: 1.2em;
$text-lg: 1.44em;
$text-xl: 1.728em;
```

위 예시는 SASS 변수를 사용할 때 가장 일반적인 접근 방법 중 하나입니다. 이를 통해 각 변수를 해당하는 타이포그래피 요소에서 사용할 수 있습니다.

그러면 CSS 변수를 사용한다면 어떨까요?
```css
:root {
	--text-xs: 0.694em;
	--text-sm: 0.833em;
	--text-base-size: 1em;
	--text-md: 1.2em;
	--text-lg: 1.44em;
	--text-xl: 1.728em;
}
```
CSS 변수 또한 SASS 변수를  정의했던 것과 비슷하게 정의해서 사용할 수 있습니다.

그러면 CSS 변수를 통해 해당 기능을 좀 더 확장해봅시다.
```css
:root {
  /* body font size */
  --text-base-size: 1em;
  
  /* type scale */
  --text-scale-ratio: 1.2;
  --text-xs: calc((1em / var(--text-scale-ratio)) / var(--text-scale-ratio));
  --text-sm: calc(var(--text-xs) * var(--text-scale-ratio));
  --text-md: calc(var(--text-sm) * var(--text-scale-ratio) * var(--text-scale-ratio));
  --text-lg: calc(var(--text-md) * var(--text-scale-ratio));
  --text-xl: calc(var(--text-lg) * var(--text-scale-ratio));
  --text-xxl: calc(var(--text-xl) * var(--text-scale-ratio));
  --text-xxxl: calc(var(--text-xxl) * var(--text-scale-ratio));
}

@media (min-width: 1024px) {
	:root {
		--text-base-size: 1.25em;
		--text-scale-ratio: 1.25;
	}
}
```
이러한 접근 방식의 장점은 무엇일까요? `—text-base-size` 와 `—text-scale-ratio` 값만 변경하면 전체 타이포그래피를 제어할 수 있다는 점입니다.

“그렇다면 SASS 변수를 사용하여 동일할 작업을 수행 할 수 없나요?” 네, SASS 변수를 사용할 경우 Breakpoint에 맞는 폰트 유형 변수들을 각각 지정해주어야 하며, media 쿼리에서 해당 변수가 사용하고 있는 프로퍼티의 값도 모두 변경해주어야 합니다.

## 3. 컴포넌트 외부에서 CSS 변수를 제어할 수 있다.

CSS 변수는 SASS 변수와 달리 컴포넌트 외부에서도 값을 제어할 수 있습니다.

SASS는 CSS의 Preprocessor(전처리기)이기 때문에 SASS가 CSS로 컴파일되면 나면 SASS의 변수들을 더이상 변수가 아닌 일반 값으로 변하게 됩니다.

아래의 SASS (SCSS)가 있을 때, 
```scss
$button-width: 20px;
.vt-button {
	width: $button-width;
}
```

이를 CSS로 컴파일하면 다음과 같이 변경됩니다:
```css
.vt-button {
	width: 20px;
}
```

그래서 컴파일이 되고 난 이후에는 더이상 SASS의 `$button-width`의 값을 제어할 수 없게 됩니다.

하지만 CSS 변수를 사용하면 어떨까요?
```css
.vt-button {
	--button-width: 20px;
	width: var(--button-width);
}
```

만약 `vt-button` 컴포넌트를 사용하는 사용자가 `vt-button`의 width 값을 자신이 원하는대로 변경하고 싶다면, 다음과 같이 사용할 수 있습니다.
```css
.my-app .vt-button {
	--button-width: 50px;
}
```
물론 사용자는 width의 값을 직접 변경할 수 있지만, 컴포넌트 전체 스타일에 영향을 줄 수 있습니다. 따라서 컴포넌트 제공자가 제공하는 CSS 변수를 사용해서 값을 변경하는 것이 전체적인 컴포넌트 스타일의 일관성을 유지하면서 필요한 부분을 변경할 수 있는 가장 좋은 방법입니다.

그래서 컴포넌트 제공자는 스타일링을 커스텀하게 할 수 있는 CSS 변수를 사용자에게 제공함으로써 좀 더 유연한 컴포넌트를 제공할 수 있습니다.

## CSS 변수의 문제점은?

짧게 요약하면 브라우저 지원입니다. 

이 스펙은 최신 브라우져에서만 적용이 되기 때문에 옛날 버전의 브라우저에서는 제대로 작동하지 않을 수 있습니다. 하지만 IE가 서비스 종료가 된 이후에는 큰 문제가 되지 않게 되었습니다.

### 참고자료
- [Why we prefer CSS Custom Properties to SASS variables](https://codyhouse.co/blog/post/css-custom-properties-vs-sass-variables#css-variables-with-sass)
- [What is the difference between CSS variables and preprocessor variables?](https://css-tricks.com/difference-between-types-of-css-variables/#aa-why-would-you-use-native-css-custom-properties)
- [Difference between SCSS variables and CSS variables?](https://stackoverflow.com/questions/67016460/difference-between-scss-variables-and-css-variables/67016495#67016495)