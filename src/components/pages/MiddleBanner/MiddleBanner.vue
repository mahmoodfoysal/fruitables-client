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
                const result = await axios.get('http://localhost:5000/bannerOffer');
                this.posterData = result.data;
            }
            catch (error) {

            }
        }
    },
}
</script>

<template>
    <!-- Banner Section Start-->
    <div class="container-fluid banner bg-secondary my-5">
        <div class="container py-5">
            <div class="row g-4 align-items-center">
                <div class="col-lg-6">
                    <div class="py-4">
                        <h1 class="display-3 text-white">{{ posterData[0]?.posterText1 }}</h1>
                        <p class="fw-normal display-3 text-dark mb-4">{{ posterData[0]?.posterText2 }}</p>
                        <p class="mb-4 text-dark">{{ posterData[0]?.posterDescription }}</p>
                        <RouterLink 
                        v-if="posterData.length > 0"
                        :to="{ name: 'BuyNow', params: { id: posterData[0]?.offerId } }">
                            <button class="banner-btn btn border-2 border-white rounded-pill text-dark py-3 px-5">BUY
                                NOW</button>
                        </RouterLink>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="position-relative">
                        <img :src="posterData[0]?.img" class="img-fluid w-100 rounded" alt="">
                        <div class="d-flex align-items-center justify-content-center bg-white rounded-circle position-absolute"
                            style="width: 140px; height: 140px; top: 0; left: 0;">
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

<style scoped></style>