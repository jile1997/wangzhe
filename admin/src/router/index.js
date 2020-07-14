import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'



Vue.use(VueRouter)

const routes = [{
            path: '/',
            redirect: { name: 'index' }
        },
        {
            path: '/login',
            name: 'login',
            component: () =>
                import ('../views/login.vue'),
            meta: { islogin: true }
        },
        {

            path: '/',
            name: 'main',
            component: Main,
            children: [

                {
                    path: '/edit/fl',

                    component: () =>
                        import ('../views/Editfl.vue')
                },
                {
                    path: '/edit/fl/:id',
                    component: () =>
                        import ('../views/Editfl.vue'),
                    props: true
                },
                {
                    path: "/cat/lb",
                    component: () =>
                        import ("@/views/Catlb")

                },


                {
                    path: '/item/fl',
                    component: () =>
                        import ('@/views/Itemfl')
                },
                {
                    path: '/item/fl/:id',
                    component: () =>
                        import ('@/views/Itemfl'),
                    props: true
                },
                {
                    path: '/item/lb',
                    name: "index",
                    component: () =>
                        import ('@/views/Itemlb')
                },
                {
                    path: '/hero/fl',
                    component: () =>
                        import ('@/views/herofl')
                },
                {
                    path: '/hero/fl/:id',
                    component: () =>
                        import ('@/views/herofl'),
                    props: true
                },
                {
                    path: '/hero/lb',
                    component: () =>
                        import ('@/views/herolb')
                },

                {
                    path: '/article/fl',
                    component: () =>
                        import ('@/views/articlefl')
                },
                {
                    path: '/article/fl/:id',
                    component: () =>
                        import ('@/views/articlefl'),
                    props: true
                },
                {
                    path: '/article/lb',
                    component: () =>
                        import ('@/views/articlelb')
                },
                {
                    path: '/ads/fl',
                    component: () =>
                        import ('@/views/adsfl')
                },
                {
                    path: '/ads/fl/:id',
                    component: () =>
                        import ('@/views/adsfl'),
                    props: true
                },
                {
                    path: '/ads/lb',
                    component: () =>
                        import ('@/views/adslb')
                },
                {
                    path: '/admin/fl',
                    component: () =>
                        import ('@/views/adminfl')
                },
                {
                    path: '/admin/fl/:id',
                    component: () =>
                        import ('@/views/adminfl'),
                    props: true
                },
                {
                    path: '/admin/lb',
                    component: () =>
                        import ('@/views/adminlb')
                },
            ]
        }
    ]
    // 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}



const router = new VueRouter({
    routes

})
router.beforeEach((to, from, next) => {
    if (!to.meta.islogin && !localStorage.getItem('token')) {
        return next('/login')
    }
    next()
})
export default router