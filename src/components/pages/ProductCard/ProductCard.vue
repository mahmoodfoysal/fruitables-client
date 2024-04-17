<script>
export default {
    name: 'ProductCard',
    props: {
        product: {
            type: Object,
            default: null
        }
    }
}
</script>

<template>
    <div class="rounded position-relative fruite-item">
        <div class="fruite-img">
            <img :src="product?.pro_image" class="img-fluid w-100 rounded-top" alt="">
        </div>
        <div class="text-white bg-secondary px-3 py-1 rounded position-absolute" style="top: 10px; left: 10px;">Fruits
        </div>
        <div class="p-4 border border-secondary border-top-0 rounded-bottom">
            <h4>{{ product?.pro_name }}</h4>
            <p>{{ product?.pro_description }}</p>
            <div class="d-flex justify-content-between flex-lg-wrap">
                <p class="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                <a href="#" class="btn border border-secondary rounded-pill px-3 text-primary"><i
                        class="fa fa-shopping-bag me-2 text-primary"></i> Add to
                    cart</a>
            </div>
        </div>
    </div>
</template>

<style scoped></style>