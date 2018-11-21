/**
 * Created by zhangjuncheng on 2018/2/12.
 */
import './index.css'
// 需要在v-scroll元素上加一层父级元素,用绝对定位定义滚动范围,默认class='scroll-layer'

let scrollResize, mouseScroll, mouseDown, mouseMove, mouseUp, transitionEnd;
export default {
    bind: function (el, binding, vnode) {
        scrollResize = function () {
            if (el.parentNode && el.offsetTop < el.parentNode.offsetHeight - el.offsetHeight) {
                el.style.top = (el.parentNode.offsetHeight - el.offsetHeight > 0 ? 0 : el.parentNode.offsetHeight - el.offsetHeight) + 'px';
            }
        };
        window.addEventListener("resize", scrollResize, false);
        // 滚动
        // 滚动距离
        const OFFSET_DISTANCE = 50;
        mouseScroll = function (event) {
            let distance = el.parentNode.offsetHeight - el.offsetHeight;
            if (distance < 0) {
                if ((event.wheelDelta && event.wheelDelta < 0) || (event.detail && event.detail > 0)) {
                    el.style.top = (el.offsetTop - OFFSET_DISTANCE < distance ? distance : el.offsetTop - OFFSET_DISTANCE) + 'px';
                }
                if ((event.wheelDelta && event.wheelDelta > 0) || (event.detail && event.detail < 0)) {
                    el.style.top = (-el.offsetTop > OFFSET_DISTANCE ? el.offsetTop + OFFSET_DISTANCE : 0) + 'px';
                }
            } else {
                el.style.top = '0px';
            }
        };
        el.addEventListener('mousewheel', mouseScroll, {passive: false});
        el.addEventListener('DOMMouseScroll', mouseScroll, false);
        if (binding.arg === 'drop') {
            // 拖动
            let start = {x: 0, y: 0, top: 0};
            mouseDown = function (event) {
                removeClass(el, 'scroll-mouseup-transition');
                start = {x: event.pageX, y: event.pageY, top: el.offsetTop};
                window.addEventListener('mousemove', mouseMove, false);
                window.addEventListener('mouseup', mouseUp, false);
            };
            mouseMove = function (event) {
                if (Math.abs(event.pageY - start.y) > 10) {
                    el.style.top = (start.top + event.pageY - start.y) + 'px';
                }
            };
            mouseUp = function () {
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
            transitionEnd = function (event) {
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
            el.addEventListener('mousedown', mouseDown, false);
        }
    },
    unbind: function (el) {
        window.removeEventListener("resize", scrollResize, false);
        el.removeEventListener('mousewheel', mouseScroll, false);
        el.removeEventListener('DOMMouseScroll', mouseScroll, false);
        el.removeEventListener('mousedown', mouseDown, false);
        window.removeEventListener('mousemove', mouseMove, false);
        window.removeEventListener('mouseup', mouseUp, false);
        el.removeEventListener('transitionend', transitionEnd, false);
    }
};

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