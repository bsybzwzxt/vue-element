<template>
    <el-dialog :visible.sync="innerVisible" :title="form.id ? '编辑权限' : '添加权限'" @close="close">
        <el-form ref="accessForm" label-width="80px">
            <el-form-item label="权限名称">
                <el-input type="text" v-model="form.name" placeholder="请输入权限名称"
                          v-validate="{rules: [{name: 'required'}], msg: '权限名称必填'}"></el-input>
            </el-form-item>
            <el-form-item label="权限控制">
                <el-input type="text" v-model="form.value" placeholder="请输入权限控制"
                          v-validate="{rules: [{name: 'required'}], msg: '权限控制必填'}"></el-input>
            </el-form-item>
            <el-form-item label="权限类型">
                <el-select v-model="form.type" placeholder="请选择权限类型"
                           v-validate="{rules: [{name: 'required'}], msg: '请选择权限类型'}">
                    <el-option v-for="option in list" :key="option.value"
                               :label="option.label" :value="option.value"></el-option>
                </el-select>
            </el-form-item>
            <div class="align-right">
                <el-button type="primary" v-validate:submit="{form: 'accessForm', success: onSubmit}">保存设置</el-button>
                <el-button @click="close">取 消</el-button>
            </div>
        </el-form>
    </el-dialog>
</template>
<script>
    export default {
        data() {
            return {
                innerVisible: this.visible,
                form: {name: '', key: '', type: ''}
            }
        },
        props: {
            visible: {
                type: Boolean,
                required: true
            },
            list: {
                type: Array,
                required: true
            },
            data: {
                type: Object
            }
        },
        mounted() {
            this.$utils.objectExtend(this.form, this.data);
        },
        methods: {
            close() {
                this.$emit('update:visible', false);
            },
            onSubmit() {
                let url = this.form.id ? `/api/access/${this.form.id}` : '/api/access/add';
                let method = this.form.id ? 'put' : 'post';
                this.$ajax(method, url, this.form, (result) => {
                    this.$message({message: '提交成功', type: 'success'});
                    this.$emit('success', result);
                    this.close();
                });
            },
        }
    }
</script>