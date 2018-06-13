/**
 * Created by zhangjuncheng on 2018/2/12.
 */
import './index.css'
// 需要在v-scroll元素上加一层父级元素,用绝对定位定义滚动范围,默认class='scroll-layer'

exports.install = Vue => {
    Vue.directive('scroll', {
        bind: function (el, binding, vnode) {
            window.addEventListener("resize", () => {
                if (el.offsetTop < el.parentNode.offsetHeight - el.offsetHeight) {
                    el.style.top = (el.parentNode.offsetHeight - el.offsetHeight > 0 ? 0 : el.parentNode.offsetHeight - el.offsetHeight) + 'px';
                }
            }, false);
            // 滚动
            // 滚动距离
            const OFFSET_DISTANCE = 50;
            const mouseScroll = function (event) {
                let distance = el.parentNode.offsetHeight - el.offsetHeight;
                if (distance < 0) {
                    if ((event.wheelDelta && event.wheelDelta < 0) || (event.detail && event.detail > 0)) {
                        el.style.top = (el.offsetTop - OFFSET_DISTANCE < distance ? distance : el.offsetTop - OFFSET_DISTANCE) + 'px';
                    }
                    if ((event.wheelDelta && event.wheelDelta > 0) || (event.detail && event.detail < 0)) {
                        el.style.top = (-el.offsetTop > OFFSET_DISTANCE ? el.offsetTop + OFFSET_DISTANCE : 0) + 'px';
                    }
                }
            };
            el.addEventListener('mousewheel', mouseScroll, false);
            el.addEventListener('DOMMouseScroll', mouseScroll, false);
            // 拖动
            let start = {x: 0, y: 0, top: 0};
            el.addEventListener('mousedown', function (event) {
                event.preventDefault && event.preventDefault();
                removeClass(el, 'scroll-mouseup-transition');
                start = {x: event.pageX, y: event.pageY, top: el.offsetTop};
                window.addEventListener('mousemove', mouseMove, false);
                window.addEventListener('mouseup', mouseUp, false);
            }, false);
            const mouseMove = function (event) {
                if (Math.abs(event.pageY - start.y) > 10) {
                    el.style.top = (start.top + event.pageY - start.y) + 'px';
                }
            };
            const mouseUp = function (event) {
                start = {x: 0, y: 0, top: 0};
                addClass(el, 'scroll-mouseup-transition');
                window.removeEventListener('mousemove', mouseMove, false);
                window.removeEventListener('mouseup', mouseUp, false);
                if (el.offsetTop > 0) {
                    el.style.top = 0;
                }
                if (el.offsetTop < el.parentNode.offsetHeight - el.offsetHeight) {
                    el.style.top = (el.parentNode.offsetHeight - el.offsetHeight > 0 ? 0 : el.parentNode.offsetHeight - el.offsetHeight) + 'px';
                }
                el.addEventListener('transitionend', transitionEnd, false);
            };
            const transitionEnd = function (event) {
                if (event.target === el && event.propertyName === 'top') {
                    removeClass(el, 'scroll-mouseup-transition');
                    el.removeEventListener('transitionend', transitionEnd, false);
                } else if (hasClass(event.target, 'el-menu')) {
                    removeClass(el, 'scroll-mouseup-transition');
                    if (el.offsetTop < el.parentNode.offsetHeight - el.offsetHeight) {
                        el.style.top = (el.parentNode.offsetHeight - el.offsetHeight > 0 ? 0 : el.parentNode.offsetHeight - el.offsetHeight) + 'px';
                    }
                    el.removeEventListener('transitionend', transitionEnd, false);
                }
            };
        }
    });

    const addClass = (element, className) => {
        if (hasClass(element, className)) {
            return;
        }
        element.className = (element.className + ' ' + className).trim();
    };

    const removeClass = (element, className) => {
        if (!hasClass(element, className)) {
            return;
        }
        element.className = (element.className.replace(className, ' ').replace(/(\s+)/gi, ' ')).trim();
    };

    const hasClass = (element, className) => {
        let cn = element.className.split(' ');
        for (let item of cn) {
            if (item === className) {
                return true;
            }
        }
        return false;
    };
};
