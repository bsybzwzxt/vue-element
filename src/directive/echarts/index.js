/**
 * Created by zhangjuncheng on 2017/12/7.
 */

// npm install echarts -dev--save
import echarts from 'echarts';

let echartsResize;
export default {
    inserted: function (el) {
        el.style.width = el.style.width || '100%';
        el.style.height = el.style.height || '240px';
        el.echarts = echarts.init(el);
        echartsResize = function () {
            el.echarts.resize();
        };
        window.addEventListener('resize', echartsResize, false);
    },
    update: function (el, binding) {
        el.echarts.setOption(binding.value);
        el.echarts.resize();
    },
    unbind: function () {
        window.removeEventListener('resize', echartsResize, false)
    }
};