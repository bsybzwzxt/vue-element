/**
 * Created by zhangjuncheng on 2017/12/11.
 */
import './index.css'

exports.install = Vue => {

    Vue.directive('validate', {
        bind: function (el, binding, vnode) {
            if (binding.value.rule) {
                el.validate = binding.value;
                el.addEventListener('focus', function () {
                    removeClass(el, 'validate-error');
                }, true);
            }
            if (binding.value.blur) {
                el.addEventListener('blur', function () {
                    let value = el.__vue__ ? el.__vue__.value : el.value;
                    if (!analysis(value, el.validate.rule.split(','))) {
                        addClass(el, 'validate-error');
                        Vue.prototype.$message({message: el.validate.msg || '校验不通过', type: 'error'});
                    } else {
                        removeClass(el, 'validate-error');
                    }
                }, true);
            }
            if (binding.arg === 'submit') {
                Vue.prototype.$nextTick(() => {
                    let form = vnode.context.$refs[binding.value.form].$el || vnode.context.$refs[binding.value.form];
                    vnode.context.$refs[binding.value.form].resetForm = () => {
                        for (let item of getValidateElement(form)) {
                            removeClass(item, 'validate-error');
                        }
                    };
                    el.addEventListener('click', function () {
                        let elements = getValidateElement(form);
                        let canPass = true;
                        let errorMsg = '';
                        for (let item of elements) {
                            let value = item.__vue__ ? item.__vue__.value : item.value;
                            if (!analysis(value, item.validate.rule.split(','))) {
                                addClass(item, 'validate-error');
                                errorMsg += item.validate.msg + '~';
                                canPass = false;
                            } else {
                                removeClass(item, 'validate-error');
                            }
                        }
                        if (canPass) {
                            binding.value.submit();
                        } else {
                            Vue.prototype.$message({message: errorMsg || '校验不通过', type: 'error'});
                        }
                    })
                });
            }
        },
        update: function (el, binding, vnode) {
            if (binding.value.rule) {
                el.validate = binding.value;
            }
        }
    });

    const getValidateElement = form => {
        let elements = [];
        for (let item of form.children) {
            if (item.validate) {
                elements.push(item)
            }
            elements = elements.concat(getValidateElement(item));
        }
        return elements;
    };

    const analysis = (value, rule) => {
        for (let item of rule) {
            if (!inspect(value, item.trim())) {
                return false;
            }
        }
        return true;
    };

    const inspect = (value, rule) => {
        let data = '';
        if (rule.indexOf(':') !== -1) {
            data = rule.split(':')[1];
            rule = rule.split(':')[0];
        }
        switch (rule) {
            case 'required':
                if (value.length === 0) {
                    return false;
                }
                break;
            case 'number':
                if (!/^[0-9]*$/.test(value)) {
                    return false;
                }
                break;
            case 'max':
                if (Number(value) > Number(data)) {
                    return false;
                }
                break;
            case 'min':
                if (Number(value) < Number(data)) {
                    return false;
                }
                break;
            case 'phone':
                if (!/^1[3|4|5|7|8][0-9]{9}$/.test(value)) {
                    return false;
                }
                break;
        }
        return true;
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
};