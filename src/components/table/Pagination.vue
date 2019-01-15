<template>
    <div class="pagination">
        <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page='model[pageKey]'
                       :page-sizes='sizes' :page-size='model[sizeKey]' :layout='layout' :total='total'>
        </el-pagination>
    </div>
</template>
<script>
    export default {
        name: 'Pagination',
        data() {
            return {
                model: {}
            }
        },
        props: {
            // 数据总数
            total: {
                type: Number,
                default: 10000
            },
            // 当前页码
            page: {
                type: Number,
                default: 1
            },
            // 当前分页规格
            size: {
                type: Number
            },
            // 分页规格选择
            sizes: {
                type: Array,
                default: () => [10, 20, 30]
            },
            // 分页布局
            layout: {
                type: String,
                default: 'total, sizes, prev, pager, next, jumper'
            },
            // 返回当前页码的key
            pageKey: {
                type: String,
                default: 'page'
            },
            // 返回当前分页规格的key
            sizeKey: {
                type: String,
                default: 'size'
            }
            // @change: 分页组件变化时回调,返回分页page,size参数
        },
        mounted() {
            this.model[this.sizeKey] = this.$state.table.data.size || this.size || this.sizes[0];
            this.model[this.pageKey] = this.$state.table.data.page || this.page;
        },
        methods: {
            // 分页规格变化时,如果带动页码变化,会触发一次currentChange
            sizeChange(value) {
                this.model[this.sizeKey] = value;
                this.$store.commit('table/setTableSize', value);
                this.$emit('update:size', value);
                this.currentChange(this.model[this.pageKey]);
            },
            // 当前页码变化
            currentChange(value) {
                this.model[this.pageKey] = value;
                this.$store.commit('table/setTablePage', value);
                this.$emit('update:page', value);
                this.$emit('change', this.model);
            }
        }
    }
</script>
<style>
    .pagination {
        position: relative;
        margin: 20px 24px;
        text-align: right;
    }
</style>