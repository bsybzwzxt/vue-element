<template>
    <div class="loading" v-loading.fullscreen.lock="$state.loading" element-loading-text="Loading">
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
    import {mapMutations} from 'vuex'

    export default {
        data() {
            return {}
        },
        created() {
            // 获取用户权限
            let access = [{access: 'access', label: '权限设置'}, {access: 'allAdd', label: '添加按钮'}, {
                access: 'delete', label: '删除按钮'
            }];
            // 以上都是假值,需要读取sql
            // 设置用户权限,显示控制在access字段里
            this.setAccess({accessList: access, key: 'access'});

            // this.$socket(this.$api.picture.medias, {});
            // 权限系统
//            this.$ajax(this.$api.accessSystem.getAccess, {system: 'appName'}, (result) => {
//                console.log(result);
//                for (let item of result) {
//                    item.access = item.path;
//                }
//                this.setAccess({accessList: result, key: 'path'});
//            });

            // 登录系统
//            this.$ajax(this.$api.loginSystem.getUsername, {}, (result) => {
//                console.log(result);
//                this.$state.user.name = result.username;
//            });
        },
        // watch: {
        //     $route: {
        //         immediate: true,
        //         handler() {
        //             if (!JSON.parse(localStorage.getItem('token'))) {
        //                 this.$router.push({path: '/login'});
        //             }
        //         }
        //     }
        // },
        methods: {
            ...mapMutations([
                'setAccess'
            ])
        }
    }
</script>