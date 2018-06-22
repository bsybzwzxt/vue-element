<template>
    <div class="login">
        <div class="login-title">宝尊标准商品库</div>
        <el-form ref="loginForm">
            <el-form-item>
                <el-input placeholder="请输入登录名" v-model="loginForm.username"
                          v-validate="{rule: 'required', msg: '请输入登录名'}">
                    <template slot="prepend"><i class="fa fa-lg fa-user-circle-o"></i></template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="password" placeholder="请输入登录密码" v-model="loginForm.password"
                          v-validate="{rule: 'required', msg: '请输入登录密码'}">
                    <template slot="prepend"><i class="fa fa-lg fa-unlock-alt"></i></template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-input placeholder="请输入验证码" class="login-code" v-model="loginForm.verify"
                          v-validate="{rule: 'required', msg: '请输入验证码'}">
                    <template slot="prepend"><i class="fa fa-lg fa-ticket"></i></template>
                    <template slot="append"><img @click="getVerify" :src="verifySrc" alt="verify"/></template>
                </el-input>
            </el-form-item>
            <div class="align-center">
                <el-button type="primary" v-validate:submit="{form: 'loginForm', submit: onSubmit}">登录</el-button>
            </div>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                verifySrc: '',
                loginForm: {username: '', password: '',verify: ''}
            }
        },
        methods: {
            getVerify() {
                this.verifySrc = '' + '?' + Math.random();
            },
            onSubmit() {
                // this.$ajax('post', this.$api.system.login, this.loginForm, (result) => {
                //     localStorage.setItem('token', result.token);
                //     this.$state.user.name = result.username;
                    this.$router.push({path: '/main/demo/table'});
                // });
            }
        }
    }
</script>
<style scoped>
    .login {
        position: absolute;
        top: 50%;
        left: 50%;
        padding: 20px 30px;
        border-radius: 10px;
        background-color: #ffffff;
        box-shadow: 0 0 20px 0 #cccccc;
        transform: translate(-50%, -50%);
    }

    .login-title {
        margin-bottom: 20px;
        font-size: 16px;
        text-align: center;
        font-weight: bolder;
        color: #20a0ff;
    }

    .login img {
        display: block;
        width: 100%;
        height: 100%;
    }

    .login i.fa {
        width: 20px;
        text-align: center;
    }
</style>