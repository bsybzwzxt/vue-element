<template>
    <div v-loading.fullscreen.lock="$state.layout.loading" class="loading" element-loading-text="Loading">
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
    import {getUserInfo} from 'src/api/personal'

    export default {
        provide() {
            return {
                reload: this.reload
            }
        },
        data() {
            return {
                reload: {
                    active: true,
                    handle: this.reloadHandle
                }
            }
        },
        // watch: {
        //     $route: {
        //         immediate: true,
        //         handler() {
        //             console.log(this.$router);
        //         }
        //     }
        // }
        created() {
            // 版本控制
            if (sessionStorage.getItem('version') !== localStorage.getItem('version')) {
                localStorage.clear();
                localStorage.setItem('version', sessionStorage.getItem('version'));
            }
            if (localStorage.getItem('token')) {
                let fake = {
                    access: [
                        {access: 'allAdd', label: '添加按钮'},
                        {access: '/main/access/access/table', label: '权限设置'},
                        {access: '/main/access/role/table', label: '权限设置'},
                        {access: '/main/access/user/table', label: '权限设置'},
                        {access: 'delete', label: '删除按钮'}
                    ]
                };
                getUserInfo().then((result) => {
                    this.$store.commit('user/setUserInfo', {...result});
                });

                // this.$ajax('get', this.$api.personal.info, {}, null, null, {
                //     loading: true,
                //     header: {a: 1}
                // }).then((result) => {
                //     let fake = {
                //         access: [
                //             {access: 'allAdd', label: '添加按钮'},
                //             {access: '/main/access/access/table', label: '权限设置'},
                //             {access: '/main/access/role/table', label: '权限设置'},
                //             {access: '/main/access/user/table', label: '权限设置'},
                //             {access: 'delete', label: '删除按钮'}
                //         ]
                //     };
                //     // 设置用户权限,显示控制在access字段里
                //     this.$store.commit('user/setUserInfo', {...result, ...fake});
                // }).catch((error)=> {
                //     console.log('error'+error)
                // });
            }
            // 权限系统
            // this.$ajax(this.$api.accessSystem.getAccess, {system: 'appName'}, (result) => {
            // });
            // 登录系统
            // this.$ajax(this.$api.loginSystem.getUsername, {}, (result) => {
            //     console.log(result);
            // });
        },
        methods: {
            reloadHandle() {
                this.reload.active = false;
                this.$nextTick(() => {
                    this.reload.active = true;
                })
            }
        }
    }
</script>