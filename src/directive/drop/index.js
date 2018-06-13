/**
 * Created by zhangjuncheng on 2018/6/8.
 */

exports.install = Vue => {
    Vue.directive('drop', {
        bind: function (el, binding, vnode) {
            let moveEl = el.firstElementChild;
            let start = {x: 0, y: 0, top: 0, left: 0};
            let firstMove = true;
            moveEl.addEventListener('mousedown', function (event) {
                event.preventDefault && event.preventDefault();
                el.style.setProperty('overflow', 'hidden', 'important');
                if (firstMove) {
                    moveEl.style.setProperty('transform', 'translate(0)', 'important');
                    moveEl.style.setProperty('left', ((el.offsetWidth - moveEl.offsetWidth) / 2) + 'px', 'important');
                    moveEl.style.setProperty('top', ((el.offsetHeight - moveEl.offsetHeight) / 2) + 'px', 'important');
                    firstMove = false;
                }
                start = {x: event.pageX, y: event.pageY, left: moveEl.offsetLeft, top: moveEl.offsetTop};
                window.addEventListener('mousemove', mouseMove, false);
                window.addEventListener('mouseup', mouseUp, false);
            }, false);
            const mouseMove = function (event) {
                moveEl.style.setProperty('left', (start.left + event.pageX - start.x) + 'px', 'important');
                moveEl.style.setProperty('top', (start.top + event.pageY - start.y) + 'px', 'important');
                if (moveEl.offsetTop < 0) {
                    moveEl.style.setProperty('top', '0', 'important');
                }
                if (moveEl.offsetLeft < 0) {
                    moveEl.style.setProperty('left', '0', 'important');
                }
                if (moveEl.offsetTop + moveEl.offsetHeight > el.offsetHeight) {
                    moveEl.style.setProperty('top', (el.offsetHeight - moveEl.offsetHeight) + 'px', 'important');
                }

                if (moveEl.offsetLeft + moveEl.offsetWidth > el.offsetWidth) {
                    moveEl.style.setProperty('left', (el.offsetWidth - moveEl.offsetWidth) + 'px', 'important');
                }
            };
            const mouseUp = function (event) {
                start = {x: 0, y: 0, top: 0, left: 0};
                el.style.removeProperty('overflow');
                window.removeEventListener('mousemove', mouseMove, false);
                window.removeEventListener('mouseup', mouseUp, false);
            };
        }
    });
};