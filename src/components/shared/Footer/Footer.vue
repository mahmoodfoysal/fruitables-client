<script>
import axios from 'axios';

export default {
    name: 'Footer',
    data() {
        return {
            email: null,
        }
    },
    mounted() {

    },
    methods: {
        async handleSubscribe() {
            try {
                if(!this.email) {
                    alert("Please Give Your Email Address")
                    return;
                }
                const text = "Are You Sure Want To Subscribe...?"
                if (confirm(text) == true) {
                    const result = await axios.post('https://fruitable.onrender.com/promotionalMail', {
                        email: this.email

                    })
                    console.log(result);
                    if (result.status === 200) {
                        alert("Successful!!!");
                        this.email = "";
                    }
                }

            }
            catch (error) {
                console.log(error);
            }
        }
    }
}
</script>

<template>
    <!-- Footer Start -->
    <div class="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
        <div class="container py-5 container-style">
            <div class="pb-4 mb-4" style="border-bottom: 1px solid rgba(226, 175, 24, 0.5) ;">
                <div class="row g-4">
                    <div class="col-lg-3 text-style">
                        <a href="#">
                            <h1 class="text-primary mb-0">FruitBazar</h1>
                            <p class="text-secondary mb-0">Fresh products</p>
                        </a>
                    </div>
                    <div class="col-lg-6">
                        <div class="position-relative mx-auto form-style">
                            <input v-model="email" class="form-control border-0 w-100 py-3 px-4 rounded-pill"
                                type="email" placeholder="Your Email">
                            <button @click="handleSubscribe" type="submit"
                                class="btn btn-primary border-0 border-secondary py-3 px-4 position-absolute rounded-pill text-white"
                                style="top: 0; right: 0;">Subscribe Now</button>
                        </div>
                    </div>
                    <div class="col-lg-3 text-style">
                        <div class="d-flex justify-content-end pt-3">
                            <a target="_blank" class="btn btn-outline-secondary me-2 btn-md-square rounded-circle"
                                href="https://www.facebook.com/foysal.mahmood.1/"><i class="fab fa-facebook-f"></i></a>
                            <a target="_blank" class="btn btn-outline-secondary me-2 btn-md-square rounded-circle"
                                href="https://github.com/mahmoodfoysal"><i class="fab fa-github"></i></a>
                            <a target="_blank" class="btn btn-outline-secondary btn-md-square rounded-circle me-2"
                                href="https://www.linkedin.com/in/foysalmahmood/"><i class="fab fa-linkedin-in"></i></a>
                            <a target="_blank" class="btn btn-outline-secondary btn-md-square rounded-circle me-2"
                                href="https://twitter.com/mahmoodfoysal"><i class="fab fa-twitter"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row g-5">
                <div class="col-lg-3 col-md-6">
                    <div class="footer-item text-style">
                        <h4 class="text-light mb-3">Why People Like us!</h4>
                        <p class="mb-4">FruitBazar is one of most popular and authentic e-commerce site for selling
                            fruits and vegetables. We sell organic fruits and vegetables. We delever our product in the
                            client hand a short time period.</p>
                        <!-- <a href="#" class="btn border-secondary py-2 px-4 rounded-pill text-primary">Read More</a> -->
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="d-flex flex-column text-start footer-item text-style">
                        <h4 class="text-light mb-3">Account</h4>
                        <a class="btn-link" href="">My Account</a>
                        <a class="btn-link" href="">Shop details</a>
                        <a class="btn-link" href="">Shopping Cart</a>
                        <a class="btn-link" href="">Wishlist</a>
                        <a class="btn-link" href="">Order History</a>

                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="d-flex flex-column text-start footer-item text-style">
                        <h4 class="text-light mb-3">Shop Info</h4>
                        <a class="btn-link" href="">About Us</a>
                        <a class="btn-link" href="">Contact Us</a>
                        <a class="btn-link" href="">Privacy Policy</a>
                        <a class="btn-link" href="">Terms & Condition</a>
                        <a class="btn-link" href="">Return Policy</a>
                        <a class="btn-link" href="">FAQs & Help</a>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6">
                    <div class="footer-item text-style">
                        <h4 class="text-light mb-3">Contact</h4>
                        <p>Address: Dhaka, Bangladesh</p>
                        <p>Email: foysalcse033@gmail.com</p>
                        <p>Phone: +8801911756854</p>
                        <p>Payment Accepted</p>
                        <img src="/src/assets/img/payment.png" class="img-fluid" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Footer End -->

    <!-- Copyright Start -->
    <div class="container-fluid copyright bg-dark py-4">
        <div class="container">
            <div class="row copy-dev-style">
                <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
                    <span class="text-light"><a href="#"><i class="fas fa-copyright text-light me-2"></i>FruitBazar</a>,
                        All right reserved.</span>
                </div>
                <div class="col-md-6 my-auto text-center text-md-end text-white">
                    <!-- Designed By <a class="border-bottom" href="https://htmlcodex.com">HTML Codex</a>  -->
                    
                    Developed By <a
                        class="border-bottom" href="https://foysal-portfolio.netlify.app/">Foysal Mahmood</a>
                </div>
            </div>
        </div>
    </div>
    <!-- Copyright End -->
</template>

<style scoped>
.form-style input {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}
.form-style button {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}
.form-style a {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}

.text-style h1 {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}
.text-style h4 {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}
.text-style p {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}

.copy-dev-style span {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}
.copy-dev-style a {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}
.copy-dev-style div {
    font-family: "Poppins", sans-serif;
    font-style: normal;
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