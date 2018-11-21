/**
 * Created by zhangjuncheng on 2017/12/11.
 */
import './index.css'

let validateFocus, validateBlur, validateClick;
exports.install = Vue => {
    Vue.directive('validate', {
        inserted: function (el, binding, vnode) {
            Vue.nextTick(() => {
                if (binding.value.rules) {
                    el.validate = binding.value;
                    validateFocus = function () {
                        removeClass(el, 'validate-error');
                    };
                    el.addEventListener('focus', validateFocus, true);
                }
                if (binding.value.blur) {
                    validateBlur = function () {
                        let value = el.__vue__ ? el.__vue__.value : el.value;
                        let result = analysis(value, el.validate.rules);
                        if (!result.result) {
                            addClass(el, 'validate-error');
                            Vue.prototype.$message({message: (result.msg || el.validate.msg) || '校验不通过', type: 'error'});
                        } else {
                            removeClass(el, 'validate-error');
                        }
                    };
                    el.addEventListener('blur', validateBlur, true);
                }
                if (binding.arg === 'submit') {
                    let form = vnode.context.$refs[binding.value.form].$el || vnode.context.$refs[binding.value.form];
                    vnode.context.$refs[binding.value.form].resetForm = () => {
                        for (let element of getValidateElement(form)) {
                            removeClass(element, 'validate-error');
                        }
                    };
                    validateClick = function () {
                        let elements = getValidateElement(form);
                        let canPass = true;
                        let errorElement = [];
                        let errorMsg = '';
                        for (let element of elements) {
                            let value = element.__vue__ ? element.__vue__.value : element.value;
                            let result = analysis(value, element.validate.rules);
                            if (!result.result) {
                                addClass(element, 'validate-error');
                                errorMsg += result.msg ? result.msg + ' & ' : (element.validate.msg ? element.validate.msg + ' & ' : '');
                                errorElement.push(element);
                                canPass = false;
                            } else {
                                removeClass(element, 'validate-error');
                            }
                        }
                        if (canPass) {
                            binding.value.success && binding.value.success();
                        } else {
                            binding.value.error && binding.value.error(errorElement);
                            Vue.prototype.$message({message: errorMsg.substring(0, errorMsg.length - 2) || '校验不通过', type: 'error'});
                        }
                    };
                    el.addEventListener('click', validateClick, false);
                }
            });
        },
        update: function (el, binding) {
            if (binding.value.rules) {
                el.validate = binding.value;
            }
        },
        unbind: function (el) {
            el.removeEventListener('focus', validateFocus, true);
            el.removeEventListener('blur', validateBlur, true);
            el.removeEventListener('click', validateClick, false);
        }
    });
};

const getValidateElement = form => {
    let elements = [];
    for (let element of form.children) {
        if (element.validate) {
            elements.push(element)
        }
        elements = elements.concat(getValidateElement(element));
    }
    return elements;
};

const analysis = (value, rules) => {
    for (let rule of rules) {
        if (!inspect(value, rule)) {
            return {result: false, msg: rule.msg};
        }
    }
    return {result: true};
};

const inspect = (value, rule) => {
    switch (rule.name) {
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
            if (Number(value) > Number(rule.data)) {
                return false;
            }
            break;
        case 'equal':
            if (String(value) !== String(rule.data)) {
                return false;
            }
            break;
        case 'min':
            if (Number(value) < Number(rule.data)) {
                return false;
            }
            break;
        case 'phone':
            if (!/^1[3|4|5|7|8][0-9]{9}$/.test(value)) {
                return false;
            }
            break;
        case 'regex':
            if (!rule.data.test(value)) {
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