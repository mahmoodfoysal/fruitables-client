<script>
import axios from 'axios';
import ProductCard from '../ProductCard/ProductCard.vue';

export default {
    name: 'Products',
    components: {
        ProductCard
    },
    data() {
        return {
            categoryData: [],
            productsData: [],
            filterData: [],
            catId: 0,
        }
    },
    mounted() {
        this.loadCategory();
        this.loadProducts().then(() => {
        this.filterProducts(); // Call filterProducts after loading products
    });
    },
    watch: {
        catId: 'filterProducts'
    },
    methods: {
        async loadCategory() {
            try {
                const result = await axios.get('http://localhost:3000/category');
                this.categoryData = result.data;
                console.log(result.data);
            } catch (error) {

            }
        },
        async loadProducts() {
            try {
                const result = await axios.get('http://localhost:3000/products');
                this.productsData = result.data;
                console.log(result.data);
            } catch (error) {

            }
        },
        handleChangeTab(id) {
            this.catId = parseInt(id);
            console.log('Category', id);
        },
        filterProducts() {
            if (this.catId === 0) {
                this.filterData = this.productsData;
            } else {
                this.filterData = this.productsData.filter(product => product?.cat_id === this.catId);
            }
            console.log('Filtered products:', this.filterData);
        }
    }
}
</script>

<template>
    <!-- Fruits Shop Start-->
    <div class="container-fluid fruite py-5">
        <div class="container py-5">
            <div class="tab-class text-center">
                <div class="row g-4">
                    <div class="col-lg-4 text-start">
                        <h1>Our Organic Products</h1>
                    </div>
                    <div class="col-lg-8 text-end">
                        <ul class="nav nav-pills d-inline-flex text-center mb-5">
                            <li v-for="(category, index) in categoryData" :key="index" class="nav-item"
                                @click="handleChangeTab(category?.cat_id)">
                                <a class="d-flex m-2 py-2 bg-light rounded-pill" data-bs-toggle="pill" href="#tab-3">
                                    <span class="text-dark" style="width: 130px;">{{ category?.cat_name }}</span>
                                </a>
                            </li>

                        </ul>
                    </div>
                </div>
                <div class="tab-content">
                    <div id="tab-1" class="tab-pane fade show p-0 active">
                        <div class="row g-4">
                            <div class="col-lg-12">
                                <div class="row g-4">
                                    <div v-for="(product, index) in filterData" :key="index"
                                        class="col-md-6 col-lg-4 col-xl-3">
                                        <ProductCard :product="product"></ProductCard>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Fruits Shop End-->
</template>

<style scoped></style>