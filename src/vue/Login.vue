<template>
    <div class="login">
        <div class="login-title">后台管理系统</div>
        <el-form :model="loginForm" ref="loginForm">
            <el-form-item prop="username" :rules="[{required: true, message: '请输入登录名'}]">
                <el-input placeholder="请输入登录名" v-model="loginForm.username">
                    <template slot="prepend"><i class="fa fa-lg fa-user-circle-o"></i></template>
                </el-input>
            </el-form-item>
            <el-form-item prop="password" :rules="[{required: true, message: '请输入登录密码'}]">
                <el-input type="password" placeholder="请输入登录密码" v-model="loginForm.password">
                    <template slot="prepend"><i class="fa fa-lg fa-unlock-alt"></i></template>
                </el-input>
            </el-form-item>
            <el-form-item prop="verify" :rules="[{required: true, message: '请输入验证码'}]">
                <el-input placeholder="请输入验证码" class="login-code" v-model="loginForm.verify">
                    <template slot="prepend"><i class="fa fa-lg fa-ticket"></i></template>
                    <template slot="append"><img @click="getVerify" :src="verifySrc" alt="verify"/></template>
                </el-input>
            </el-form-item>
            <div class="align-center">
                <el-button type="primary" @click="onSubmit('loginForm')">登录</el-button>
            </div>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                verifySrc: '',
                loginForm: {}
            }
        },
        methods: {
            getVerify() {
                this.verifySrc = '' + '?' + Math.random();
            },
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        sessionStorage.setItem('isLogin', true);
                        this.$router.push({path: '/index'});
//                        this.ajax('', this.loginForm, (result) => {
//                        });
                    }
                });
            }
        }
    }
</script>
<style>

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

    /*change ElementUI input*/
    /*.login-code .el-input-group__append {*/
        /*height: 36px;*/
        /*width: 100px;*/
        /*padding: 0;*/
        /*border: 0;*/
        /*cursor: pointer;*/
    /*}*/

    .login .el-form-item__error {
        margin-left: 60px;
    }
</style>