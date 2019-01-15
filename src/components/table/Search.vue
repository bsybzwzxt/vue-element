<template>
    <div class="search" v-if="!access || $state.user.access[access]">
        <el-row :gutter="24">
            <template v-for="item in searchData">
                <el-col :sm="12" :md="8" :lg="6" v-if="item.toggle !== false && item.type !=='custom'">
                    <template v-if="item.type==='select'">
                        <label v-if="item.label">{{item.label}}</label>
                        <el-select v-model="model[item.key]" filterable clearable size="small"
                                   :placeholder="item.placeholder || '请选择'">
                            <el-option v-for="option in item.options" :key="option.value"
                                       :label="option.label || option.value" :value="option.value"></el-option>
                        </el-select>
                    </template>
                    <template v-else-if="item.type==='input'">
                        <label v-if="item.label">{{item.label}}</label>
                        <el-input v-model="model[item.key]" :placeholder="item.placeholder || '请输入'"
                                  size="small"></el-input>
                    </template>
                    <template v-else-if="item.type==='date'">
                        <label v-if="item.label">{{item.label}}</label>
                        <el-date-picker v-model="model[item.key]" type="date" :editable=false
                                        :placeholder="item.placeholder || '请选择'"
                                        value-format="yyyy-MM-dd" size="small"></el-date-picker>
                    </template>
                    <template v-else-if="item.type==='dateRange'">
                        <label v-if="item.label">{{item.label}}</label>
                        <el-date-picker v-model="model[item.key]" type="daterange" :editable="false" size="small"
                                        :picker-options="item.range && pickerOptions"
                                        @focus="item.range && dateRangeFocus(item.range)"
                                        value-format="yyyy-MM-dd"></el-date-picker>
                    </template>
                    <template v-else-if="item.type==='dateTimeRange'">
                        <label v-if="item.label">{{item.label}}</label>
                        <el-date-picker v-model="model[item.key]" type="datetimerange" :editable="false" size="small"
                                        :picker-options="item.range && pickerOptions"
                                        :default-time="['00:00:00', '23:59:59']"
                                        @focus="item.range && dateRangeFocus(item.range)"
                                        value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                    </template>
                    <template v-else-if="item.type==='multipleInput'">
                        <label v-if="item.label">{{item.label}}</label>
                        <el-select class="multiple-select" v-model="model[item.key]" multiple filterable collapse-tags
                                   size="small" allow-create :multiple-limit="item.limit || 0"
                                   :placeholder="item.placeholder || '请直接输入或粘贴'" default-first-option reserve-keyword
                                   @change="multipleInputChange(item)">
                            <el-option v-for="option in item.options" :key="option.value"
                                       :label="option.label || option.value" :value="option.value"></el-option>
                        </el-select>
                    </template>
                    <template v-else-if="item.type==='multipleSelect'">
                        <label v-if="item.label">{{item.label}}</label>
                        <el-select class="multiple-select" v-model="model[item.key]" multiple filterable collapse-tags
                                   size="small" :multiple-limit="item.limit || 0"
                                   :placeholder="item.placeholder || '请选择'" default-first-option>
                            <el-option v-for="option in item.options" :key="option.value"
                                       :label="option.label || option.value" :value="option.value"></el-option>
                        </el-select>
                    </template>
                    <template v-else-if="item.type==='cascade'">
                        <label v-if="item.label">{{item.label}}</label>
                        <el-cascader :options="item.options" :placeholder="item.placeholder" v-model="model[item.key]"
                                     :props="{value: item.optionsValueKey, label: item.optionsLabelKey, children: item.optionsChildrenKey}"
                                     :change-on-select="item.changeOnSelect" :show-all-levels="item.showAllLevels"
                                     filterable clearable size="small"></el-cascader>
                    </template>
                    <template v-else-if="item.type==='compound'">
                        <label v-if="item.label">{{item.label}}</label>
                        <el-input placeholder="搜索内容" v-model="compound.value" size="small">
                            <el-select v-model="compound.key" filterable clearable slot="prepend" placeholder="搜索字段"
                                       size="small">
                                <el-option v-for="option in item.options" :key="option.value"
                                           :label="option.label || option.value" :value="option.value"></el-option>
                            </el-select>
                        </el-input>
                    </template>
                </el-col>
                <slot v-if="item.type==='custom'" :name="item.slotName"></slot>
            </template>
            <el-col :sm="12" :md="8" :lg="6">
                <el-popover v-if="id" placement="bottom-end" trigger="click" popper-class="search-filter">
                    <template v-for="item in searchData" v-if="item.toggle !== undefined">
                        <el-checkbox v-model="item.toggle" @change="setSearch">{{item.label}}</el-checkbox>
                    </template>
                    <el-button type="text" size="mini" slot="reference">筛选<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                </el-popover>
                <el-button type="default" size="mini" @click="resetSearch">重置</el-button>
                <el-button type="primary" size="mini" @click="startSearch">搜索</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        name: 'Search',
        data() {
            return {
                searchData: {},
                model: {},
                compound: {key: '', value: ''},
                ensureDate: '',
                ensureRange: '',
                pickerOptions: {
                    disabledDate: this.disabledDate,
                    onPick: this.onPick
                },
                multipleInputValue: []
            }
        },
        props: {
            // 用户筛选行为保存id
            id: {
                type: String
            },
            // 搜索权限
            access: {
                type: String
            },
            // 数据列表,对象数组
            // type: select select型搜索框
            // |--key String 必填,字段名
            // |--label: String 显示文本
            // |--toggle: Boolean 搜索可以被设置,需设置key和label
            // |--placeholder String placeholder值
            // |--options: Array 必填,select选项
            // |----value: String 必填,供选择的值
            // |----label: String 供选择值的显示文本
            // type: multipleInput 多输入型搜索框
            // |--key String 必填,字段名
            // |--label: String 显示文本
            // |--toggle: Boolean 搜索可以被设置,需设置key和label
            // |--limit: number 最多选择数量
            // |--placeholder String placeholder值
            // type: multipleSelect 多搜索型搜索框
            // |--key String 必填,字段名
            // |--label: String 显示文本
            // |--toggle: Boolean 搜索可以被设置,需设置key和label
            // |--limit: number 最多选择数量
            // |--placeholder String placeholder值
            // type:input input型搜索框
            // |--key: String 必填,字段名
            // |--label: String 显示文本
            // |--toggle: Boolean 搜索可以被设置,需设置key和label
            // |--placeholder String placeholder值
            // type:date 日期选择框
            // |--key: String 必填,字段名
            // |--label: String 显示文本
            // |--toggle: Boolean 搜索可以被设置,需设置key和label
            // |--placeholder: String placeholder值
            // type:dateRange 日期范围选择框
            // |--key: String 必填,字段名每一级逗号分开
            // |--label: String 显示文本
            // |--range Number 最大天数
            // |--toggle: Boolean 搜索可以被设置,需设置key和label
            // type: compound 复合型搜索框,暂时唯一
            // |--key: String 必填,字段名
            // |--label: String 显示文本
            // |--toggle: Boolean 搜索可以被设置,需设置key和label
            // |--options: Array 必填,字段选项
            // |----value: String 必填,供选择的值
            // |----label: String 供选择值的显示文本
            // type: cascade 级联搜索框
            // |--key String 必填,字段名每一级逗号分开
            // |--label: String 显示文本
            // |--toggle: Boolean 搜索可以被设置,需设置key和label
            // |--placeholder String placeholder值
            // |--changeOnSelect Boolean 是否一定要选中最后一级
            // |--showAllLevels Boolean 是否显示所有层级
            // |--optionsValueKey String placeholder值
            // |--optionsLabelKey String placeholder值
            // |--optionsChildrenKey String placeholder值
            // |--options: Array 必填,select选项
            // |----value: String 必填,供选择的值
            // |----label: String 必填,供选择值的显示文本
            // |----children: Array 同options,下一级内容
            // type: custom 自定义搜索
            // |--slotName String slot表情的对应name
            data: {
                type: Array,
                required: true
            }
            // @search 开始搜索钩子,返回搜索字段
            // <div slot="search"></div> 自定义搜索内容
        },
        created() {
            // 读取缓存
            this.model = this.$state.table.data.searchModel;
            this.searchData = this.data.map(item => {
                switch (item.type) {
                    case 'multipleInput':
                        if (!this.model[item.key]) {
                            this.$set(this.model, item.key, []);
                            item.options = [];
                        } else {
                            this.multipleInputChange(item);
                        }
                        break;
                    case 'multipleSelect':
                        if (!this.model[item.key]) {
                            this.$set(this.model, item.key, []);
                        }
                        break;
                    case 'cascade':
                        if (!this.model[item.key]) {
                            this.$set(this.model, item.key, []);
                        }
                        break;
                }
                return item;
            });
            if (this.id) {
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
            startSearch() {
                let data = {};
                for (let item of this.searchData) {
                    switch (item.type) {
                        case 'select':
                            if (this.model[item.key] && item.toggle !== false) {
                                data[item.key] = this.model[item.key];
                            }
                            break;
                        case 'multipleInput':
                            if (this.model[item.key].length > 0 && item.toggle !== false) {
                                data[item.key] = this.model[item.key].join(',');
                            }
                            break;
                        case 'multipleSelect':
                            if (this.model[item.key].length > 0 && item.toggle !== false) {
                                data[item.key] = this.model[item.key].join(',');
                            }
                            break;
                        case 'input':
                            if (this.model[item.key] && item.toggle !== false) {
                                this.model[item.key] = this.model[item.key].trim();
                                if (this.model[item.key]) {
                                    data[item.key] = this.model[item.key];
                                }
                            }
                            break;
                        case 'date':
                            if (this.model[item.key] && item.toggle !== false) {
                                data[item.key] = this.model[item.key];
                            }
                            break;
                        case 'dateRange':
                            if (this.model[item.key] && item.toggle !== false) {
                                let array = item.key.split(',');
                                this.model[item.key].forEach((value, index) => {
                                    data[array[index]] = value;
                                });
                            }
                            break;
                        case 'dateTimeRange':
                            if (this.model[item.key] && item.toggle !== false) {
                                let array = item.key.split(',');
                                this.model[item.key].forEach((value, index) => {
                                    data[array[index]] = value;
                                });
                            }
                            break;
                        case 'compound':
                            if (this.compound.key && this.compound.value && item.toggle !== false) {
                                data[this.compound.key] = this.compound.value;
                            }
                            break;
                        case 'cascade':
                            if (this.model[item.key] && item.toggle !== false) {
                                if (item.key.indexOf(',') > 0) {
                                    let array = item.key.split(',');
                                    this.model[item.key].forEach((value, index) => {
                                        data[array[index]] = value;
                                    });
                                } else {
                                    data[item.key] = this.model[item.key][this.model[item.key].length - 1];
                                }
                            }
                            break;
                    }
                }
                this.$store.commit('table/setTableSearchData', data);
                this.$emit('startSearch', data);
            },
            resetSearch() {
                this.model = {};
                this.searchData.map(item => {
                    switch (item.type) {
                        case 'multipleInput':
                            this.$set(this.model, item.key, []);
                            item.options = [];
                            break;
                        case 'multipleSelect':
                            this.$set(this.model, item.key, []);
                            break;
                        case 'cascade':
                            this.$set(this.model, item.key, []);
                            break;
                        case 'compound':
                            this.compound = {key: '', value: ''};
                            break;
                    }
                    return item;
                });
                this.$store.commit('table/setTableSearchModel', {});
                this.$store.commit('table/setTableSearchData', {});
                this.$emit('resetSearch');
            },
            dateRangeFocus(range) {
                this.ensureRange = range;
            },
            disabledDate(time) {
                return this.ensureDate ? time.getTime() > this.ensureDate.getTime() + 86400000 * this.ensureRange : false;
            },
            onPick(date) {
                this.ensureDate = date.maxDate ? '' : date.minDate;
            },
            multipleInputChange(selection) {
                if (this.multipleInputValue.length < this.model[selection.key].length) {
                    let space = [...new Set(this.model[selection.key].pop().split(' '))].filter(a => a !== '');
                    this.model[selection.key] = [...new Set(space.concat(this.model[selection.key]))];
                }
                selection.options = [];
                this.model[selection.key].map((item) => {
                    selection.options.push({value: item})
                });
                this.multipleInputValue = [...this.model[selection.key]];
            },
            // 设置搜索
            setSearch() {
                let searchKey = {};
                for (let item of this.searchData) {
                    if (item.toggle !== undefined) {
                        searchKey[item.key] = item.toggle;
                    }
                }
                localStorage.setItem(this.id + 'Search', JSON.stringify(searchKey));
                this.$nextTick(() => {
                    this.$emit('setSearch', searchKey);
                });
            }
        }
    }
</script>
<style>
    .search {
        position: relative;
        margin: 16px 24px;
    }

    /*change ElementUI*/
    .search .el-col {
        margin-bottom: 16px;
    }

    .search .el-col:last-child {
        float: right;
        text-align: right;
        padding-top: 20px;
    }

    .search .el-col label {
        display: block;
        margin-bottom: 4px;
        font-size: 12px;
        color: #666666;
        line-height: 16px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .search .el-col label + .el-cascader,
    .search .el-col label + div {
        width: 100%;
    }

    .search .el-input-group__prepend {
        width: 30%;
        min-width: 105px;
    }

    .search .el-input-group__append {
        width: 70%;
    }

    .search .el-cascader--small {
        line-height: initial;
    }

    .search .el-cascader__label {
        line-height: 32px;
    }

    .search .multiple-select .el-select__tags {
        flex-wrap: nowrap;
    }

    .search .multiple-select .el-select__tags > input {
        width: 100% !important;
    }

    .search .multiple-select .el-select__tags > span {
        display: flex;
        white-space: nowrap;
        max-width: 50%;
    }

    .search .multiple-select .el-select__tags > span > span:first-child {
        flex: 1;
        overflow: hidden;
        display: flex;
        align-items: baseline;
    }

    .search .multiple-select .el-select__tags > span > span:first-child > span {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        flex: 1;
    }

    .search .el-popover__reference {
        margin-right: 16px;
        color: #666666;
    }

    .search .el-popover__reference:focus,
    .search .el-popover__reference:hover {
        color: #3366FF;
    }

    .search-filter {
        padding: 8px 0;
        width: auto;
        min-width: 120px;
    }

    .search-filter label.el-checkbox {
        display: block;
        margin-left: 0;
        padding: 8px 16px;
    }

</style>