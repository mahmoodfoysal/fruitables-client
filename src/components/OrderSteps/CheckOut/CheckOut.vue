<script>

import { useStore } from '@/store/taskStore.js';
import axios from 'axios';

export default {
    name: 'CheckOut',
    data() {
        return {
            store: useStore(),
            fullName: null,
            address: null,
            city: null,
            zip: null,
            country: null,
            phoneNumber: null,
            email: null,
            notes: null,
            orderList: null,
            isValidation: false,
            coupon: null,
            couponNo: 'fruitbazar',
            discount: 0
        }
    },
    methods: {
        async handlePlaceOrder() {
            if (!this.store?.user?.displayName, !this.store?.user?.email, !this.city, !this.zip, !this.country, !this.phoneNumber) {
                this.isValidation = true
                alert("Please Fill All Required Field");
                return;
            }
            const text = "Are Sure Want To Confirm Order?";
            if (confirm(text) == true) {
                const result = await axios.post('https://fruitable.onrender.com/orders', {
                    fullName: this.store?.user?.displayName,
                    address: this.store?.user?.email,
                    city: this.city,
                    zip: this.zip,
                    country: this.country,
                    phoneNumber: this.phoneNumber,
                    email: this.email,
                    notes: this.notes,
                    orderList: [this.cart],
                    subTotal: this.subTotal,
                    shipping: this.shipping,
                    grossTotal: this.grossTotal,
                    status: "P",
                    date: Date()
                });
                console.log(result)
                if(result.status === 200) {
                    alert("Your Order Place Successfully");
                    this.fullName='';
                    this.address='';
                    this.city='';
                    this.zip='';
                    this.country='';
                    this.phoneNumber='';
                    this.email='';
                    this.notes='';
                    this.$router.push({name: 'Home'})
                    localStorage.removeItem('fruit_cart');
                    this.store.setCartItem([])
                    this.isValidation = false;
                }
            }

        },
        handleCoupon() {
            if (this.couponNo === this.coupon) {
            alert('Coupon applied successfully!');
            this.discount = 5
        }
        }
    },
    computed: {
        cartItems() {
            return this.store.cartItem;
        },
        cart() {
            return Object.values(this.store.cartItem);
        },
        subTotal() {
            const totalQuantityWithPrice = this.cart.reduce((total, item) => {
                return total + (item?.pro_price * item?.quantity);
            }, 0)
            return totalQuantityWithPrice
        },
        shipping() {
            return 2
        },
        grossTotal() {
            
            let total = this.subTotal + this.shipping;
        if (this.couponNo === this.coupon) {
            total -= this.discount; // Subtract 10 when the coupon is valid
        }
        return total;
        }

    }
}
</script>

<template>
    <!-- Single Page Header start -->
    <div class="container-fluid page-header py-5 comp-intro-style">
        <h1 class="text-center text-white display-6">Checkout</h1>
        <ol class="breadcrumb justify-content-center mb-0">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item"><a href="#">Pages</a></li>
            <li class="breadcrumb-item active text-white">Checkout</li>
        </ol>
    </div>
    <!-- Single Page Header End -->

    <!-- Checkout Page Start -->
    <div class="container-fluid py-5">
        <div class="container py-5 container-style">
            <h1 class="mb-4">Billing details</h1>
            <form action="#">
                <div class="row g-5">
                    <div class="col-md-12 col-lg-6 col-xl-7 form-style">
                        <div class="row">
                            <div class="col-md-12 col-lg-12">
                                <div class="form-item w-100">
                                    <label class="form-label my-3">Full Name<sup>*</sup></label>
                                    <input 
                                    :value="this.store?.user?.displayName" 
                                    type="text" 
                                    class="form-control"
                                    :class="{'is-validate': isValidation && !this.store?.user?.displayName}"
                                    disabled >
                                </div>
                            </div>
                        </div>
                        <div class="form-item">
                            <label class="form-label my-3">Email Address<sup>*</sup></label>
                            <input 
                            :value="this.store?.user?.email" 
                            type="email" 
                            class="form-control" 
                            :class="{'is-validate': isValidation && !this.store?.user?.email}"
                            disabled >
                        </div>
                        <div class="form-item">
                            <label class="form-label my-3">Address <sup>*</sup></label>
                            <input 
                            v-model="address" 
                            type="text" 
                            class="form-control"
                            :class="{'is-validate': isValidation && !this.address}"
                            placeholder="House Number Street Name">
                        </div>
                        <div class="form-item">
                            <label class="form-label my-3">Town/City<sup>*</sup></label>
                            <input 
                            v-model="city" 
                            type="text" 
                            class="form-control"
                            :class="{'is-validate': isValidation && !this.city}"
                            placeholder="Enter city"
                            >
                        </div>
                        <div class="form-item">
                            <label class="form-label my-3">Country<sup>*</sup></label>
                            <input 
                            v-model="country" 
                            type="text" 
                            class="form-control"
                            :class="{'is-validate': isValidation && !this.country}"
                            placeholder="Enter country"
                            >
                        </div>
                        <div class="form-item">
                            <label class="form-label my-3">Postcode/Zip<sup>*</sup></label>
                            <input 
                            v-model.number="zip" 
                            type="text" 
                            class="form-control"
                            :class="{'is-validate': isValidation && !this.zip}"
                            placeholder="Enter zip code"
                            >
                        </div>
                        <div class="form-item">
                            <label class="form-label my-3">Mobile<sup>*</sup></label>
                            <input 
                            v-model.number="phoneNumber" 
                            type="tel" 
                            class="form-control"
                            :class="{'is-validate': isValidation && !this.phoneNumber}"
                            placeholder="Enter phone no"
                            >
                        </div>

                        <div class="form-item">
                            <label class="form-label my-3">Order Notes<sup></sup></label>
                            <textarea 
                            v-model="notes" 
                            name="text" 
                            class="form-control" 
                            spellcheck="false" 
                            cols="30"
                            rows="11" 
                            placeholder="Oreder Notes (Optional)">
                            </textarea>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-6 col-xl-5">
                        <div class="table-responsive table-style">
                            <table class="table table-text-style">
                                <thead>
                                    <tr>
                                        <th scope="col">Products</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in cartItems" :key="index">
                                        <th scope="row">
                                            <div class="d-flex align-items-center mt-2">
                                                <img :src="item?.pro_image" class="img-fluid rounded-circle"
                                                    style="width: 90px; height: 90px;" alt="">
                                            </div>
                                        </th>
                                        <td class="py-5">{{ item?.pro_name }}</td>
                                        <td class="py-5">${{ item?.pro_price }}</td>
                                        <td class="py-5 text-center">{{ item?.quantity }}</td>
                                        <td class="py-5">${{ (item?.pro_price * item?.quantity).toFixed(2) }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="mt-5 coupon-style">
                <input 
                v-model="coupon"
                type="text" 
                class="border-0 border-bottom rounded me-5 py-3 mb-4" 
                placeholder="Coupon Code">
                <button 
                @click="handleCoupon"
                :disabled="discount > 0"
                class="btn border-secondary rounded-pill px-4 py-3 text-primary" 
                type="button">
                Apply Coupon
                </button>
            </div>
                        <div class="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                            <div class="col-12">
                                <div class="bg-light rounded checkout-calculation-style">
                                    <div class="p-4">
                                        <h1 class="display-6 mb-4">Total <span class="fw-normal">Payable</span>
                                        </h1>
                                        <div class="d-flex justify-content-between mb-4">
                                            <h5 class="mb-0 me-4">Subtotal:</h5>
                                            <p class="mb-0">${{ subTotal.toFixed(2) }}</p>
                                        </div>
                                        <div class="d-flex justify-content-between">
                                            <h5 class="mb-0 me-4">Shipping</h5>
                                            <div class="">
                                                <p class="mb-0">Flat rate: ${{ shipping.toFixed(2) }}</p>
                                            </div>
                                        </div>
                                        <!-- <p class="mb-0 text-end">Shipping to Ukraine.</p> -->
                                    </div>
                                    <div class="py-2 mb-4">
                            <p v-if="discount > 0" class="ps-4 pe-4">Coupon Applied!!!</p>
                        </div>
                                    <div class="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                        <h5 class="mb-0 ps-4 me-4">Total</h5>
                                        <p class="mb-0 pe-4">${{ grossTotal.toFixed(2) }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row g-4 text-center align-items-center justify-content-center border-bottom py-3 transection-style">
                            <div class="col-12">
                                <div class="form-check text-start my-3">
                                    <input type="checkbox" class="form-check-input bg-primary border-0" id="Transfer-1"
                                        name="Transfer" value="Transfer">
                                    <label class="form-check-label" for="Transfer-1">Direct Bank Transfer</label>
                                </div>
                                <p class="text-start text-dark">Make your payment directly into our bank account. Please
                                    use your Order ID as the payment reference. Your order will not be shipped until the
                                    funds have cleared in our account.</p>
                            </div>
                        </div>
                        <div class="row g-4 text-center align-items-center justify-content-center border-bottom py-3 transection-style">
                            <div class="col-12">
                                <div class="form-check text-start my-3">
                                    <input type="checkbox" class="form-check-input bg-primary border-0" id="Payments-1"
                                        name="Payments" value="Payments">
                                    <label class="form-check-label" for="Payments-1">Check Payments</label>
                                </div>
                            </div>
                        </div>
                        <div class="row g-4 text-center align-items-center justify-content-center border-bottom py-3 transection-style">
                            <div class="col-12">
                                <div class="form-check text-start my-3">
                                    <input type="checkbox" class="form-check-input bg-primary border-0" id="Delivery-1"
                                        name="Delivery" value="Delivery">
                                    <label class="form-check-label" for="Delivery-1">Cash On Delivery</label>
                                </div>
                            </div>
                        </div>
                        <div class="row g-4 text-center align-items-center justify-content-center border-bottom py-3 transection-style">
                            <div class="col-12">
                                <div class="form-check text-start my-3">
                                    <input type="checkbox" class="form-check-input bg-primary border-0" id="Paypal-1"
                                        name="Paypal" value="Paypal">
                                    <label class="form-check-label" for="Paypal-1">Paypal</label>
                                </div>
                            </div>
                        </div>
                        <div class="row g-4 text-center align-items-center justify-content-center pt-4 order-btn-div">
                            <button @click="handlePlaceOrder" type="button"
                                class="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary">Place
                                Order
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <!-- Checkout Page End -->
</template>

<style scoped>


.comp-intro-style h1 {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}
.comp-intro-style li {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}

.form-style input {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}
.form-style textarea {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}

.table-style {
    height: 450px;
}

.table-text-style th {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}
.table-text-style td {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}

.checkout-calculation-style h1 {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}
.checkout-calculation-style h5 {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}
.checkout-calculation-style p {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}
.checkout-calculation-style button {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}

.transection-style label {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}

.transection-style p {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}

.order-btn-div button {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}
.is-validate {
    border: 1px solid red !important;
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