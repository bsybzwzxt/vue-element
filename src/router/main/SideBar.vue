<template>
    <aside class="main-aside">
        <div class="aside-header">
            <!--<i v-if="!isCollapse" class="sidebar-logo"></i>-->
            <label v-if="!isCollapse">{{title}}</label>
            <i class="fa fa-lg" :class="isCollapse ? 'fa-arrow-right' : 'fa-arrow-left'" @click="collapseChange"></i>
        </div>
        <div class="scroll-layer">
            <el-menu v-scroll :default-active="defaultActive" :unique-opened="true" :collapse="isCollapse"
                     :router="true">
                <template v-for="item in routeList" v-if="!item.access || $state.access[item.access]">
                    <el-submenu v-if="item.children && item.children.length > 0" :index="item.index">
                        <template slot="title">
                            <i class="fa fa-lg fa-fw" :class="item.icon"></i>
                            <span>{{item.name}}</span>
                        </template>
                        <template v-for="child in item.children" v-if="!child.access || $state.access[child.access]">
                            <el-menu-item :route="{path: child.path}" :index="child.index">
                                <i class="fa fa-lg fa-fw" :class=child.icon></i>
                                <span>{{child.name}}</span>
                            </el-menu-item>
                        </template>
                    </el-submenu>
                    <el-menu-item v-if="!item.children || item.children.length === 0" :route="{path: item.path}"
                                  :index="item.index">
                        <i class="fa fa-lg fa-fw" :class="item.icon"></i>
                        <span>{{item.name}}</span>
                    </el-menu-item>
                </template>
            </el-menu>
        </div>
    </aside>
</template>
<script>
    import scroll from 'src/directive/scroll'

    export default {
        directives: {
            scroll
        },
        data() {
            return {
                isCollapse: false,
                defaultActive: ''
            }
        },
        props: {
            title: {
                type: String,
                default: '后台管理'
            },
            routeList: {
                type: Array,
                required: true
            }
        },
        created() {
            // 是否折叠
            if (localStorage.getItem('isCollapse') !== null) {
                this.isCollapse = JSON.parse(localStorage.getItem('isCollapse'));
            }
            this.classChange();
        },
        watch: {
            $route: {
                immediate: true,
                handler() {
                    let path = this.$route.path;
                    this.defaultActive = '';
                    for (let item of this.routeList) {
                        if (item.path) {
                            if (item.path === path) {
                                this.defaultActive = item.index;
                            }
                        } else if (item.children) {
                            item.access = true;
                            for (let child of item.children) {
                                if (!child.access || this.$state.access[child.access]) {
                                    item.access = false;
                                }
                                if (child.path === path) {
                                    this.defaultActive = child.index;
                                }
                                if (child.tabs) {
                                    this.loadTabs(child);
                                }
                            }
                        }
                        if (item.tabs) {
                            this.loadTabs(item);
                        }
                    }
                    if (!this.defaultActive) {
                        this.defaultActive = this.$route.meta.menuActive;
                    }
                }
            }
        },
        methods: {
            loadTabs(array) {
                let path = this.$route.path;
                for (let tab of array.tabs) {
                    if (tab.path) {
                        if (tab.path === path) {
                            this.defaultActive = array.index;
                            return;
                        }
                    } else if (tab.children) {
                        for (let child of tab.children) {
                            if (child.path === path) {
                                this.defaultActive = array.index;
                                return;
                            }
                        }
                    }
                }
            },
            collapseChange() {
                this.isCollapse = !this.isCollapse;
                localStorage.setItem('isCollapse', this.isCollapse);
                this.classChange();
            },
            classChange() {
                let bodyClass = document.body.className.split(' ');
                for (let item of bodyClass) {
                    if (!this.isCollapse && item.indexOf('collapse') !== -1) {
                        if (bodyClass.indexOf(item) > -1) {
                            bodyClass.splice(bodyClass.indexOf(item), 1);
                        }
                    }
                    if (this.isCollapse && item.indexOf('collapse') === -1) {
                        bodyClass.push('collapse');
                    }
                }
                document.body.className = bodyClass.join(' ').trim();
            }
        }
    }
</script>