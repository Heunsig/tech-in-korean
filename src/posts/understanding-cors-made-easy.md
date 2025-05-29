---
layout: "base.njk"
title: "Understanding CORS Made Easy"
date: 2025-05-29
wip: true
---

프론트엔드 개발을 하다 보면 다음과 같은 에러 메시지를 한 번쯤 보신 적 있을 겁니다.
`Access to fetch at ... from origin ... has been blocked by CORS policy...`

바로 CORS 에러인데요. 프론트엔드 개발 시 자주 마주치는 에러 중 하나입니다.
그때그때 구글링해서 해결하긴 하지만, 사실 CORS가 정확히 무엇인지, 왜 발생하는지, 어떻게 동작하는지는 잘 모르는 경우가 많습니다.

이번 글에서는 CORS를 이해하기 쉽게 차근차근 설명드리겠습니다.
