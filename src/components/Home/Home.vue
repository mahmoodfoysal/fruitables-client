<script>
import TopBanner from '../pages/TopBanner/TopBanner.vue';
import Features from '../pages/Features/Features.vue';
import Products from '../pages/Products/Products.vue';
import OfferFeatures from '../pages/OfferFeatures/OfferFeatures.vue';
import VegetablesShop from '../pages/VegetablesShop/VegetablesShop.vue';
import MiddleBanner from '../pages/MiddleBanner/MiddleBanner.vue';
import BestProductSell from '../pages/BestProductSell/BestProductSell.vue';
import Fact from '../pages/Fact/Fact.vue';
import ClientReview from '../pages/ClientReview/ClientReview.vue';
export default {
    name: 'Home',
    components: {
        TopBanner,
        Features,
        Products,
        OfferFeatures,
        VegetablesShop,
        MiddleBanner,
        BestProductSell,
        Fact,
        ClientReview
    }
}
</script>

<template>
    <!-- Spinner Start -->
    <!-- <div id="spinner" class="show w-100 vh-100 bg-white position-fixed translate-middle top-50 start-50  d-flex align-items-center justify-content-center">
    <div class="spinner-grow text-primary" role="status"></div>
</div> -->
    <!-- Spinner End -->
    <TopBanner></TopBanner>
    <Features></Features>
    <Products></Products>
    <OfferFeatures></OfferFeatures>
    <VegetablesShop></VegetablesShop>
    <MiddleBanner></MiddleBanner>
    <BestProductSell></BestProductSell>
    <Fact></Fact>
    <ClientReview></ClientReview>
</template>

<style scoped></style>