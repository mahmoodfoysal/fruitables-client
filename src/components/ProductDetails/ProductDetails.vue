<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import axios from 'axios';
import { RouterLink } from 'vue-router';
import FeaturedProducts from '../FiltersAndFeatures/FeaturedProducts/FeaturedProducts.vue';
import PromotionalBanner from '../FiltersAndFeatures/PromotionalBanner/PromotionalBanner.vue';
import { useStore } from '@/store/taskStore.js';


export default {
    name: 'ProductDetails',
    components: {
        Swiper,
        SwiperSlide,
        FeaturedProducts,
        PromotionalBanner
    },
    data() {
        return {
            modules: [Pagination, Navigation, Autoplay],
            productsData: [],
            filterData: [],
            filterRelatedData: [],
            store: useStore(),
            currentRating: 0,
            fullName: null,
            email: null,
            photo: null,
            comment: null,
            reviewData: [],
            filterReviewData: []
        }
    },
    async mounted() {
        // this.loadProducts().then(() => {
        //     this.filterProduct().then(() => {
        //         this.filterRelatedProducts()
        //     });
        // });
        await this.loadProducts();
        await this.filterProduct();
        await this.filterRelatedProducts();
        await this.loadReview();
        await this.filterRelatedReview()
    },
    watch: {
        '$route.params.id': {
            immediate: true, // This ensures that the watcher is triggered immediately when the component is mounted
            handler(newValue, oldValue) {
                // Check if the ID has changed
                if (newValue !== oldValue) {
                    this.filterProduct();
                    this.filterRelatedReview();
                }
            }
        },
    },
    methods: {
        async loadProducts() {
            try {
                const result = await axios.get('http://localhost:5000/products');
                this.productsData = result.data;
            }
            catch (error) {

            }
        },
        filterProduct() {
            this.filterData = this.productsData.filter(product => product?.pro_id == parseInt(this.$route?.params?.id));
            // console.log(this.filterData)
        },
        filterRelatedProducts() {
            this.filterRelatedData = this.productsData.filter(product => product?.cat_id === this.filterData[0]?.cat_id)
            // console.log(this.filterRelatedData);
        },
        // add to cart methods write here 
        handleAddToCart(product) {
            let cart = this.getDB() || {};

            if (cart[product.pro_id]) {
                cart[product.pro_id].quantity += 1
            }
            else {
                product.quantity = 1;
                cart[product.pro_id] = product;
            }
            this.updateDB(cart);
        },
        handleQuantityIncrement(product) {
            let cart = this.getDB() || {};
            if (cart[product?.pro_id]) {
                cart[product?.pro_id].quantity += 1;
            }
            else {
                alert('Please Add To Cart');
            }
            this.updateDB(cart);
        },
        handleQuantityDecrement(product) {
            let cart = this.getDB() || {};
            if (cart[product?.pro_id]) {
                if (cart[product?.pro_id].quantity > 1) {
                    cart[product?.pro_id].quantity -= 1;
                }

            }
            this.updateDB(cart);
        },
        getDB() {
            const cartData = localStorage.getItem('shopping_cart');
            return cartData ? JSON.parse(cartData) : null;
        },
        updateDB(cart) {
            localStorage.setItem('shopping_cart', JSON.stringify(cart));
            this.store.setCartItem(cart);
        },
        rate(rating) {
            // Update the current rating when a star is clicked
            this.currentRating = rating;
            console.log(rating)
            // You can also emit an event here if needed
        },
        async handlePostReview() {
            if (!this.store?.user?.displayName, !this.store?.user?.email, !this.comment, !this.currentRating) {
                alert('Please Fill The Required Field');
                return;
            }
            const text = 'Are You Sure? Want To Post This Review';
            if (confirm(text) == true) {
                const result = await axios.post('http://localhost:5000/reviews', {
                    fullName: this.store?.user?.displayName,
                    email: this.store?.user?.email,
                    photo: this.store?.user?.photoURL,
                    comment: this.comment,
                    rating: this.currentRating,
                    product_id: this.filterData[0]?.pro_id,
                    date: Date()

                });
                console.log(result)
                if (result.status === 200) {
                    alert('Thanks For Your Review!!!');
                    this.fullName = '';
                    this.email = '';
                    this.comment = '';
                    this.currentRating = '';
                }
            }
        },
        async loadReview() {
            try {
                const result = await axios.get('http://localhost:5000/review');
                this.reviewData = result.data;
                console.log(result.data);
            }
            catch (error) {

            }
        },
        filterRelatedReview() {
            this.filterReviewData = this.reviewData.filter(review => review?.product_id == parseInt(this.$route?.params?.id));
            console.log(this.filterReviewData)
        }
    },
    computed: {
        quantity() {
            let item = this.store.cartItem;
            if (item && item[this.$route.params.id]) {
                return item[this.$route.params.id].quantity; // Access quantity of the specific item
            }
            return null;
        }
    },
}
</script>

<template>
    <!-- Single Page Header start -->
    <div class="container-fluid page-header py-5">
        <h1 class="text-center text-white display-6">Shop Detail</h1>
        <ol class="breadcrumb justify-content-center mb-0">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item"><a href="#">Pages</a></li>
            <li class="breadcrumb-item active text-white">Shop Detail</li>
        </ol>
    </div>
    <!-- Single Page Header End -->


    <!-- Single Product Start -->
    <div class="container-fluid py-5 mt-5">
        <div class="container py-5">
            <div class="row g-4 mb-5">
                <div class="col-lg-8 col-xl-9">
                    <div class="row g-4">
                        <div class="col-lg-6">
                            <div class="border rounded">
                                <a href="#">
                                    <img :src="filterData[0]?.pro_image" class="img-fluid rounded" alt="Image">
                                </a>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <h4 class="fw-bold mb-3">{{ filterData[0]?.pro_name }}</h4>
                            <p class="mb-3">Category: {{ filterData[0]?.cat_name }}</p>
                            <h5 class="fw-bold mb-3">${{ filterData[0]?.pro_price }}</h5>
                            <div class="d-flex mb-4">
                                <i class="fa fa-star text-secondary"></i>
                                <i class="fa fa-star text-secondary"></i>
                                <i class="fa fa-star text-secondary"></i>
                                <i class="fa fa-star text-secondary"></i>
                                <i class="fa fa-star"></i>
                            </div>
                            <p class="mb-4">{{ filterData[0]?.pro_description }}</p>
                            <div class="input-group quantity mb-5" style="width: 100px;">
                                <div class="input-group-btn">
                                    <button @click="handleQuantityDecrement(filterData[0])"
                                        class="btn btn-sm btn-minus rounded-circle bg-light border">
                                        <i class="fa fa-minus"></i>
                                    </button>
                                </div>
                                <input v-model="quantity" type="text"
                                    class="form-control form-control-sm text-center border-0" value="" disabled>
                                <div class="input-group-btn">
                                    <button @click="handleQuantityIncrement(filterData[0])"
                                        class="btn btn-sm btn-plus rounded-circle bg-light border">
                                        <i class="fa fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <button @click="handleAddToCart(filterData[0])" href=""
                                class="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"><i
                                    class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</button>
                        </div>
                        <div class="col-lg-12">
                            <nav>
                                <div class="nav nav-tabs mb-3">
                                    <button class="nav-link active border-white border-bottom-0" type="button"
                                        role="tab" id="nav-about-tab" data-bs-toggle="tab" data-bs-target="#nav-about"
                                        aria-controls="nav-about" aria-selected="true">Description</button>
                                    <button class="nav-link border-white border-bottom-0" type="button" role="tab"
                                        id="nav-mission-tab" data-bs-toggle="tab" data-bs-target="#nav-mission"
                                        aria-controls="nav-mission" aria-selected="false">Reviews</button>
                                </div>
                            </nav>
                            <div class="tab-content mb-5">
                                <div class="tab-pane active" id="nav-about" role="tabpanel"
                                    aria-labelledby="nav-about-tab">
                                    <p>The generated Lorem Ipsum is therefore always free from repetition injected
                                        humour, or non-characteristic words etc.
                                        Susp endisse ultricies nisi vel quam suscipit </p>
                                    <p>Sabertooth peacock flounder; chain pickerel hatchetfish, pencilfish snailfish
                                        filefish Antarctic
                                        icefish goldeye aholehole trumpetfish pilot fish airbreathing catfish, electric
                                        ray sweeper.</p>
                                    <div class="px-2">
                                        <div class="row g-4">
                                            <div class="col-6">
                                                <div
                                                    class="row bg-light align-items-center text-center justify-content-center py-2">
                                                    <div class="col-6">
                                                        <p class="mb-0">Weight</p>
                                                    </div>
                                                    <div class="col-6">
                                                        <p class="mb-0">1 kg</p>
                                                    </div>
                                                </div>
                                                <div
                                                    class="row text-center align-items-center justify-content-center py-2">
                                                    <div class="col-6">
                                                        <p class="mb-0">Country of Origin</p>
                                                    </div>
                                                    <div class="col-6">
                                                        <p class="mb-0">Agro Farm</p>
                                                    </div>
                                                </div>
                                                <div
                                                    class="row bg-light text-center align-items-center justify-content-center py-2">
                                                    <div class="col-6">
                                                        <p class="mb-0">Quality</p>
                                                    </div>
                                                    <div class="col-6">
                                                        <p class="mb-0">Organic</p>
                                                    </div>
                                                </div>
                                                <div
                                                    class="row text-center align-items-center justify-content-center py-2">
                                                    <div class="col-6">
                                                        <p class="mb-0">Сheck</p>
                                                    </div>
                                                    <div class="col-6">
                                                        <p class="mb-0">Healthy</p>
                                                    </div>
                                                </div>
                                                <div
                                                    class="row bg-light text-center align-items-center justify-content-center py-2">
                                                    <div class="col-6">
                                                        <p class="mb-0">Min Weight</p>
                                                    </div>
                                                    <div class="col-6">
                                                        <p class="mb-0">250 Kg</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="tab-pane" id="nav-mission" role="tabpanel"
                                    aria-labelledby="nav-mission-tab">

                                    <div v-for="(review, index) in filterReviewData" :key="index" class="d-flex">
                                        <img :src="review?.photo" class="img-fluid rounded-circle p-3"
                                            style="width: 100px; height: 100px;" alt="">
                                        <div>
                                            <p class="mb-2" style="font-size: 14px;">{{ review?.date }}</p>
                                            <div class="d-flex justify-content-between">
                                                <h5>{{ review?.fullName }}</h5>
                                                <div class="d-flex mb-3">
                                                    <template v-for="i in 5">
                                                        <i
                                                            :class="{ 'fa': true, 'fa-star': true, 'text-gray': i > review?.rating, 'text-yellow': i <= review?.rating }"></i>
                                                    </template>
                                                </div>
                                            </div>
                                            <p>{{ review?.comment }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane" id="nav-vision" role="tabpanel">
                                    <p class="text-dark">Tempor erat elitr rebum at clita. Diam dolor diam ipsum et
                                        tempor sit. Aliqu diam
                                        amet diam et eos labore. 3</p>
                                    <p class="mb-0">Diam dolor diam ipsum et tempor sit. Aliqu diam amet diam et eos
                                        labore.
                                        Clita erat ipsum et lorem et sit</p>
                                </div>
                            </div>
                        </div>
                        <form action="#">
                            <h4 class="mb-5 fw-bold">Leave a Review</h4>
                            <div class="row g-4">
                                <div class="col-lg-6">
                                    <div class="border-bottom rounded">
                                        <input :value="store.user ? store.user.displayName : ''" type="text"
                                            class="form-control border-0 me-4" placeholder="Enter Your Full Name *"
                                            required disabled>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="border-bottom rounded">
                                        <input :value="store.user ? store.user.email : ''" type="email"
                                            class="form-control border-0" placeholder="Enter Your Email *" required
                                            disabled>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="border-bottom rounded my-4">
                                        <textarea v-model="comment" name="" id="" class="form-control border-0"
                                            cols="30" rows="8" placeholder="Please Enter Your Valuable Comment *"
                                            spellcheck="false"></textarea>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="d-flex justify-content-between py-3 mb-5">
                                        <div class="d-flex align-items-center">
                                            <p class="mb-0 me-3">Please rate:</p>
                                            <div class="d-flex align-items-center rating-style"
                                                style="font-size: 12px;">
                                                <i v-for="index in 5" :key="index" class="fa fa-star" :class="{
                                        'star': index <= currentRating,
                                        'star-o': index > currentRating
                                    }" @click="rate(index)"></i>
                                            </div>
                                        </div>
                                        <button @click="handlePostReview" type="button"
                                            class="btn border border-secondary text-primary rounded-pill px-4 py-3">
                                            Post Review</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-lg-4 col-xl-3">
                    <div class="row g-4 fruite">

                        <div class="col-lg-12">
                            <FeaturedProducts></FeaturedProducts>
                        </div>
                        <div class="col-lg-12">
                            <PromotionalBanner></PromotionalBanner>
                        </div>
                    </div>
                </div>
            </div>
            <h1 class="fw-bold mb-0">Related products</h1>
            <div class="vesitable">
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
                                            slidesPerView: 4,
                                            spaceBetween: 30,
                                        },
                                    }" :navigation="true" :modules="modules" :autoplay="{
                                        delay: 2500,
                                        disableOnInteraction: false,
                                    }" class="mySwiper">
                    <swiper-slide v-for="(product, index) in filterRelatedData" :key="index">
                        <div class="border border-primary rounded position-relative vesitable-item">
                            <RouterLink :to="{ name: 'ProductDetails', params: { id: product?.pro_id } }">
                                <div class="vesitable-img">
                                    <img :src="product?.pro_image" class="img-fluid w-100 rounded-top" alt="">
                                </div>
                            </RouterLink>
                            <div class="text-white bg-primary px-3 py-1 rounded position-absolute"
                                style="top: 10px; right: 10px;">
                                {{ product?.cat_name }}</div>
                            <div class="p-4 rounded-bottom">
                                <h4>{{ product?.pro_name }}</h4>
                                <p>{{ product?.pro_description }}</p>
                                <div class="d-flex justify-content-between flex-lg-wrap">
                                    <p class="text-dark fs-5 fw-bold mb-0">${{ product?.pro_price }} / {{
                                        product?.pro_quantity }}</p>
                                    <button @click="handleAddToCart(product)" href=""
                                        class="btn border border-secondary rounded-pill px-3 text-primary">
                                        <i class="fa fa-shopping-bag me-2 text-primary">
                                        </i>
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
    </div>
    <!-- Single Product End -->
</template>

<style scoped>
.rating-style {
    cursor: pointer;
}

.rating-style i:hover {
    cursor: pointer;
    color: #FFB524;
}

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
</style>../../store/taskStore