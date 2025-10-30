---
title: Tech in Korean
layout: "main.njk"
permalink: "/"
---

<!-- {% set posts = collections.posts | safe %} -->

<!-- {{ posts }} -->

{% set sortedItems = collections.posts | filterWIP | sortByDate %}
<ul class="list-none not-prose">
  {% for item in sortedItems %}<li class="my-3"><div><a href="{{ item.url }}" class="block font-semibold">{% if item.data.originUrl and item.data.originTitle %}[번역] {% endif %}{{ item.data.title }}</a><div class="mt-1 text-xs text-gray-500"><span>{{ item.date | dateFilter }}</span></div></li>{% endfor %}
</ul>