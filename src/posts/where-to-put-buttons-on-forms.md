---
layout: "iframe.njk"
title: Form에서 버튼이 위치해야 하는 곳
date: 2024-07-25
wip: true

originUrl: "https://adamsilver.io/blog/where-to-put-buttons-on-forms/"
originTitle: "Where to put buttons on forms"
---

버튼 배치는 종종 간과되거나 디자인적인 요소로만 취급되는 경우가 많습니다. 
하지만 버튼의 위치는 폼의 사용성을 크게 좌우할 수 있으며, 이는 사용자 경험을 결정짓는 중요한 요소입니다. 
버튼을 적절하게 배치하는 일은 생각보다 복잡할 수 있는데, 버튼과 폼의 유형에 따라 최적의 위치가 다르기 때문입니다.
또한, 폼을 전체적으로 고려하지 않으면 동일한 버튼이 일관성 없이 다른 위치에 배치되어 사용자에게 혼란을 줄 수 있습니다.

이 글에서는 버튼 배치에 대한 연구와 모범 사례를 기반으로, 다양한 폼에서 버튼을 어디에 배치해야 가장 효과적인지 설명하겠습니다.

## 주요 버튼을 입력란의 왼쪽 가장자리에 맞춰 배치하세요

<figure>
<img src="/assets/images/where-to-put-buttons-on-forms/alignment.png" alt="Left: a right aligned button (not recommended). Right: a left aligned button (good)." />
<figcaption>왼쪽: 오른쪽 정렬된 버튼 (비추천). 오른쪽: 왼쪽 정렬된 버튼 (좋음).</figcaption>
</figure>


눈 추적 연구에 대한 기사에서 Luke Wroblewski는 [주요 버튼을 입력란의 왼쪽 가장자리에 맞춰야 한다](https://www.lukew.com/ff/entry.asp?571)고 말합니다.

> 명확한 완료 경로를 제시하세요. 입력란과 버튼을 강한 수직 축으로 정렬하면 양식을 완료하는 방법을 명확하게 전달할 수 있습니다.

이 레이아웃은 화면 확대 사용자가 좌우로 이동하지 않고도 내용을 볼 수 있도록 도와줍니다.

<figure>
<img src="/assets/images/where-to-put-buttons-on-forms/back-button.png" alt="Zoom된 이미지" />
<figcaption>왼쪽: 오른쪽 정렬된 버튼은 확대 시 보이지 않음. 오른쪽: 왼쪽 정렬된 버튼은 확대 시에도 여전히 보임.</figcaption>
</figure>

## 뒤로 가기 버튼을 폼 위쪽에 배치하세요

<figure>
<img src="/assets/images/where-to-put-buttons-on-forms/zoomed.png" alt="뒤로 가기 버튼 비교" />
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
<img src="/assets/images/where-to-put-buttons-on-forms/zoomed.png" alt="온라인 투표 폼 예제" />
<figcaption>투표 등록 서비스의 질문 페이지로, 페이지 상단에 뒤로가기 링크가 표시됩니다.</figcaption>
</figure>

Joe는 상단에 뒤로 가기 버튼을 배치하는 것이 잘 작동한다고 말했는데, 그 이유는 다음과 같습니다:

- 대부분의 브라우저에서 뒤로 가기 버튼을 비슷한 위치에 배치하기 때문입니다.
- 사용자가 잘못된 페이지에 도착했거나 방금 입력한 내용을 확인하고 싶을 때 곧바로 필요할 가능성이 높기 때문입니다.
- 사용자가 양식을 작성하고 나면 뒤로 가기 버튼이 필요 없을 것입니다. 양식을 작성한 후 뒤로 가기를 클릭하면 입력한 답변이 모두 사라지기 때문입니다.

이 접근 방식은 뒤로 가기 버튼과 주요 버튼을 명확히 구분하여 사용자가 다음 단계로 진행하는 데 걸리는 시간을 줄일 수 있습니다. 또한 필요할 때 추가 버튼을 위한 공간을 마련할 수 있는데, 이에 대해서는 나중에 다루겠습니다.

## 직접 관련이 없는 작업은 폼 위에 배치하세요

<figure>
<img src="/assets/images/where-to-put-buttons-on-forms/tangential-links.png" alt="폼 위쪽에 배치된 비밀번호 찾기 링크" />
<figcaption>왼쪽: 양식 안에 있는 '비밀번호 찾기' 링크 (추천하지 않음). 오른쪽: 양식 밖에 있는 '비밀번호 찾기' 링크 (좋음).</figcaption>
</figure>

일부 폼에는 데이터를 제출하지 않으며, 폼과 직접적인 관련이 없는 작업이 포함되어 있습니다.

예를 들어, 로그인 양식에서 '비밀번호 찾기' 링크는 사용자가 비밀번호를 재설정할 수 있게 해주지만, 이는 로그인 과정의 일부가 아닙니다.

종종 '비밀번호 찾기' 링크가 비밀번호 입력란 옆에 있는 것을 볼 수 있지만, 이는 다음과 같은 문제를 일으킬 수 있습니다:

- 사용자는 탭 키를 눌러 다음 입력란이나 버튼으로 이동하기를 기대합니다.
- 링크를 찾기 위해 스크롤해야 할 수도 있습니다.
- 링크를 클릭하기 전에 이메일 주소를 입력하는 데 시간을 낭비할 수 있습니다.

이 링크를 양식 위에 배치하면 이러한 문제를 모두 해결할 수 있습니다.

## 추가 버튼은 그 기능에 따라 배치하세요

여러 개의 버튼이 있는 폼은 문제가 있습니다.

[결정을 내리는 데 걸리는 시간은 선택의 수와 복잡성에 비례하여 증가](https://lawsofux.com/hicks-law/)하기 때문에, 추가 버튼은 선택을 늘리고 시간을 더 소모하게 만듭니다.

또한, 키보드 사용자들은 [폼을 제출하기 위해 Enter 키를 누를 때 어떤 동작이 실행될지 확신할 수 없습니다](https://adamsilver.io/blog/forms-with-multiple-submit-buttons-are-problematic/).

그렇다고 해서 여러 버튼이 항상 필요 없는 것은 아닙니다. 여러 버튼이 필요한 경우도 있습니다.

버튼이 하는 일을 고려하면 버튼을 어디에 배치할지 결정하는 데 도움이 됩니다.

세 가지 예를 통해 각각 다른 처리가 필요한 상황을 살펴보겠습니다.

### 1. 주요 버튼 아래에 취소 버튼을 배치하세요

<figure>
<img src="/assets/images/where-to-put-buttons-on-forms/cancel-button.png" alt="취소 버튼의 위치 추천/비추천" />
<figcaption>주요 버튼 옆에 취소 버튼(추천하지 않음). 오른쪽: 주요 버튼 아래에 취소 버튼(좋음).</figcaption>
</figure>

Luke Wroblewski의 연구에 따르면 취소 버튼은 주요 버튼의 오른쪽에 있어야 하며 링크 형태로 눈에 덜 띄게 스타일링되어야 합니다.

하지만 취소 버튼을 주요 버튼 아래에 배치하는 것에도 몇 가지 장점이 있습니다:

- 첫째, 이것은 폼 전문가인 Caroline Jarrett의 규칙을 준수합니다. [파괴적인 버튼을 찾기 어렵게 만듭니다](http://www.effortmark.co.uk/seven-basic-best-practices-buttons/).
- 둘째, 뒤로 가기 버튼과 추가 링크 섹션에서 설명한 대로, 취소 버튼은 폼 자체와 직접적인 관련이 없기 때문에 기본 버튼 아래에 배치하는 것이 합리적입니다.
- 마지막으로, 다른 직접 관련된 버튼들을 같은 행에 배치할 수 있는 공간을 확보합니다. 많은 버튼을 한 행에 배치하면 사용자가 가장 중요한 버튼을 파악하기 어려워집니다.

### 2. '추가' 버튼을 기본 버튼 위로 올려주세요

<figure>
<img src="/assets/images/where-to-put-buttons-on-forms/add-another-button.png" alt="계속 버튼 위치" />
<figcaption>왼쪽: 기본 버튼 옆에 있는 '추가' 버튼 (권장하지 않음). 오른쪽: 기본 버튼 바로 위에 있는 '추가' 버튼 (좋음).</figcaption>
</figure>

사용자가 추가 정보를 입력해야 할 때가 있습니다. 예를 들어, 예약에 가족 구성원의 이름을 추가해야 할 경우가 그렇습니다.

'추가하기' 버튼을 주 버튼 위에 배치하면 다음과 같은 이점이 있습니다:

- 사용자가 주 버튼을 선택하기 위해 그 버튼을 지나칠 필요가 없으므로, Caroline Jarrett의 규칙에 부합하여 [버튼을 논리적인 순서로 배치](http://www.effortmark.co.uk/seven-basic-best-practices-buttons/)할 수 있습니다.
- 주 버튼이 항상 왼쪽에 일관되게 위치하게 됩니다.
- Erik Kennedy가 ['The 3 Laws of Locality'](https://www.learnui.design/blog/the-3-laws-of-locality.html#1-put-the-control-where-it-affects-change)에서 설명한 것처럼, 영향을 미치는 곳, 즉 복제되는 필드 옆에 위치하게 됩니다.

### 3. '저장 후 종료' 버튼을 주 버튼 옆에 배치합니다

<figure>
<img src="/assets/images/where-to-put-buttons-on-forms/save-and-exit-button.png" alt="Save and exit 버튼 위치 비교 이미지" />
<figcaption>왼쪽: '저장 후 종료' 버튼이 주 버튼 위에 있는 경우 (비추천). 오른쪽: '저장 후 종료' 버튼이 주 버튼 옆에 있는 경우 (추천).</figcaption>
</figure>

사용자가 긴 양식을 작성할 때 [진행 상황을 저장](https://github.com/alphagov/govuk-design-system-backlog/issues/87)해야 할 경우가 있습니다.

'저장 후 종료' 버튼을 주 버튼 위에 배치하면 더 중요한 버튼이라는 잘못된 인식을 줄 수 있습니다.

아래에 배치하면 버튼이 겹쳐져 리스트가 번잡해지고 취소 버튼이 있어야 할 자리를 차지하게 됩니다.

따라서 '저장 후 종료' 버튼을 주 버튼 옆에 배치하는 것이 합리적입니다. 이는 양식과 직접 관련된 동작이기 때문입니다.

## 일부 단일 필드 양식에서는 버튼을 입력 필드 옆에 배치하세요

<figure>
<img src="/assets/images/where-to-put-buttons-on-forms/single-field-form.png" alt="Save and exit 버튼 위치 비교 이미지" />
<figcaption>왼쪽: 검색 상자 아래에 버튼 배치 (비추천). 오른쪽: 검색 상자 옆에 버튼 배치 (추천).</figcaption>
</figure>

드물게 버튼을 입력 필드 옆에 배치할 수 있으며, 이는 사이트 헤더의 글로벌 검색 양식에서 자주 볼 수 있습니다.

입력 필드 아래에 버튼을 배치하는 것이 크게 잘못된 것은 아니지만, 버튼을 옆에 배치하면 공간을 절약하고 더 깔끔해 보입니다.

하지만 필드가 하나인 일반 양식에서는 이렇게 하지 마세요. 이는 일관성이 없고 비전통적입니다.

## 다중 선택 양식에서는 버튼을 양식 위에 배치하세요

<figure>
<img src="/assets/images/where-to-put-buttons-on-forms/multi-select-buttons.png" alt="Save and exit 버튼 위치 비교 이미지" />
<figcaption>왼쪽: 다중 선택 버튼이 목록 아래에 있는 경우 (비추천). 오른쪽: 다중 선택 버튼이 목록 위에 있는 경우 (추천).</figcaption>
</figure>

다중 선택 양식은 사용자가 여러 항목을 한 번에 선택하고 조작할 수 있게 합니다. 예를 들어, Gmail에서 여러 이메일을 선택하고 한 번에 보관할 수 있습니다.

이 특별한 경우에는 버튼을 양식 위에 배치하세요.

이는 Erik Kennedy의 규칙이 적용되는 또 다른 예로, [컨트롤이 전체 영역에 변화를 주는 경우 해당 영역 위에 배치해야 합니다](https://www.learnui.design/blog/the-3-laws-of-locality.html#2-if-a-control-affects-change-across-an-entire-area-put-it-above-that-area).

버튼을 목록 위에 배치하면 더 쉽게 발견할 수 있고, 이러한 인터페이스에서는 종종 필요한 페이지 매김 컨트롤을 아래에 배치할 수 있는 공간을 확보할 수 있습니다.

## 요약

이 글에서는 다양한 양식에서 버튼을 어디에 배치할지에 대해 살펴보았습니다.

표준 양식의 단일 버튼이든 다중 선택 양식의 여러 버튼이든, 버튼 배치는 매우 중요하며 신중하게 고려해야 합니다.

### 체크리스트:

- 주 버튼을 입력 필드의 왼쪽 가장자리에 맞추기
- 뒤로 가기 버튼을 양식 위에 배치하기
- 관련이 적은 동작을 양식 위에 배치하기
- 추가 버튼은 그 기능에 따라 배치하기
- 단일 필드 양식에서는 버튼을 입력 필드 옆에 배치하기
- 다중 선택 양식에서는 버튼을 양식 위에 배치하기

Caroline Jarrett의 도움에 감사드립니다.
