/**
 * Created by zhangjuncheng on 2018/5/31.
 */
import axios from 'axios'

exports.install = Vue => {

    // 加载axios
    Vue.prototype.$axios = axios;

    // 请求数据
    Vue.prototype.$ajax = function (method, url, params, success, error) {
        let token = localStorage.getItem('token');
        this.$state.layout.loading = true;
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
            this.$state.layout.loading = false;
            if (response.data.code === 0) {
                success && success(response.data.data);
            } else {
                if (error) {
                    error(response.data.code, response.data.msg);
                } else {
                    this.$message({message: response.data.msg || '请求失败,请稍后重试', type: 'error'});
                }
            }
        }).catch((error) => {
            this.$state.layout.loading = false;
            if (error.response) {
                this.$message({message: error.response.status + error.response.statusText, type: 'error'});
                if (error.response.status === 401) {
                    localStorage.removeItem('token');
                    this.$router.push({path: '/login'});
                }
            } else if (!error) {
                this.$message({message: '请求失败,请稍后重试', type: 'error'});
            }
        });
    };
};
