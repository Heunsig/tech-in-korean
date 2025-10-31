---
title: Tech in Korean
layout: "main.njk"
permalink: "/"
---

<!-- {% set posts = collections.posts | safe %} -->

<!-- {{ posts }} -->

{% set sortedItems = collections.posts | filterWIP | sortByDate %}
<ul class="list-none not-prose pl-1">
  {% for item in sortedItems %}<li class="my-3"><div class="flex items-end gap-2"><a href="{{ item.url }}" class="inline-block">{% if item.data.originUrl and item.data.originTitle %}[번역] {% endif %}{{ item.data.title }}</a><span class="inline-block text-xs text-gray-500 pb-0.5">{{ item.date | dateFilter }}</span></div></li>{% endfor %}
</ul>