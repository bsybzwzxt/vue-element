/**
 * Created by zhangjuncheng on 2017/5/21.
 */

// 表单验证
import validate from './validate';
// 埋点
import tracking from './tracking';
// el弹窗移动
import elDialogMove from './elDialogMove';
// 全局自定义指令列表
const directiveList = [
    validate,
    tracking,
    elDialogMove
];

exports.install = Vue => {
    // 加载全局自定义指令
    directiveList.map(directive => {
        Vue.use(directive);
    });
};
