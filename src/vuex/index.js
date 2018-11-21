import Vue from 'vue'
import Vuex from 'vuex'
import {mapState} from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loading: false,
        // 用户信息
        user: {
            account: '',
            name: '',
            avatar: ''
        },
        // 用户权限
        access: {}
    },
    mutations: {
        // 更改用户权限
        setAccess(state, params) {
            for (let item of params.accessList) {
                state.access[item[params.key]] = true;
            }
        }
    }
});

// vuex状态全局混合
Vue.use(Vue => {
    Vue.mixin({
        computed: {
            ...mapState({
                $state: state => state
            })
        }
    });
});