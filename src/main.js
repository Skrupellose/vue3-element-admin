import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import svgIcon from './components/svgIcon'
import '@/components/svgIcon/svg.js'
const app = createApp(App)
app.config.globalProperties.$axios = axios
app.use(store).use(router).component('svg-icon', svgIcon).mount('#app')
