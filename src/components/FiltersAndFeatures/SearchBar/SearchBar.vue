<script>
export default {
    name: 'SearchBar'
}
</script>

<template>
    <div class="input-group w-100 mx-auto d-flex search-div-style">
        <input type="search" class="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1">
        <span id="search-icon-1" class="input-group-text p-3"><i class="fa fa-search"></i></span>
    </div>
</template>

<style scoped>
.search-div-style {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}
.search-div-style span {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}
</style>