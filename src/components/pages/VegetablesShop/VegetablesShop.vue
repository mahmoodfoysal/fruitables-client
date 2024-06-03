<script>
import ProductCard from '../ProductCard/ProductCard.vue';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import axios from 'axios';
export default {
    name: 'VegetablesShop',
    components: {
        Swiper,
        SwiperSlide,
        ProductCard
    },
    data() {
        return {
            modules: [Pagination, Navigation, Autoplay],
            productsData: [],
            filterData: [],
        }
    },
    mounted() {
        this.loadProducts().then(() => {
            this.filterProducts();
        });
    },
    methods: {
        async loadProducts() {
            try {
                const result = await axios.get('https://fruitable.onrender.com/products')
                this.productsData = result.data;
                // console.log('vegetables data',result.data);
            }
            catch (error) {

            }
        },
        filterProducts() {
            this.filterData = this.productsData.filter(product => product?.cat_name === 'Vegetable')
            // console.log('filter vegetables', this.filterData);
        }
    }
}
</script>

<template>
    <!-- Vesitable Shop Start-->
    <div class="container-fluid vesitable py-5">
        <div class="container py-5 container-style comp-intro-style">
            <h1 class="mb-5">Fresh Organic Vegetables</h1>
            <swiper 
            :pagination="{
                type: 'fraction',
            }"
            :breakpoints="{
                '640': {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                '768': {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                '1024': {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
            }"
            :navigation="true" :modules="modules" :autoplay="{
                delay: 2500,
                disableOnInteraction: false,
            }" class="mySwiper">
                <swiper-slide v-for="(product, index) in filterData" :key="index">
                    <ProductCard :product="product"></ProductCard>
                </swiper-slide>
            </swiper>
        </div>
    </div>
    <!-- Vesitable Shop End -->

</template>

<style scoped>
.comp-intro-style h1 {
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