<template>
    <div>
        <div class="toolbar">
            <div>
                <template v-for="item in handle" v-if="!item.access || $state.user.access[item.access]">
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
                    <slot v-if="item.mode === 'custom' && (!item.access || $state.user.access[item.access])"
                          :name="item.slotName"></slot>
                </template>
            </div>
            <div class="toolbar-expand">
                <label v-if="upload && (!upload.access || $state.user.access[upload.access])"
                       :class="{'is-active': isActive('upload'),'is-collapse': isCollapse('upload')}"
                       @click="collapseChange('upload')">
                    <i class="fa fa-upload"></i>导入
                </label>
                <label v-if="download && (!download.access || $state.user.access[download.access])"
                       :class="{'is-active': isActive('download'),'is-collapse': isCollapse('download')}"
                       @click="collapseChange('download')">
                    <i class="fa fa-download"></i>导出
                </label>
                <label v-if="search && (!search.access || $state.user.access[search.access])"
                       :class="{'is-active': isActive('search'),'is-collapse': isCollapse('search')}"
                       @click="collapseChange('search')">
                    <i class="fa fa-search"></i>搜索栏
                </label>
            </div>
        </div>
        <div class="toolbar-collapse" ref="collapse">
            <div v-show="collapseType === 'upload'">
                <!--<slot name="upload"></slot>-->
            </div>
            <div v-show="collapseType === 'download'">
                <!--<slot name="download"></slot>-->
            </div>
            <template v-if="search">
                <search v-show="collapseType === 'search'" v-bind="search" @startSearch="startSearch"
                        @resetSearch="resetSearch"></search>
            </template>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Toolbar',
        data() {
            return {
                collapseState: false,
                collapseType: '',
                transformState: false,
                searchHeight: 0
            }
        },
        computed: {
            isActive() {
                return (type) => {
                    return this.collapseType === type;
                }
            },
            isCollapse() {
                return (type) => {
                    return this.collapseType === type && !this.collapseState;
                }
            }
        },
        props: {
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
            // upload: Object 导入
            // |--access: String 权限Key
            // |--callback: Function 回调方法
            upload: {
                type: Object
            },
            // download: Object 导出
            // |--access: String 权限Key
            // |--callback: Function 回调方法
            download: {
                type: Object
            },
            // search: Object 搜索组件的参数
            search: {
                type: Object
            }
        },
        created() {
            this.collapseType = (this.search && (!this.search.access || this.$state.user.access[this.search.access])) ? 'search' : ((this.download && (!this.download.access || this.$state.user.access[this.download.access])) ? 'download' : ((this.upload && (!this.upload.access || this.$state.user.access[this.upload.access])) ? 'upload' : ''));
            console.log(this.collapseType);
        },
        mounted() {
            this.searchHeight = this.$refs.collapse.offsetHeight;
        },
        methods: {
            collapseChange(type) {
                // 执行回调
                this[type].callback && this[type].callback();
                if (this.collapseType !== type) {
                    this.collapseType = type;
                    return;
                }
                let el = this.$refs.collapse;
                if (this.collapseState) {
                    this.collapseState = false;
                    el.style.display = '';
                    if(!el.offsetHeight){
                        return false
                    }
                    if (!this.transformState) {
                        this.searchHeight = el.offsetHeight;
                    }
                    // if (!el.style.height) {
                    //     this.searchHeight = el.offsetHeight;
                    // }
                    el.style.height = '0';
                    setTimeout(() => {
                        el.style.height = this.searchHeight + 'px';
                    });
                } else {
                    this.collapseState = true;
                    if(!el.offsetHeight){
                        return false
                    }
                    // if (!el.style.height) {
                    //     this.searchHeight = el.offsetHeight;
                    // }
                    if (!this.transformState) {
                        this.searchHeight = el.offsetHeight;
                    }
                    el.style.height = this.searchHeight + 'px';
                    setTimeout(() => {
                        el.style.height = '0';
                    });
                }
                let transitionEnd = () => {
                    el.style.height = '';
                    if (this.collapseState) {
                        el.style.display = 'none';
                    }
                    this.transformState = false;
                    el.removeEventListener('transitionend', transitionEnd, false);
                };
                this.transformState = true;
                el.addEventListener('transitionend', transitionEnd, false);
            },
            startSearch(data) {
                this.$emit('startSearch', data);
            },
            resetSearch() {
                this.$emit('resetSearch');
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

    .toolbar .fa {
        margin-right: 5px;
    }

    .toolbar-expand {
        user-select: none;
    }

    .toolbar-expand label {
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #ffffff;
        cursor: pointer;
    }

    .toolbar-expand label.is-active {
        border-color: #ebeef5;
        background-color: #fafafa;
    }

    .toolbar-expand label.is-collapse {
        color: #3366FF;
    }

    .toolbar-collapse {
        overflow: hidden;
        transition: height .3s linear;
    }

    .toolbar-collapse > .search {
        padding-top: 16px;
    }
</style>