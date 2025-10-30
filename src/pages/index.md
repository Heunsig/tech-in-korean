---
title: Tech in Korean
layout: "main.njk"
permalink: "/"
---

<!-- {% set posts = collections.posts | safe %} -->

<!-- {{ posts }} -->

{% set sortedItems = collections.posts | filterWIP | sortByDate %}
<ul class="list-none not-prose pl-1">
  {% for item in sortedItems %}<li class="my-3"><div><a href="{{ item.url }}" class="inline-block">{% if item.data.originUrl and item.data.originTitle %}[번역] {% endif %}{{ item.data.title }}</a><div class="mt-1 text-xs text-gray-500"><span>{{ item.date | dateFilter }}</span></div></li>{% endfor %}
</ul>