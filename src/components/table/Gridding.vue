<template>
    <div class="gridding">
        <batch-toolbar v-if="batch" :batch="batch" :selection="selection"></batch-toolbar>
        <div v-if="batch" class="gridding-check-all">
            <label @click="selectionAll">
                <i class="fa fa-lg fa-fw" :class="checkAll ? 'fa-check-square' : 'fa-square-o'"></i>全选
            </label>
        </div>
        <div class="gridding-layout">
            <div v-for="item in data" :key="item.label">
                <el-popover placement="top" trigger="hover" :disabled="!popover">
                    <slot v-if="popover" name="popover" :data="item"></slot>
                    <div slot="reference" class="gridding-image" @click="selectionChange(item)">
                        <img :src="item.srcKey" alt="alt"/>
                        <div v-if="handle" class="gridding-handle">
                            <span v-for="i in handle" v-if="(!i.access || $state.user.access[i.access]) && (!i.display || item[i.display])" :key="i.label" @click="handleCallback(item, i)">
                                <i v-if="i.icon" class="fa fa-lg" :class="i.icon"></i>{{ i.label }}
                            </span>
                        </div>
                        <div v-if="batch" class="gridding-check" :class="item.griddingSelected ? 'active' : ''">
                            <i :class="item.griddingSelected ? 'fa-check-square' : 'fa-square-o'" class="fa fa-lg"></i>
                        </div>
                    </div>
                </el-popover>
                <div class="gridding-title">
                    {{ item[titleKey] }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    // import imageDefault from 'src/images/img_default.png'

    export default {
        name: 'Gridding',
        props: {
            // 表数据
            // isSelected: Boolean 数据是否默认勾选
            data: {
                type: Array,
                required: true
            },
            // popover: Boolean 是否开启弹出框
            popover: {
                type: Boolean,
                default: false
            },
            // srcKey: String 图片地址的Key值
            srcKey: {
                type: String,
                default: 'src'
            },
            // titleKey: String 图片title的Key值
            titleKey: {
                type: String,
                default: 'title'
            },
            // handle: Array 操作列设置
            // |--access: String 权限Key
            // |--label: String 按钮文本
            // |--type: String 按钮样式类型,或者text
            // |--icon: String fa的icon
            // |--display: String 显示依赖字段
            // |--callback: Function 回调方法
            handle: {
                type: Array,
                default: () => {
                    return []
                }
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
                type: Array,
                default: () => {
                    return []
                }
            }
            // @selection 改变选中时钩子,返回选中数组
        },
        data() {
            return {
                checkAll: false,
                selection: [],
                // imageDefault
            }
        },
        watch: {
            data: {
                handler(value) {
                    if (this.batch) {
                        this.$nextTick(() => {
                            for (let item of value) {
                                if (item.griddingSelected === undefined) {
                                    this.$set(item, 'griddingSelected', false);
                                }
                            }
                        });
                    }
                }
            }
        },
        methods: {
            selectionChange(item) {
                item.griddingSelected = !item.griddingSelected;
                this.setSelection();
                this.checkAll = (this.selection.length === this.data.length);
                this.$emit('selection', this.selection);
            },
            handleCallback(item, target) {
                event.stopPropagation();
                target.callback(item)
            },
            selectionAll() {
                this.checkAll = !this.checkAll;
                this.data.map((item) => {
                    item.griddingSelected = this.checkAll;
                });
                this.setSelection();
                this.$emit('selection', this.selection);
            },
            setSelection() {
                this.selection = [];
                this.data.forEach((item, index) => {
                    if (item.griddingSelected) {
                        this.selection.push(this.data[index]);
                    }
                });
            }
        }
    }
</script>
<style>
    .gridding {
        position: relative;
        margin: 20px 24px;
    }

    .gridding .batch-toolbar {
        padding: 0;
    }

    .gridding-check-all {
        margin: 8px auto;
    }

    .gridding-check-all label {
        cursor: pointer;
    }

    .gridding-check-all i {
        margin-right: 4px;
    }

    /*图片排版*/
    .gridding-layout {
        position: relative;
        margin: 0 -8px;
        font-size: 12px;
    }

    .gridding-layout:after {
        content: '';
        display: table;
        clear: both;
    }

    .gridding-layout > div {
        float: left;
        padding: 8px;
        width: 238px;
        box-sizing: content-box;
    }

    .gridding-image {
        position: relative;
        width: 100%;
        height: 238px;
        border: 1px solid #D9D9D9;
        background: url("../../images/opacity.png");
        box-sizing: content-box;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .gridding-layout .gridding-image:hover {
        border-color: #3366FF;
    }

    .gridding-layout .gridding-image .gridding-check.active,
    .gridding-layout .gridding-image:hover .gridding-check {
        display: block;
    }

    .gridding-image img {
        display: block;
        max-width: 100%;
        max-height: 100%;
    }

    .gridding-check {
        position: absolute;
        top: 8px;
        left: 8px;
        display: none;
    }

    .gridding-check-all .fa-check-square,
    .gridding-check .fa-check-square {
        color: #3366FF;
    }

    .gridding-handle {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 40px;
        color: #ffffff;
        text-align: center;
        background-color: rgba(0, 0, 0, .2);
        align-items: center;
        display: none;
    }

    .gridding-layout .gridding-image:hover .gridding-handle {
        display: flex;
    }

    .gridding-handle span {
        flex: 1;
        line-height: 24px;
        border-right: 1px solid #666666;
        cursor: pointer;
    }

    .gridding-handle span i {
        margin: 0 4px;
    }

    .gridding-handle span:last-child {
        border-right: none;
    }

    .gridding-title {
        margin-top: 8px;
        line-height: 24px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>