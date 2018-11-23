<template>
    <div class="page">
        <!--<div class="page-title">用户列表</div>-->
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
        <userSetForm v-if="userSet.visible" :visible.sync="userSet.visible" v-bind="userSet"
                     @success="loadTable"></userSetForm>
    </div>
</template>
<script>
    import UserSetForm from './UserSetForm'

    export default {
        components: {
            UserSetForm: UserSetForm
        },
        data() {
            return {
                userSet: {
                    visible: false,
                    id: '',
                    title: '',
                    url: ''
                },
                brandList: [],
                roleList: [],
                access: 'access',
                isCreate: true,
                isUpdate: false,
                model: {search: {}, page: {pageSize: 20, currentPage: 1}, sort: {}},
                selection: [],
                tabulation: {
                    data: [],
                    keys: [
                        {key: 'name', label: '用户名'},
                        // {key: 'brand', label: '所属品牌'},
                        {key: 'brand', label: '所属店铺'},
                        {key: 'role', label: '拥有角色'},
                        {key: 'status', label: '状态'}
                    ],
                    handle: [
                        // {
                        //     mode: 'dropdown', label: '设置', type: 'text', callback: this.productOperation,
                        //     options: [{value: 'shop', label: '设置店铺'}, {value: 'brand', label: '设置品牌'},{value: 'role', label: '设置角色'}]
                        // },
                        {mode: 'button', label: '设置店铺', type: 'text', callback: this.setBrand},
                        {mode: 'button', label: '设置角色', type: 'text', callback: this.setRole},
                        {mode: 'button', label: '冻结', type: 'text', callback: this.userDelete}
                    ],
                    handleWidth: 240,
                    batch: [
                        {mode: 'button', label: '添加用户', icon: 'fa-plus', callback: this.userAdd},
                        {
                            mode: 'dropdown', label: '批量设置', callback: this.batchSet,
                            options: [
                                {label: '选中设置店铺', value: 'selectedBrand'},
                                {label: '全部设置店铺', value: 'allBrand'},
                                {label: '选中设置角色', value: 'selectedRole'},
                                {label: '全部设置角色', value: 'allRole'}
                            ]
                        }
                    ]
                },
                toolbar: {
                    handle: [
                        {mode: 'button', label: '添加用户', icon: 'fa-plus', callback: this.userAdd},
                        {
                            mode: 'dropdown', label: '批量设置', callback: this.batchSet,
                            options: [
                                {label: '选中设置店铺', value: 'selectedBrand'},
                                {label: '全部设置店铺', value: 'allBrand'},
                                {label: '选中设置角色', value: 'selectedRole'},
                                {label: '全部设置角色', value: 'allRole'}
                            ]
                        }
                    ]
                },
                search: {
                    data: [{
                        type: 'input', key: 'name', label: '用户名'
                    }, {
                        type: 'select', key: 'brand', label: '品牌', options: []
                    }]
                },
                pagination: {total: 0, page: 1, pageKey: 'currentPage', sizeKey: 'pageSize', sizes: [20, 50, 100]}
            }
        },
        created: function () {
            this.tabulation.data = [{
                id: '1',
                account: '201706131701017347104347',
                state: '0',
                ip: '192.168.1.1',
                loginTimes: '2',
                name: '王小虎',
                role: '财务角色',
                roleList: ['role1', 'role2', 'role3', 'role4']
            }, {
                id: '21',
                account: '201706131701017347104347',
                state: '0',
                ip: '192.168.1.1',
                loginTimes: '2',
                name: '王小虎',
                role: '财务角色',
                roleList: ['role2', 'role3']
            }, {
                id: '34',
                account: '201706131701017347104347',
                state: '0',
                ip: '192.168.1.1',
                loginTimes: '2',
                name: '王小虎',
                role: '财务角色',
                roleList: []
            }];
            this.$ajax('get', this.$api.brand.brands, {}, (result) => {
                this.brandList = this.$utils.selectSet(result.docs, 'nameEn', 'code');
                this.search.data[1].options = this.$utils.selectSet(result.docs, 'nameEn', 'code');
                console.log(this.brandList);
            });
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
            userAdd() {
            },
            userDelete() {
            },
            setBrand(row) {
                this.userSet.visible = true;
                this.userSet.list = this.brandList;
                this.userSet.title = '设置品牌';
                this.userSet.url = '';
                this.userSet.id = row.id;
            },
            setRole(row) {
                this.userSet.visible = true;
                this.userSet.list = this.roleList;
                this.userSet.title = '设置角色';
                this.userSet.url = '';
                this.userSet.id = row.id;
            },
            batchSet(value) {
                if (value === 'selectedBrand') {
                    if (this.selection.length > 0) {
                        this.setBrand();
                        let id = [];
                        for (let item of this.selection) {
                            id.push(item._id);
                        }
                        this.checkbox.form.id = id;
                    } else {
                        this.$message({message: '至少选择一条数据', type: 'error'});
                    }
                }
                if (value === 'selectedRole') {
                    if (this.selection.length > 0) {
                        this.setRole();
                        let id = [];
                        for (let item of this.selection) {
                            id.push(item._id);
                        }
                        this.checkbox.form.id = id;
                    } else {
                        this.$message({message: '至少选择一条数据', type: 'error'});
                    }
                }
            }
        }
    }
</script>