/**
 * Created by zhangjuncheng on 2018/9/4.
 */
let lazyLoad;
export default {
    inserted: function (el, binding) {
        lazyLoad = function () {
            if (el.offsetHeight + el.scrollTop > el.scrollHeight - (binding.value.distance || 100)) {
                throttle(() => {
                    binding.value.callback && binding.value.callback();
                })();
            }
        };
        el.addEventListener('mousewheel', lazyLoad, false);
        el.addEventListener('scroll', lazyLoad, false);
    },
    unbind: function (el) {
        el.removeEventListener('mousewheel', lazyLoad, false);
        el.removeEventListener('scroll', lazyLoad, false);
    }
};

let throttleSwitch = false;
const throttle = function (callback, wait = 1000) {
    return function () {
        if (throttleSwitch) {
            return;
        }
        throttleSwitch = true;
        callback.apply(this, arguments);
        setTimeout(() => {
            throttleSwitch = false;
        }, wait);
    }
};