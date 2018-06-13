import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loading: false,
        // 用户信息
        user: {
            name: '',
            avatar: ''
        },
        // 用户权限
        access: {}
    },
    mutations: {
        // 更改用户权限
        setAccess(state, params) {
            state.access = {};
            for (let item of params.accessList) {
                state.access[item[params.key]] = true;
            }
        }
    }
});
