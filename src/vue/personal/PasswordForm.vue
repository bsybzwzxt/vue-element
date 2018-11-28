<template>
    <el-dialog title="修改密码" width="40%" :visible.sync="innerVisible" @close="close" :append-to-body="true">
        <el-form ref="passwordForm" label-width="100px">
            <el-form-item label="原密码:">
                <el-input type="password" v-model="form.oldPwd" placeholder="请输入原密码" auto-complete="off"
                          v-validate="{rules: [{name: 'required'}], msg: '请输入原密码'}"></el-input>
            </el-form-item>
            <el-form-item label="新密码:">
                <el-input type="password" v-model="form.newPwd" placeholder="请输入新密码" auto-complete="off"
                          v-validate="{rules: [{name: 'required'}], msg: '请输入新密码'}"></el-input>
            </el-form-item>
            <el-form-item label="确认密码:">
                <el-input type="password" v-model="form.repeatPwd" placeholder="请再次输入密码" auto-complete="off"
                          v-validate="{rules: [{name: 'required'}, {name: 'equal', msg: '两次密码不一致', data: form.newPwd}], msg: '请输入确认密码'}"></el-input>
            </el-form-item>
            <div class="align-right">
                <el-button type="primary" v-validate:submit="{form: 'passwordForm', success: onSubmit}">提交</el-button>
                <el-button @click.native="close">取消</el-button>
            </div>
        </el-form>
    </el-dialog>
</template>
<script>
    export default {
        data() {
            return {
                innerVisible: this.visible,
                form: {oldPwd: '', newPwd: '', repeatPwd: ''}
            }
        },
        props: {
            visible: {
                type: Boolean,
                required: true
            }
        },
        watch: {
            visible: {
                handler(value) {
                    this.innerVisible = value;
                }
            }
        },
        methods: {
            onSubmit() {
                this.$ajax('post', '', this.form, (result) => {
                    this.close();
                })
            },
            close() {
                this.$emit('update:visible', false);
            }
        }
    }
</script>