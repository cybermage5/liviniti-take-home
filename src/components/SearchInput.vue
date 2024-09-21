<template>
    <div class="search-input">
        <input type="text" :value="query" @input="$emit('update:query', $event.target.value)" placeholder="Title" />
        <input type="number" :value="year" @input="$emit('update:year', $event.target.value)" placeholder="Year" />
        <select :value="type" @change="$emit('update:type', $event.target.value)">
            <option value="">All</option>
            <option v-for="t in allTypes" :key="t" :value="t">
                {{ t.charAt(0).toUpperCase() + t.slice(1) }} <!-- Capitalize the first letter -->
            </option>
        </select>
        <button @click="onSearch" id="search-button">Search</button>
    </div>
</template>

<script>
export default {
    props: {
        query: {
            type: String,
            required: true
        },
        year: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        allTypes: {
            type: Array,
            required: true
        }
    },
    emits: ['update:query', 'update:year', 'update:type', 'search'],
    methods: {
        onSearch() {
            this.$emit('search');
        }
    }
};
</script>

<style scoped>
.search-input {
    margin-bottom: 20px;
}

input,
select {
    padding: 10px;
    margin-right: 10px;
}

button {
    padding: 10px 20px;
}
</style>