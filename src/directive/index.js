/**
 * Created by zhangjuncheng on 2017/5/21.
 */
// echarts图表
// import echarts from './echarts';
// 表单验证
import validate from './validate';
// 滚动
import scroll from './scroll';

// 全局自定义指令列表
const directiveList = [
    // echarts,
    validate,
    scroll
];

exports.install = Vue => {
    // 加载全局自定义指令
    directiveList.map(directive => {
        Vue.use(directive);
    });
};


