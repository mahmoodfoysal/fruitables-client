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
            page: 1,
            itemsPerPage: 8,
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
    computed: {
        isActive() {
            //   return this.catId === 0;  // Check if catId is equal to 0
        }
    },
    methods: {
        async loadCategory() {
            try {
                const result = await axios.get('http://localhost:3000/category');
                this.categoryData = result.data;
                // console.log(result.data);
            } catch (error) {

            }
        },
        async loadProducts() {
            try {
                const result = await axios.get('http://localhost:3000/products');
                const shuffledProducts = this.shuffleArray(result.data); // Shuffle the array
                this.productsData = shuffledProducts;
                this.filterProducts();
            }
            catch (error) {
                console.error('Error loading products:', error);
            }
        },
        shuffleArray(array) {
            // Fisher-Yates (aka Knuth) Shuffle Algorithm
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        },
        handleChangeTab(id) {
            this.catId = parseInt(id);
            // console.log('Category', id);
        },
        filterProducts() {
            if (this.catId === 0) {
                this.filterData = this.productsData;
            } else {
                this.filterData = this.productsData.filter(product => product?.cat_id === this.catId);
            }
            // console.log('Filtered products:', this.filterData);
        },
        goToPage(newPage) {
            if (newPage >= 1 && newPage <= this.totalPages) {
                this.page = newPage;
            }
        }
    },
    computed: {
        totalPages() {
            return Math.ceil(this.filterData.length / this.itemsPerPage);
        },
        paginatedProducts() {
            const startIndex = (this.page - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.filterData.slice(startIndex, endIndex);
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
                                <a :class="{ 'active': isActive }" class="d-flex m-2 py-2 bg-light rounded-pill"
                                    data-bs-toggle="pill" href="#tab-3">
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
                                    <div v-for="(product, index) in paginatedProducts" :key="index"
                                        class="col-md-6 col-lg-4 col-xl-3">
                                        <ProductCard :product="product"></ProductCard>
                                    </div>
                                </div>
                                <!-- pagination start  -->
                                <div class="pagination-style mt-3">
                                    <nav aria-label="Page navigation example">
                                        <ul class="pagination">
                                            <li @click="goToPage(page - 1)" :disabled="page === 1" class="page-item">
                                                <a class="page-link" href="#" aria-label="Previous">
                                                    <span aria-hidden="true">&laquo;</span>
                                                </a>
                                            </li>
                                            <li @click="goToPage(1)" :disabled="page === 1" class="page-item"><a
                                                    class="page-link" href="#">1</a>
                                            </li>
                                            <li @click="goToPage(2)" :disabled="page === 2" class="page-item"><a
                                                    class="page-link" href="#">2</a>
                                            </li>
                                            <li @click="goToPage(3)" :disabled="page === 3" class="page-item"><a
                                                    class="page-link" href="#">3</a>
                                            </li>
                                            <li @click="goToPage(page + 1)" :disabled="page === totalPages"
                                                class="page-item">
                                                <a class="page-link" href="#" aria-label="Next">
                                                    <span aria-hidden="true">&raquo;</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                                <!-- pagination end  -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Fruits Shop End-->
</template>

<style scoped>
.pagination-style {
    display: flex;
    justify-content: center;
}
</style>