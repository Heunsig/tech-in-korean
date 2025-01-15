---
layout: "base.njk"
title: VSCode에서 <script>와 <template> 나란히 편집하기
date: 2025-01-15
---


Vue SFC(Single File Components)를 작업할 때, 코드가 길어지면 `<script>`와 `<template>` 섹션을 동시에 보기 어려워 스크롤을 반복해야 하는 불편함이 생기곤 합니다.

이 문제를 해결하려면 VSCode에서 Vue - Official 확장의 `Vue: Split <script>, <template>, <style> Editors` 기능을 활용할 수 있습니다. 이 기능을 사용하면 `<script>`와 `<template>` 섹션을 같은 화면에서 나란히 보며 작업할 수 있습니다.

<figure>
<img src="/assets/images/side-by-side-script-and-template-editing-in-vscode/01.png" alt="vscode command image" />
<figcaption>VSCode에서 F1을 누르고 "Vue: Split &lt;script&gt;, &lt;template&gt;, &lt;style&gt; Editors"를 검색해보세요.</figcaption>
</figure>

<figure>
<img src="/assets/images/side-by-side-script-and-template-editing-in-vscode/02.png" alt="vscode split editor image" />
<figcaption>좌측에는 &lt;script&gt; 섹션이, 우측에는 &lt;template&gt; 섹션이 나란히 표시됩니다.</figcaption>
</figure>