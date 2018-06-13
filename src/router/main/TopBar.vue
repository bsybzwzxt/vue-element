<template>
    <header class="main-header">
        <div class="header-message">
            <h3>欢迎使用宝尊标准商品库，切图工具将近期上线</h3>
        </div>
        <div class="header-info">
            <el-badge value="99+" class="head-bell">
                <i class="fa fa-2x fa-bell-o"></i>
            </el-badge>
            <el-dropdown @command="handleCommand">
                <div class="el-dropdown-link header-user">
                    <img :src="$state.user.avatar || 'src/images/avatar.png'" alt="用户头像" />
                    <span>{{$state.user.name || 'test'}}</span>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="person">个人中心</el-dropdown-item>
                    <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>
<script>
    export default {
        data() {
            return {}
        },
        methods: {
            handleCommand(command) {
                switch(command) {
                    case 'person':
                        break;
                    case 'logout':
                        this.logout();
                        break;
                }
            },
            logout() {
                this.$confirm('是否退出登录?', '提示', {
                    type: 'warning'
                }).then(() => {
                    localStorage.setItem('token', '');
                    this.$router.push({path: '/login'});
                }).catch(() => false);
            }
        }
    }
</script>