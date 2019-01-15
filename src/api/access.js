import utils from 'src/javascript/framework/utils';
import {initApi} from 'src/javascript/framework/custom';

const api = {
    getAccessList: {
        method: 'get',
        url: '/api/brands',
        handle(data) {
            for (let item of data.docs) {
                item.createdDate = utils.dateFormat(new Date(item.createdTime), 'yyyy-MM-dd hh:mm:ss');
                item.updatedDate = utils.dateFormat(new Date(item.updatedTime), 'yyyy-MM-dd hh:mm:ss');
            }
            return data;
        }
    }
};

module.exports = initApi(api);