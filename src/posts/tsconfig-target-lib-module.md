---
layout: "base.njk"
title: tsconfig.json에서 Target, Lib, Module란?
date: 2024-07-11
---

TypeScript를 사용할 때 자주 보게 되는 파일 중 하나가 tsconfig.json입니다.
이 파일은 TypeScript 프로젝트를 원활하게 진행하기 위한 설정 파일로, TypeScript를 어떻게 동작시키고 JavaScript로 어떻게 컴파일할지 정의합니다.
특히, TypeScript를 JavaScript로 컴파일할 때 어떤 버전으로 변환할지 결정하는 설정으로 `target`, `lib`, `module`가 있습니다.
이 글에서는 `tsconfig.json`의 여러 설정 중 `target`, `lib`, `module`에 대해 자세히 알아보겠습니다.

## TypeScript가 작동하는 방식

`target`, `lib`, `module`을 이해하려면 먼저 TypeScript가 어떻게 작동하는지 알아야 합니다.

TypeScript는 브라우저나 Node.js에서 직접 실행할 수 없기 때문에, TypeScript 코드를 JavaScript로 변환해야 합니다.
이 변환 작업을 하는 것이 바로 TypeScript 컴파일러입니다.

TypeScript 코드를 JavaScript로 변환할 때, 어떤 버전의 JavaScript로 변환할지, 하위 호환성을 어떻게 유지할지 등 여러 가지 설정을 할 수 있습니다.
이 설정들은 `tsconfig.json` 파일의 `compilerOptions` 섹션에 정의됩니다.

TypeScript 컴파일러는 `compilerOptions`의 설정을 기반으로 TypeScript 코드를 JavaScript 코드로 변환하고, 변환된 JavaScript 코드는 브라우저나 Node.js에서 실행할 수 있습니다.
<figure>
<img src="/assets/images/tsconfig-target-lib-module/how-ts-works.png" alt="How TypeScript Works" />
<figcaption>TypeScript 코드는 TypeScript 컴파일러에 의해 JavaScript로 변환된 후, 브라우저와 Node.js에서 실행될 수 있습니다.</figcaption>
</figure>

