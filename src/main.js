import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // 라우터를 불러옵니다

createApp(App).use(router).mount('#app');  // 라우터를 Vue 앱에 연결합니다
