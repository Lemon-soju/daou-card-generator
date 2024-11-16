import { createRouter, createWebHistory } from 'vue-router';
import IntroPage from '@/components/IntroPage.vue';
import EmojiSelectionPage from '@/components/EmojiSelectionPage.vue';
import ResultPage from '@/components/ResultPage.vue';

const routes = [
    { path: '/', name: 'intro', component: IntroPage },
    // { path: '/pick', name: 'pick', component: NameInputPage },
    { path: '/emoji/:userName', name: 'emoji', component: EmojiSelectionPage },  // :userName 파라미터 추가
    { path: '/result', name: 'result', component: ResultPage }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
