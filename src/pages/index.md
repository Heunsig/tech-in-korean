---
title: Tech in Korean
layout: "main.njk"
permalink: "/"
---

<!-- {% set posts = collections.posts | safe %} -->

<!-- {{ posts }} -->

{% set sortedItems = collections.posts | filterWIP | sortByDate %}
<ul class="list-none">
  {% for item in sortedItems %}<li><a href="{{ item.url }}">{% if item.data.originUrl and item.data.originTitle %}[번역] {% endif %}{{ item.data.title }}</a><span class="ml-2 text-xs text-gray-500">{{ item.date | dateFilter }}</span></li>{% endfor %}
</ul>