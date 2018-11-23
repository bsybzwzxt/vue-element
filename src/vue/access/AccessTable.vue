<template>
    <div class="page">
        <!--<div class="page-title">权限列表</div>-->
        <div class="page-block">
            <search v-bind="search" @startSearch="startSearch" @resetSearch="resetSearch"></search>
        </div>
        <!--<div class="page-block">-->
            <!--<toolbar v-bind="toolbar"></toolbar>-->
        <!--</div>-->
        <div class="page-block">
            <tabulation v-bind="tabulation" @selection="selectionChange" @sort="setSort"></tabulation>
            <pagination v-bind="pagination" :page.sync="pagination.page" @change="paginationChange"></pagination>
        </div>
        <accessForm v-if="access.visible" :visible.sync="access.visible" :data="access.data" :list="access.list"
                    @success="loadTable"></accessForm>
    </div>
</template>
<script>
    import AccessForm from './AccessForm';

    export default {
        components: {
            AccessForm: AccessForm
        },
        data() {
            return {
                access: {
                    visible: false,
                    list: [],
                    data: {}
                },
                model: {search: {}, page: {pageSize: 20, currentPage: 1}, sort: {}},
                selection: [],
                tabulation: {
                    data: [],
                    keys: [
                        {key: 'name', label: '权限名称'},
                        {key: 'value', label: '权限字段'},
                        {key: 'type', label: '权限类型'}
                    ],
                    handle: [
                        {mode: 'button', label: '编辑', type: 'text', callback: this.accessEdit},
                        {mode: 'button', label: '删除', type: 'text', callback: this.accessDelete}
                    ],
                    handleWidth: 240,
                    batch: [
                        {mode: 'button', label: '添加权限', icon: 'fa-plus', callback: this.accessAdd}
                    ]
                },
                toolbar: {
                    handle: [
                        {mode: 'button', label: '添加权限', icon: 'fa-plus', callback: this.accessAdd}
                    ]
                },
                search: {
                    data: [{
                        type: 'input', key: 'name', label: '权限名称'
                    }, {
                        type: 'input', key: 'value', label: '权限字段'
                    }, {
                        type: 'select', key: 'type', label: '权限类型', options: []
                    }]
                },
                pagination: {total: 0, page: 1, pageKey: 'currentPage', sizeKey: 'pageSize', sizes: [20, 50, 100]}
            }
        },
        created() {
            this.tabulation.data = [{
                id: 1,
                name: '用户管理页面',
                type: 'page',
                key: '/main/access/user/table'
            }, {
                id: 21,
                name: '设置权限页面',
                type: 'page',
                key: '/main/access/access/table'
            }, {
                id: 34,
                name: '品牌管理页面',
                type: 'page',
                key: '/main/brand/brand/table'
            }];
            this.loadTable();
            this.access.list = [{label: 'api', value: 'api'}, {label: '页面', value: 'page'}];
        },
        methods: {
            loadTable() {
                // let params = Object.assign(Object.assign(Object.assign({}, this.model.search), this.model.page), this.model.sort);
                this.$ajax('get', '/api/access/list', this.model, (result) => {
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
            setSort(data) {
                if (data.order) {
                    let sortValue = '';
                    if (data.order === 'ascending') {
                        sortValue += '-';
                    }
                    sortValue += data.prop;
                    this.model.sort = {sort: sortValue};
                } else {
                    this.model.sort = {};
                }
                this.loadTable();
            },
            selectionChange(data) {
                this.selection = data;
            },
            accessAdd() {
                this.access.visible = true;
                this.access.data = {};
            },
            accessEdit(row) {
                this.access.visible = true;
                this.access.data = row;
            },
            accessDelete() {
                this.$confirm('确定删除数据?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.$ajax('delete', this.$api.brand.brands + `/${row['_id']}`, {}, (result) => {
                        this.$message({message: '删除成功!', type: 'success'});
                        this.loadTable();
                    });
                }).catch(() => false);
            },
            onSubmit() {
                this.$ajax(this.checkbox.url, this.checkbox.form, (result) => {
                    this.$message({message: '操作成功', type: 'success'});
                    this.loadTable();
                });
            }
        }
    }
</script>