import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// element-ui
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';

Vue.use(ElementUI);

// icon
import 'font-awesome/css/font-awesome.css'

// css
import 'src/css/common.css'
import 'src/css/element-change.css'
import 'src/css/project.css'

// javascript
import JavaScript from 'src/javascript'

Vue.use(JavaScript);

// components
import components from 'src/components'

Vue.use(components);

// directive
import directive from 'src/directive'

Vue.use(directive);

import App from './App'
import router from './router'
import store from './vuex'

Vue.config.productionTip = false;

const app = new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
});