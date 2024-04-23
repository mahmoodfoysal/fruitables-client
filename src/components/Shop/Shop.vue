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
            catID: 0,
            filterData: [],
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
        this.loadProducts().then(() => {
            this.filterProducts();
        });
    },
    methods: {
        async loadProducts() {
            try {
                const result = await axios.get('http://localhost:3000/products');
                this.productsData = result?.data;
                // console.log(result?.data);
            }
            catch (error) {

            }
        },
        handleSpecificCategory(id) {
            this.catID = parseInt(id);

            this.filterProducts(this.catID);
        },
        filterProducts(id) {
            if(this.catID === 0) {
                this.filterData = this.productsData;
            }
            else {
                this.filterData = this.productsData.filter(product => product.cat_id === id)
            }
            console.log('specific-category', id)
        }
    }
}
</script>

<template>
    <!-- Single Page Header start -->
    <div class="container-fluid page-header py-5">
        <h1 class="text-center text-white display-6">Shop</h1>
        <ol class="breadcrumb justify-content-center mb-0">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item"><a href="#">Pages</a></li>
            <li class="breadcrumb-item active text-white">Shop</li>
        </ol>
    </div>
    <!-- Single Page Header End -->
    <!-- Fruits Shop Start-->
    <div class="container-fluid fruite py-5">
        <div class="container py-5">
            <h1 class="mb-4">Fresh fruits shop</h1>
            <div class="row g-4">
                <div class="col-lg-12">
                    <div class="row g-4">
                        <div class="col-xl-3">
                            <SearchBar></SearchBar>
                        </div>
                        <div class="col-6"></div>
                        <div class="col-xl-3">
                            <div class="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
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
                                        <Categories
                                        @handle-specific-category="handleSpecificCategory"
                                        ></Categories>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <PriceFilter></PriceFilter>
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
                            <div class="row g-4 justify-content-center">
                                <div v-for="(product, index) in filterData" :key="index"
                                    class="col-md-6 col-lg-6 col-xl-4">
                                    <ProductCard :product="product"></ProductCard>
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