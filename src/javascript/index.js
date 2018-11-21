/**
 * Created by zhangjuncheng on 2018/5/18.
 */
// 框架js
import utils from './framework/utils';
import custom from './framework/custom';

// 项目类
// 接口地址
import api from './project/api';

exports.install = Vue => {
    // 加载框架js
    Vue.use(utils);
    Vue.use(custom);
    // 加载项目js
    Vue.use(api);
};

