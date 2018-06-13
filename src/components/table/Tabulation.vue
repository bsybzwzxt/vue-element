<template>
    <div class="tabulation">
        <slot name="caption"></slot>
        <el-table :data="data" :border="showBorder" :max-height="maxHeight" @row-dblclick="rowSelected"
                  @selection-change="selectionChange" @sort-change="sortChange">
            <el-table-column v-if="showSelect" type="selection" align="center" width="50"
                             :selectable="setSelectable && selectable"></el-table-column>
            <el-table-column v-if="showIndex" type="index" align="center" width="50"></el-table-column>
            <template v-for="item in keys" v-if="item.toggle !== false">
                <el-table-column :column-key="item.key" :prop="item.key" :label="item.label" :sortable="item.sort"
                                 :align="item.align" :width="item.width" :min-width="item.minWidth"
                                 :show-overflow-tooltip="item.overflow" :class-name="item.class">
                    <template slot-scope="scope">
                        <img v-if="item.type === 'picture'" width="100%" :src="scope.row[item.key]"/>
                        <slot v-else-if="item.type === 'custom'" :name="item.slotName" v-bind="scope"></slot>
                        <label v-else v-html="scope.row[item.key]"></label>
                    </template>
                </el-table-column>
            </template>
            <el-table-column v-if="handle.length > 0" label="操作" align="center" :width="handleWidth">
                <template slot-scope="scope">
                    <template v-for="item in handle" v-if="!item.access || $state.access[item.access]">
                        <el-button v-if="item.mode === 'button' && (!item.rely || scope.row[item.rely])" size="mini"
                                   :type="item.type" @click="item.callback(scope.row, scope.$index, scope.column)">
                            <i v-if="item.icon" class="fa" :class="item.icon"></i>{{item.label}}
                        </el-button>
                        <el-dropdown v-if="item.mode === 'dropdown' && (!item.rely || scope.row[item.rely])" size="mini"
                                     placement="bottom" @command="dropdownCommand"
                                     @visible-change="dropdownVisibleChange(item, scope.row)">
                            <el-button :type="item.type" size="mini">
                                <i v-if="item.icon" class="fa" :class="item.icon"></i>{{item.label}}<i
                                    class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item
                                        v-for="option in (typeof item.options === 'string' ? scope.row[item.options] : item.options)"
                                        :key="option.value" divided :command="option.value">
                                    {{option.label}}
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default {
        name: 'Tabulation',
        data() {
            return {
                selection: [],
                dropdown: {
                    currentRow: {},
                    currentItem: {}
                }
            }
        },
        props: {
            // 表数据
            // |--isSelected: Boolean 数据是否默认勾选
            data: {
                type: Array,
                required: true
            },
            // 是否显示表格边框
            showBorder: {
                type: Boolean,
                default: false
            },
            // 表格最大高度
            maxHeight: {
                type: [String, Number]
            },
            // 是否显示选择框
            showSelect: {
                type: Boolean,
                default: true
            },
            // 是否显示序号
            showIndex: {
                type: Boolean,
                default: false
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
                type: Array,
                required: true
            },
            // handle: Array 操作列设置
            // |--access: String 权限Key
            // |--mode: String 必填,选择模式,有button,dropdown,两种方式的回调返回参数不一样
            // |--label: String 按钮文本
            // |--type: String 按钮样式类型,或者text
            // |--icon: String fa的icon
            // |--rely: String 显示依赖字段
            // |--callback: Function 回调方法
            // |--options: Array/String Array型为dropdown时的下拉选项,label和value(select类似);String型为关联后台数据的key
            handle: {
                type: Array,
                default: () => {
                    return [];
                }
            },
            // 操作列宽度
            handleWidth: {
                type: Number
            },
            // selection设置禁止选择,需要返回Boolean
            setSelectable: {
                type: Function
            }
            // @selection 改变选中时钩子,返回选中数组
            // @sort 后台排序需要实现的函数,返回列,属性,顺序
        },
        watch: {
            data: {
                immediate: true,
                handler(value) {
                    this.$nextTick(() => {
                        for (let item of value) {
                            if (item.isSelected) {
                                this.$children[0].toggleRowSelection(item)
                            }
                        }
                    });
                }
            }
        },
        methods: {
            dropdownVisibleChange(item, row) {
                this.dropdown.currentItem = item;
                this.dropdown.currentRow = row;
            },
            dropdownCommand(value) {
                this.dropdown.currentItem.callback(value, this.dropdown.currentRow);
            },
            // 双击选中
            rowSelected(row) {
                this.$children[0].toggleRowSelection(row);
            },
            // 选中变化,selection为选择数组对象
            selectionChange(selection) {
                this.$emit('selection', selection);
            },
            // 排序为custom时需要实现
            sortChange(sort) {
                this.$emit('sort', sort);
            },
            // select设置禁止选择
            selectable(row, index) {
                return this.setSelectable(row, index);
            }
        }
    }
</script>
<style>
    .tabulation {
        position: relative;
        margin: 20px;
    }

    /*element-ui*/
    .tabulation .el-table .el-button {
        margin: 5px;
    }

    .tabulation .el-table .el-button--text {
        padding: 0;
    }

    .tabulation .el-button .fa {
        margin-right: 5px;
    }
</style>