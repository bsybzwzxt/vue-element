<template>
    <header class="main-header">
        <div class="header-menu">
            <div>
                <i class="fa" :class="$state.layout.sidebarCollapsed ? 'fa-arrow-right' : 'fa-arrow-left'"
                   @click="$state.layout.sidebarCollapsed = !$state.layout.sidebarCollapsed"></i>
                <router-link to="/main/index">
                    <i class="fa fa-dashboard" :class="$route.path === '/main/index' ? 'active' : ''"></i>
                </router-link>
            </div>
            <div>
                <router-link to="/main/personal/help">
                    <i class="fa fa-question-circle-o" :class="$route.path === '/main/personal/help' ? 'active' : ''"></i>
                </router-link>
                <el-popover v-model="notice.visible" @show="noticeShow" popper-class="header-menu-notice">
                    <div v-if="notice.data.length > 0">
                        <h3>通知
                            <router-link v-if="notice.data.length > 0" to="/main/personal/notice/table">查看更多
                                <i class="fa fa-chevron-right"></i>
                            </router-link>
                        </h3>
                        <ul>
                            <li v-for="item in notice.data">
                                <p v-if="item.status === 'new'" class="red">new~</p>
                                {{item.title}}
                                <el-button type="text" size="mini" @click="download(item)" v-if="item.type === 'finish'">点击下载</el-button>
                                <span>{{item.date}}</span>
                            </li>
                        </ul>
                    </div>
                    <p v-else>暂时没有通知</p>
                    <el-badge slot="reference" :value="notice.count || ''">
                        <i class="fa fa-bell-o" :class="notice.visible ? 'active' : ''"></i>
                    </el-badge>
                </el-popover>
            </div>
        </div>
        <el-dropdown @command="handleCommand">
            <div class="header-user">
                <span v-if="$state.user.name">{{$state.user.name}}</span>
                <img v-if="$state.user.avatar" :src="$state.user.avatar" alt="头像"/>
                <i v-else class="fa fa-user"></i>
            </div>
            <el-dropdown-menu slot="dropdown" class="header-user-dropdown">
                <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                <el-dropdown-item command="updatePassword">修改密码</el-dropdown-item>
                <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <password-form v-if="passwordFormParams.visible" :visible.sync="passwordFormParams.visible"></password-form>
        <personal-info v-if="PersonalInfoParams.visible" :visible.sync="PersonalInfoParams.visible"></personal-info>
    </header>
</template>
<script>
    import PasswordForm from "src/vue/personal/PasswordForm";
    import PersonalInfo from "src/vue/personal/PersonalInfo";

    export default {
        components: {PasswordForm, PersonalInfo},
        data() {
            return {
                timeout: '',
                passwordFormParams: {
                    visible: false
                },
                PersonalInfoParams: {
                    visible: false
                },
                notice: {
                    visible: false,
                    count: 0,
                    data: [{
                        type: 'finish',
                        status: 'new',
                        title: '任务已完成',
                        date: '2018-11-26'
                    }, {
                        status: 'new',
                        title: '正在执行任务',
                        date: '2018-11-26'
                    }, {
                        title: '上次任务',
                        date: '2018-10-26'
                    }]
                }
            }
        },
        methods: {
            noticeShow() {
            },
            handleCommand(command) {
                switch (command) {
                    case 'personal':
                        this.PersonalInfoParams.visible = true;
                        break;
                    case 'updatePassword':
                        this.passwordFormParams.visible = true;
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
                    localStorage.removeItem('token');
                    this.$router.push({path: '/login'});
                }).catch(() => false);
            },
            download(item) {
                window.location.href = item;
            }
        }
    };
</script>