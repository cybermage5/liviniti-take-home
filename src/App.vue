<template>
  <div id="main" @scroll="handleScroll">
    <h1>Movie Search</h1>

    <!-- Search Input Component -->
    <SearchInput v-model:query="searchQuery" v-model:year="searchYear" v-model:type="searchType" :allTypes="allTypes"
      @search="searchMovies" />

    <h3 v-if="totalResults !== null">Total Results: {{ totalResults }}</h3>

    <!-- Movie List Component -->
    <MovieList :movies="movies" :error="error" />

    <div v-if="loading" class="loading">Loading...</div>
  </div>
</template>

<script>
import SearchInput from './components/SearchInput.vue';
import MovieList from './components/MovieList.vue';
import axios from 'axios';

export default {
  components: {
    SearchInput,
    MovieList
  },
  data() {
    return {
      searchQuery: '',
      searchYear: '',
      searchType: '',
      movies: [],
      allTypes: ['movie', 'series', 'episode'],
      error: '',
      currentPage: 1,
      totalResults: null,
      totalPages: 0,
      loading: false,
    };
  },
  methods: {
    async searchMovies(page = 1) {
      // Validation for the query
      if (!this.searchQuery || this.searchQuery.trim() === '') {
        this.error = 'Please enter a search term.';
        return;
      }

      // Validation for the year (if it's provided)
      const currentYear = new Date().getFullYear();
      if (this.searchYear && (isNaN(this.searchYear) || this.searchYear < 1800 || this.searchYear > currentYear)) {
        this.error = `Please enter a valid year between 1800 and ${currentYear}.`;
        return;
      }

      this.loading = true; // Start loading indicator

      const apiUrl = process.env.VUE_APP_OMDB_API_URL;
      const apiKey = process.env.VUE_APP_OMDB_API_KEY;
      const url = `${apiUrl}?s=${this.searchQuery}&page=${page}&apikey=${apiKey}&y=${this.searchYear}&type=${this.searchType}`;

      try {
        const response = await axios.get(url);
        if (response.data.Response === 'True') {
          if (page === 1) {
            this.movies = response.data.Search; // Replace movies when new search happens
          } else {
            this.movies = [...this.movies, ...response.data.Search]; // Append movies for infinite scrolling
          }
          this.totalResults = parseInt(response.data.totalResults, 10);
          this.totalPages = Math.ceil(this.totalResults / 10);
          this.currentPage = page;
          this.error = '';

          // Wait for DOM to update, then check if content height is sufficient
          this.$nextTick(() => {
            this.trackImagesLoaded();
          });
        } else {
          this.error = response.data.Error;
          if (page === 1) {
            this.totalResults = 0;
            this.movies = []; // Clear movies on a new search
          }
        }
      } catch (error) {
        this.error = 'Something went wrong. Please try again later.';
      } finally {
        this.loading = false; // Stop loading indicator        
      }
    },

    trackImagesLoaded() {
      // Track if all images are loaded
      const images = document.querySelectorAll('#main img'); // Select all images within the main container
      let loadedImagesCount = 0;
      const totalImages = images.length;

      if (totalImages === 0) {
        // If no images, directly check visible content gaps
        this.checkVisibleContentGaps();
        return;
      }

      images.forEach((img) => {
        if (img.complete) {
          loadedImagesCount++;
        } else {
          img.addEventListener('load', () => {
            loadedImagesCount++;
            if (loadedImagesCount === totalImages) {
              this.checkVisibleContentGaps(); // Call gap check when all images are loaded
            }
          });
          img.addEventListener('error', () => {
            loadedImagesCount++; // Count failed images as loaded
            if (loadedImagesCount === totalImages) {
              this.checkVisibleContentGaps();
            }
          });
        }
      });

      // If all images are already loaded (cached), call checkVisibleContentGaps immediately
      if (loadedImagesCount === totalImages) {
        this.checkVisibleContentGaps();
      }
    },

    checkVisibleContentGaps() {
      // Check if content height or incomplete row requires loading more, but only if visible part has gaps
      const contentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      // Calculate if the last row is incomplete by checking the number of columns that fit in a row
      const movieCards = document.querySelectorAll('.movie-card');

      if (!document.querySelector('.movies')) {
        return;
      }

      const containerWidth = document.querySelector('.movies').offsetWidth;
      const movieCardWidth = movieCards[0]?.offsetWidth || 0;

      // Calculate how many columns can fit in one row
      const itemsPerRow = Math.floor(containerWidth / movieCardWidth);
      const lastRowItems = movieCards.length % itemsPerRow;

      // Only fill gaps if the content height is less than the window height and there are gaps in the visible rows
      const scrollThreshold = 300;
      if (contentHeight <= windowHeight + scrollThreshold && lastRowItems !== 0 && this.currentPage < this.totalPages) {
        this.searchMovies(this.currentPage + 1);
      }
    },

    handleScroll() {
      const scrollThreshold = 100;
      const bottomOfWindow = window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - scrollThreshold;
      // Trigger load more movies when reaching the bottom of the page
      if (bottomOfWindow && !this.loading && this.currentPage < this.totalPages) {
        this.searchMovies(this.currentPage + 1); // Load next page when scrolled to the bottom
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style>
body {
  margin: 0;
}

#main {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  overflow: auto;
  padding-bottom: 24px;
}

.loading {
  margin-top: 20px;
  font-size: 18px;
  color: #666;
}
</style>