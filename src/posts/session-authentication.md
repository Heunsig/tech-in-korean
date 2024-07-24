---
layout: "base.njk"
title: Session 기반 인증 방식 (Session Authentication)
date: 2024-07-23
wip: true
---

웹 애플리케이션에서 사용자 인증(Authentication)은 필수적인 보안 절차입니다.
사용자의 신원을 확인하고 인가(Authorization)된 사용자에게만 서비스를 제공하기 위해 사용자 인증인 필수 입니다.
웹 애플리케이션에서 사용자 인증을 구현하는 방법은 여러가지가 있지만, 가장 대표적인 방법 중 하나가 Session 기반 인증 방식입니다.

이 글에서는 세션 기반 인증의 기본 개념부터 시작하여, 세션 기반 인증의 장단점과 보안 이슈에 대해 알아보겠습니다.
