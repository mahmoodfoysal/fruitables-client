<script>
import { useStore } from '../../../store/taskStore.js';
import { RouterLink } from 'vue-router';

export default {
    name: 'ProductCard',
    props: {
        product: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            store: useStore(),
            
        }
    },
    methods: {
        handleAddToCart(product) {
            let cart = this.getDB() || {};

            if(cart[product.pro_id]){
                cart[product.pro_id].quantity += 1
            }
            else {
                product.quantity = 1;
                cart[product.pro_id] = product;
            }
            this.updateDB(cart);
        },
        getDB() {
            const cartData = localStorage.getItem('shopping_cart');
            return cartData ? JSON.parse(cartData) : null;
        },
        updateDB(cart) {
            localStorage.setItem('shopping_cart', JSON.stringify(cart));
            this.store.setCartItem(cart)
        }
    }
}
</script>

<template>
    <div class="rounded position-relative fruite-item">
        <RouterLink :to="{ name: 'ProductDetails', params: { id: product.pro_id } }">
            <div class="fruite-img">
            <img :src="product?.pro_image" class="img-fluid w-100 rounded-top" alt="" style="object-fit: unset;">
        </div>
        </RouterLink>
        <div class="text-white bg-secondary px-3 py-1 rounded position-absolute" style="top: 10px; left: 10px;">{{ product?.cat_name }}
        </div>
        <div 
        
        class="p-4 border border-secondary border-top-0 rounded-bottom">
            <h4>{{ product?.pro_name }}</h4>
            <p>{{ product?.pro_description }}</p>
            <div class="">
                <p class="text-dark fs-5 fw-bold mb-0 d-flex justify-content-center">${{ product?.pro_price }} / {{ product?.pro_quantity }}{{ product?.pro_measurement }}</p>
                <div class="d-flex justify-content-center">
                    <button 
                    @click="handleAddToCart(product)"
                    href="" class="btn border border-secondary rounded-pill px-3 text-primary"><i
                        class="fa fa-shopping-bag me-2 text-primary"></i> Add to
                    cart</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.fruite-img img {
    height: 178px;
    width: 100%;
    object-fit: contain;
    cursor: pointer;
}

</style>@/store/taskStore