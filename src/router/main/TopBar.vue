<template>
    <header class="main-header">
        <div class="header-message">
            <h3>欢迎使用后台管理系统</h3>
        </div>
        <div class="header-info">
            <el-popover @show="noticeShow" :popper-class="notice.data.length > 0 ? 'notice-right' : ''">
                <div class="notice" v-if="notice.data.length > 0">
                    <h3>通知
                        <router-link v-if="notice.data.length > 0" :to="{ name: 'user'}">查看更多
                            <i class="fa fa-chevron-right"></i></router-link>
                    </h3>
                    <ul>
                        <li v-for="item in notice.data">
                            <p v-if="item.status === 'NEW'" class="red">new~</p>
                            {{item.title}}<span>{{item.updatedDate}}</span>
                        </li>
                    </ul>
                </div>
                <p v-else>暂时没有通知</p>
                <el-badge slot="reference" :value="notice.count" class="head-bell">
                    <i class="fa fa-2x fa-bell-o"></i>
                </el-badge>
            </el-popover>
            <el-dropdown @command="handleCommand">
                <div class="el-dropdown-link header-user">
                    <img :src="$state.user.avatar || 'src/images/avatar.png'" alt="用户头像"/>
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
            return {
                notice: {
                    count: '',
                    data: []
                }
            }
        },
        created() {
            this.getNews();
            setInterval(this.getNews, 3000);
        },
        methods: {
            getNews() {
                let token = localStorage.getItem('token');
                this.$axios({
                    method: 'get',
                    url: this.$api.system.newMessage,
                    headers: {'Authorization': 'Bearer ' + token}
                }).then(response => {
                    this.notice.count = response.data || '';
                    // this.$notify({title: '新消息提醒', message: '您有一条新消息'});
                }).catch((error) => {
                    if (error.response && error.response.status === 401) {
                        this.$router.push({path: '/login'});
                    }
                });
            },
            noticeShow() {
                this.$ajax('get', this.$api.system.notifications, {}, (result) => {
                    this.notice.count = '';
                    this.notice.data = result.docs;
                    for (let item of this.notice.data) {
                        item.updatedDate = this.$utils.dateFormat(new Date(item.updatedTime), 'yyyy-MM-dd hh:mm:ss')
                    }
                    console.log(this.notice.data);
                    this.$ajax('put', this.$api.system.notifications, {}, () => {
                    });
                });
            },
            handleCommand(command) {
                switch (command) {
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
