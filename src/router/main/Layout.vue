<template>
    <div>
        <top-bar></top-bar>
        <side-bar :routeList="routeList" title="菜单栏"></side-bar>
        <section class="main-section">
            <tab-list :routeList="routeList"></tab-list>
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </section>
    </div>
</template>
<script>
    import './main.css';
    import SideBar from './SideBar';
    import TopBar from './TopBar';
    import TabList from './TabList';

    export default {
        components: {
            TopBar: TopBar,
            SideBar: SideBar,
            TabList: TabList
        },
        data() {
            return {
                // 同一级path和children必须且只能有一个
                // 同一级tabs和children必须且只能有一个
                // tabs默认第一页的path必须与side页的path相同
                routeList: [{
                    index: 'index',
                    name: '我的工作台',
                    icon: 'fa-tachometer',
                    path: '/main/index'
                }, {
                    index: 'product',
                    name: '详情页管理',
                    icon: 'fa-file-text-o',
                    children: [{
                        index: 'product-1',
                        name: '详情页数据导入',
                        path: '/main/product/batch/import'
                    }, {
                        index: 'product-2',
                        name: '详情页列表',
                        path: '/main/product/product/table'
                    }, {
                        index: 'product-3',
                        name: '模板管理',
                        path: '/main/product/template/table'
                    }]
                }, {
                    index: 'grounding',
                    name: '上架及同步',
                    icon: 'fa-retweet',
                    children: [{
                        index: 'grounding-1',
                        name: '上架商品导入',
                        path: '/main/grounding/batch/import'
                    }, {
                        index: 'grounding-2',
                        name: '上架商品列表',
                        path: '/main/grounding/grounding/table'
                    }]
                }, {
                    index: 'products',
                    name: '商品管理',
                    icon: 'fa-cubes',
                    path: '/main/products/products/table'
                    // children: [{
                    //     index: 'products-1',
                    //     name: '商品列表',
                    //     path: '/main/products/products/table'
                    // }]
                },{
                    index: 'picture',
                    name: '图片管理',
                    icon: 'fa-photo',
                    children: [{
                        index: 'picture-1',
                        name: '图片上传',
                        path: '/main/picture/picture/upload'
                    }, {
                        index: 'picture-2',
                        name: '图片列表',
                        path: '/main/picture/picture/table'
                    }]
                }, {
                    index: 'image',
                    name: '图片预处理',
                    icon: 'fa-file-image-o',
                    children: [{
                        index: 'image-1',
                        name: '素材上传',
                        path: '/main/image/image/upload'
                    }, {
                        index: 'image-2',
                        name: '商品图片列表',
                        path: '/main/image/image/table'
                    }, {
                        index: 'image-3',
                        name: '图片处理工具',
                        path: '/main/image/image/handle'
                    }]
                }, {
                    index: 'operate',
                    name: '运营管理',
                    icon: 'fa-line-chart',
                    children: [{
                        index: 'operate-1',
                        name: '店铺管理',
                        access: 'shop-manager',
                        path: '/main/operate/shop/table'
                    }, {
                        index: 'operate-2',
                        name: '品牌管理',
                        path: '/main/operate/brand/table'
                    }, {
                        index: 'operate-3',
                        name: '类目管理',
                        path: '/main/operate/category/table'
                    }, {
                        index: 'operate-4',
                        name: '属性管理',
                        path: '/main/operate/key/table'
                    }, {
                        index: 'operate-5',
                        name: '字体管理',
                        path: '/main/operate/font/table'
                    }, {
                        index: 'operate-6',
                        name: '导出商品模板',
                        path: '/main/operate/export/mould'
                    }]
                }, {
                    index: 'windows',
                    name: '开放平台',
                    path: '',
                    icon: 'fa-windows'
                }, {
                    index: 'access',
                    name: '权限设置',
                    icon: 'fa-lock',
                    children: [{
                        index: 'access-1',
                        name: '设置权限',
                        path: '/main/access/access/table',
                        access: '/main/access/access/table'
                    }, {
                        index: 'access-2',
                        name: '设置角色',
                        path: '/main/access/role/table',
                        access: '/main/access/role/table'
                    }, {
                        index: 'access-3',
                        name: '用户管理',
                        path: '/main/access/user/table',
                        access: '/main/access/user/table'
                    }]
                }]
            };
        },
        created() {
            let bodyClass = document.body.className.split(' ');
            for (let item of bodyClass) {
                if (item.indexOf('-layout') !== -1) {
                    if (bodyClass.indexOf(item) > -1) {
                        bodyClass.splice(bodyClass.indexOf(item), 1);
                    }
                }
            }
            bodyClass.push('main-layout');
            document.body.className = bodyClass.join(' ').trim();
        }
    };
</script>