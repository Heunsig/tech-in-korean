---
layout: "iframe.njk"

title: 비활성화된 버튼의 문제점과 대신 사용할 수 있는 방법
date: 2024-06-22

originUrl: "https://adamsilver.io/blog/the-problem-with-disabled-buttons-and-what-to-do-instead/"
originTitle: "The problem with disabled buttons and what to do instead"
---

저는 2009년에 모든 폼(Form) 필드의 값이 올바르게 입력될 때까지 제출 버튼을 비활성화 하는 폼의 프로토타입을 만들었습니다. 사용자들이 오류를 아예 보지 않도록 하는 것이 최선이라는 생각에서 시작했습니다. 하지만 제출 버튼을 비활성화하는 것은 너무 극단적인 방식이였고, 이로 인해 사용자들은 짜증을 내거나 심지어 작성하는 것을 중간에 포기하기도 했습니다.

## 문제점 #1: 피드백을 주지 않는다

폼에 오류가 있을 때 사용자는 각 필드를 다시 검토하고, 오류를 찾아내서 수정해야 합니다.  
_<본문 영상 참고>_

## 문제점 #2: UI에 문제가 있는 것 처럼 보인다

사용자가 자신이 입력한 정보가 올바르다고 생각하면 UI에 문제가 있다고 느낄 수 있습니다. 또한, 오류가 여러 개 있을 때 하나를 수정하더라도 버튼이 계속 비활성화되어 있으면, UI가 반응이 없는 것처럼 느껴질 수 있습니다.  
_<본문 영상 참고>_

## 문제점 #3: 보기가 어렵다

비활성화된 버튼은 비활성 상태임을 나타내기 위해 대비가 낮습니다. 이는 특히나 시각 장애가 있는 사용자들이 읽기 어렵게 만듭니다.  
_<본문 영상 참고>_

## 문제점 #4: 포커싱이 안된다

이 말은 키보드 사용자들이 탭 키를 사용해 버튼으로 이동할 수 없다는 것을 의미합니다. 그리고 시력이 좋지 않은 사용자들도 버튼을 볼 수 없습니다. 대부분의 사용자는 다음 진행을 위한 버튼을 기대합니다. 하지만 비활성화된 버튼은 포커싱이 안되기 때문에 사용자이 혼란스러워 할 수 있습니다.  
_<본문 영상 참고>_

## 문제점 #5: 헷갈리게 만든다

비활성화된 버튼은 비활성 상태임을 나타내기 위해 대비를 낮게 설정합니다. 하지만 이것은 때로는 비활성 상태임을 명확하게 나타내지 못 할 수 있습니다. 그래서 사용자들은 계속 버튼을 클릭하려고 시도하게 됩니다.  
_<본문 영상 참고>_

## 문제점 #6: 버튼이 활성화되는 것을 알아차리기 힘들 수 있다

화면의 크기나 폼의 길이에 따라 버튼이 화면 밖에 있을 수 있습니다. 그리고 버튼이 화면 안에 있더라도 사용자들은 폼을 채우는 데 집중하느라 버튼의 상태 변화를 알아차리지 못할 수 있습니다.  
_<본문 이미지 참고>_

## ‘입력하는 즉시 검증하세요’

아니요. [실시간 검증은 문제가 있습니다](https://adamsilver.io/blog/the-problem-with-live-validation-and-what-to-do-instead/) [번역](/posts/the-problem-with-live-validation-and-what-to-do-instead). 그리고 모든 문제가 해결되는 것은 아닙니다.

## 대신 어떻게 해야할까

1. 사용자가 질문을 이해할 수 있도록 **명확한 레이블과 힌트 텍스트를 작성하세요**.
2. 사용자가 질문을 이해하는 데 부담을 덜 느끼도록, **한 페이지에 한 종류의 질문만 포함하세요**.
3. 항상 피드백을 받을 수 있도록 **버튼을 활성화**하세요.
4. 불필요한 오류를 피하기 위해 **사소한 실수를 용인**하세요.
5. 사용자가 문제를 해결할 수 있도록 **명확한 오류 메시지를 제공**하세요.
