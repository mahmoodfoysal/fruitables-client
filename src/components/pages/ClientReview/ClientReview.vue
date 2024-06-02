<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Navigation, Autoplay } from 'swiper/modules';
import axios from 'axios';
export default {
    name: 'ClientReview',
    components: {
        Swiper,
        SwiperSlide,
    },
    data() {
        return {
            modules: [Navigation, Autoplay],
            reviews: []
        }
    },
    async mounted() {
        await this.loadReviews();
    },
    methods: {
        async loadReviews() {
            try {
                const result = await axios.get('http://localhost:5000/reviews');
                this.reviews = result.data;
            }
            catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<template>

    <!-- Tastimonial Start -->
    <div class="container-fluid testimonial py-5">
        <div class="container py-5 container-style">
            <div class="testimonial-header text-center">
                <h4 class="text-primary">Our Testimonial</h4>
                <h1 class="display-5 mb-5 text-dark">Our Client Saying!</h1>
            </div>
            <swiper :pagination="{
                type: 'fraction',
            }" :breakpoints="{
                '640': {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                '768': {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                '1024': {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                '1440': {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                '1920': {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                '2560': {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
            }" :navigation="true" :modules="modules" :autoplay="{
                delay: 2500,
                disableOnInteraction: false,
            }" class="mySwiper">
                <swiper-slide v-for="(review, index) in reviews" :key="index">
                    <div class="testimonial-item img-border-radius rounded p-4 review-card-style">
                        <div class="position-relative">
                            <i class="fa fa-quote-right fa-2x text-secondary position-absolute"
                                style="bottom: 30px; right: 0;"></i>

                            <div class="d-flex align-items-center flex-nowrap border-bottom border-secondary mb-4 pb-4">
                                <div class="bg-secondary rounded">
                                    <img src="/src/assets/img/testimonial-1.jpg" class="img-fluid rounded"
                                        style="width: 100px; height: 100px;" alt="">
                                </div>
                                <div class="ms-4 d-block">
                                    <h4 class="text-dark">{{ review?.fullName }}</h4>
                                    <!-- <p class="m-0 pb-3">Profession</p> -->
                                    <div class="d-flex pe-5">
                                        <template v-for="i in 5">
                                            <i
                                                :class="{ 'fa': true, 'fa-star': true, 'text-gray': i > review?.rating, 'text-yellow': i <= review?.rating }"></i>
                                        </template>
                                    </div>
                                </div>
                            </div>
                            <div class=" ">
                                <p class="mb-0">{{ review?.comment }}
                                </p>
                            </div>
                        </div>
                    </div>
                </swiper-slide>

            </swiper>
        </div>
    </div>
    <!-- Tastimonial End -->
</template>

<style scoped>
.star {
    color: gold;
}

.star-o {
    color: gray;
}

.text-yellow {
    color: #FFB524;
}

.text-gray {
    color: gray !important;
}

.review-card-style {
    height: 242px;
    width: 100%;
    background: #f9f9f9;
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