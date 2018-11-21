import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

// javascript
import javaScript from 'src/javascript'

Vue.use(javaScript);

// components
import components from 'src/components'

Vue.use(components);

// directive
import directive from 'src/directive'

Vue.use(directive);

// icon
import 'font-awesome/css/font-awesome.css'

import App from './App'
import router from './router'
import store from './vuex'

// css
import 'src/css'

Vue.config.productionTip = false;

const app = new Vue({
    el: '#app',
    router,
    store,
    // provide: apolloProvider.provide(),
    template: '<App/>',
    components: {App}
});

// import apolloProvider from 'src/javascript/apollo'
