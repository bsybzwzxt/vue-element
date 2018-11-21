const SERVER = '/api';
const ACTIVITY_SERVER = '/activity/api';

exports.install = Vue => {

    Vue.prototype.$api = {
        common: {
            option: SERVER + '/common/option-list'
        },
        product: {
            product: SERVER + '/products',
            products: SERVER + '/product-details',
            schema: SERVER + '/mtypes/schema',
            templates: SERVER + '/templates',
            uploadTemplate: SERVER + '/templates',
            uploadExcel: SERVER + '/upload-excel',
            uploadMedia: SERVER + '/upload-media',
            uploadResource: SERVER + '/upload-media/thirdparty',
            screenshots: SERVER + '/screenshots',
            download: SERVER + '/download',
            uploadThumbnail: SERVER + '/uploadThumbnail',
            uploadImage: SERVER + '/upload-image',
            getProductDetails: SERVER + '/getProductDetails/',
            productTag: SERVER + '/product-details/tag'
        },
        picture: {
            medias: SERVER + '/medias',
            combine: SERVER + '/medias/combine',
            watermark: SERVER + '/medias/watermark',
            gif: SERVER + '/medias/gif',
        },
        image: {
            mediaCut: SERVER + '/image-details/media-cut',
            imageDetails: SERVER + '/image-details/image-details',
            imageCheck: SERVER + '/image-details/check-image',
            changeImage: SERVER + '/image-details/change-image',
            checkAndReturn: SERVER + '/image-details/checkandreturn',
            downloadImage: SERVER + '/image-details/download-image'
        },
        operate: {
            tree: SERVER + '/categories/tree',
            brands: SERVER + '/brands',
            categories: SERVER + '/categories',
            mtypes: SERVER + '/mtypes',
            fonts: SERVER + '/fonts'
        },
        system: {
            login: SERVER + '/login',
            register: SERVER + '/register',
            notifications: SERVER + '/notifications',
            newMessage: SERVER + '/notifications/count/new'
        },
        personal: {
            info: SERVER + '/user/user-info',
            password: SERVER + '/user/password'
        },
        shop: {
            shop: SERVER + '/shops'
        },
        grounding: {
            products: SERVER + '/products/excel',
            productsMedia: SERVER + '/products/media'
        },
        brand: {
            brands: SERVER + '/brands'
        },
        media: {
            medias: SERVER + '/medias/articleNo/',
            brand: SERVER + '/medias/brand/'
        }
    }
};