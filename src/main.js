import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

// fontAwesome
import 'font-awesome/css/font-awesome.css';

// 加载脚本
import 'src/javascript';

// 加载全局组件
import components from 'src/components';

components.map(component => {
    Vue.component(component.name, component);
});

// 加载全局自定义指令
import directives from 'src/directive';

directives.map(directive => {
    Vue.use(directive);
});

import App from './App';
import router from './router';
import store from './vuex';

// css
import 'src/css';

Vue.config.productionTip = false;

const app = new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
});