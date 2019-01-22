<template>
    <div>
        <top-bar></top-bar>
        <side-bar :routeList="routeList" title="后台管理"></side-bar>
        <section class="main-section">
            <tab-list :routeList="routeList"></tab-list>
            <transition name="fade" mode="out-in">
                <router-view v-if="reloadActive"></router-view>
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
        inject: ['reload'],
        computed: {
            reloadActive() {
                return this.reload.active;
            }
        },
        data() {
            return {
                // 同一级path和children必须且只能有一个
                // 同一级tabs和children必须且只能有一个
                // tabs默认第一页的path必须与side页的path相同
                routeList: [{
                    index: 'index',
                    name: '首页',
                    icon: 'fa-tachometer',
                    path: '/main/index'
                }, {
                    index: 'demo',
                    name: '演示页面',
                    icon: 'fa-file-text-o',
                    children: [{
                        index: 'demo-1',
                        name: '列格页面',
                        path: '/main/demo/table'
                    }, {
                        index: 'demo-2',
                        name: '表单',
                        path: '/main/demo/form'
                    }]
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