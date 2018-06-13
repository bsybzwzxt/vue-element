import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

import MainLayout from './main/Layout'

// Webpack 将相同 chunk 下的所有异步模块打包到一个异步块里面
const route = {
    Login: resolve => require.ensure([], () => resolve(require('src/vue/Login')), 'vue/Login'),
    Error: resolve => require.ensure([], () => resolve(require('src/vue/Error')), 'vue/Error'),
    DemoTable: resolve => require.ensure([], () => resolve(require('src/vue/demo/Table')), 'vue/demo/Table'),
};

export default new Router({
    // mode: 'history',
    routes: [{
        path: '/main',
        component: MainLayout,
        children: [{
            path: 'demo/table', component: route.DemoTable
        }]
    }, {
        path: '/login', component: route.Login
    }, {
        path: '/', component: route.Login
    }, {
        path: '*', component: route.Error
    }]
})