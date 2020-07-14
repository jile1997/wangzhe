import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.config.productionTip = false
import './style.css'

import http from './http'
Vue.prototype.$http = http

Vue.mixin({
    computed: {
        uploadUrl() {
            return this.$http.defaults.baseURL + '/upload'
        }
    },
    methods: {
        getAuthHeaders() {
            return {
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`
            }
        }
    }
})
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')