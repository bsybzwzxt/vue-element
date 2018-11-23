<template>
    <div class="batch-toolbar">
        <div>
            <template v-if="batch">
                <label>批量操作：</label>
                <template v-for="item in batch" v-if="!item.access || $state.user.access[item.access]">
                    <el-button v-if="item.mode === 'button'" size="mini" :type="item.type" :disabled="item.disabled" @click="item.callback">
                        <i v-if="item.icon" class="fa" :class="item.icon"></i>{{item.label}}
                    </el-button>
                    <el-dropdown v-if="item.mode === 'dropdown'" @command="item.callback" size="small" placement="bottom">
                        <el-button :type="item.type" size="mini">
                            {{item.label}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="option in item.options" :key="option.value" divided :command="option.value">{{option.label}}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <slot v-if="item.mode === 'custom' && (!item.access || $state.user.access[item.access])" :name="item.slotName"></slot>
                </template>
                <label class="batch-selection">已选择：<span>{{selection.length}}</span> 项</label>
            </template>
        </div>
        <div>
            <el-popover v-if="id" placement="bottom-end" trigger="click" popper-class="tabulation-filter">
                <template v-for="item in keys" v-if="item.toggle !== undefined">
                    <div class="toolbar-checkbox">
                        <el-checkbox v-model="item.toggle" @change="setKey">{{item.label}}</el-checkbox>
                    </div>
                </template>
                <label slot="reference" class="tabulation-config">
                    <i class="fa fa-cog"></i>配置列
                </label>
            </el-popover>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'BatchToolbar',
        data() {
            return {}
        },
        props: {
            // 表数据
            // 用户筛选行为保存id
            id: {
                type: String
            },
            // batch: Array 工具条按钮组
            // |--mode: String 必填,选择模式,有button,dropdown和custom
            // |--access: String 权限Key
            // |--label: String 按钮文本
            // |--type: String 按钮样式类型
            // |--icon: String fa的icon
            // |--callback: Function 回调方法
            // |--options: mode为dropdown时的下拉选项,label和value(select类似)
            // |--slotName: mode为slot时的slotName
            batch: {
                type: Array
            },
            // keys: Array 显示表字段
            // |--type: String 模式,不填为正常值,有picture和custom选项
            // |--key: String 必填,字段名
            // |--label: String 必填,列表头
            // |--width: String 列宽度
            // |--minWidth: String 列最小宽度
            // |--sort: Boolean/'custom' 是否需要排序,为custom时，需要实现sort-change
            // |--align: String 对齐方式
            // |--color: String 字体颜色
            // |--class: String 列表样式
            // |--overflow: Boolean 超出部分是否显示...,鼠标悬浮全显示
            // |--toggle: Boolean 字段可以被设置,需设置key和label
            // |--slotName: String type为custom时,关联的name
            keys: {
                type: Array
            },
            // selection: Array 选择项
            selection: {
                type: Array
            }
        },
        created() {
            // 加载字段
            if (this.id) {
                let tableKey = JSON.parse(localStorage.getItem(this.id + 'Keys'));
                if (tableKey) {
                    for (let item of this.keys) {
                        if (item.toggle !== undefined) {
                            item.toggle = tableKey[item.key];
                        }
                    }
                }
            }
        },
        methods: {
            // 设置字段
            setKey() {
                let tableKey = {};
                for (let item of this.keys) {
                    if (item.toggle !== undefined) {
                        tableKey[item.key] = item.toggle;
                    }
                }
                if (this.id) {
                    localStorage.setItem(this.id + 'Keys', JSON.stringify(tableKey));
                }
            }
        }
    }
</script>
<style>
    .batch-toolbar {
        position: relative;
        padding: 16px;
        display: flex;
        justify-content: space-between;
    }

    .batch-toolbar .batch-selection {
        margin-left: 10px;
    }

    .batch-toolbar .batch-selection span {
        color: #3366FF;
    }

    .tabulation-filter {
        padding: 8px 0;
        width: auto;
        min-width: 120px;
    }

    .tabulation-filter label.el-checkbox {
        display: block;
        margin-left: 0;
        padding: 8px 16px;
    }

    .tabulation-config {
        cursor: pointer;
        line-height: 28px;
        padding: 0 8px;
    }

    .tabulation-config .fa {
        margin-right: 5px;
        color: #9a9a9a;
    }
</style>