---
title: Tech in Korea
layout: "main.njk"
permalink: "/"
---

<!-- {% set posts = collections.posts | safe %} -->

<!-- {{ posts }} -->

{% set sortedItems = collections.posts | filterWIP | sortByDate %}
<ul>
  {% for item in sortedItems %}<li><a href="{{ item.url }}">{{ item.data.title }}</a></li>{% endfor %}
</ul>