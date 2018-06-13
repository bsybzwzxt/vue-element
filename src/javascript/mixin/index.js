/**
 * Created by zhangjuncheng on 2018/5/31.
 */
// 全局混合
import {mapState} from 'vuex'

exports.install = Vue => {

    // vuex状态管理
    Vue.mixin({
        computed: {
            ...mapState({
                $state: state => state
            })
        }
    });
};