<template>
    <el-dialog title="个人信息" width="40%" :visible.sync="innerVisible" @close="close" :append-to-body="true">
        <el-form ref="personalForm" label-width="100px">
            <el-form-item label="用户名:">
                <el-input v-model="uploadParams.data.name" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="部门:">
                <el-input v-model="uploadParams.data.department" placeholder="请输入部门"></el-input>
            </el-form-item>
            <el-form-item label="邮箱号码:">
                <el-input v-model="uploadParams.data.email" placeholder="请输入邮箱号码"></el-input>
            </el-form-item>
            <el-form-item label="手机号码:">
                <el-input v-model="uploadParams.data.mobilePhone" placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <el-form-item label="用户头像:">
                <el-upload v-bind="uploadParams" class="avatar-uploader" :show-file-list="true">
                    <img v-if="this.uploadParams.data.avatar" :src="this.uploadParams.data.avatar" class="avatar-uploader-icon">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item class="align-center">
                <el-button type="primary" v-validate:submit="{form: 'personalForm', success: onSubmit}">保存</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
    export default {
        data() {
            return {
                innerVisible: this.visible,

                uploadParams: {
                    action: '',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    data: {
                        name: '',
                        department: '',
                        email: '',
                        mobilePhone: '',
                        avatar: '',
                    },
                    accept: 'image/png,image/jpeg',
                    limit: 1,
                    onChange: this.AvatarChange,
                    beforeUpload: () => false
                }
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
        created() {
            // this.$ajax('get', '', {}, (result) => {
            //     this.$utils.objectExtend(this.uploadParams.data, result);
            // });
        },
        methods: {
            onSubmit() {
                let formData = new FormData();
                Object.keys(this.uploadParams.data).forEach(name => {
                    formData.append(name, this.uploadParams.data[name])
                });
                this.$ajax('post', '', formData, (result) => {
                    this.$store.commit('user/setUserInfo', result);
                    this.$message({message: '提交成功', type: 'success'});
                    this.close();
                });
            },
            AvatarChange(file) {
                this.uploadParams.data.avatar = file.url;
                this.uploadParams.data.file = file.raw;
            },
            close() {
                this.$emit('update:visible', false);
            }
        }
    }
</script>