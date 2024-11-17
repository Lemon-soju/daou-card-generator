import { createRouter, createWebHistory } from 'vue-router';
import IntroPage from '@/components/IntroPage.vue';

const routes = [
    { path: '/', name: 'intro', component: IntroPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
