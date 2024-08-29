import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/global.css'
// import { library } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-free/js/all'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
