<script>
import { useStore } from '../../../store/taskStore.js';
import { RouterLink } from 'vue-router'
import { getAuth, signOut } from "firebase/auth";
import initilizationAuthentication from '@/firebase/firebase.init';
initilizationAuthentication()
const auth = getAuth();
export default {
    name: 'Navigation',
    data() {
        return {
            store: useStore(),
            cartItem: this.store?.cartItem
        }
    },
    created() {
        // console.log(this.store.cartItem)
    },
    methods: {
        handleLogOut() {
            signOut(auth).then(() => {
                sessionStorage.removeItem('user');
                this.store.setUser(null);
            }).catch((error) => {

            });
        },
        handleNavigate() {
            this.$router.push('/')
        }
    },
    computed: {
        cartCount() {
            return Object.values(this.store.cartItem).length || 0
        }
    }
}
</script>

<template>
    <!-- Navbar start -->
    <div class="container-fluid fixed-top">
        <div class="container topbar bg-primary d-none d-lg-block navbar-policy-style container-style">
            <div class="d-flex justify-content-between">
                <div class="top-info ps-2 topbar-style">
                    <small class="me-3"><i class="fas fa-map-marker-alt me-2 text-secondary"></i> <a href="#"
                            class="text-white">Dhaka, Bangladesh</a></small>
                    <small class="me-3"><i class="fas fa-envelope me-2 text-secondary"></i><a href="#"
                            class="text-white">foysalcse033@gmail.com</a></small>
                </div>
                <div class="top-link pe-2 topbar-style">
                    <a href="#" class="text-white"><small class="text-white mx-2">Privacy Policy</small>/</a>
                    <a href="#" class="text-white"><small class="text-white mx-2">Terms of Use</small>/</a>
                    <a href="#" class="text-white"><small class="text-white ms-2">Sales and Refunds</small></a>
                </div>
            </div>
        </div>

        <div class="container px-0 container-style">
            <nav class="navbar navbar-light bg-white navbar-expand-xl navbar-style topbar-style">
                <h1 @click="handleNavigate" class="text-primary display-6 logo-style">FruitBazar</h1>
                <div class="d-flex">
                    <a href="#" class="position-relative my-auto mobile-cart">
                            <RouterLink :to="{ name: 'Cart' }">
                                <i class="fa fa-shopping-bag fa-2x"></i>
                            </RouterLink>
                            <RouterLink :to="{ name: 'Cart' }">
                                <span
                                    class="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                                    style="top: -5px; left: 15px; height: 20px; min-width: 20px;">{{ cartCount }}</span>
                            </RouterLink>
                        </a>
                <img v-if="this.store.user !== null" :src="store.user.photoURL" alt="Avatar" class="mobile-avatar ms-4">
                </div>
                
                <button class="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarCollapse">
                    <span class="fa fa-bars text-primary"></span>
                </button>
                <div class="collapse navbar-collapse bg-white" id="navbarCollapse">
                    <div class="navbar-nav mx-auto navbar-style">
                        <RouterLink :to="{ name: 'Home' }">
                            <p class="nav-item nav-link">Home</p>
                        </RouterLink>
                        <RouterLink :to="{ name: 'Shop' }">
                            <p class="nav-item nav-link">Shop</p>
                        </RouterLink>
                        <p class="nav-item nav-link">About Us</p>
                        <RouterLink :to="{ name: 'Contact' }">
                            <p class="nav-item nav-link">Contact</p>
                        </RouterLink>
                    </div>
                    <div class="d-flex m-3 me-0 navbar-style">

                        <!-- <button
                            class="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4"
                            data-bs-toggle="modal" data-bs-target="#searchModal"><i
                                class="fas fa-search text-primary"></i></button> -->
                        <a href="#" class="position-relative me-4 my-auto">
                            <RouterLink :to="{ name: 'Cart' }">
                                <i class="fa fa-shopping-bag fa-2x"></i>
                            </RouterLink>
                            <RouterLink :to="{ name: 'Cart' }">
                                <span
                                    class="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                                    style="top: -5px; left: 15px; height: 20px; min-width: 20px;">{{ cartCount }}</span>
                            </RouterLink>
                        </a>
                        <img v-if="this.store.user !== null" :src="store.user.photoURL" alt="Avatar" class="avatar">
                        <a href="#" class="my-auto">
                            <div v-if="this.store.user === null">
                                <RouterLink :to="{ name: 'Login' }">
                                    <i class="fas fa-user fa-2x"></i>
                                </RouterLink>
                            </div>

                            <h6 v-else @click="handleLogOut">Log Out</h6>

                        </a>
                    </div>
                </div>
            </nav>
        </div>
    </div>
    <!-- Navbar End -->
</template>

<style scoped>
.active-link-style p {
    color: #81c408 !important;
}

.logo-style {
    cursor: pointer;
}

.topbar-style h1 {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}
.topbar-style small {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}

.navbar-style p {
    font-family: "Poppins", sans-serif;
    font-style: normal;
    font-weight: 500;
}
.navbar-style h6 {
    font-family: "Poppins", sans-serif;
    font-style: normal;
}
.navbar-style h6:hover {
    font-family: "Poppins", sans-serif;
    font-style: normal;
    color: #81c408;
}

.avatar {
    vertical-align: middle;
    width: 41px;
    height: 41px;
    border-radius: 50%;
    margin-right: 16px;
}


@media only screen and (max-width: 2560px) {
    .container-style {
        max-width: 2300px;
        margin: auto;
    }
    .navbar-toggler {
        display: none;
    }

    .navbar-style {
        line-height: 0 !important;
    }

    .mobile-avatar {
        display: none;
    }
    .mobile-cart {
        display: none;
    }
}

@media only screen and (max-width: 1920px) {
    .container-style {
        max-width: 1800px;
        margin: auto;
    }
    .navbar-toggler {
        display: none;
    }

    .navbar-style {
        line-height: 0 !important;
    }

    .mobile-avatar {
        display: none;
    }
    .mobile-cart {
        display: none;
    }
}

@media only screen and (max-width: 1440px) {
    .container-style {
        max-width: 1300px;
        margin: auto;
    }
    .navbar-toggler {
        display: none;
    }

    .navbar-style {
        line-height: 0 !important;
    }

    .mobile-avatar {
        display: none;
    }
    .mobile-cart {
        display: none;
    }
}

@media only screen and (max-width: 1024px) {
    .container-style {
        max-width: 900px !important;
        margin: auto;
    }
    .navbar-toggler {
        display: block;
    }

    .navbar-style {
        line-height: 0 !important;
    }

    .mobile-avatar {
        display: none;
        vertical-align: middle;
        width: 41px;
        height: 41px;
        border-radius: 50%;
        margin-right: 16px;
    }
    .mobile-cart {
        display: none;
    }
}

@media only screen and (max-width: 768px) {
    .container-style {
        width: 100%;
    }
    .navbar-toggler {
        display: none;
    }

    .navbar-style {
        line-height: 0 !important;
        height: 62px !important;
    }

    .navbar-policy-style {
        display: none;
    }

    .mobile-avatar {
        display: block;
        vertical-align: middle;
        width: 41px;
        height: 41px;
        border-radius: 50%;
        margin-right: 16px;
    }
    .mobile-cart {
        display: block;
    }
}

@media only screen and (max-width: 540px) {
    .container-style {
        width: 100%;
    }
    .navbar-toggler {
        display: none;
    }

    .navbar-style {
        line-height: 0 !important;
        height: 62px !important;
    }

    .navbar-policy-style {
        display: none;
    }

    .mobile-avatar {
        display: block;
        vertical-align: middle;
        width: 41px;
        height: 41px;
        border-radius: 50%;
        margin-right: 16px;
    }
    .mobile-cart {
        display: block;
    }
}
</style>