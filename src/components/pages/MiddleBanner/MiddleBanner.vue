<script>
import axios from 'axios';
import { RouterLink } from 'vue-router';
export default {
    name: 'MiddleBanner',
    data() {
        return {
            posterData: []
        }
    },
    mounted() {
        this.loadPosterProduct();
    },
    methods: {
        async loadPosterProduct() {
            try {
                const result = await axios.get('https://fruitable.onrender.com/bannerOffer');
                this.posterData = result.data;
            }
            catch (error) {

            }
        }
    },
}
</script>

<template>


<section v-if="posterData.length === 0" class="d-flex justify-content-center mt-5" role="status">
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

    <!-- Banner Section Start-->
    <div v-else class="container-fluid banner bg-secondary my-5">
        <div class="container py-5 container-style">
            <div class="row g-4 align-items-center">
                <div class="col-lg-6">
                    <div class="py-4 poster-text-style">
                        <h1 class="display-3 text-white">{{ posterData[0]?.posterText1 }}</h1>
                        <p class="fw-normal display-3 text-dark mb-4">{{ posterData[0]?.posterText2 }}</p>
                        <p class="mb-4 text-dark">{{ posterData[0]?.posterDescription }}</p>
                        <RouterLink v-if="posterData.length > 0"
                            :to="{ name: 'BuyNow', params: { id: posterData[0]?.offerId } }">
                            <button class="banner-btn btn border-2 border-white rounded-pill text-dark py-3 px-5">BUY
                                NOW</button>
                        </RouterLink>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="position-relative">
                        <img :src="posterData[0]?.img" class="img-fluid w-100 rounded" alt="">
                        <div
                            class="d-flex align-items-center justify-content-center bg-white rounded-circle position-absolute price-circle-style">
                            <h1 style="font-size: 100px;">{{ posterData[0]?.quantity }}</h1>
                            <div class="d-flex flex-column">
                                <span class="h2 mb-0">${{ posterData[0]?.price }}</span>
                                <span class="h4 text-muted mb-0">{{ posterData[0]?.measureMent }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Banner Section End -->
</template>

<style scoped>

.poster-text-style h1 {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}
.poster-text-style p {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}
.poster-text-style button {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}


@media only screen and (max-width: 2560px) {
    .container-style {
        max-width: 2300px;
        margin: auto;
    }

    .price-circle-style {
        width: 140px;
        height: 140px;
        top: 26px;
        left: 110px;
    }
}

@media only screen and (max-width: 1920px) {
    .container-style {
        max-width: 1800px;
        margin: auto;
    }

    .price-circle-style {
        width: 140px;
        height: 140px;
        top: 0;
        left: 0;
    }
}

@media only screen and (max-width: 1440px) {
    .container-style {
        max-width: 1300px;
        margin: auto;
    }
    .price-circle-style {
        width: 140px;
        height: 140px;
        top: 0;
        left: 0;
    }
}

@media only screen and (max-width: 1024px) {
    .container-style {
        max-width: 900px;
        margin: auto;
    }
    .price-circle-style {
        width: 140px;
        height: 140px;
        top: 0;
        left: 0;
    }
}

@media only screen and (max-width: 768px) {
    .container-style {
        width: 100%;
        margin: auto;
    }
    .price-circle-style {
        width: 140px;
        height: 140px;
        top: 0;
        left: 0;
    }
}

@media only screen and (max-width: 540px) {
    .container-style {
        width: 100%;
        margin: auto;
    }
    .price-circle-style {
        width: 140px;
        height: 140px;
        top: 0;
        left: 0;
    }
}
</style>