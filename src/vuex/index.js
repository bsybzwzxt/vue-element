import Vue from 'vue'
import Vuex from 'vuex'
import {mapState} from 'vuex'

Vue.use(Vuex);

import user from './framework/user'
import layout from './framework/layout'
import table from './framework/table'
import project from './project/project'

export default new Vuex.Store({
    modules: {
        user,
        layout,
        table,
        project
    }
})

// vuex状态全局混合
Vue.mixin({
    computed: {
        ...mapState({
            $state: state => state
        })
    }
});