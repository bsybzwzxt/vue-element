<template>
    <header class="main-header">
        <div class="header-menu">
            <div>
                <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;欢迎使用</h3>
                <!--<i class="fa fa-arrow-left"></i>-->
                <!--<router-link to="/main/index" class="head-question">-->
                    <!--<i class="fa fa-dashboard"></i>-->
                <!--</router-link>-->
            </div>
            <div>
                <router-link to="/main/personal/help" class="head-question">
                    <i class="fa fa-question-circle-o"></i>
                </router-link>
                <el-popover @show="noticeShow" popper-class="header-info-notice">
                    <div class="notice" v-if="notice.data.length > 0">
                        <h3>通知
                            <router-link v-if="notice.data.length > 0" to="/main/personal/notice/table">查看更多
                                <i class="fa fa-chevron-right"></i>
                            </router-link>
                        </h3>
                        <ul>
                            <li v-for="item in notice.data">
                                <p v-if="item.status === 'NEW'" class="red">new~</p>
                                {{item.title}}
                                <el-button type="text" size="mini" @click="download(item)"
                                           v-if="item.msgType === 'screenshot_finished' || item.msgType === 'imagehandle_finished'">下载
                                </el-button>
                                <span class="date">{{item.updatedDate}}</span>
                            </li>
                        </ul>
                    </div>
                    <p v-else>暂时没有通知</p>
                    <el-badge slot="reference" :value="notice.count || ''" class="head-bell">
                        <i class="fa fa-bell-o"></i>
                    </el-badge>
                </el-popover>
            </div>
        </div>
        <!--<div class="header-info">-->
            <!--<router-link to="/main/personal/help" class="head-question">-->
                <!--<i class="fa fa-2x fa-question-circle-o"></i>-->
            <!--</router-link>-->
            <!--<el-popover @show="noticeShow" :popper-class="notice.data.length > 0 ? 'header-info-notice notice-right' : 'header-info-notice'">-->
                <!--<div class="notice" v-if="notice.data.length > 0">-->
                    <!--<h3>通知-->
                        <!--<router-link v-if="notice.data.length > 0" to="/main/personal/notice/table">查看更多-->
                            <!--<i class="fa fa-chevron-right"></i>-->
                        <!--</router-link>-->
                    <!--</h3>-->
                    <!--<ul>-->
                        <!--<li v-for="item in notice.data">-->
                            <!--<p v-if="item.status === 'NEW'" class="red">new~</p>-->
                            <!--{{item.title}}-->
                            <!--<el-button type="text" size="mini" @click="download(item)"-->
                                       <!--v-if="item.msgType === 'screenshot_finished' || item.msgType === 'imagehandle_finished'">下载-->
                            <!--</el-button>-->
                            <!--<span class="date">{{item.updatedDate}}</span>-->
                        <!--</li>-->
                    <!--</ul>-->
                <!--</div>-->
                <!--<p v-else>暂时没有通知</p>-->
                <!--<el-badge slot="reference" :value="notice.count || ''" class="head-bell">-->
                    <!--<i class="fa fa-2x fa-bell-o"></i>-->
                <!--</el-badge>-->
            <!--</el-popover>-->
            <!--<el-dropdown @command="handleCommand">-->
                <!--<div class="el-dropdown-link header-user">-->
                    <!--<img :src="$state.user.avatar || headDefault" alt="无"/>-->
                    <!--<span>{{$state.user.name}}</span>-->
                <!--</div>-->
                <!--<el-dropdown-menu slot="dropdown">-->
                    <!--<el-dropdown-item command="person">个人中心</el-dropdown-item>-->
                    <!--<el-dropdown-item command="updatePassword" divided>修改密码</el-dropdown-item>-->
                    <!--<el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>-->
                <!--</el-dropdown-menu>-->
            <!--</el-dropdown>-->
        <!--</div>-->
        <el-dropdown @command="handleCommand">
            <div class="header-user">
                <span v-if="$state.user.name">{{$state.user.name}}</span>
                <img :src="$state.user.avatar" alt="头像"/>
            </div>
            <el-dropdown-menu slot="dropdown" class="header-user-dropdown">
                <el-dropdown-item command="person">个人中心</el-dropdown-item>
                <el-dropdown-item command="updatePassword">修改密码</el-dropdown-item>
                <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <!--<passwordForm v-if="passwordFormParams.visible" :visible.sync="passwordFormParams.visible"></passwordForm>-->
    </header>
</template>
<script>
    // import PasswordForm from "src/vue/personal/PasswordForm";
    // import headDefault from 'src/images/head_default.png'

    // import gql from 'graphql-tag'

    export default {
        // components: {PasswordForm: PasswordForm},
        data() {
            return {
                timeout: "",
                passwordFormParams: {
                    visible: false
                },
                notice: {
                    count: 0,
                    data: []
                },
                // headDefault: headDefault
            };
        },
        created() {
            // this.getNews();
            // this.timeout = setInterval(this.getNews, 10000);
        },
        // mounted() {
        //     const subQuery = gql`subscription noticeCount($username: String!) {
        //         noticeCount(username: $username) { new }
        //     }`;
        //     let _this = this;
        //     const observer = this.$apollo.subscribe({
        //         query: subQuery,
        //         variables: {
        //             username: _this.$state.user.account,
        //         }
        //     });
        //     observer.subscribe({
        //         next(data) {
        //             _this.notice.count = data.data.noticeCount.new || '';
        //         },
        //         error(error) {
        //             _this.$message({message: error.errors[0].message, type: 'error'});
        //         }
        //     });
        // },
        destroyed() {
            // clearInterval(this.timeout);
        },
        methods: {
            getNews() {
                let token = localStorage.getItem("token");
                this.$axios({
                    method: "get",
                    url: this.$api.system.newMessage,
                    headers: {Authorization: "Bearer " + token}
                }).then(response => {
                    // if (this.notice.count < response.data) {
                    //     this.$notify({
                    //         title: '新消息提醒',
                    //         dangerouslyUseHTMLString: true,
                    //         message: `<a @click.native="checkClose()">请点击查看<i class="fa fa-chevron-right"></i></a>`
                    //     });
                    // }
                    if (response.data.code === 0) {
                        this.notice.count = response.data.data;
                    } else {
                        this.notice.count = 0;
                    }

                }).catch(error => {
                    if (error.response && error.response.status === 401) {
                        this.$router.push({path: "/login"});
                    }
                });
            },
            noticeShow() {
                this.$ajax("get", this.$api.system.notifications, {}, result => {
                    this.notice.count = 0;
                    this.notice.data = result.docs;
                    for (let item of this.notice.data) {
                        item.updatedDate = this.$utils.dateFormat(
                            new Date(item.updatedTime),
                            "yyyy-MM-dd hh:mm:ss"
                        );
                    }
                    this.$ajax("put", this.$api.system.notifications, {}, () => {
                    });
                });
            },
            checkClose() {
                this.$ajax("put", this.$api.system.notifications, {}, () => {
                });
                // this.notice.count = "";
                // this.$router.push({path:'/main/personal/notice/table'})
            },
            handleCommand(command) {
                switch (command) {
                    case "person":
                        this.$router.push("/main/personal/info");
                        break;
                    case "updatePassword":
                        this.updatePassword();
                        break;
                    case "logout":
                        this.logout();
                        break;
                }
            },
            logout() {
                this.$confirm("是否退出登录?", "提示", {
                    type: "warning"
                })
                    .then(() => {
                        localStorage.removeItem("token");
                        this.$router.push({path: "/login"});
                    })
                    .catch(() => false);
            },
            updatePassword() {
                this.passwordFormParams.visible = true;
            },
            download(item) {
                let url = '';
                let data = {};
                if (item.msgType === 'screenshot_finished') {
                    url = this.$api.product.download;
                    data = {articles: item.content.split(",")};
                }
                if (item.msgType === 'imagehandle_finished') {
                    url = '/api/image-tools/download-image';
                    data = {id: item.content};
                }
                this.$ajax("post", url, data, result => {
                    window.location.href = result;
                });
            }
        }
    };
</script>
