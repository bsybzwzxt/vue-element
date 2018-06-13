<template>
    <div class="toolbar">
        <div>
            <template v-for="item in handle" v-if="!item.access || $state.access[item.access]">
                <el-button v-if="item.mode === 'button'" size="small" :type="item.type" :disabled="item.disabled"
                           @click="item.callback">
                    <i v-if="item.icon" class="fa" :class="item.icon"></i>{{item.label}}
                </el-button>
                <el-dropdown v-if="item.mode === 'dropdown'" @command="item.callback" size="small"
                             placement="bottom">
                    <el-button :type="item.type" size="small">
                        {{item.label}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="option in item.options" :key="option.value" divided
                                          :command="option.value">{{option.label}}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <slot v-if="item.mode === 'custom' && (!item.access || $state.access[item.access])"
                      name="item.slotName"></slot>
            </template>
        </div>
        <div v-if="searchData || tabulationKeys">
            <el-popover v-if="searchData" placement="bottom-end" trigger="click">
                <template v-for="item in searchData" v-if="item.toggle !== undefined">
                    <div class="toolbar-checkbox">
                        <el-checkbox v-model="item.toggle" @change="tableSearchChange">{{item.label}}</el-checkbox>
                    </div>
                </template>
                <el-button type="primary" size="small" slot="reference">设置搜索<i
                        class="el-icon-caret-bottom el-icon--right"></i>
                </el-button>
            </el-popover>
            <el-popover v-if="tabulationKeys" placement="bottom-end" trigger="click">
                <template v-for="item in tabulationKeys" v-if="item.toggle !== undefined">
                    <div class="toolbar-checkbox">
                        <el-checkbox v-model="item.toggle" @change="tableKeyChange">{{item.label}}</el-checkbox>
                    </div>
                </template>
                <el-button type="primary" size="small" slot="reference">设置字段<i
                        class="el-icon-caret-bottom el-icon--right"></i>
                </el-button>
            </el-popover>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Toolbar',
        data() {
            return {}
        },
        props: {
            // 用于存储用户行为,需要储存用户行为时必填
            id: {
                type: String
            },
            // handle: Array 工具条按钮组
            // |--mode: String 必填,选择模式,有button,dropdown和custom
            // |--access: String 权限Key
            // |--label: String 按钮文本
            // |--type: String 按钮样式类型
            // |--icon: String fa的icon
            // |--callback: Function 回调方法
            // |--options: mode为dropdown时的下拉选项,label和value(select类似)
            // |--slotName: mode为slot时的slotName
            handle: {
                type: Array,
                default: () => {
                    return []
                }
            },
            // 表格组件的keys-需设置id
            tabulationKeys: {
                type: Array
            },
            // 搜索组件的data-需设置id
            searchData: {
                type: Array
            }
        },
        created() {
            // 加载字段
            if (this.id) {
                let tableKey = JSON.parse(localStorage.getItem(this.id + 'Keys'));
                if (tableKey) {
                    for (let item of this.tabulationKeys) {
                        if (item.toggle !== undefined) {
                            item.toggle = tableKey[item.key];
                        }
                    }
                }
                // 加载搜索
                let searchKey = JSON.parse(localStorage.getItem(this.id + 'Search'));
                if (searchKey) {
                    for (let item of this.searchData) {
                        if (item.toggle !== undefined) {
                            item.toggle = searchKey[item.key];
                        }
                    }
                }
            }
        },
        methods: {
            // 设置字段
            tableKeyChange() {
                let tableKey = {};
                for (let item of this.tabulationKeys) {
                    if (item.toggle !== undefined) {
                        tableKey[item.key] = item.toggle;
                    }
                }
                if (this.id) {
                    localStorage.setItem(this.id + 'Keys', JSON.stringify(tableKey));
                }
            },
            // 设置搜索
            tableSearchChange() {
                let searchKey = {};
                for (let item of this.searchData) {
                    if (item.toggle !== undefined) {
                        searchKey[item.key] = item.toggle;
                    }
                }
                if (this.id) {
                    localStorage.setItem(this.id + 'Search', JSON.stringify(searchKey));
                }
            }
        }
    }
</script>
<style>
    .toolbar {
        position: relative;
        margin: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .toolbar-checkbox .el-checkbox {
        width: 100%;
        padding: 5px;
    }

    .toolbar .el-button {
        margin: 1px;
    }

    .toolbar .el-button .fa {
        margin-right: 5px;
    }
</style>