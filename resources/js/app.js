// require('./bootstrap');
import Vue from 'vue'
import { BootstrapVue, IconsPlugin, FormSelectPlugin } from 'bootstrap-vue'
import VueAxios from 'vue-axios';
import axios from 'axios';
import store from './store/store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(FormSelectPlugin)
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.use(IconsPlugin)

const files = require.context('./', true, /\.vue$/i)
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

const app = new Vue({
    el: '#app',
    store,
});
