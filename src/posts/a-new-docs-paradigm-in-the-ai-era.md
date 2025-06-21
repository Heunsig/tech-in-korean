---
layout: "base.njk"
title: "AI 시대의 새로운 Docs 패러다임"
date: 2025-06-21
---

개발자들은 새로운 라이브러리나 툴을 사용할 때 공식 문서(Documentation, 이하 Docs)나 Github의 README를 참고해 정보를 찾아왔습니다. Docs에서 필요한 정보를 빠르게 찾는 능력은 개발자의 중요한 역량 중 하나였고, 많은 라이브러리/툴 제공자들은 개발자가 정보를 쉽게 찾을 수 있도록 UX/UI에도 공을 들여 Docs를 구성해왔습니다. 하지만 지금 AI 시대의 개발자들은 Docs를 읽는 대신 AI에게 직접 질문하는 방식으로 변화하고 있습니다. 이런 변화 속에서 앞으로 Docs의 형태는 어떻게 달라질까요?

<figure>
<img src="/assets/images/a-new-docs-paradigm-in-the-ai-era/vue-3-docs.jpg" alt="Vue 3 공식 Docs" />
<figcaption>Vue 3 공식 Docs</figcaption>
</figure>


## AI와 함께 바뀐 학습 방식

최근 저는 어떤 라이브러리를 사용하기 위해 공식 Docs를 직접 찾아보는 일이 드물어졌습니다. 대신 궁금한 내용을 AI(Chat GPT, Claude, Cursor 등)에게 물어봅니다. 예를 들어, "Tailwind 세팅 방법 알려줘"라고 물어보면, 세팅 방법과 예제 코드까지 곧바로 받아볼 수 있습니다. 이로 인해 Docs를 뒤져가며 정보를 찾는 시간이 크게 줄어 개발 생산성이 크게 올라간 것을 느끼고 있습니다. 아마 많은 개발자들이 비슷한 경험을 하고 있다고 생각합니다.

<figure>
<img src="/assets/images/a-new-docs-paradigm-in-the-ai-era/cursor-tailwind-setup.jpg" alt="Cursor에서 Tailwind CSS 세팅 방법 묻는 화면면" />
<figcaption>Cursor에서 Tailwind CSS 세팅 방법 묻는 화면</figcaption>
</figure>

## Docs가 여전히 필요한 이유

AI가 대부분의 질문에 답변할 수 있지만, 여전히 한계가 존재합니다. 그중 대표적인 문제는 최신 정보를 반영하지 못한다는 점입니다. 대부분의 LLM은 학습 시점 이후에 변화된 내용에 대해서는 알지 못합니다. 이를 보완하기 위해 많은 AI 앱은 RAG(Retrieval-Augmented Generation) 기술을 활용해 최신 Docs의 내용을 불러와, 이를 LLM을 통해 가공 후 사용자에게 전달합니다. 그러나 이 방식 또한 AI 앱마다 구현 수준이 달라, 항상 정확한 결과를 기대하긴 어렵습니다.

저는 개발 시 주로 Cursor를 사용합니다. 어느 날 Cursor의 Agent 모드를 통해 "Tailwindcss 세팅 해줘"라고 요청했는데, Cursor Agent는 tailwindcss v4(최신버전)를 설치했는데, 설정은 구버전인 v3 기준으로 설정을 해서 tailwindcss가 정상 작동하지 않았습니다. 당시 Claude 4 Sonnet 모델을 사용하고 있었고, 이는 당시 기준으로 가장 최신 LLM이었습니다. 하지만 해당 모델은 Tailwind v4의 정식 릴리스 이전까지만 학습되어 있었기 때문에, 최신 정보를 정확히 반영하지 못했습니다.

이처럼 LLM은 최신 라이브러리나 툴의 정보를 실시간으로 반영하지 못합니다. 그렇기에 Docs는 여전히 필요합니다. AI가 정확한 답변을 제공하려면, 결국 최신 정보를 담은 Docs를 기반으로 해야 하기 때문입니다.

## 새로운 Docs 패러다임

그렇다면 AI 시대에도 Docs는 기존 방식 그대로 작성하면 될까요? 

Cursor Agent 모드를 통해 tailwindcss를 세팅에 정상적으로 되지 않아 Cursor에게 [TailwindCSS 공식 사이트](https://tailwindcss.com)를 참고하라고 요청했습니다. 해당 페이지는 라이브러리에 대한 개요 수준의 정보만 담고 있었는데, 그래서 그런지 정확한 설정 방법을 여전히 제공받지 못했습니다. 이후 [TailwindCSS 설치 가이드 페이지](https://tailwindcss.com/docs/installation/using-vite)의 URL을 지정해 다시 요청하자, Cursor가 올바르게 Tailwind v4 설정 방법을 안내해주는 것을 확인할 수 있었습니다.

이 경험을 통해, 앞으로 Docs의 형태가 지금과는 달라질 수도 있겠다는 생각이 들었습니다. 과거에는 사람이 정보를 빠르게 찾고 읽기 쉽게 구성하는 것이 중요했다면, 이제는 AI가 이해하고 참조하기 쉬운 형태로 재구성될 필요가 있지 않을까 생각하게 되었습니다. 예를 들면 다음과 같은 방향을 떠올려볼 수 있습니다:

- 여러 페이지에 분산된 구조보다, 단일 페이지에 핵심 정보를 명확하게 모아두는 구성
- JavaScript 기반의 동적 렌더링은 피하고, 정적인 콘텐츠 구조 유지

물론 이건 어디까지나 제 개인적인 관찰과 경험에 기반한 생각입니다. 앞으로 AI와 Docs의 관계가 실제로 어떻게 변화할지는 더 지켜봐야 하겠지만, 문서의 주요 독자가 점점 '사람이 아닌 'AI'가 될 수도 있다는 가능성이 있다고 생각합니다.

## 마치며

이제는 개발자들이 Docs를 찾기보다는 AI에게 질문하는 방식으로 빠르게 변화하고 있습니다. 그렇다고 해서 Docs의 역할이 사라지는 것은 아니라고 생각합니다.
지금까지는 사람이 읽기 쉬운 방식으로 작성되었다면, 앞으로는 AI가 이해하기에 적합한 형태로 Docs가 변화해갈지도 모른다는 생각이 듭니다.