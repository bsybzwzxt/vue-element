<template>
    <transition name="fade">
        <div v-if="tabs1.length > 0" class="main-tabs" :class="tabs2.length > 0 && 'tab'">
            <el-tabs v-model="tabs1Active" type="border-card" @tab-click="tabs1Click()">
                <template v-for="item in tabs1" v-if="!item.access || $state.user.access[item.access]">
                    <el-tab-pane :key="item.name" :lazy="true" :label="item.name" :name="item.name"></el-tab-pane>
                </template>
            </el-tabs>
            <!--<el-tabs v-if="tabs2.length > 0" v-model="tabs2Active" @tab-click="tabs2Click()">-->
            <!--<template v-for="item in tabs2" v-if="!item.access || $state.user.access[item.access]">-->
            <!--<el-tab-pane :lazy="true" :label="item.name" :name="item.name"></el-tab-pane>-->
            <!--</template>-->
            <!--</el-tabs>-->
        </div>
    </transition>
</template>
<script>
    export default {
        name: 'Tabs',
        props: {
            routeList: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                tabs1: [],
                tabs2: [],
                tabs1Active: '',
                tabs2Active: ''
            }
        },
        watch: {
            $route: {
                immediate: true,
                handler() {
                    this.tabs1 = [];
                    this.tabs2 = [];
                    for (let item of this.routeList) {
                        if (item.tabs) {
                            this.loadTabs(item.tabs);
                        } else if (item.children) {
                            for (let child of item.children) {
                                if (child.tabs) {
                                    this.loadTabs(child.tabs);
                                }
                            }
                        }
                    }
                }
            }
        },
        methods: {
            loadTabs(tabs) {
                let path = this.$route.path;
                for (let tab of tabs) {
                    if (tab.path) {
                        if (tab.path === path) {
                            this.tabs1 = tabs;
                            this.tabs1Active = tab.name;
                            return;
                        }
                    } else if (tab.children) {
                        for (let child of tab.children) {
                            if (child.path === path) {
                                this.tabs1 = tabs;
                                this.tabs2 = tab.children;
                                this.tabs1Active = tab.name;
                                this.tabs2Active = child.name;
                                return;
                            }
                        }
                    }
                }
            },
            tabs1Click() {
                for (let item of this.tabs1) {
                    if (this.tabs1Active === item.name) {
                        if (item.path) {
                            this.tabs2 = [];
                            this.tabs2Active = '';
                            this.$router.push(item.path);
                        } else if (item.children) {
                            this.tabs2 = item.children;
                            this.tabs2Active = item.cache ? item.cache.name : item.children[0].name;
                            this.$router.push(item.cache ? item.cache.path : item.children[0].path);
                        }
                    }
                }
            },
            tabs2Click() {
                for (let item2 of this.tabs2) {
                    if (this.tabs2Active === item2.name) {
                        for (let item1 of this.tabs1) {
                            if (this.tabs1Active === item1.name) {
                                item1.cache = item2;
                            }
                        }
                        this.$router.push(item2.path);
                    }
                }
            }
        }
    }
</script>