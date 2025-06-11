---
layout: "base.njk"
title: "Vibe Coding에서 최신 라이브러리 적용의 한계"
date: 2025-06-12
---

Vue 기반의 Todo 앱을 Vibe Coding 방식으로 개발해보았습니다. LLM은 프로젝트에 필요한 라이브러리들을 자동으로 설치했고, 스타일링 도구로는 TailwindCSS를 선택했습니다. 설치된 버전은 최신인 Tailwind v4였습니다.

하지만 앱을 개발 모드로 실행하자 문제가 발생했습니다. 화면이 제대로 스타일링되지 않았고, 일부 오류도 발생했습니다. 원인을 확인해보니, Tailwind는 v4로 설치되었지만 설정은 v3 기준으로 구성되어 있었습니다. 버전 간 호환성 문제로 인해 스타일이 적용되지 않거나 빌드가 실패했던 것입니다.

이 상황을 AI에게 설명하자, 성능이 비교적 낮은 LLM들은 끝내 문제를 해결하지 못했습니다. 이후 성능이 좋은 Claude 4 Sonnet 모델을 사용해보았고, 이 모델은 Tailwind를 v3로 다운그레이드한 뒤 설정을 맞춰 문제를 해결해주었습니다.

<figure style="text-align:center;">
<img src="/assets/images/vibe-coding-limitations-with-latest-libraries/llm-downgrades-tailwindcss.png" alt="Vibe Coding에서 Tailwind v3로 다운그레이드 하는 모습" style="display: inline-flex;"/>
<figcaption>Vibe Coding에서 Tailwind v3로 다운그레이드 하는 모습</figcaption>
</figure>

하지만 최신 버전을 사용을 원했던 입장에서 v3로 다운그레이드 하는 것은 원하는 문제 해결 방법이 아니었습니다. 그래서 다시 Tailwind v4 환경에서 제대로 작동하도록 요청했지만, Claude 4 Sonnet조차도 문제를 해결하지 못했습니다.


<!-- TODO: Document 참고 시키는 부분 알려주고, Document 새로운 패러다임에 대한 내용 추가 예정 -->
<!-- TODO: 아래와 같은 내용 참고
Backend는 천천히 발전함 그래서 LLM이 학습할 수 있음

Frontend는 너무 빠르게 발전함 LLM이 학습을 못하는 경우가 많음

Document 새로운 패러다임. 

이제는 네비게이션이 있는 형태가 아니라 LLM이 잘 이해할 수 있도록 한 페이지에 모든 내용을 담은 형태가 될 것 같음.

SaaS는 LLM이 학습하기 어렵다

현재 대부분의 프론트엔드 AI 툴들은 Landing 페이지는 엄청나게 잘 만들어주고 예제도 대부분 다 그런것들 하지만 SaaS 는??? 흠… 충분히 학습하지 못한거 아닐까?
 -->