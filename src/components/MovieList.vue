<template>
    <div>
        <div v-if="movies.length > 0" class="movies">
            <div v-for="movie in movies" :key="movie.imdbID" class="movie-card">
                <img :src="movie.Poster" alt="Movie Poster" v-if="movie.Poster !== 'N/A'" />
                <h3>{{ movie.Title }}</h3>
                <p>{{ movie.Year }}</p>
            </div>
        </div>
        <div v-if="error" class="error">{{ error }}</div>
    </div>
</template>

<script>
export default {
    props: {
        movies: {
            type: Array,
            required: true
        },
        error: {
            type: String,
            default: ''
        }
    }
};
</script>

<style scoped>
.movies {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    justify-content: center;
    gap: 20px;
}

.movie-card {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
}

img {
    max-width: 100%;
}

.error {
    color: red;
    margin-top: 20px;
}
</style>