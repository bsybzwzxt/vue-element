<template>
    <div class="loading" v-loading.fullscreen.lock="$state.layout.loading" element-loading-text="Loading">
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>

    export default {
        data() {
            return {}
        },
        created() {
            if (localStorage.getItem('token')) {
                this.$ajax('get', this.$api.personal.info, {}, (result) => {

                    // 设置用户权限,显示控制在access字段里
                    this.$store.commit('user/setUserInfo', {...result});
                });
            }
            let fake = {
                access: [
                    {access: 'allAdd', label: '添加按钮'},
                    {access: '/main/access/access/table', label: '权限设置'},
                    {access: '/main/access/role/table', label: '权限设置'},
                    {access: '/main/access/user/table', label: '权限设置'},
                    {access: 'delete', label: '删除按钮'}
                ]
            };
            this.$store.commit('user/setUserInfo', fake);

            // 权限系统
//            this.$ajax(this.$api.accessSystem.getAccess, {system: 'appName'}, (result) => {
//            });

            // 登录系统
//            this.$ajax(this.$api.loginSystem.getUsername, {}, (result) => {
//                console.log(result);
//            });
        },
        // watch: {
        //     $route: {
        //         immediate: true,
        //         handler() {
        //             console.log(this.$router);
        //         }
        //     }
        // }
    }
</script>