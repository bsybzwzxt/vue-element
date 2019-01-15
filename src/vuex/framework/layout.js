export default {
    namespaced: true,
    state: {
        loading: false,
        // 左边栏折叠
        sidebarCollapsed: JSON.parse(localStorage.getItem('sidebarCollapsed')) || false
    },
    mutations: {
        setLoading(state, value) {
            state.loading = value;
        }
    }
}