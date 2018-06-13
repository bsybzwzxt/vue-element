/**
 * Created by zhangjuncheng on 2018/5/21.
 */

import Search from './table/Search.vue';
import Toolbar from './table/Toolbar.vue';
import Tabulation from './table/Tabulation.vue';
import Pagination from './table/Pagination.vue';


// 全局组件列表
const components = [
    Search,
    Toolbar,
    Tabulation,
    Pagination
];

exports.install = Vue => {
    // 加载全局组件
    components.map(component => {
        Vue.component(component.name, component);
    });
};