import Vue from 'vue'
import Router from 'vue-router'
import store from 'src/vuex'

Vue.use(Router);

import MainLayout from './main/Layout'

// Webpack 将相同 chunk 下的所有异步模块打包到一个异步块里面
const route = {
    Login: resolve => require.ensure([], () => resolve(require('src/vue/Login')), 'vue/Login'),
    Error: resolve => require.ensure([], () => resolve(require('src/vue/Error')), 'vue/Error'),
    DemoTable: resolve => require.ensure([], () => resolve(require('src/vue/demo/Table')), 'vue/demo/Table'),
    // 权限控制
    AccessAccessTable: resolve => require.ensure([], () => resolve(require('src/vue/access/AccessTable')), 'vue/access/AccessTable'),
    AccessRoleTable: resolve => require.ensure([], () => resolve(require('src/vue/access/RoleTable')), 'vue/access/RoleTable'),
    AccessUserTable: resolve => require.ensure([], () => resolve(require('src/vue/access/UserTable')), 'vue/access/UserTable'),
};

const router = new Router({
    // mode: 'history',
    routes: [{
        path: '/main',
        component: MainLayout,
        children: [{
            path: 'demo/table', component: route.DemoTable
        }, {
            // 权限控制
            path: 'access/access/table', component: route.AccessAccessTable
        }, {
            path: 'access/role/table', component: route.AccessRoleTable
        }, {
            path: 'access/user/table', component: route.AccessUserTable
        }]
    }, {
        path: '/login', component: route.Login
    }, {
        path: '/', component: route.Login
    }, {
        path: '*', component: route.Error
    }]
});


let accessPage = ['/main/access/user/table', '/main/access/access/table', '/main/access/role/table'];

router.beforeEach((to, from, next) => {
    // 监听权限
    store.state.user.access = new Proxy(store.state.user.access, {
        set: function (target, key, value) {
            target[key] = value;
            interceptor(key, to.path, next);
            return true;
        }
    });
    if (JSON.stringify(store.state.user.access) !== '{}') {
        for (let item in store.state.user.access) {
            interceptor(item, to.path, next);
        }
    } else {
        next();
    }
});

const interceptor = (access, toPath, next) => {
    let pass = (accessPage.length === 0);
    for (let path of accessPage) {
        if (accessPage.indexOf(toPath) === -1 || (path === access && path === toPath)) {
            pass = true;
        }
    }
    next(pass);
};

export default router;