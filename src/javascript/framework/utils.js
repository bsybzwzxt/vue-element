/**
 * Created by zhangjuncheng on 2018/5/31.
 */
// 框架工具函数
export default {
    // 对象复制与继承
    objectExtend: function (prep, post) {
        let pre = prep;
        for (let item in post) {
            if (post.hasOwnProperty(item)) {
                if (typeof post[item] === 'object') {
                    if (!pre[item]) {
                        pre[item] = (post[item].constructor === Array) ? [] : {};
                    }
                    this.objectExtend(pre[item], post[item]);
                } else {
                    pre[item] = post[item];
                }
            }
        }
        return pre;
    },
    // 对象是否为空
    objectIsEmpty: function (object) {
        return JSON.stringify(object) === '{}';
    },
    // 日期格式化
    dateFormat: function (date, format) {
        let o = {
            'M+': date.getMonth() + 1,                   //月份
            'd+': date.getDate(),                        //日
            'h+': date.getHours(),                       //小时
            'm+': date.getMinutes(),                     //分
            's+': date.getSeconds(),                     //秒
            'q+': Math.floor((date.getMonth() + 3) / 3), //季度
            'S': date.getMilliseconds()                  //毫秒
        };
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (let k in o) {
            if (new RegExp('(' + k + ')').test(format)) {
                format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }
        }
        return format;
    },
    // 数组删除某个已知值
    arrayRemove: function (arr, value) {
        let index = arr.indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
        }
    },
    // 数组某字段升序
    arraySortAsc: function (arr, key) {
        return arr.sort(function (a, b) {
            let x = a[key];
            let y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    },
    // 数组某字段降序
    arraySortDesc: function (arr, key) {
        return arr.sort(function (a, b) {
            let x = a[key];
            let y = b[key];
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        });
    },
    // 随机取数范围
    numberRandom: function (min, max) {
        return min + Math.round(Math.random() * (max - min));
    },
    // 设置select的key和value
    selectSet: function (array, key = 'label', value = 'value') {
        for (let item of array) {
            item.label = item[key];
            item.value = item[value];
        }
        return array;
    },
    // 利用iframe批量下载
    iframeDownload: function (urls) {
        let downloadFile = (url) => {
            let iframe = document.createElement('iframe');
            iframe.src = url;
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            setTimeout(() => {
                document.body.removeChild(iframe);
            }, 5000);
        };
        let download = () => {
            downloadFile(urls.splice(0, 1)[0]);
            if (urls.length > 0) {
                setTimeout(download, 500);
            }
        };
        download();
    },
    getDataType(data) {
        return Object.prototype.toString.call(data).split('[object ')[1].split(']')[0];
    },
    isDataType(data, type) {
        return Object.prototype.toString.call(data).split('[object ')[1].split(']')[0] === type;
    }
    // uploadFile: function () {
    //     let form = new FormData();
    //     form.append('file', this.file.raw);
    //     form.append('template', this.value);
    //     let xhr = new XMLHttpRequest();
    //     // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //     xhr.open('post', '/api/uploadExcel', true);
    //     xhr.send(form);
    //     xhr.onreadystatechange = () => {
    //         if (xhr.readyState == 4 && xhr.status == 200) {
    //             this.demoData = JSON.parse(xhr.response);
    //             console.log(this.demoData);
    //         }
    //     };
    // }
};