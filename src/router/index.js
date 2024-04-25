import { getAuth } from 'firebase/auth';
import { createWebHistory, createRouter } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../components/Home/Home.vue')
    },
    {
        path: '/shop',
        name: 'Shop',
        component: () => import('../components/Shop/Shop.vue')
    },
    {
        path: '/contact',
        name: 'Contact',
        component: () => import('../components/Contact/Contact.vue')
    },
    {
        path: '/testimonial',
        name: 'Testimonial',
        component: () => import('../components/Testimonial/Testimonial.vue')
    },
    {
        path: '/cart',
        name: 'Cart',
        component: () => import('../components/OrderSteps/Cart/Cart.vue')
    },
    {
        path: '/product/:id',
        name: 'ProductDetails',
        component: () => import('../components/ProductDetails/ProductDetails.vue')
    },
    {
        path: '/check-out',
        name: 'CheckOut',
        component: () => import('../components/OrderSteps/CheckOut/CheckOut.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/registration',
        name: 'Registration',
        component: () => import('../components/Authentication/Registration/Registration.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../components/Authentication/Login/Login.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../components/NotFound/NotFound.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active-link-style'
});

router.beforeEach((to, from, next) => {
    const auth = getAuth();
    if (to.meta.requiresAuth) {
      if (auth.currentUser) {
        next();
      } 
      else {
        next('/login');
      }
    } else {
      next();
    }
  });

export default router;