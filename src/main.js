import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import './router/permit'
import store from './store'
import svgIcon from './components/svgIcon'
import '@/components/svgIcon/svg.js'
import Global from '@u/global'
const app = createApp(App)
app.config.globalProperties.$axios = axios
app.use(store).use(router).use(Global).component('svg-icon', svgIcon).mount('#app')
