<template>
    <el-dialog :visible.sync="innerVisible" :title="form.id ? '编辑角色' : '添加角色'" @close="close">
        <el-form ref="roleForm">
            <el-form-item label="角色名称" label-width="80px">
                <el-input type="text" v-model="form.name" placeholder="请输入角色名称"
                          v-validate="{rules: [{name: 'required'}], msg: '角色名称必填'}"></el-input>
            </el-form-item>
            <el-form-item>
                <el-checkbox :indeterminate="checkbox.isIndeterminate" v-model="checkbox.checkAll"
                             @change="checkAllChange">全选
                </el-checkbox>
                <el-checkbox-group v-model="form.data" @change="checkedChange">
                    <el-row :gutter="20">
                        <template v-for="item in list">
                            <el-col :span="6">
                                <el-checkbox :label="item.value">{{item.label}}</el-checkbox>
                            </el-col>
                        </template>
                    </el-row>
                </el-checkbox-group>
            </el-form-item>
            <div class="align-right">
                <el-button type="primary" v-validate:submit="{form: 'roleForm', success: onSubmit}">保存设置
                </el-button>
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
                form: {name: '', data: []},
                checkbox: {
                    isIndeterminate: false,
                    checkAll: false
                },
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
                let url = this.form.id ? this.$api.brand.brands + `/${this.form.id}` : this.$api.brand.brands;
                let method = this.form.id ? 'put' : 'post';
                this.$ajax(method, url, this.form, (result) => {
                    this.$message({message: '提交成功', type: 'success'});
                    this.$emit('success', result);
                    this.close();
                });
            },
            checkAllChange(value) {
                this.form.data = [];
                if (value) {
                    for (let item of this.list) {
                        this.form.data.push(item.value);
                    }
                }
                this.checkbox.isIndeterminate = false;
            },
            checkedChange(value) {
                this.checkbox.checkAll = value.length === this.list.length;
                this.checkbox.isIndeterminate = value.length > 0 && value.length < this.list.length;
            }
        }
    }
</script>