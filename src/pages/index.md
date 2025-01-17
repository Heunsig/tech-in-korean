---
title: Tech in Korean
layout: "main.njk"
permalink: "/"
---

<!-- {% set posts = collections.posts | safe %} -->

<!-- {{ posts }} -->

{% set sortedItems = collections.posts | filterWIP | sortByDate %}
<ul>
  {% for item in sortedItems %}<li><a href="{{ item.url }}">{{ item.data.title }}</a><span class="text-xs text-gray-500 ml-2">{{ item.date | dateFilter }}</span></li>{% endfor %}
</ul>