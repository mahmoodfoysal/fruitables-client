<script>
import axios from 'axios';
import ProductCard from '../pages/ProductCard/ProductCard.vue';
import SearchBar from '../FiltersAndFeatures/SearchBar/SearchBar.vue';
import Categories from '../FiltersAndFeatures/Categories/Categories.vue';
import PriceFilter from '../FiltersAndFeatures/PriceFilter/PriceFilter.vue';
import Additional from '../FiltersAndFeatures/Additional/Additional.vue';
import FeaturedProducts from '../FiltersAndFeatures/FeaturedProducts/FeaturedProducts.vue';
import PromotionalBanner from '../FiltersAndFeatures/PromotionalBanner/PromotionalBanner.vue';

export default {
    name: 'Shop',
    data() {
        return {
            productsData: [],
            filterData: [],
            searchKey: '',
            catID: 0,
            page: 1,
            itemsPerPage: 8,
            priceRange: { min: 0, max: Infinity } // Added priceRange data property
        }
    },
    components: {
        ProductCard,
        SearchBar,
        Categories,
        PriceFilter,
        Additional,
        FeaturedProducts,
        PromotionalBanner

    },
    mounted() {
        this.loadProducts();
    },
    methods: {
        async loadProducts() {
            try {
                const result = await axios.get('https://fruitable.onrender.com/products');
                const shuffledProducts = this.shuffleArray(result.data); // Shuffle the array
                this.productsData = shuffledProducts;
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
        handleSpecificCategory(id) {
            this.catID = parseInt(id);
        },
        handlePriceRange(range) {
            this.priceRange = range; // Update priceRange
        },
        goToPage(newPage) {
            if (newPage >= 1 && newPage <= this.totalPages) {
                this.page = newPage;
            }
        },
        handleSearchValue(searchValue) {
            console.log(searchValue);
            this.searchKey = searchValue;
        }
    },
    computed: {
        totalPages() {
            return Math.ceil(this.filterData.length / this.itemsPerPage);
        },
        paginatedProducts() {
            let filtered = this.productsData;

            if (this.catID !== 0) {
                filtered = filtered.filter(product => product.cat_id === this.catID);
            }

            if (this.priceRange.min < this.priceRange.max) {
                filtered = filtered.filter((product) => product.pro_price >= this.priceRange.min && product.pro_price <= this.priceRange.max);
            }

            if (this.searchKey.length > 0) {
                const searchKeyword = this.searchKey.toLocaleLowerCase();
                filtered = filtered.filter(product => product.pro_name.toLowerCase().includes(searchKeyword))
            }

            const startIndex = (this.page - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return filtered.slice(startIndex, endIndex);
        }
    }
}
</script>

<template>
    <!-- Single Page Header start -->
    <div class="container-fluid page-header py-5 comp-intro-style">
        <h1 class="text-center text-white display-6">Shop</h1>
        <ol class="breadcrumb justify-content-center mb-0">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item"><a href="#">Pages</a></li>
            <li class="breadcrumb-item active text-white">Shop</li>
        </ol>
    </div>
    <!-- Single Page Header End -->

    <!-- loader  -->
    <section v-if="productsData.length === 0" class="d-flex justify-content-center mt-5" role="status">
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

    <!-- Fruits Shop Start-->
    <div v-else class="container-fluid fruite py-5">
        <div class="container py-5 container-style">
            <h1 class="mb-4">Fresh fruits shop</h1>
            <div class="row g-4">
                <div class="col-lg-12">
                    <div class="row g-4">
                        <div class="col-xl-3">
                            <SearchBar @search-value="handleSearchValue"></SearchBar>
                        </div>
                        <div class="col-6"></div>
                        <div class="col-xl-3">
                            <div class="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4 sorting-style">
                                <label for="fruits">Default Sorting:</label>
                                <select id="fruits" name="fruitlist" class="border-0 form-select-sm bg-light me-3"
                                    form="fruitform">
                                    <option value="volvo">Nothing</option>
                                    <option value="saab">Popularity</option>
                                    <option value="opel">Organic</option>
                                    <option value="audi">Fantastic</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row g-4">
                        <div class="col-lg-3">
                            <div class="row g-4">
                                <div class="col-lg-12">
                                    <div class="mb-3">
                                        <Categories @handle-specific-category="handleSpecificCategory">
                                        </Categories>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <PriceFilter @handle-price-range="handlePriceRange">
                                    </PriceFilter>
                                </div>
                                <div class="col-lg-12">
                                    <div class="mb-3">
                                        <Additional></Additional>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <FeaturedProducts></FeaturedProducts>
                                </div>
                                <div class="col-lg-12">
                                    <PromotionalBanner></PromotionalBanner>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-9">

                            <div v-if="paginatedProducts.length === 0" class="text-center mt-5 mb-5">
                                <h1>No Data Found</h1>
                            </div>

                            <div v-else class="row g-4 justify-content-center">
                                <div v-for="(product, index) in paginatedProducts" :key="index"
                                    class="col-md-6 col-lg-6 col-xl-4">
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
    <!-- Fruits Shop End-->
</template>

<style scoped>
.pagination-style {
    display: flex;
    justify-content: center;
}

.sorting-style label {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}

.sorting-style select {
    font-family: "Poppins", sans-serif;
    font-style: normal;
    border: none;
    outline: none;
}

.comp-intro-style h1 {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}

.comp-intro-style li {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}

@media only screen and (max-width: 2560px) {
    .container-style {
        max-width: 2300px;
        margin: auto;
    }
}

@media only screen and (max-width: 1920px) {
    .container-style {
        max-width: 1800px;
        margin: auto;
    }
}

@media only screen and (max-width: 1440px) {
    .container-style {
        max-width: 1300px;
        margin: auto;
    }
}

@media only screen and (max-width: 1024px) {
    .container-style {
        max-width: 900px;
        margin: auto;
    }
}

@media only screen and (max-width: 768px) {
    .container-style {
        width: 100%;
        margin: auto;
    }
}

@media only screen and (max-width: 540px) {
    .container-style {
        width: 100%;
        margin: auto;
    }
}
</style>