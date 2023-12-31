import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: () => import('../views/Home.vue')},
        {path: '/register', component: () => import('../views/Register.vue')},
        {path: '/sign-in', component: () => import('../views/SignIn.vue')},
        {
            path: '/type-test', 
            component: () => import('../views/TypeTest.vue'),
            meta: { 
                requiresAuth: true
            },
        },
    ],
});

router.beforeEach((to, from, next) => {
    const auth = getAuth();

    if (to.meta.requiresAuth) {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                next();
            } else {
                next('/');
            }
        });
    } else {
        next();
    }
});

export default router;