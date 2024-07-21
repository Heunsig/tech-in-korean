---
layout: "base.njk"
title: tsconfig.json에서 Target, Lib, Module란?
date: 2024-07-11
wip: true
---

TypeScript 프로젝트에서는 일반적으로 `tsconfig.json` 파일이 포함됩니다.
이 파일은 TypeScript 설정 파일로서, TypeScript 컴파일러의 동작 방식과 JavaScript로의 컴파일 방식을 정의합니다.
특히, TypeScript를 JavaScript로 컴파일할 때, 변환할 JavaScript의 버전을 결정하는 설정으로 `module`, `target`, `lib` 옵션이 있습니다.
이 글에서는 `tsconfig.json` 파일의 여러 설정 중 `module`, `target`, `lib` 옵션에 대해 알아보겠습니다.

## TypeScript가 작동하는 방식

`module`, `target`, `lib` 옵션을 이해하려면 먼저 TypeScript의 작동 방식을 알아야 합니다.

TypeScript는 브라우저나 Node.js에서 직접 실행할 수 없기 때문에, TypeScript 코드를 JavaScript로 변환해야 합니다.
이 변환 작업은 TypeScript 컴파일러가 수행합니다.

TypeScript 코드를 JavaScript로 변환할 때, 어떤 버전의 JavaScript로 변환할지, 하위 호환성을 어떻게 유지할지 등의 다양한 설정을 할 수 있습니다.
이러한 설정들은 `tsconfig.json` 파일의 `compilerOptions` 섹션에 정의됩니다.

TypeScript 컴파일러는 `compilerOptions`에 정의된 설정을 기반으로 TypeScript 코드를 JavaScript 코드로 변환하며, 변환된 JavaScript 코드는 브라우저나 Node.js에서 실행될 수 있습니다.
<figure>
<img src="/assets/images/tsconfig-target-lib-module/how-ts-works.png" alt="How TypeScript Works" />
<figcaption>TypeScript 코드는 TypeScript 컴파일러에 의해 JavaScript로 변환된 후, 브라우저와 Node.js에서 실행될 수 있습니다.</figcaption>
</figure>

## Module

