<template>
    <div class="login">
        <div class="login-left">
            <div id="illus" class="illus">
                <div class="ele_wrapper layer_1" data-depth="0.7">
                    <div class="cyl"></div>
                </div>
                <div class="ele_wrapper layer_2" data-depth="0.6">
                    <div class="wave"></div>
                    <div class="cube"></div>
                </div>
                <div class="ele_wrapper layer_3" data-depth="0.55">
                    <div class="front"></div>
                </div>
                <div class="ele_wrapper layer_4" data-depth="0.5">
                    <div class="human"></div>
                </div>
                <div class="ele_wrapper layer_5" data-depth="0.45">
                    <div class="dots"></div>
                </div>
                <div class="ele_wrapper layer_6" data-depth="0.4">
                    <div class="mid"></div>
                </div>
                <div class="ele_wrapper layer_7" data-depth="0.3">
                    <div class="black"></div>
                </div>
                <div class="ele_wrapper layer_8" data-depth="0.2">
                    <div class="back"></div>
                </div>
            </div>
        </div>
        <div class="login-right">
            <div class="login-from">
                <h2><i class="login-logo"></i>欢迎使用</h2>
                <div :class="loginParams.error?'':'hidden'" class="login-error1"><i class="el-icon-warning"></i> {{loginParams.errorMsg}}</div>
                <div class="login-from-control">
                    <label>账号</label>
                    <el-input v-model="loginForm.username" :disabled="loginParams.isLogin" placeholder="请输入"
                              @focus="loginParams.usernameError=false;loginParams.error=false"></el-input>
                    <div :class="loginParams.usernameError?'':'hidden'" class="login-error2">账号不能为空</div>
                </div>
                <div class="login-from-control">
                    <label>密码</label>
                    <el-input type="password" v-model="loginForm.password" :disabled="loginParams.isLogin" placeholder="请输入"
                              @focus="loginParams.passwordError=false;loginParams.error=false"></el-input>
                    <div :class="loginParams.passwordError?'':'hidden'" class="login-error2">密码不能为空</div>
                </div>
                <div class="login-from-control">
                    <el-button type="primary" @click="onSubmit">{{loginParams.isLogin ? '登录中...' : '登录'}}
                        <i v-if="!loginParams.isLogin" class="fa fa-arrow-right"></i></el-button>
                </div>
            </div>


        </div>
    </div>
</template>
<script>
    import Parallax from 'parallax-js'

    export default {
        data() {
            return {
                loginParams: {
                    errorMsg: '登录失败，请稍后重试',
                    error: false,
                    usernameError: false,
                    passwordError: false,
                    isLogin: false
                },
                loginForm: {username: '', password: ''}
            }
        },
        created() {
            document.onkeydown = (e) => {
                e = window.event || e;
                if (e.keyCode === 13 || e.which === 13) {
                    this.onSubmit();
                }
            }
        },
        mounted() {
            let illus = document.getElementById('illus');
            let parallax = new Parallax(illus, {
                relativeInput: false,
                clipRelativeInput: true,
                calibrateX: true,
                calibrateY: true,
                invertX: true,
                invertY: true,
                limitX: 500,
                limitY: 300,
                scalarX: 8,
                scalarY: 8,
                frictionX: 0.2,
                frictionY: 0.8
            });
        },
        destroyed() {
            document.onkeydown = null;
        },
        methods: {
            onSubmit() {
                this.$router.push({path: '/main/index'});

                // if (!this.loginForm.username.trim()) {
                //     this.loginParams.usernameError = true;
                //     return;
                // }
                // if (!this.loginForm.password.trim()) {
                //     this.loginParams.passwordError = true;
                //     return;
                // }
                // this.loginParams.isLogin = true;
                // this.$axios({
                //     method: "post",
                //     url: this.$api.system.login,
                //     data: this.loginForm
                // }).then(response => {
                //     this.loginParams.isLogin = false;
                //     if (response.data.code === 0) {
                //         localStorage.setItem('token', response.data.data.token);
                //         this.$state.user.name = response.data.data.name;
                //         this.$state.user.avatar = response.data.data.avatar;
                //         this.$state.user.account = response.data.data.username;
                //         // this.$state.access = response.data.data.access;
                //         this.$router.push({path: '/main/index'});
                //     } else {
                //         this.loginParams.errorMsg = response.data.msg || '登录失败，请稍后重试';
                //         this.loginParams.error = true;
                //     }
                // }).catch(error => {
                //     this.$message({message: '登录失败,请稍后重试', type: 'error'});
                // });
            }
        }
    }
</script>
<style>

    .login-right {
        display: table;
        position: absolute;
        right: 0;
        width: 38%;
        height: 100%;
        min-width: 486.4px;
        background-color: #FAFAFA;
    }

    .login-from {
        position: absolute;
        top: 45%;
        left: 50%;
        width: 100%;
        padding: 0 10%;
        transform: translate(-50%, -50%);
    }

    .login-from h2 {
        font-size: 28px;
        font-weight: 500;
        text-align: center;
    }

    .login-logo {
        display: inline-block;
        margin-right: 16px;
        width: 36px;
        height: 36px;
        vertical-align: middle;
        background: url("../images/login/logo.png") no-repeat;
        background-size: 100% 100%;
    }

    .login-from-control {
        position: relative;
        margin: 12px auto;
        width: 380px;
    }

    .login-from-control label {
        display: block;
        line-height: 16px;
        letter-spacing: 1px;
    }

    .login-from-control .el-input__inner {
        /*width: 380px;*/
        height: 48px;
        padding: 0;
        border: 0;
        border-radius: 0;
        border-bottom: 1px solid #e1e1e1;
        background-color: inherit;
    }

    .login-from-control .el-button {
        display: block;
        margin-top: 8px;
        width: 100%;
        height: 48px;
        font-size: 16px;
        border-radius: 2px;
        letter-spacing: 2px;
        box-shadow: 0 5px 12px 0 rgba(0, 0, 0, 0.15);
    }

    .login-from-control .el-button:hover {
        background-color: #2148D9;
    }

    .login-from-control .fa {
        width: 12px;
        transition: all .2s ease-out;
    }

    .login-from-control .el-button:hover .fa {
        transform: translateX(4px);
    }

    .login-from-control:last-child {
        margin-top: 20px;
    }

    .login-error1 {
        margin: 12px auto;
        font-size: 12px;
        line-height: 32px;
        text-align: center;
        border-radius: 2px;
        background-color: #ededed;
    }

    .login-error1 i {
        color: #FF9333;
    }

    .login-error2 {
        margin-top: 8px;
        font-size: 12px;
        color: #FA5555;
        line-height: 12px;
    }

    .login-left {
        position: absolute;
        width: 62%;
        height: 100%;
        background-color: #FFFFFF;
        overflow: hidden;
        min-width: 793.6px;
    }

    .holiday {
        margin-top: 40px;
        text-align: center;
        color: red;
    }

    .holiday p span:first-child {
        margin-right: 16px;
    }

    /*以下为视差引擎样式*/
    .illus {
        position: relative;
        top: 50%;
        left: 50%;
        margin-top: -356px;
        margin-left: -350px;
        background-position: 0 0;
    }

    .ele_wrapper {
        width: 700px;
        height: 712px;
    }

    .ele_wrapper > div {
        position: absolute;
        background-size: 100% 100%;
    }

    .cyl {
        left: 282px;
        top: 666px;
        width: 46px;
        height: 46px;
        background: url("../images/login/cyl.png") no-repeat;
    }

    .dots {
        left: 561px;
        top: 158px;
        width: 62px;
        height: 82px;
        background: url("../images/login/dots.png") no-repeat;
    }

    .cube {
        left: 574px;
        top: 357px;
        width: 68px;
        height: 46px;
        background: url("../images/login/cube.png") no-repeat;
    }

    .wave {
        left: 432px;
        top: 487px;
        width: 268px;
        height: 177px;
        background: url("../images/login/wave.png") no-repeat;
    }

    .front {
        left: 246px;
        top: 224px;
        width: 454px;
        height: 488px;
        background: url("../images/login/front.png") no-repeat;
    }

    .human {
        left: 171px;
        top: 202px;
        width: 242px;
        height: 481px;
        background: url("../images/login/human.png") no-repeat;
    }

    .mid {
        left: 120px;
        top: 95px;
        width: 454px;
        height: 488px;
        background: url("../images/login/mid.png") no-repeat;
    }

    .black {
        left: 106px;
        top: 108px;
        width: 454px;
        height: 488px;
        background: url("../images/login/black.png") no-repeat;
    }

    .back {
        left: 0;
        top: 0;
        width: 454px;
        height: 488px;
        background: url("../images/login/back.png") no-repeat;
    }

    .layer_1 {
        z-index: 20;
    }

    .layer_2 {
        z-index: 19;
    }

    .layer_3 {
        z-index: 18;
    }

    .layer_4 {
        z-index: 17;
    }

    .layer_5 {
        z-index: 16;
    }

    .layer_6 {
        z-index: 15;
    }

    .layer_7 {
        z-index: 14;
    }

    .layer_8 {
        z-index: 13;
    }
</style>