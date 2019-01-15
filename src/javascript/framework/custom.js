/**
 * Created by zhangjuncheng on 2018/5/31.
 */
import axios from 'axios';
import store from 'src/vuex';
import {Message} from 'element-ui';

// 请求数据
export function ajax(method, url, params, success, error, {loading = true, header = {}} = {}) {
    if (loading) {
        store.commit('layout/setLoading', true);
    }
    let options = {
        method: method,
        url: url,
        data: params,
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            shopId: store.state.user.shopId || localStorage.getItem('shopId')
        }
    };
    if (Object.prototype.toString.call(header) === '[object Object]') {
        Object.assign(options.headers, header);
    }
    if (method === 'get') {
        options.params = params;
    }
    return axios(options).then(response => {
        if (loading) {
            store.commit('layout/setLoading', false);
        }
        if (response.data.code === 0) {
            success && success(response.data.data);
            return response.data.data;
        } else {
            if (error) {
                error(response.data.code, response.data.msg);
                throw response.data;
            } else {
                Message({message: response.data.msg || '请求失败,请稍后重试', type: 'error'});
                throw response.data.msg || '请求失败,请稍后重试';
            }
            // return Promise.reject(response.data.msg || '请求失败,请稍后重试');
        }
    }).catch((error) => {
        if (loading) {
            store.commit('layout/setLoading', false);
        }
        if (error.response) {
            Message({message: error.response.status + error.response.statusText, type: 'error'});
            if (error.response.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('shopId');
                // this.$router.push({path: '/login'});
            }
        } else if (!error) {
            Message({message: '请求失败,请稍后重试', type: 'error'});
        }
        throw error;
    });
}

export function ajaxAll(ajaxList) {
    store.commit('layout/setLoading', true);
    let promiseList = [];
    for (let item of ajaxList) {
        promiseList.push(item.ajax.bind(this, item.params || {}, Object.assign({loading: false}, {header: item.header}))());
    }
    return Promise.all(promiseList).then((result) => {
        store.commit('layout/setLoading', false);
        return result;
    });
}

export function initApi(config) {
    let api = {};
    for (let item in config) {
        api[item] = function (params = {}, {loading = true, header = {}} = {}) {
            return ajax(config[item].method, initUrl(config[item].url, params), params, null, null, {
                loading: loading,
                header: header
            }).then((result) => {
                config[item].handle && config[item].handle(result);
                return result;
            });
        };
    }
    return api;
}

function initUrl(url, params) {
    if (url.indexOf('/:') > 0) {
        let p = url.split('/:')[1].split('/')[0];
        return initUrl(url.replace(`:${p}`, params[p]), params);
    }
    return url;
}