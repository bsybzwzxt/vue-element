<template>
    <div class="search" v-if="!access || $state.access[access]">
        <el-row :gutter="10">
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
                                   :placeholder="item.placeholder || '请输入'" default-first-option
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
                                     change-on-select filterable clearable size="small"></el-cascader>
                    </template>
                    <template v-else-if="item.type==='compound'">
                        <el-input placeholder="搜索内容" v-model="compound.value" size="small">
                            <el-select v-model="compound.key" filterable clearable slot="prepend" placeholder="搜索字段"
                                       size="small">
                                <el-option v-for="option in item.options" :key="option.value"
                                           :label="option.label || option.value" :value="option.value"></el-option>
                            </el-select>
                        </el-input>
                    </template>
                </el-col>
                <slot if="item.type==='custom'" :name="item.slotName"></slot>
            </template>
            <el-col :sm="12" :md="8" :lg="6">
                <el-button type="primary" icon="el-icon-search" size="small" @click="startSearch">搜索</el-button>
                <el-button icon="el-icon-refresh" size="small" @click="resetSearch">重置</el-button>
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
                }
            }
        },
        props: {
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
        mounted() {
            this.searchData = this.data.map(item => {
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
                }
                return item;
            });
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
                                let array = item.key.split(',');
                                this.model[item.key].forEach((value, index) => {
                                    data[array[index]] = value;
                                });
                            }
                            break;
                    }
                }
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
                this.$emit('resetSearch');
            },
            dateRangeFocus(range) {
                this.ensureRange = range;
            },
            disabledDate(time) {
                return this.ensureDate ? time.getTime() > this.ensureDate.getTime() + 86400000 * this.ensureRange : false
            },
            onPick(date) {
                this.ensureDate = date.maxDate ? '' : date.minDate;
            },
            multipleInputChange(selection) {
                selection.options = [];
                for (let item of this.model[selection.key]) {
                    let space = [...new Set(item.split(' '))].filter(a => a !== '');
                    for (let s of space) {
                        selection.options = selection.options.filter(a => a.value !== s);
                        selection.options.push({value: s});
                        this.model[selection.key] = this.model[selection.key].filter(a => a !== s);
                        this.model[selection.key].push(s);
                    }
                    if (item.trim().indexOf(' ') > -1) {
                        this.model[selection.key].splice(this.model[selection.key].indexOf(item), 1);
                    }
                }
            }
        }
    }
</script>
<style>
    .search {
        position: relative;
        margin: 20px;
    }

    /*change ElementUI*/
    .search .el-col {
        margin: 8px auto;
    }

    .search .el-col:not(:last-child) {
        display: flex;
        align-items: center;
    }

    .search .el-col:last-child {
        float: right;
        text-align: right;
    }

    .search .el-col label {
        width: 30%;
        text-align: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .search .el-col label + .el-cascader,
    .search .el-col label + div {
        flex: 1;
    }

    .search .el-input-group__prepend {
        width: 30%;
        min-width: 105px;
    }

    .search .el-input-group__append {
        width: 70%;
    }

    .search .multiple-select .el-select__tags > span {
        max-width: 100%;
        display: flex;
    }

    .search .multiple-select .el-select__tags > input {
        margin-left: 0;
        width: 0 !important;
    }

    .search .multiple-select .el-select__tags > span > span:first-child {
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
</style>