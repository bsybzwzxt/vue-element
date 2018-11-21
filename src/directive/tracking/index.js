/**
 * Created by zhangjuncheng on 2018/2/28.
 */
let trackingClick;
exports.install = Vue => {
    Vue.directive('tracking', {
        bind: function (el, binding) {
            trackingClick = function () {
                let name = binding.arg[0].toUpperCase() + binding.arg.substring(1, binding.arg.length);
                let count = Number(localStorage.getItem('tracking' + name));
                if (count) {
                    localStorage.setItem('tracking' + name, count + 1);
                } else {
                    localStorage.setItem('tracking' + name, 1);
                }
            };
            el.addEventListener('click', trackingClick, false);
        },
        unbind: function (el) {
            el.removeEventListener('click', trackingClick, false)
        }
    });
};