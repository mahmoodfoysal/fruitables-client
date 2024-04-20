import { createWebHistory, createRouter } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../Home/Home.vue')
    },
    {
        path: '/shop',
        name: 'Shop',
        component: () => import('../Shop/Shop.vue')
    },
    {
        path: '/contact',
        name: 'Contact',
        component: () => import('../Contact/Contact.vue')
    },
    {
        path: '/testimonial',
        name: 'Testimonial',
        component: () => import('../Testimonial/Testimonial.vue')
    },
    {
        path: '/cart',
        name: 'Cart',
        component: () => import('../OrderSteps/Cart/Cart.vue')
    },
    {
        path: '/product/:id',
        name: 'ProductDetails',
        component: () => import('../ProductDetails/ProductDetails.vue')
    },
    {
        path: '/check-out',
        name: 'CheckOut',
        component: () => import('../OrderSteps/CheckOut/CheckOut.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../NotFound/NotFound.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;