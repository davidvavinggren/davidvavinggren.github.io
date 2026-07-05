---
layout: page
permalink: /other/
title: "¯\\_(ツ)_/¯"
nav: false
---

I love lists :^) These are highlights from my [favourite one](https://www.imdb.com/user/ur68403974/ratings/?ref_=hm_nv_rat) (sorted by release date) :)

<div class="media-container" data-source="movies"></div>

<div class="media-container" data-source="tvseries"></div>

<script>
  window.siteData = {
    movies: {{ site.data.movies | jsonify }},
    tvseries: {{ site.data.tvseries | jsonify }}
  };
</script>

<script src="{{ '/assets/js/movies.js' | relative_url }}?v=1"></script>
