<template>
    <div class="page">
        <search v-bind="search" @startSearch="startSearch" @resetSearch="resetSearch">
            <template slot="aaa">
                <el-col :sm="24" :md="16" :lg="12">
                    <label>定制化</label>
                    <el-date-picker v-model="aaa.value" type="daterange" placeholder="选择日期范围"
                                    :picker-options="aaa.pickerOptions" value-format="yyyy-MM-dd"></el-date-picker>
                </el-col>
            </template>
        </search>
        <toolbar v-bind="toolbar" :tabulationKeys="tabulation.keys" :searchData="search.data"></toolbar>
        <tabulation v-bind="tabulation" @selection="selectionChange" @sort="setSort" :setSelectable="setSelectable">
            <template slot="pic2" slot-scope="scope">
                <img width="100%" :src="scope.row.pic2">
            </template>
        </tabulation>
        <pagination v-bind="pagination" :page.sync="pagination.page" @change="paginationChange"></pagination>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                aaa: {
                    value: '',
                    ensureDate: '',
                    pickerOptions: {
                        disabledDate: this.disabledDate,
                        onPick: this.onPick
                    }
                },
                isCreate: true,
                isUpdate: false,
                dialogForm: false,
                // form数据
                form: {},
                // 表格筛选参数
                model: {search: {}, page: {}, sort: {}},
                selection: [],
                tabulation: {
                    data: [],
                    keys: [
                        {key: 'pic1', label: '图片1', toggle: true, type: 'picture', width: 100},
                        {key: 'date', label: '日期', toggle: true, minWidth: '100'},
                        {key: 'pic2', label: '图片2', toggle: true, type: 'custom', slotName: 'pic2'},
                        {key: 'name', label: '姓名', sort: true, class: 'aaa', ccc: 'ccc'},
                        {key: 'address', label: '地址', overflow: true},
                        {key: 'no', label: '贷款号', sort: true},
                        {key: 'phone', label: '手机号', sort: true},
                        {key: 'card', label: '银行卡号', sort: true, toggle: false}
                    ],
                    handle: [{
                        mode: 'dropdown', label: '预览', icon: 'fa-eye', type: 'text', callback: this.productPreview,
                        options: [{label: '全部预览', value: 'all'}, {label: '仅预览选中', value: 'selected'}]
                    },
                        {mode: 'button', label: '编辑', icon: 'fa-edit', type: 'text', callback: this.handle1},
                        {mode: 'button', label: '删除', icon: 'fa-trash', type: 'text', callback: this.handle2, access: 'delete'}
                    ],
                    handleWidth: 200
                },
                toolbar: {
                    id: 'demoTable',
                    handle: [
                        {mode: 'button', label: '添加', icon: 'fa-plus', callback: this.batch1, access: 'allAdd'},
                        {mode: 'button', label: '批量操作', callback: this.batch2},
                        {
                            mode: 'dropdown', label: '批量下载', callback: this.batchDownload,
                            options: [{label: '全部下载', value: 'all'}, {label: '仅下载选中', value: 'selected'}]
                        }
                    ]
                },
                search: {
                    data: [{
                        type: 'compound', key: 'compound', label: '复合型搜索', toggle: true, options: [
                            {value: 'name', label: '姓名'},
                            {value: 'no', label: '贷款号贷款号贷款号贷款号贷款号'}]
                    }, {
                        type: 'cascade', key: 'jilian1,jilian2', label: '级联搜索', toggle: true, options: [{
                            value: 'ziyuan', label: '资源', children: [
                                {value: 'axure', label: 'Axure ComponentsComponents'},
                                {value: 'sketch', label: 'Sketch Templates'},
                                {value: 'jiaohu', label: '组件交互文档'}]
                        }]
                    }, {
                        type: 'select', key: 'bank', label: '银行', options: [
                            {value: true, label: "其他银行"},
                            {value: '上海银行'}
                        ]
                    }, {
                        type: 'input', key: 'username', label: '姓名'
                    }, {
                        type: 'multipleInput', key: 'multipleInput', label: '批量输入'
                    }, {
                        type: 'multipleSelect', key: 'multipleSelect', label: '批量选择', options: [
                            {value: 'true', label: "aaa"},
                            {value: '1', label: "bbb"},
                            {value: '2', label: "ccc"},
                            {value: 'ddd'}
                        ]
                    }, {
                        type: 'custom', slotName: 'dataRange'
                    }, {
                        type: 'date', key: 'date', label: '日期型', toggle: true
                    }, {
                        type: 'dateRange', key: 'startDate,endDate', range: 30, label: '日期范围', toggle: true
                    }, {
                        type: 'dateTimeRange', key: 'startTime,endTime', range: 10, label: '日期时间范围', toggle: true
                    }, {
                        type: 'custom', slotName: 'aaa'
                    }]
                },
                pagination: {
                    total: 3,
                    page: 1,
                    size: 2,
                    sizes: [1, 2, 60],
                    pageKey: 'page',
                    sizeKey: 'size'
                }
            }
        },
        mounted: function () {
            this.tabulation.data = [{
                id: 1,
                no: '201706131701017347104347',
                phone: ''
            }, {
                id: 21,
                no: '201706131701017347104347',
                phone: '15000000001',
                rowSelected: true

            }, {
                id: 34,
                no: '201706131701017347104347',
                phone: '15000000003'
            }];
            setTimeout(() => {
                this.tabulation.data = [{
                    id: 1,
                    no: '201706131701017347104347',
                    phone: '',
                    card: '6222023803013297860',
                    date: '2016-05-02',
                    name: '2017-07-18 17:00:03 <br> 2017-07-18 17:00:03',
                    address: '上海市普陀区金沙江路 1518 弄',
                    pic1: 'src/images/logo.jpg'
                }, {
                    id: 21,
                    no: '201706131701017347104347',
                    phone: '15000000001',
                    card: '6222023803013297860',
                    date: '2016-05-04',
                    name: '王小虎4',
                    address: '上海市普陀区金沙江路 1517 弄',
                    pic2: 'src/images/error.png',
                    isSelected: true
                }, {
                    id: 34,
                    no: '201706131701017347104347',
                    phone: '15000000003',
                    card: '6222023803013297860',
                    date: '2016-05-01',
                    name: '王小虎2',
                    address: '上海市普陀区金沙江路 1519 弄'
                }];
            }, 2000);

//            this.loadTable();
            this.pagination.total = 100;

        },
        methods: {
            setSort(sort) {
                this.model.sort = sort;
                console.log(sort)
                this.loadTable();
            },
            setSelectable(row) {
                return row.name !== '王小虎2';
            },
            createModel() {
                return this.form = {
                    fundingType: ''
                };
            },
            loadTable(data) {
                this.$ajax('post', 'asd', this.model, (result) => {
                    this.tabulation.data = result.data;
                    this.pagination.total = result.total;
                });
            },
            startSearch(data) {
                this.model.search = data;
                this.pagination.page = 1;
                this.model.page[this.pagination.pageKey] = 1;
                this.loadTable();
            },
            resetSearch() {
                this.model.search = {};
                this.pagination.page = 1;
                this.model.page[this.pagination.pageKey] = 1;
                this.loadTable();
            },
            paginationChange(data) {
                this.model.page = data;
                this.loadTable();
            },
            selectionChange(data) {
                console.log(data);
                this.selection = data;
            },
            handle1(row) {
                // 重置Form
                if (this.$refs['form']) {
                    this.$refs['form'].resetFields();
                }
                this.isCreate = false;
                this.isUpdate = true;
                this.dialogForm = true;
                this.form = this.$utils.objectExtend(this.createModel(), row);
            },
            handle2(row) {
                this.$confirm('确定删除吗?', '提示', {type: 'warning'}).then(() => {
                    this.$ajax('url', {}, (result) => {
                        this.$message({message: '删除成功', type: 'success'});
                        this.loadTable();
                    });
                }).catch(() => false);
            },
            productPreview(value, row) {
                console.log(value, row)
            },
            batch1() {
                // 重置Form
                if (this.$refs['form']) {
                    this.$refs['form'].resetFields();
                }
                this.isCreate = true;
                this.isUpdate = false;
                this.dialogForm = true;
                this.createModel();
            },
            batch2() {
                if (this.tabulation.length > 0) {
                    // 重置Form
                    if (this.$refs['form']) {
                        this.$refs['form'].resetFields();
                    }
                    this.dialogForm = true;
                    this.isCreate = false;
                    this.isUpdate = false;
                    this.createModel();
                } else {
                    this.$message({message: '至少选择一条数据', type: 'error'});
                }
            },
            batchDownload() {
                if (this.selection.length > 0) {
                } else {
                    this.$message({message: '至少选择一条数据', type: 'error'});
                }
            },
            disabledDate(time) {
                return this.aaa.ensureDate ? time.getTime() > this.aaa.ensureDate.getTime() + 86400000 * 3 : false
            },
            onPick(date) {
                this.aaa.ensureDate = date.maxDate ? '' : date.minDate;
            }
        }
    }
</script>