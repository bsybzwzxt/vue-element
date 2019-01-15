export default {
    namespaced: true,
    state: {
        // 阶级
        step: 0,
        // 数据
        data: {
            // 页数
            page: 0,
            // 条数
            size: 0,
            // 搜索组件模型
            searchModel: {},
            // 搜索数据
            searchData: {},
        },
        // 缓存
        cache: []
    },
    mutations: {
        resetTableLoad(state) {
            state.data = {
                page: 0,
                size: 0,
                searchModel: {},
                searchData: {}
            };
            state.cache = [];
        },
        setTableLoad(state, value) {
            if (value !== undefined) {
                if (!state.cache[value]) {
                    state.cache[value] = {
                        page: 0,
                        size: 0,
                        searchModel: {},
                        searchData: {}
                    };
                }
                state.data = state.cache[value];
            }
        },
        setTablePage(state, value) {
            state.data.page = value;
        },
        setTableSize(state, value) {
            state.data.size = value;
        },
        setTableSearchModel(state, value) {
            state.data.searchModel = value;
        },
        setTableSearchData(state, value) {
            state.data.searchData = value;
        }
    }
}