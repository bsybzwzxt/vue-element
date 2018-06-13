<template>
    <div>
        <top-bar></top-bar>
        <side-bar :routeList="routeList" title="后台管理"></side-bar>
        <section class="main-section">
            <tab-list :routeList="routeList"></tab-list>
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </section>
    </div>
</template>
<script>
    import './main.css'
    import SideBar from './SideBar'
    import TopBar from './TopBar'
    import TabList from './TabList'

    export default {
        components: {
            'TopBar': TopBar,
            'SideBar': SideBar,
            'TabList': TabList
        },
        data() {
            return {
                // 同一级path和children必须且只能有一个
                // 同一级tabs和children必须且只能有一个
                // tabs默认第一页的path必须与side页的path相同
                routeList: [{
                    index: 'index',
                    name: '首页',
                    icon: 'fa-ravelry',
                    path: '/main/index',
                    // tabs: [{
                    //     name: '演示分类一',
                    //     children: [{
                    //         name: '表格',
                    //         path: '/main/index'
                    //     }, {
                    //         name: '列表',
                    //         path: '/main/index'
                    //     }, {
                    //         name: '表单',
                    //         path: '/main/index'
                    //     }, {
                    //         name: '新标签',
                    //         path: '/main/index'
                    //     }]
                    // }, {
                    //     name: '演示分类二',
                    //     children: [{
                    //         name: '树形',
                    //         path: '/main/index'
                    //     }, {
                    //         name: '移动弹窗',
                    //         path: '/main/index'
                    //     }]
                    // }, {
                    //     name: '演示无子菜单',
                    //     path: '/main/index'
                    // }]
                }, {
                    index: 'product',
                    name: '商品管理',
                    icon: 'fa-cubes',
                    children: [{
                        index: 'product-1',
                        name: '批量导入',
                        path: '/main/product/batch/import'
                    }, {
                        index: 'product-2',
                        name: '主数据录入',
                        path: ''
                    }, {
                        index: 'product-3',
                        name: '模板管理',
                        path: '/main/product/template/table'
                    }, {
                        index: 'product-4',
                        name: '商品列表',
                        path: '/main/product/product/table'
                    }]
                }, {
                    index: 'diamond',
                    name: '品牌管理',
                    path: '/main/brand/brand/table',
                    icon: 'fa-diamond'
                }, {
                    index: 'picture',
                    name: '图片管理',
                    icon: 'fa-photo',
                    children: [{
                        index: 'picture-1',
                        name: '图片上传',
                        path: ''
                    }, {
                        index: 'picture-2',
                        name: '图片列表',
                        path: '/main/picture/picture/table'
                    }]
                }, {
                    index: 'cog',
                    name: '配置管理',
                    path: '',
                    icon: 'fa-cog'
                }, {
                    index: 'chart',
                    name: '运营管理',
                    path: '',
                    icon: 'fa-line-chart'
                }, {
                    index: 'windows',
                    name: '开放平台',
                    path: '',
                    icon: 'fa-windows'
                }, {
                    index: 'trash',
                    name: '回收站',
                    path: '',
                    icon: 'fa-trash-o'
                }]
            }
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
    }
</script>