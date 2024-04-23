<script>
import axios from 'axios';

export default {
    name: 'Categories',
    data() {
        return {
            categoriesData: null,
            productsData: null
        }
    },
    mounted() {
        this.loadCategories();
        this.loadProducts();
    },
    methods: {
        async loadCategories() {
            try {
                const result = await axios.get('http://localhost:3000/category');
                this.categoriesData = result.data;
            } catch (error) {
                console.error('Error loading categories:', error);
            }
        },
        async loadProducts() {
            try {
                const result = await axios.get('http://localhost:3000/products');
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
        <ul class="list-unstyled fruite-categorie">
            <li>
                <div 
                v-for="(category, index) in categoriesData" 
                :key="index"
                @click="handleSpecificCategory(category.cat_id)"
                    class="d-flex justify-content-between fruite-name">
                    <a href="#"><i class="fas fa-apple-alt me-2"></i>{{ category?.cat_name }}</a>
                    <span>({{ getCategoryProductLength(category.cat_id) }})</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped></style>