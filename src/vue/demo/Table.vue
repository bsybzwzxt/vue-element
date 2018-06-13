<template>
    <div class="page">
        <search v-bind="search" @startSearch="startSearch" @resetSearch="resetSearch">
            <template slot="dataRange">
                <el-col :sm="12" :md="8" :lg="6">
                    <label class="demonstration">默认</label>
                    <el-date-picker v-model="value6" type="daterange" placeholder="选择日期范围"
                                    :picker-options="pickerOptions"
                                    value-format="yyyy-MM-dd" @focus="dateRangeChange(30)"></el-date-picker>
                </el-col>
            </template>
        </search>
        <toolbar name="tableDemo" :buttons="toolbar" :tabulationKeys="tabulation.keys" :searchData="search.data"></toolbar>
        <tabulation v-bind="tabulation" @selection="selectionChange" @sort="setSort" :setSelectable="setSelectable">
            <template slot="pic2" slot-scope="scope">
                <img :src="scope.row.pic2">
            </template>
        </tabulation>
        <pagination v-bind="pagination" :page.sync="pagination.page" @change="paginationChange"></pagination>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                ensureDate: '',
                pickerOptions: {
                    disabledDate: this.disabledDate,
                    onPick: this.onPick
                },
                value6: '',
                rangeDate: '',
                isCreate: true,
                isUpdate: false,
                dialogForm: false,
                // form数据
                form: {},
                // 表格筛选参数
                model: {search: {}, page: {}, sort: {}},
                tabulation: {
                    data: [],
                    // selectable: this.aaa,
                    keys: [
                        {key: 'pic1', label: '图片1', toggle: true, type: 'picture', pictureKey: 'src'},
                        {key: 'date', label: '日期', toggle: true, minWidth: '100'},
                        {key: 'pic2', label: '图片2', toggle: true, type: 'custom', slotName: 'pic2'},
                        {key: 'name', label: '姓名', sort: true, class: 'aaa', ccc: 'ccc'},
                        {key: 'address', label: '地址', overflow: true},
                        {key: 'no', label: '贷款号', sort: true},
                        {key: 'phone', label: '手机号', sort: true},
                        {key: 'card', label: '银行卡号', sort: true, toggle: false}
                    ],
                    handle: [
                        {label: '编辑', icon: 'fa-edit', type: 'text', callback: this.handle1},
                        {label: '删除', icon: 'fa-trash', type: 'text', callback: this.handle2, access: 'delete'}
                    ]
                },
                toolbar: [
                    {label: '添加', icon: 'fa-plus', callback: this.batch1, access: 'allAdd'},
                    {label: '批量操作', callback: this.batch2}
                ],
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
                            {value: true, label: "qita"},
                            {value: '上海银行'}
                        ]
                    }, {
                        type: 'multiple', key: 'multiple', label: '多选', options: [
                            {value: 'true', label: "qita"},
                            {value: '1', label: "aaa"},
                            {value: '2', label: "bbb"},
                            {value: '上海银行'}
                        ]
                    }, {
                        type: 'input', key: 'username', label: '姓名'
                    }, {
                        //     type: 'custom', slotName: 'dataRange'
                        // },{
                        type: 'daterange', key: 'startdate1,enddate1', range: 30, label: '日期范围'
                    }, {
                        type: 'date', key: 'startdate', label: '开始日期', toggle: true
                    }, {
                        type: 'date', key: 'enddate', label: '结束日期'
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
                    rowSelected: true,
                    src: 'src/images/logo.jpg'
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

//            this.sendAjax();
            this.pagination.total = 100;

        },
        methods: {
            setSort(sort) {
                this.model.sort = sort;
                console.log(sort)
                this.sendAjax();
            },
            setSelectable(row) {
                return row.name !== '王小虎2';
            },
            createModel() {
                return this.form = {
                    fundingType: ''
                };
            },
            sendAjax(data) {
                let params = Object.assign(Object.assign(Object.assign({}, this.model.search), this.model.page), this.model.sort);
                this.$ajax('post', 'asd', params, (result) => {
                    this.tabulation.data = result.data;
                    this.pagination.total = result.total;
                });
            },
            startSearch(data) {
                this.model.search = data;
                this.pagination.page = 1;
                this.model.page[this.pagination.pageKey] = 1;
                this.sendAjax();
            },
            resetSearch() {
                this.model.search = {};
                this.pagination.page = 1;
                this.model.page[this.pagination.pageKey] = 1;
                this.sendAjax();
            },
            paginationChange(data) {
                this.model.page = data;
                this.sendAjax();
            },
            selectionChange(data) {
                console.log(data)
            },
            handle1(index, row) {
                // 重置Form
                if (this.$refs['form']) {
                    this.$refs['form'].resetFields();
                }
                this.isCreate = false;
                this.isUpdate = true;
                this.dialogForm = true;
                this.form = this.$objectExtend(this.createModel(), row);
            },
            handle2(index, row) {
                this.$confirm('确定删除吗?', '提示', {type: 'warning'}).then(() => {
                    this.$ajax('url', {}, (result) => {
                        this.$message({message: '删除成功', type: 'success'});
                        this.sendAjax();
                    });
                }).catch(() => false);
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
                if (this.tabulation.selection.length > 0) {
                    // 重置Form
                    if (this.$refs['form']) {
                        this.$refs['form'].resetFields();
                    }
                    this.dialogForm = true;
                    this.isCreate = false;
                    this.isUpdate = false;
                    this.createModel();
                } else {
                    this.$message({message: '至少选择一项', type: 'error'});
                }
            },
            // 时间控制
            dateRangeChange(value) {
                console.log(value);
            },
            disabledDate(time) {
                // if (this.ensureDate) {
                //     return time.getTime() > this.ensureDate.getTime() + 86400000 * 3;
                // } else {
                //     return false;
                // }
                return this.ensureDate ? time.getTime() > this.ensureDate.getTime() + 86400000 * 3 : false
            },
            onPick(date) {
                console.log(date);
                console.log(this.value6);
                // if (date.maxDate) {
                //     this.ensureDate = '';
                // } else {
                //     this.ensureDate = date.minDate;
                //     // this.disabledDate;
                // }
                this.ensureDate = date.maxDate ? '' : date.minDate;
            }
        }
    }
</script>