/**
 * Created by zhangjuncheng on 2017/12/7.
 */

// npm install echarts -dev--save
import echarts from 'echarts';

exports.install = Vue => {
    Vue.directive('echarts', {
        inserted: function (el) {
            el.style.width = el.style.width || '100%';
            el.style.height = el.style.height || '240px';
            el.echarts = echarts.init(el);
            window.addEventListener("resize", () => {
                el.echarts.resize();
            }, false);
        },
        update: function (el, binding) {
            el.echarts.setOption(binding.value);
            el.echarts.resize();
        }
    });
};