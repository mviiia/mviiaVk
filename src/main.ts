import './assets/main.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './router'
import axios from 'axios'

const router = createRouter({
    routes: routes,
    history: createWebHistory()
  });
  const instance = axios.create({
    baseURL: 'https://api.vk.com/method/'
});
const app = createApp(App);
const pinia = createPinia();
app
// .use(axios, { baseURL: 'https://api.vk.com/method/' })
.use(router)
.use(ElementPlus)
.use(pinia);
app.mount('#app');
