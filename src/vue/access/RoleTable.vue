<template>
    <div class="page">
        <!--<div class="page-title">角色列表</div>-->
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
        <roleForm v-if="role.visible" :visible.sync="role.visible" :data="role.data" :list="role.list"
                  @success="loadTable"></roleForm>
    </div>
</template>
<script>
    import RoleForm from './RoleForm';

    export default {
        components: {
            RoleForm: RoleForm
        },
        data() {
            return {
                role: {
                    visible: false,
                    list: [],
                    data: []
                },
                model: {search: {}, page: {pageSize: 20, currentPage: 1}, sort: {}},
                selection: [],
                tabulation: {
                    data: [],
                    keys: [
                        {key: 'name', label: '角色名称'},
                        {key: 'key', label: '拥有权限'}
                    ],
                    handle: [
                        {mode: 'button', label: '编辑', type: 'text', callback: this.accessEdit},
                        {mode: 'button', label: '删除', type: 'text', callback: this.accessDelete}
                    ],
                    handleWidth: 240,
                    batch: [
                        {mode: 'button', label: '添加角色', icon: 'fa-plus', callback: this.accessAdd}
                    ]
                },
                toolbar: {
                    handle: [
                        {mode: 'button', label: '添加角色', icon: 'fa-plus', callback: this.accessAdd}
                    ]
                },
                search: {
                    data: [{
                        type: 'input', key: 'name', label: '角色名称'
                    }, {
                        type: 'input', key: 'key', label: '拥有权限'
                    }]
                },
                pagination: {total: 0, page: 1, pageKey: 'currentPage', sizeKey: 'pageSize', sizes: [20, 50, 100]}
            }
        },
        created() {
            setTimeout(()=> {
                this.tabulation.data = [{
                    id: 1,
                    name: '超级管理员',
                    type: 'page',
                    key: '权限设置'
                }, {
                    id: 21,
                    name: '普通管理员',
                    type: 'page',
                    key: '设置角色'
                }, {
                    id: 34,
                    name: '用户',
                    type: 'page',
                    key: ''
                }];
                this.role.list = [{label: '测试一', value: '1'}, {label: '测试二', value: '2'}];
            },500)
        },
        methods: {
            loadTable() {
                let params = Object.assign(Object.assign(Object.assign({}, this.model.search), this.model.page), this.model.sort);
                this.$ajax('get', this.$api.brand.brands, params, (result) => {
                    this.tabulation.data = result.docs;
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
                this.role.visible = true;
                this.role.data = {};
            },
            accessEdit(row) {
                this.role.visible = true;
                this.role.data = row;
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
            }
        }
    }
</script>