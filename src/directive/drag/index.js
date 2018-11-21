/**
 * Created by zhangjuncheng on 2018/2/28.
 */
let mouseDown, mouseMove, mouseUp;
export default {
    inserted: function (el, binding) {
        let start = {x: 0, y: 0, top: 0, left: 0};
        el.parentNode.style.setProperty('position', 'relative');
        el.parentNode.style.setProperty('display', 'inline-block');
        el.style.setProperty('position', 'absolute', 'important');
        el.style.setProperty('cursor', 'move');
        if (binding.value) {
            el.style.setProperty('left', binding.value.left + 'px');
            el.style.setProperty('top', binding.value.top + 'px');
        }
        mouseDown = function (event) {
            event.preventDefault && event.preventDefault();
            start = {x: event.pageX, y: event.pageY, left: el.offsetLeft, top: el.offsetTop};
            window.addEventListener('mousemove', mouseMove, false);
            window.addEventListener('mouseup', mouseUp, false);
        };
        mouseMove = function (event) {
            el.style.setProperty('left', (start.left + event.pageX - start.x) + 'px');
            el.style.setProperty('top', (start.top + event.pageY - start.y) + 'px');
            if (el.offsetTop < 0) {
                el.style.setProperty('top', '0');
            }
            if (el.offsetLeft < 0) {
                el.style.setProperty('left', '0');
            }
            if (el.offsetTop + el.offsetHeight > el.parentNode.offsetHeight) {
                el.style.setProperty('top', (el.parentNode.offsetHeight - el.offsetHeight) + 'px');
            }
            if (el.offsetLeft + el.offsetWidth > el.parentNode.offsetWidth) {
                el.style.setProperty('left', (el.parentNode.offsetWidth - el.offsetWidth) + 'px');
            }
            if (binding.value) {
                binding.value.top = el.offsetTop;
                binding.value.left = el.offsetLeft;
            }
        };
        mouseUp = function () {
            start = {x: 0, y: 0, top: 0, left: 0};
            window.removeEventListener('mousemove', mouseMove, false);
            window.removeEventListener('mouseup', mouseUp, false);
        };
        el.addEventListener('mousedown', mouseDown, false);
    },
    unbind: function (el) {
        el.removeEventListener('mousedown', mouseDown, false);
        window.removeEventListener('mousemove', mouseMove, false);
        window.removeEventListener('mouseup', mouseUp, false);
    }
};