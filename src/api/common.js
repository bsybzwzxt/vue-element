import utils from 'src/javascript/framework/utils';
import {initApi} from 'src/javascript/framework/custom';

const api = {
    getSelectOption: {
        method: 'get',
        url: '/api/common/option-list'
    },
    getCategoriesTree: {
        method: 'get',
        url: 'api/categories/tree'
    }

};

module.exports = initApi(api);