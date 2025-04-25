---
layout: "base.njk"
title: Vibe Coding
date: 2025-04-24
---

## Vibe Coding 이란?

Vibe coding은 전통적인 코딩과 달리, 사람이 직접 타이핑을 하면서 코딩하는 것이 아닌 AI의 능력에 의존해 개발을 진행하는 새로운 방식입니다.
그래서 논리적인 구조나 코드 품질보다는 감각, 직관, 그냥 느낌대로 만들고 싶은 내용을 AI에게 전달하면, AI가 알아서 코드를 생성해주는 식입니다.

## Vibe Coding의 시작

Vibe Coding은 2025년 2월 테슬라 AI 디렉터 출신이자 OpenAI 창립 멤버인 Andrej Karpathy의 트윗에서 시작했습니다.

<figure>
<img src="/assets/images/vibe-coding/andrej-karpathy.png" alt="Andrej karpathy's tweet"/>
<figcaption>Andrej karpathy's tweet</figcaption>
</figure>

나는 이걸 "바이브 코딩(vibe coding)"이라고 부르는데, 그냥 완전히 감(感)에 맡기고, 지수 함수 같은 것도 아무렇지 않게 쓰고, 코드가 존재한다는 사실조차 잊은 채로 작업해. 요즘 LLM들(Cursor Composer + Sonnet 같은)이 너무 잘해서 가능한 일이야.

나는 거의 키보드도 안 써. SuperWhisper로 Composer한테 말로만 시켜. 예를 들면 "사이드바 패딩 절반으로 줄여줘" 같은 아주 단순한 요청도 그냥 말해버려. 직접 찾아보긴 귀찮거든. 변경사항은 무조건 "모두 수락" 누르고, diff는 안 읽어. 에러 메시지 뜨면 그냥 아무 말 없이 복붙해서 넣어, 보통은 그걸로 해결돼.

코드는 점점 내 이해 범위를 넘어서 자라나고, 제대로 이해하려면 꽤 읽어야 해. 가끔 LLM이 버그를 못 고치면, 그냥 우회해서 해결하거나 대충 뭔가 다른 걸 시켜보다 보면 사라지기도 해.

주말에 잠깐 해보는 실험용 프로젝트들에는 이 정도도 괜찮아. 진짜 코딩이라기보단, 뭔가 눈에 보이는 걸 따라 말하고, 돌리고, 복붙하고… 그런데 또 그게 제법 잘 돌아가. 좀 웃기긴 해도.

## Vibe Coding에 대한 글귀

아래의 글귀들은 [Vibe Coding Is The Future](https://youtu.be/IACHfKmZMr8?si=fVM3EVIjchOWeLuY) 에서 가져왔습니다.

> I think the role of Software Engineer will transition to Product Engineer. Human taste is now more important than ever as codegen tools make everyone a 10x engineer.

> (소프트웨어 엔지니어의 역할은 Product Engineer로 전환될 것입니다. 사람들의 취향은 더욱 중요해지고 있으며, 코드 생성 도구가 10x 생산성의 엔지니어를 만들기 때문에 가능합니다.) - Leo Paz(Outlit, W25)

> I don't write code much, I just think and review. (나는 코드를 많이 작성하지 않아. 그냥 생각하고 검토해.) - Abhi Aiyer(Mastra, W25)

> I am far less attached to my code so my decisions when we decide to scrap or refactor code is less biased now. Since I can code 3x faster, it's easy for me to scrap and rewrite if I need to. (이제는 제 코드에 덜 집착하게 돼서, 코드를 버리거나 리팩터링해야할 때를 더 객관적으로 판단할 수 있어. 왜냐하면 코딩 속도가 3배는 빨라졌기 때문에 버리고 다시 짜는건 어렵지 않기 때문이야.) - Abhi Balijepalli (CopyCat, W25)

> I write everything with Cursor. Somethimes I even have 2 windows of Cursor open in parallel and I prompt them on 2 different features. (나는 모든 것을 Cursor로 작성해. 가끔은 2개의 Cursor 창을 동시에 열고, 2개의 다른 기능에 대해 프롬프트를 보내기도 해.) - Yoav Tamir(Casixty, W25)

> How coding has changed 6-1 months ago: 10x speedup. 1 month ago to now: 100x speedup. Exponential acceleration. I'm no longer an enginner. I'm a product person. (6개월 전부터 1개월 전까지는 코딩 속도가 10배 빨라졌고, 지난 한 달 사이엔 100배까지 빨라졌어. 기하급수적으로 빨라졌어. 이제 나는 더 이상 엔지니어가 아니라, 프로덕트를 만드는 사람이야.) - Jackson Stokes(Trainloop, W25)

> I believe that backend developers will increasingly focus on infrastructure, while frontend developers will take on more of a product manager role. (백엔드 개발자는 인프라에 더 집중할 것이고, 프론트엔드 개발자는 더 많은 프로덕트 매니저 역할을 맡을 것이라고 생각해.) - Garry Tan(Y Combinator CEO)

