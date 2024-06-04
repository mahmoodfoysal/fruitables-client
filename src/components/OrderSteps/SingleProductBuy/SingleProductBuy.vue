<script>
import { useStore } from '@/store/taskStore.js';
import axios from 'axios';
export default {
    name: 'SingleProductBuy',
    data() {
        return {
            product: [],
            store: useStore(),
            fullName: null,
            email: null,
            address: null,
            city: null,
            zip: null,
            country: null,
            phoneNumber: null,
            notes: null,
            orderList: null,
        }
    },
    mounted() {
        this.loadOfferProduct();
    },
    methods: {
        async loadOfferProduct() {
            try {
                const result = await axios.get('https://fruitable.onrender.com/bannerOffer');
                this.product = result.data;
            }
            catch (error) {
                console.log(error)
            }
        },
        async handlePlaceOrder() {
            if (!this.address, !this.city, !this.zip, !this.country, !this.phoneNumber) {
                alert("Please Fill All The Require Field");
                return;
            }
            else if (!this.store?.user?.displayName, !this.store?.user?.email) {
                alert("Please Login First Before Place Order");
                return;
            }
            else {
                const text = "Are Sure Want To Confirm Order?";
                if (confirm(text) === true) {
                    const result = await axios.post('https://fruitable.onrender.com/orders', {
                        fullName: this.store?.user?.displayName,
                        companyName: this.companyName,
                        address: this.address,
                        city: this.city,
                        zip: this.zip,
                        country: this.country,
                        phoneNumber: this.phoneNumber,
                        email: this.store?.user?.email,
                        notes: this.notes,
                        orderList: [
                        this.product[0]
                        ],
                        subTotal: this.subTotal,
                        shipping: this.shipping,
                        grossTotal: this.total,
                        status: "P",
                        date: Date()
                    });
                    console.log(result)
                    if (result.status === 200) {
                        alert("Your Order Place Successfully");
                        this.fullName = '';
                        this.address = '';
                        this.city = '';
                        this.zip = '';
                        this.country = '';
                        this.phoneNumber = '';
                        this.email = '';
                        this.notes = '';
                        this.$router.push({ name: 'Home' })
                    }
                }
            }
        }
    },
    computed: {
        shipping() {
            return 1.2
        },
        subTotal() {
            return this.product[0]?.price
        },
        total() {
            return this.shipping + this.subTotal
        }
    }
}
</script>

<template>

    <!-- Single Page Header start -->
    <div class="container-fluid page-header py-5 comp-intro-style">
        <h1 class="text-center text-white display-6">Buy Now</h1>
        <ol class="breadcrumb justify-content-center mb-0">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item"><a href="#">Pages</a></li>
            <li class="breadcrumb-item active text-white">Buy Now</li>
        </ol>
    </div>
    <!-- Single Page Header End -->
    <!-- loading  -->
    <section v-if="product.length === 0" class="d-flex justify-content-center mt-5" role="status">
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
    <!-- Checkout Page Start -->
    <div v-else class="container-fluid py-5">
        <div class="container py-5 content-text-style">
            <h1 class="mb-4">Billing Details</h1>
            <form action="#">
                <div class="row g-5">
                    <div class="col-md-12 col-lg-6 col-xl-7">
                        <div class="row">
                            <div class="col-md-12 col-lg-12">
                                <div class="form-item w-100">
                                    <label class="form-label my-3">Full Name<sup>*</sup></label>
                                    <input :value="store.user ? store.user.displayName : ''" type="text"
                                        class="form-control" placeholder="Please Login First" disabled>
                                </div>
                            </div>
                        </div>
                        <div class="form-item">
                            <label class="form-label my-3">Email Address<sup>*</sup></label>
                            <input :value="store.user ? store.user.email : ''" type="email" class="form-control"
                                placeholder="Please Login First" disabled>
                        </div>
                        <div class="form-item">
                            <label class="form-label my-3">Address <sup>*</sup></label>
                            <input v-model="address" type="text" class="form-control"
                                placeholder="House Number Street Name">
                        </div>
                        <div class="form-item">
                            <label class="form-label my-3">Town/City<sup>*</sup></label>
                            <input v-model="city" type="text" class="form-control" placeholder="City Name">
                        </div>
                        <div class="form-item">
                            <label class="form-label my-3">Country<sup>*</sup></label>
                            <input v-model="country" type="text" class="form-control" placeholder="Country Name">
                        </div>
                        <div class="form-item">
                            <label class="form-label my-3">Postcode/Zip<sup>*</sup></label>
                            <input v-model="zip" type="text" class="form-control" placeholder="Enter Zip No">
                        </div>
                        <div class="form-item">
                            <label class="form-label my-3">Mobile<sup>*</sup></label>
                            <input v-model="phoneNumber" type="tel" class="form-control" placeholder="Mobile Number">
                        </div>

                        <div class="form-item my-3">
                            <textarea v-model="notes" name="text" class="form-control" spellcheck="false" cols="30"
                                rows="11" placeholder="Oreder Notes (Optional)"></textarea>
                        </div>
                    </div>

                    <div class="col-md-12 col-lg-6 col-xl-5">

                        <div class="table-responsive">
                            <table class="table">
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
                                    <tr>
                                        <th scope="row">
                                            <div class="d-flex align-items-center mt-2">
                                                <img :src="product[0]?.img" class="img-fluid rounded-circle"
                                                    style="width: 90px; height: 90px;" alt="">
                                            </div>
                                        </th>
                                        <td class="py-5">{{ product[0]?.posterText1 }}</td>
                                        <td class="py-5">${{ product[0]?.price }}</td>
                                        <td class="py-5">{{ product[0]?.quantity }} {{ product[0]?.measureMent }}</td>
                                        <td class="py-5">${{ product[0]?.price }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                            <div class="col-12">
                                <div class="bg-light rounded">
                                    <div class="p-4">
                                        <h1 class="display-6 mb-4">Total <span class="fw-normal">Payable</span>
                                        </h1>
                                        <div class="d-flex justify-content-between mb-4">
                                            <h5 class="mb-0 me-4">Subtotal:</h5>
                                            <p class="mb-0">${{ subTotal }}</p>
                                        </div>
                                        <div class="d-flex justify-content-between">
                                            <h5 class="mb-0 me-4">Shipping</h5>
                                            <div class="">
                                                <p class="mb-0">Flat rate: ${{ shipping }}</p>
                                            </div>
                                        </div>
                                        <!-- <p class="mb-0 text-end">Shipping to Ukraine.</p> -->
                                    </div>
                                    <div class="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                        <h5 class="mb-0 ps-4 me-4">Total</h5>
                                        <p class="mb-0 pe-4">${{ total }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
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
                        <div class="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                            <div class="col-12">
                                <div class="form-check text-start my-3">
                                    <input type="checkbox" class="form-check-input bg-primary border-0" id="Payments-1"
                                        name="Payments" value="Payments">
                                    <label class="form-check-label" for="Payments-1">Check Payments</label>
                                </div>
                            </div>
                        </div>
                        <div class="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                            <div class="col-12">
                                <div class="form-check text-start my-3">
                                    <input type="checkbox" class="form-check-input bg-primary border-0" id="Delivery-1"
                                        name="Delivery" value="Delivery">
                                    <label class="form-check-label" for="Delivery-1">Cash On Delivery</label>
                                </div>
                            </div>
                        </div>
                        <div class="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                            <div class="col-12">
                                <div class="form-check text-start my-3">
                                    <input type="checkbox" class="form-check-input bg-primary border-0" id="Paypal-1"
                                        name="Paypal" value="Paypal">
                                    <label class="form-check-label" for="Paypal-1">Paypal</label>
                                </div>
                            </div>
                        </div>
                        <div class="row g-4 text-center align-items-center justify-content-center pt-4">
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
.table-style {
    height: 450px;
}

.comp-intro-style h1 {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}
.comp-intro-style li {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}

.content-text-style h1, label, input, textarea, th, td, h5, p, button{
    font-family: "Poppins", sans-serif;
    font-style: normal;
}
</style>