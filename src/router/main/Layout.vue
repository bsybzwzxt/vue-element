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
                    index: 'demo',
                    name: '演示',
                    icon: 'fa-cubes',
                    children: [{
                        index: 'demo-1',
                        name: '表格',
                        path: '/main/demo/table'
                    }]
                }, {
                    index: 'permission',
                    name: '权限设置',
                    icon: 'fa-cubes',
                    children: [{
                        index: 'permission-1',
                        name: '角色列表',
                        path: '/main/permission/role'
                    }, {
                        index: 'permission-2',
                        name: '用户列表',
                        path: '/main/permission/user'
                    }]
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