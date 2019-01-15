import utils from 'src/javascript/framework/utils';
import {initApi} from 'src/javascript/framework/custom';

const api = {
    getUserInfo: {
        method: 'get',
        url: '/api/user/user-info'
    },
    setUserInfo: {
        method: 'post',
        url: '/api/user/user-info'
    },
    getShops: {
        method: 'get',
        url: '/api/shops'
    },
    setShop: {
        method: 'post',
        url: '/api/users/latestShop'
    },
    getBrands: {
        method: 'get',
        url: '/api/brands'
    },
    putPassword: {
        method: 'put',
        url: '/api/user/password'
    },
    getMessages: {
        method: 'get',
        url: '/api/notifications/count/new'
    },
    putNotifications: {
        method: 'put',
        url: '/api/notifications'
    },
    getNotifications: {
        method: 'get',
        url: '/api/notifications',
        handle(result) {
            for (let item of result.docs) {
                item.updatedDate = utils.dateFormat(new Date(item.updatedTime), 'yyyy-MM-dd hh:mm:ss');
                item.download = (item.msgType === 'screenshot_finished');
                item.check = (item.msgType === 'look' || item.msgType === 'pullTask_finished' || item.msgType === 'rebuildLinks_finished');
            }
        }
    },
};

module.exports = initApi(api);