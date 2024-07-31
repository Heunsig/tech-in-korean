---
layout: "iframe.njk"
title: Form에서 버튼이 위치해야 하는 곳
date: 2024-07-25
wip: true

originUrl: "https://adamsilver.io/blog/where-to-put-buttons-on-forms/"
originTitle: "Where to put buttons on forms"
---

버튼 배치는 종종 무시되거나 디자인적인 측면만 우선시 되는 경우가 있습니다.
하지만 버튼 배치는 폼의 사용성을 크게 향상 시킬수도 혹은 망칠 수도 있으며, 이러한 폼은 사용자 경험을 결정짓는 중요한 요소입니다.
버튼을 적절한 곳에 배치하는 것은 생각보다 어려울 수 있습니다. 버튼과 폼의 종류에 따라 적절한 위치가 다르기 때문입니다.
또한, 폼을 전체적으로 분석하지 않으면 동일한 버튼이 서로 다른 위치에 배치되어 일관성이 없고 혼란을 초래할 수 있습니다.

여기에서는 버튼에 관한 연구와 모범 사례를 바탕으로 다양한 폼에서 버튼을 어디에 배치해야 하는지 설명해보겠습니다.

## 주요 버튼을 입력란의 왼쪽 가장자리에 맞춰 배치하세요

<figure>
<img src="/assets/images/where-to-put-buttons-on-forms/alignment.png" alt="Left: a right aligned button (not recommended). Right: a left aligned button (good)." />
<figcaption>왼쪽: 오른쪽 정렬된 버튼 (비추천). 오른쪽: 왼쪽 정렬된 버튼 (좋음).</figcaption>
</figure>


눈 추적 연구에 대한 기사에서 Luke Wroblewski는 [주요 버튼을 입력란의 왼쪽 가장자리에 맞춰야 한다](https://www.lukew.com/ff/entry.asp?571)고 말합니다.

> 명확한 완료 경로를 제시하세요. 입력란과 버튼을 강한 수직 축으로 정렬하면 양식을 완료하는 방법을 명확하게 전달할 수 있습니다.

이 레이아웃은 화면 확대 사용자가 좌우로 이동하지 않고도 내용을 볼 수 있도록 도와줍니다.

<figure>
<img src="/assets/images/where-to-put-buttons-on-forms/back-button" alt="Zoom된 이미지" />
<figcaption>왼쪽: 오른쪽 정렬된 버튼은 확대 시 보이지 않음. 오른쪽: 왼쪽 정렬된 버튼은 확대 시에도 여전히 보임.</figcaption>
</figure>

## 뒤로 가기 버튼을 폼 위쪽에 배치하세요

<figure>
<img src="/assets/images/where-to-put-buttons-on-forms/zoomed" alt="뒤로 가기 버튼 비교" />
<figcaption>왼쪽: 뒤로 가기 버튼이 주요 버튼 옆에 있는 경우 (추천하지 않음). 오른쪽: 뒤로 가기 버튼이 양식 위에 있는 경우 (좋음).</figcaption>
</figure>

일부 폼이나 설문 조사는 여러 페이지로 나누어져 있습니다. 일부 사람들은 답변을 확인하거나 수정하고 싶어합니다.
하지만 일부 사람들은 브라우저의 뒤로 가기 버튼을 신뢰하지 않습니다. 그 이유는, 뒤로 가기 버튼을 클릭했을 때 데이터가 사라지는 잘못 설계된 폼에서의 경험 때문입니다.
이에 대한 해결책은 폼 전용 뒤로 가기 버튼을 제공하는 것입니다.

[Mick Couper, Reg Baker, 그리고 Joanne Mechling의 연구](https://surveypractice.wordpress.com/2011/02/14/navigation-buttons/)에 따르면, 뒤로 가기 버튼을 주요 버튼의 오른쪽에 배치하는 것은 혼란을 초래할 수 있으며, 대신 주요 버튼의 왼쪽이나 아래에 배치해야 한다고 합니다.

주요 버튼 아래쪽에 배치하는 것이 더 좋은 이유는 주요 버튼의 위치를 일관되게 유지할 수 있고, 키보드 사용자가 마지막 입력란에서 직접 탭하여 주요 버튼으로 이동할 수 있기 때문입니다.

하지만 그들의 연구에는 뒤로 가기 버튼을 페이지 상단에 배치하는 옵션을 포함하지 않았습니다.

정부 디지털 서비스(Government Digital Service)의 디자이너인 Joe Lanman은 투표 등록 예제 폼에서 뒤로 가기 버튼을 상단에 배치했습니다. 
그리고 이 방식이 모든 정부 서비스의 표준 접근 방식이 되었습니다.

<figure>
<img src="/assets/images/where-to-put-buttons-on-forms/zoomed" alt="온라인 투표 폼 예제" />
<figcaption>투표 등록 서비스의 질문 페이지로, 페이지 상단에 뒤로가기 링크가 표시됩니다.</figcaption>
</figure>

Joe는 상단에 뒤로 가기 버튼을 배치하는 것이 잘 작동한다고 말했는데, 그 이유는 다음과 같습니다:

- 대부분의 브라우저에서 뒤로 가기 버튼을 비슷한 위치에 배치하기 때문입니다.
- 사용자가 잘못된 페이지에 도착했거나 방금 입력한 내용을 확인하고 싶을 때 곧바로 필요할 가능성이 높기 때문입니다.
- 사용자가 양식을 작성하고 나면 뒤로 가기 버튼이 필요 없을 것입니다. 양식을 작성한 후 뒤로 가기를 클릭하면 입력한 답변이 모두 사라지기 때문입니다.
