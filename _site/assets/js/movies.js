// /assets/js/movies.js
document.addEventListener('DOMContentLoaded', function () {

  // Find all containers that need a media list
  const allMediaContainers = document.querySelectorAll('.media-container');

  // A function that sets up a single media list inside a given container
  function initializeMediaList(container) {
    // Read the data source from the element's 'data-source' attribute
    const dataSourceKey = container.dataset.source;
    if (!dataSourceKey) {
      console.error('Container is missing a "data-source" attribute.', container);
      return; // Stop if the data source is not specified
    }

    const state = {
      currentPage: 1,
      itemsPerPage: 6,
      totalItems: 0,
      totalPages: 0
    };

    function displayMedia() {
      container.innerHTML = '';

      const allMedia = getMediaFromJekyll(dataSourceKey); // Pass the key
      if (!allMedia) return; // Stop if data is not found

      state.totalItems = allMedia.length;
      state.totalPages = Math.ceil(state.totalItems / state.itemsPerPage);

      const grid = document.createElement('div');
      grid.className = 'movie-grid'; // You can keep the same CSS class
      container.appendChild(grid);

      const paginationContainer = document.createElement('div');
      paginationContainer.className = 'pagination-container';
      container.appendChild(paginationContainer);

      displayCurrentPage(grid, allMedia);
      createPaginationControls(paginationContainer);
    }

    function displayCurrentPage(grid, allMedia) {
      grid.innerHTML = '';
      const startIndex = (state.currentPage - 1) * state.itemsPerPage;
      const endIndex = Math.min(startIndex + state.itemsPerPage, state.totalItems);
      const pageItems = allMedia.slice(startIndex, endIndex);

      pageItems.forEach((item, index) => {
        grid.appendChild(createMediaItem(item, startIndex + index));
      });
    }

    function createPaginationControls(paginationContainer) {
      paginationContainer.innerHTML = '';

      const prev = document.createElement('div');
      prev.className = 'pagination-control' + (state.currentPage === 1 ? ' disabled' : '');
      prev.innerHTML = '&laquo;';
      prev.addEventListener('click', () => {
        if (state.currentPage > 1) {
          state.currentPage--;
          updateDisplay();
        }
      });

      const pageInfo = document.createElement('div');
      pageInfo.className = 'pagination-info';
      pageInfo.textContent = `${state.currentPage} / ${state.totalPages}`;

      const next = document.createElement('div');
      next.className = 'pagination-control' + (state.currentPage === state.totalPages ? ' disabled' : '');
      next.innerHTML = '&raquo;';
      next.addEventListener('click', () => {
        if (state.currentPage < state.totalPages) {
          state.currentPage++;
          updateDisplay();
        }
      });

      paginationContainer.appendChild(prev);
      paginationContainer.appendChild(pageInfo);
      paginationContainer.appendChild(next);
    }
    
    // This function now uses the key to get the correct data array
    function getMediaFromJekyll(key) {
      if (window.siteData && window.siteData[key]) {
        return window.siteData[key].slice().sort((a, b) => {
          const ya = a.year || 0, yb = b.year || 0;
          if (yb !== ya) return yb - ya;
          return (a.title || '').localeCompare(b.title || '');
        });
      }
      console.error(`Data source "${key}" not found in window.siteData.`);
      return null;
    }

    function updateDisplay() {
      const grid = container.querySelector('.movie-grid');
      const paginationContainer = container.querySelector('.pagination-container');
      const allMedia = getMediaFromJekyll(dataSourceKey);
      if (grid && paginationContainer && allMedia) {
        displayCurrentPage(grid, allMedia);
        createPaginationControls(paginationContainer);
      }
    }

    // Renamed from createMovieItem to be generic
    function createMediaItem(item, index) {
      const div = document.createElement('div');
      div.className = 'library-item';
      div.dataset.index = index;
      
      const imageContainer = document.createElement('div');
      imageContainer.className = 'image-container';
      
      const img = document.createElement('img');
      img.alt = `${item.title} (${item.year})`;
      img.loading = 'lazy';
      img.setAttribute('referrerpolicy', 'no-referrer');
      img.onerror = function () { this.onerror = null; this.src = '/assets/img/posters/placeholder.svg'; imageContainer.classList.add('loaded'); img.classList.add('loaded'); };
      img.onload = function () { this.classList.add('loaded'); imageContainer.classList.add('loaded'); };
      img.src = item.poster || item.posterlink || '';
      
      const overlay = document.createElement('div');
      overlay.className = 'movie-overlay'; // Can reuse the same class
      
      const links = [];
      if (item.imdb) links.push(`<a href="${item.imdb}" target="_blank" rel="noopener">IMDb</a>`);
      if (item.rottentomatoes) links.push(`<a href="${item.rottentomatoes}" target="_blank" rel="noopener">Rotten Tomatoes</a>`);
      if (item.link) links.push(`<a href="${item.link}" target="_blank" rel="noopener">Link</a>`);
      
      // Assumes both movies and tvseries have 'director' or a similar field.
      // You can customize this if the fields are different.
      const creator = item.director || item.creator || '';
      
      overlay.innerHTML = `<h3>${item.title || ''}</h3><p class="artist">${creator}</p><p class="year">${item.year || ''}</p>${links.length ? `<div class="listen-button-group">${links.join(' | ')}</div>` : ''}`;
      
      imageContainer.appendChild(img);
      imageContainer.appendChild(overlay);
      div.appendChild(imageContainer);
      return div;
    }

    function handleResize() {
        if (window.innerWidth <= 480) state.itemsPerPage = 4;
        else if (window.innerWidth <= 768) state.itemsPerPage = 8;
        else state.itemsPerPage = 6;
        state.totalPages = Math.ceil(state.totalItems / state.itemsPerPage);
        if (state.currentPage > state.totalPages) state.currentPage = state.totalPages;
        updateDisplay();
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResize, 250);
    });

    // Initialize this specific media list
    displayMedia();
    handleResize();
  }

  // Loop through all containers found and initialize a media list in each one
  allMediaContainers.forEach(container => {
    initializeMediaList(container);
  });
});