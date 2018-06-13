/**
 * Created by zhangjuncheng on 2018/5/18.
 */
// 全局混合
import mixin from './mixin';
// 全局工具类
import utils from './utils';
// 全局函数
import custom from './custom';
// 接口地址
import api from './api';

exports.install = Vue => {
    // 加载全局混合
    Vue.use(mixin);
    // 加载全局工具类
    Vue.use(utils);
    // 加载全局函数
    Vue.use(custom);
    // 加载接口地址
    Vue.use(api);
};

