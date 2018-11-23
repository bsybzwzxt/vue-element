<template>
    <aside class="main-aside">
        <div class="aside-header">
            <i class="sidebar-logo"></i>
            <label v-if="!collapsed">{{title}}</label>
            <!--<i class="fa fa-lg" :class="collapsed ? 'fa-arrow-right' : 'fa-arrow-left'"-->
               <!--@click="$state.layout.sidebarCollapsed = !$state.layout.sidebarCollapsed"></i>-->
        </div>
        <div class="scroll-layer">
            <el-menu v-scroll :default-active="defaultActive" :unique-opened="true" :collapse="collapsed"
                     :router="true">
                <template v-for="item in routeList" v-if="!item.access || $state.user.access[item.access]">
                    <el-submenu v-if="item.children && item.children.length > 0" :index="item.index">
                        <template slot="title">
                            <i class="fa fa-lg fa-fw" :class="item.icon"></i>
                            <span>{{item.name}}</span>
                        </template>
                        <template v-for="child in item.children" v-if="!child.access || $state.user.access[child.access]">
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
                collapsed: false,
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
        watch: {
            '$state.layout.sidebarCollapsed': {
                immediate: true,
                handler(value) {
                    this.collapsed = value;
                    localStorage.setItem('sidebarCollapsed', value);
                    this.classChange(this.collapsed);
                }
            },
            $route: {
                immediate: true,
                handler(value) {
                    let path = value.path;
                    this.defaultActive = '';
                    for (let item of this.routeList) {
                        if (item.path) {
                            if (item.path === path) {
                                this.defaultActive = item.index;
                            }
                        } else if (item.children) {
                            item.access = true;
                            for (let child of item.children) {
                                if (!child.access || this.$state.user.access[child.access]) {
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
                        this.defaultActive = value.meta.menuActive;
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
            classChange(value) {
                let bodyClass = document.body.className.split(' ');
                for (let item of bodyClass) {
                    if (!value && item.indexOf('collapsed') !== -1) {
                        if (bodyClass.indexOf(item) > -1) {
                            bodyClass.splice(bodyClass.indexOf(item), 1);
                        }
                    }
                    if (value && item.indexOf('collapsed') === -1) {
                        bodyClass.push('collapsed');
                    }
                }
                document.body.className = bodyClass.join(' ').trim();
            }
        }
    }
</script>