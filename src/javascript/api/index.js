const SERVER = '/api';

exports.install = Vue => {

    Vue.prototype.$api = {
        brand: {
            brands: SERVER + '/brands',
        },
        product: {
            products: SERVER + '/products',
            templates: SERVER + '/templates',
            uploadExcel: SERVER + '/upload-excel',
            uploadMedia: SERVER + '/upload-media',
            screenshots: SERVER + '/screenshots',
            download: SERVER + '/download',
            uploadThumbnail: SERVER + '/uploadThumbnail',
            uploadImage:SERVER + '/upload-image'
        },
        picture: {
            medias: SERVER + '/medias',
            combine: SERVER + '/medias/combine',
            watermark: SERVER + '/medias/watermark',
            gif: SERVER + '/medias/gif',
        },
        system: {
            login: SERVER + '/login'
        }
    }
};