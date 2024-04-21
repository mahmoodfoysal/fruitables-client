<script>
import { useStore } from '@/components/store/taskStore';
import { RouterLink } from 'vue-router';

export default {
    name: 'Cart',
    data() {
        return {
            store: useStore(),
        }
    },
    methods: {
        handleQuantityIncrement(item) {
            let cartData = this.getDB() || {};
            if (cartData[item?.pro_id]) {
                cartData[item?.pro_id].quantity += 1;
            }
            this.updateDB(cartData);
        },
        handleQuantityDecrement(item) {
            let cartData = this.getDB() || {};
            if (cartData[item?.pro_id]) {
                if (cartData[item?.pro_id].quantity > 1) {
                    cartData[item?.pro_id].quantity -= 1;
                }
            }
            this.updateDB(cartData);
        },
        handleRemoveItem(item) {
            let cartData = this.getDB() || {};
            const text = 'Are You Sure Want to Delete This Item';
            if (cartData[item?.pro_id]) {
                if (confirm(text) == true) {
                    delete cartData[item?.pro_id]
                }

            }
            this.updateDB(cartData);
        },
        getDB() {
            const cartData = localStorage.getItem('shopping_cart')
            return cartData ? JSON.parse(cartData) : null
        },
        updateDB(cart) {
            localStorage.setItem('shopping_cart', JSON.stringify(cart));
            this.store.setCartItem(cart);
        }
    },
    computed: {
        cartItems() {
            return this.store.cartItem;
        },
        cart() {
            return Object.values(this.store.cartItem)
        },
        subTotal() {
            const totalQuantityWithPrice = this.cart.reduce((total, item) => {
                return total + (item.pro_price * item.quantity);
            }, 0);
            return totalQuantityWithPrice;
        },
        shippingCost() {
            return 2
        },
        grossTotal() {
            return this.subTotal + this.shippingCost;
        }
    }
}
</script>

<template>
    <!-- Single Page Header start -->
    <div class="container-fluid page-header py-5">
        <h1 class="text-center text-white display-6">Cart</h1>
        <ol class="breadcrumb justify-content-center mb-0">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item"><a href="#">Pages</a></li>
            <li class="breadcrumb-item active text-white">Cart</li>
        </ol>
    </div>
    <!-- Single Page Header End -->


    <!-- Cart Page Start -->
    <div class="container-fluid py-5">
        <div class="container py-5">
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Products</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Total</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in cartItems" :key="index">
                            <th scope="row">
                                <div class="d-flex align-items-center">
                                    <img :src="item?.pro_image" class="img-fluid me-5 rounded-circle"
                                        style="width: 80px; height: 80px;" alt="">
                                </div>
                            </th>
                            <td>
                                <p class="mb-0 mt-4">{{ item?.pro_name }}</p>
                            </td>
                            <td>
                                <p class="mb-0 mt-4">${{ item?.pro_price }}</p>
                            </td>
                            <td>
                                <div class="input-group quantity mt-4" style="width: 100px;">
                                    <div class="input-group-btn">
                                        <button @click="handleQuantityDecrement(item)"
                                            class="btn btn-sm btn-minus rounded-circle bg-light border">
                                            <i class="fa fa-minus"></i>
                                        </button>
                                    </div>
                                    <!-- {{  }} -->
                                    <input type="text" class="form-control form-control-sm text-center border-0"
                                        :value="item?.quantity" disabled>
                                    <div class="input-group-btn">
                                        <button @click="handleQuantityIncrement(item)"
                                            class="btn btn-sm btn-plus rounded-circle bg-light border">
                                            <i class="fa fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <p class="mb-0 mt-4">${{ (item?.pro_price * item?.quantity).toFixed(2) }}</p>
                            </td>
                            <td>
                                <button @click="handleRemoveItem(item)"
                                    class="btn btn-md rounded-circle bg-light border mt-4">
                                    <i class="fa fa-times text-danger"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="mt-5">
                <input type="text" class="border-0 border-bottom rounded me-5 py-3 mb-4" placeholder="Coupon Code">
                <button class="btn border-secondary rounded-pill px-4 py-3 text-primary" type="button">Apply
                    Coupon</button>
            </div>
            <div class="row g-4 justify-content-end">
                <div class="col-8"></div>
                <div class="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                    <div class="bg-light rounded">
                        <div class="p-4">
                            <h1 class="display-6 mb-4">Cart <span class="fw-normal">Total</span></h1>
                            <div class="d-flex justify-content-between mb-4">
                                <h5 class="mb-0 me-4">Subtotal:</h5>
                                <p class="mb-0">${{ subTotal.toFixed(2) }}</p>
                            </div>
                            <div class="d-flex justify-content-between">
                                <h5 class="mb-0 me-4">Shipping</h5>
                                <div class="">
                                    <p class="mb-0">Flat rate: ${{ shippingCost.toFixed(2) }}</p>
                                </div>
                            </div>
                            <!-- <p class="mb-0 text-end">Shipping to Ukraine.</p> -->
                        </div>
                        <div class="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                            <h5 class="mb-0 ps-4 me-4">Total</h5>
                            <p class="mb-0 pe-4">${{ grossTotal.toFixed(2) }}</p>
                        </div>
                        <RouterLink :to="{name: 'CheckOut'}">
                            <button
                            class="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4"
                            type="button">Proceed Checkout</button>
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Cart Page End -->
</template>

<style scoped></style>