import axios from 'axios'
import Vue from 'vue'
import router from './router/index'
const http = axios.create({
        baseURL: 'http://localhost:3000/admin/api'
    })
    // 请求拦截器
http.interceptors.request.use((config) => {
    let token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = 'Bearer ' + token
    }
    return config;
}, function(error) {
    // Do something with request error
    return Promise.reject(error);
});

// 响应拦截器
http.interceptors.response.use(res => {
    return res
}, err => {
    // console.log(err.response.data)
    if (err.response.data.msg) {
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data.msg
        })
        if (err.response.status === 401) {
            router.push('/login')
        }
    }
    return Promise.reject(err)
})
export default http;