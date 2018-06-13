/**
 * Created by zhangjuncheng on 2018/5/31.
 */
import axios from 'axios'
import io from 'socket.io-client';
import md5 from './md5';

exports.install = Vue => {

    // 加载axios
    Vue.prototype.$axios = axios;

    // 请求数据
    Vue.prototype.$ajax = function (method, url, params, success) {
        let token = localStorage.getItem('token');
        this.$state.loading = true;
        let options = {
            method: method,
            url: url,
            data: params,
            headers: {'Authorization': 'Bearer ' + token}
        };
        if (method === 'get') {
            options.params = params;
        }
        axios(options).then(response => {
            this.$state.loading = false;
            if (response.data.errcode) {
                this.$message({message: response.data.errmsg || '请求失败,请稍后重试', type: 'error'});
            } else {
                success && success(response.data);
            }
        }).catch((error) => {
            this.$state.loading = false;
            console.log(error)
            if (error.response) {
                this.$message({message: error.response.status + error.response.statusText, type: 'error'});
                if (error.response.status === 401) {
                    this.$router.push({path: '/login'});
                }
            } else if (!error) {
                this.$message({message: '请求失败,请稍后重试', type: 'error'});
            }
        });
    };

    Vue.prototype.$socket = function (url, params, success) {
        console.log(url);
        let socket = io(url);
        socket.on('connent', ()=> {
            console.log(socket);
        });

        socket.send(params);

        socket.on('message', (result)=> {
            console.log(result)
        });
    };

    // MD5加密
    Vue.prototype.$md5 = md5;
};
