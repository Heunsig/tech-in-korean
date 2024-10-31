---
layout: "base.njk"
title: "UI 라이브러리의 역사"
date: 2024-10-31
---

오늘날 웹 생태계에는 다양한 UI 라이브러리가 널리 쓰이고 있지만, 2000년대 초반까지만 해도 이런 도구들은 거의 찾아볼 수 없었습니다. 그 당시 웹 개발자들은 버튼, 폼, 레이아웃과 같은 기본적인 UI 요소를 모두 직접 구현해야 했고, 그 결과 웹사이트를 세련되게 디자인하는 데 많은 시간과 비용이 소모되었습니다.

UI 라이브러리의 등장은 웹 개발 방식에 큰 변화를 가져왔습니다. 이제 개발자들은 디자인의 기본적인 부분을 손쉽게 해결하면서 빠르게 웹사이트를 완성할 수 있게 되었고, 이는 생산성 향상에 큰 기여를 했습니다. 그럼, UI 라이브러리가 웹 개발을 어떻게 혁신해왔는지 1세대부터 4세대까지의 흐름을 통해 살펴보겠습니다.

## 1세대: Bootstrap의 등장

Twitter의 개발자 Mark Otto와 Jacob Thornton이 내부 프로젝트에서 빠른 프로토타이핑을 위해 개발한 Bootstrap이 오픈소스로 공개되며 웹 개발 커뮤니티에서 폭발적인 반응을 얻었습니다.

Bootstrap은 `.btn`, `.card`와 같은 미리 정의된 CSS 클래스를 제공하여 개발자가 이 클래스를 HTML에 적용하기만 해도 일관성 있는 디자인을 손쉽게 구현할 수 있게 했습니다.

<figure>
<img src="/assets/images/the-history-of-ui-library/bootstrap.png" alt="Bootstrap 예시 이미지" />
<figcaption>Bootstrap 예시: '.card', '.card-body', '.btn'과 같은 클래스를 HTML에 적용해 사용합니다.</figcaption>
</figure>

Bootstrap이 성공을 거두면서 다양한 테마와 스타일을 가진 UI 라이브러리들이 연이어 등장했고, 웹 개발 방식에 새로운 흐름을 만들어냈습니다.

대표적으로 [Bootstrap](https://getbootstrap.com/), [Semantic UI](https://semantic-ui.com/)가 있습니다.

- Bootstrap - 2013년 7월, v1.0.0 릴리즈
- Semantic UI - 2014년 11월, v1.0.0 릴리즈

<figure>
<img src="/assets/images/the-history-of-ui-library/bootstrap_and_semantic-ui.jpg" alt="Bootstrap과 Semantic UI" />
<figcaption>왼쪽: Bootstrap(2011년 8월 첫 릴리즈), 오른쪽: Semantic UI (2013년 9월 첫 릴리즈)</figcaption>
</figure>

## 2세대: 컴포넌트형 UI 라이브러리의 등장

초기 UI 라이브러리들은 주로 CSS 클래스 기반으로 스타일링을 했습니다. 그러나 이 방식은 HTML에 여러 태그와 클래스명을 반복적으로 추가해야 했고, 프로젝트가 커질수록 유지보수가 어려워졌습니다.

이때 Vue, React, Angular 같은 SPA(Single Page Application) 프레임워크들이 등장하면서 컴포넌트 기반 개발이 주류가 되었고, UI 라이브러리들도 `<Card />`, `<Button />`처럼 컴포넌트 형태로 제공되기 시작했습니다.

<figure>
<img src="/assets/images/the-history-of-ui-library/material-ui.png" alt="Material UI 예시 이미지" />
<figcaption>Material UI 예시: 복잡한 HTML 없이 '&lt;Card /&gt;' 컴포넌트에 속성만 추가해 사용합니다. </figcaption>
</figure>

이러한 컴포넌트형 UI 라이브러리는 코드의 재사용성과 유지보수성을 크게 높였으며, 더 직관적인 코드 구조로 개발 생산성을 향상시켰습니다. 대표적인 예로 [Material UI](https://mui.com/), [Element UI](https://element.eleme.io/), [Vuetify](https://vuetifyjs.com/)가 있습니다.

- Element UI - 2016년 11월, v1.0.0 릴리즈
- Vuetify - 2018년 2월, v1.0.0 릴리즈
- Material UI - 2018년 5월, v1.0.0 릴리즈

## 3세대: 커스터마이징의 니즈 증가와 Tailwind CSS 인기 상승

UI 라이브러리들이 웹 개발 생산성을 크게 높이며 필수 요소가 되었지만, 고유의 스타일을 가지다 보니 원하는 디자인을 자유롭게 반영하기 어려운 점이 있었습니다.
이에 따라 커스터마이징이 용이한 새로운 UI 라이브러리들이 등장하게 되었습니다.

### 컴포넌트형

기존 2세대 컴포넌트형 UI 라이브러리는 기능과 스타일이 강하게 결합되어 있어 커스터마이징이 어려웠으며, 스타일을 변경하려면 라이브러리 소스 코드를 수정해야 했습니다.

이 문제를 해결하기 위해 등장한 것이 Headless 스타일의 UI 라이브러리 입니다. Headless 스타일 UI 라이브러리는 컴포넌트의 기능만을 제공하고, 스타일은 개발자가 직접 정의할 수 있도록 만들어졌습니다. 이를 통해 개발자는 컴포넌트의 기능을 만들어야 되는 비용을 아끼면서 스타일은 자유롭게 할 수 있게 되었습니다. 대표적인 예로 [Headless UI](https://headlessui.com/)와 [Radix UI](https://www.radix-ui.com/)가 있습니다.

- Headless UI - 2021년 4월, v1.0.0 릴리즈
- Radix UI - 2020년 12월, [공식 사이트 상 첫번째 릴리즈](https://www.radix-ui.com/primitives/docs/overview/releases#december-15-2020)

### Tailwind CSS 친화형

한편 Tailwind CSS의 인기가 상승하기 시작했습니다.

<figure>
<img src="/assets/images/the-history-of-ui-library/tailwind_chart.png" alt="Tailwind CSS 다운로드 수 그래프" />
<figcaption>2021년부터 Tailwind CSS 다운로드 수가 상승세를 보이고 있다.</figcaption>
</figure>

이에 Tailwind CSS를 이용해 스타일링하는 UI 라이브러리도 등장하기 시작했습니다. 이는 Bootstrap처럼 클래스 속성으로 스타일을 정의하지만, Tailwind CSS의 기능들을 적극 활용하여 컴포넌트 스타일을 했고, 개발자 또한 Tailwind CSS를 적극적으로 사용할 수 있도록 만들어졌습니다. 

<figure>
<img src="/assets/images/the-history-of-ui-library/daisy-ui.png" alt="Daisy UI 예시 이미지" />
<figcaption>Daisy UI 예시: 1세대 Bootstrap과 사용법이 비슷하지만 Tailwind CSS의 유틸리티 클래스를 사용하고 있습니다. </figcaption>
</figure>

대표적인 예로 [Daisy UI](https://daisyui.com/), [Versoly UI](https://versoly.com/), [preline](https://preline.co/)가 있습니다.

- Daisy UI - 2021년 5월, v1.0.0 릴리즈
- Versoly - 2022년 4월, v1.0.6 릴리즈
- preline - 2022년 6월, v1.0.0 릴리즈

## 4세대: 코드베이스에 설치하는 방식의 등장

2세대 UI 라이브러리는 커스터마이징에 제약이 많았고, 3세대 UI 라이브러리는 자유롭게 커스터마이징할 수 있지만, 모든 스타일을 개발자가 직접 관리해야 하는 어려움이 있었습니다. 이 문제를 해결하기 위해 등장한 것이 바로 [shadcn/ui](https://ui.shadcn.com/)입니다.

<figure>
<img src="/assets/images/the-history-of-ui-library/shadcn-ui-dark.svg" alt="shadcn/ui 로고" />
</figure>

shadcn/ui는 기존의 `node_modules` shadcn/ui 컴포넌트 전체를 설치 방식 대신, shadcn/ui에서 각 UI 컴포넌트에 자신들의 테마를 입힌 컴포넌트 코드를 제공하면 웹 개발자는 해당 UI 컴포넌트 코드를 자신의 코드베이스에 직접 복사해 사용하는 방식입니다. 자신의 코드베이스에 UI 컴포넌트가 포함되기 때문에 개발자는 컴포넌트의 스타일과 기능을 자유롭게 조정할 수 있게 되었습니다. 그리고 Tailwind CSS를 기반으로 스타일링이 되어있기 때문에 Tailwind CSS에도 굉장히 친화적입니다.

shadcn/ui는 자체 컴포넌트를 제공하지 않으며, 다른 라이브러리 들의 컴포넌트를 활용해 그 위에 shadcn/ui의 테마를 입히는 UI 컴포넌트를 제공합니다. 주로 Radix UI의 컴포넌트를 활용하지만, 특정 컴포넌트에 얽매이지 않으며 컴포넌트에 따라 각기 다른 UI 라이브러리를 활용하기도 합니다.

shadcn/ui는 단순히 컴포넌트를 제공하는 것에 그치지 않고, CLI 도구를 통해 개발 경험(DX)도 향상 시켰습니다. shadcn/ui CLI를 통해 필요한 UI 컴포넌트를 손쉽게 코드 베이스에 추가할 수 있어, UI 컴포넌트 코드를 복사, 붙여넣기 한다거나 의존성 있는 라이브러리들을 모두 설치해야 되는 과정없이 빠르게 shadcn/ui의 UI 컴포넌트를 사용할 수 있게 했습니다.

- shadcn/ui - 2023년 6월, [공식 사이트 상 첫번째 릴리즈](https://ui.shadcn.com/docs/changelog)