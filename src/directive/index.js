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
const directives = [
    validate,
    tracking,
    elDialogMove
];

export default directives;