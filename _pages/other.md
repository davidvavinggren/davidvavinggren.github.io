---
title: "¯&#92;&#95;(ツ)&#95;/¯"
permalink: /other/
layout: single
---

<div style="margin-top: 2rem;"></div>

I love lists :^) These are my favourites from my [favourite one](https://www.imdb.com/user/ur68403974/ratings/?ref_=hm_nv_rat) :^)

<div class="media-container" data-source="movies"></div>

<div class="media-container" data-source="tvseries"></div>

<script>
  window.siteData = {
    movies: {{ site.data.movies | jsonify }},
    tvseries: {{ site.data.tvseries | jsonify }}
  };
</script>

<script src="/assets/js/movies.js?v=1"></script>