<template>
    <div class="page">
        <search v-bind="search" @startSearch="startSearch" @resetSearch="resetSearch"></search>
        <toolbar v-bind="toolbar"></toolbar>
        <tabulation v-bind="tabulation" @selection="selectionChange"></tabulation>
        <pagination v-bind="pagination" :page.sync="pagination.page" @change="paginationChange"></pagination>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                // form数据
                form: {},
                // 表格筛选参数
                model: {search: {}, page: {}, sort: {}},
                selection: [],
                tabulation: {
                    data: [],
                    keys: [
                        {key: 'no', label: '工号'},
                        {key: 'avatar', label: '头像', type: 'picture'},
                        {key: 'name', label: '姓名'}
                    ],
                    handle: [
                        {mode: 'button', label: '冻结', icon: 'fa-snowflake-o', type: 'text', callback: this.handle1},
                        {mode: 'button', label: '设置权限', icon: 'fa-gear', type: 'text', callback: this.handle2}
                    ],
                    handleWidth: 200
                },
                toolbar: {
                    handle: [{mode: 'button', label: '添加用户', icon: 'fa-plus', callback: this.batch1}]
                },
                search: {
                    data: [{
                        type: 'multipleInput', key: 'no', label: '工号'
                    }, {
                        type: 'multipleInput', key: 'username', label: '姓名'
                    }]
                },
                pagination: {total: 10, page: 1, pageKey: 'page', sizeKey: 'size'}
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
        },
        methods: {
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
            handle1() {

            },
            handle2() {

            },
            batch1() {

            }
        }
    }
</script>