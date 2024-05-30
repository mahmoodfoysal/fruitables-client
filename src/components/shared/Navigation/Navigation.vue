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
        <div class="container topbar bg-primary d-none d-lg-block navbar-policy-style">
            <div class="d-flex justify-content-between">
                <div class="top-info ps-2">
                    <small class="me-3"><i class="fas fa-map-marker-alt me-2 text-secondary"></i> <a href="#"
                            class="text-white">Dhaka, Bangladesh</a></small>
                    <small class="me-3"><i class="fas fa-envelope me-2 text-secondary"></i><a href="#"
                            class="text-white">foysalcse033@gmail.com</a></small>
                </div>
                <div class="top-link pe-2">
                    <a href="#" class="text-white"><small class="text-white mx-2">Privacy Policy</small>/</a>
                    <a href="#" class="text-white"><small class="text-white mx-2">Terms of Use</small>/</a>
                    <a href="#" class="text-white"><small class="text-white ms-2">Sales and Refunds</small></a>
                </div>
            </div>
        </div>

        <div class="container px-0">
            <nav class="navbar navbar-light bg-white navbar-expand-xl navbar-style">
                <h1 @click="handleNavigate" class="text-primary display-6 logo-style">FruitBazar</h1>
                <img v-if="this.store.user !== null" :src="store.user.photoURL" alt="Avatar" class="mobile-avatar">
                <button class="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarCollapse">
                    <span class="fa fa-bars text-primary"></span>
                </button>
                <div class="collapse navbar-collapse bg-white" id="navbarCollapse">
                    <div class="navbar-nav mx-auto">
                        <RouterLink :to="{ name: 'Home' }">
                            <p class="nav-item nav-link">Home</p>
                        </RouterLink>
                        <RouterLink :to="{ name: 'Shop' }">
                            <p class="nav-item nav-link">Shop</p>
                        </RouterLink>
                        <p class="nav-item nav-link">About Us</p>
                        <!-- <div class="nav-item dropdown">
                            <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                            <div class="dropdown-menu m-0 bg-secondary rounded-0">
                                <a href="cart.html" class="dropdown-item">Cart</a>
                                <a href="chackout.html" class="dropdown-item">Chackout</a>
                                <RouterLink :to="{ name: 'Testimonial' }">
                                    <a href="" class="dropdown-item">Testimonial</a>
                                </RouterLink>
                                <a href="404.html" class="dropdown-item">404 Page</a>
                            </div>
                        </div> -->
                        <RouterLink :to="{ name: 'Contact' }">
                            <p class="nav-item nav-link">Contact</p>
                        </RouterLink>
                    </div>
                    <div class="d-flex m-3 me-0">

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

.avatar {
    vertical-align: middle;
    width: 41px;
    height: 41px;
    border-radius: 50%;
    margin-right: 16px;
}


@media only screen and (max-width: 2560px) {
    .navbar-toggler {
        display: none;
    }

    .navbar-style {
        line-height: 0 !important;
    }

    .mobile-avatar {
        display: none;
    }
}

@media only screen and (max-width: 1920px) {
    .navbar-toggler {
        display: none;
    }

    .navbar-style {
        line-height: 0 !important;
    }

    .mobile-avatar {
        display: none;
    }
}

@media only screen and (max-width: 1440px) {
    .navbar-toggler {
        display: none;
    }

    .navbar-style {
        line-height: 0 !important;
    }

    .mobile-avatar {
        display: none;
    }
}

@media only screen and (max-width: 1024px) {
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
}

@media only screen and (max-width: 768px) {
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
}

@media only screen and (max-width: 540px) {
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
}
</style>