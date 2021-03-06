import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Qs from 'qs'
import axios from 'axios'
import Vuex from 'vuex'

// 引入自定义配置文件
import './assets/css/public.css'
import * as api from './api/api'
import * as global from './api/global'
import store from "./store";

// 全局配置组件大小
// Vue.use(Element);
Vue.use(Element, {size: 'small'});
Vue.use(Vuex);

Vue.prototype.$qs = Qs;
Vue.prototype.$api = api;
Vue.prototype.$axios = axios;
Vue.prototype.$global = global;

Vue.config.productionTip = false;

// 自定义指令
const has = Vue.directive('has', {
    inserted: function (el, binding) {
        // 获取按钮权限
        if (!Vue.prototype.$_has(binding.value)) {
            el.parentNode.removeChild(el)
        }
    }
});
Vue.prototype.$_has = function (value) {
    let isExit = false;
    let permissions = store.state.userInfo.resourceInfoList;
    for (let i = 0; i < permissions.length; i++) {
        if (value === permissions[i]) {
            isExit = true;
            break;
        }
    }
    return isExit;
};
export {has};

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');


