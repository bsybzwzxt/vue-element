<template>
    <el-dialog :visible.sync="innerVisible" :title="title" @close="close">
        <el-form>
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
                <el-button type="primary" @click="onSubmit()">保存设置</el-button>
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
                form: {id: this.id, data: []},
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
            id: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
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
                    for (let item of this.checkbox.list) {
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