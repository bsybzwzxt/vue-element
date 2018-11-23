export default {
    namespaced: true,
    state: {
        name: '',
        avatar: '',
        access: {}
    },
    mutations: {
        setUserInfo(state, params) {
            let {nameKey = 'name', avatarKey = 'avatar', accessListKey = 'access', accessKey = 'access'} = params;
            state.name = params[nameKey] || '';
            state.avatar = params[avatarKey] || '';
            for (let item of (params[accessListKey] || [])) {
                if (item[accessKey]) {
                    state.access[item[accessKey]] = true;
                }
            }
        }
    }
}