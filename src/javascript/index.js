/**
 * Created by zhangjuncheng on 2018/5/18.
 */
import Vue from 'vue';
import axios from 'axios';

// 框架js
import utils from './framework/utils';
import {ajax, ajaxAll} from './framework/custom';

// 接口地址
import api from './project/api';

Object.assign(Vue.prototype, {
    $utils: utils,
    $api: api
});

Vue.prototype.$ajax = ajax;
Vue.prototype.$ajaxAll = ajaxAll;
Vue.prototype.$axios = axios;