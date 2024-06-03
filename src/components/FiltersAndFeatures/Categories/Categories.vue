<script>
import axios from 'axios';

export default {
    name: 'Categories',
    data() {
        return {
            categoriesData: [],
            productsData: []
        }
    },
    mounted() {
        this.loadCategories();
        this.loadProducts();
    },
    methods: {
        async loadCategories() {
            try {
                const result = await axios.get('https://fruitable.onrender.com/category');
                this.categoriesData = result.data;
            } catch (error) {
                console.error('Error loading categories:', error);
            }
        },
        async loadProducts() {
            try {
                const result = await axios.get('https://fruitable.onrender.com/products');
                this.productsData = result.data;
            } catch (error) {
                console.error('Error loading products:', error);
            }
        },
        getCategoryProductLength(categoryId) {
            if (!this.productsData) {
                return 0; // Return 0 if products data is not available yet
            }
            const filteredProducts = this.productsData.filter(product => product.cat_id === categoryId);
            // If no products match the given category ID, return the length of the full products array
            return filteredProducts.length > 0 ? filteredProducts.length : this.productsData.length;
        },
        handleSpecificCategory(id) {
            this.$emit('handle-specific-category', id);
        }
    },
    computed: {
        categoryProductLength() {
            return this.categoriesData.map(category => {
                const productsInCategory = this.productsData.filter(product => product.cat_id === category.cat_id);
                return {
                    categoryId: category.cat_id,
                    productLength: productsInCategory.length
                };
            });
        }
    }
}
</script>

<template>
    <div>
        <h4>Categories</h4>
        <section v-if="categoriesData.length === 0" class="d-flex justify-content-center" role="status">
        <div class="spinner-grow text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-success" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-danger" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-warning" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-info" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-light" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div class="spinner-grow text-dark" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </section>
        <ul class="list-unstyled fruite-categorie">
            <li>
                <div
                v-for="(category, index) in categoriesData" 
                :key="index"
                @click="handleSpecificCategory(category.cat_id)"
                    class="d-flex justify-content-between fruite-name category-text-style">
                    <a href="#"><i class="fas fa-apple-alt me-2"></i>{{ category?.cat_name }}</a>
                    <span>({{ getCategoryProductLength(category.cat_id) }})</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.category-text-style {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}
</style>