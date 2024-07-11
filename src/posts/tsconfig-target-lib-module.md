---
layout: "base.njk"
title: tsconfig.json에서 Target, Lib, Module란?
date: 2024-07-11
---

TypeScript를 사용할 때, 항상 접하게 되는 파일 중 하나가 `tsconfig.json`입니다. 이 파일은 TypeScript 컴파일러에게 프로젝트의 설정을 정의해주는 역할을 합니다.
이 글에서는 `tsconfig.json`의 여러 설정 중에 `target`, `lib`, `module`에 대해 알아보겠습니다.

## TypeScript가 작동하는 방식
`target`, `lib`, `module`을 이해하기 위해서는 TypeScript가 어떻게 동작하는지 알아야 합니다. TypeScript는 사실 Node나 브라우저가 이해하지 못합니다. 그래서 TypeScript를 동작시키기 위해서는 TypeScript 코드를 JavaScript 코드로 변환해주는 작업이 필요합니다. 이 작업을 TypeScript 컴파일러가 수행합니다. 이때 TypeScript 컴파일러가 TypeScript 코드를 어떻게 JavaScript 코드로 변환시킬 지 설정하는 곳이 바로 `tsconfig.json`입니다.