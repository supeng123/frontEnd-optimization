import 'bootstrap/dist/css/bootstrap.css'
import Vue from 'vue';
// import MintUI from 'mint-ui';
// import 'mint-ui/lib/style.css';
// Vue.use(MintUI)

import { Button } from 'mint-ui';
Vue.component(Button.name, Button)

import app from './app.vue'

new Vue({
    el: '#app',
    render: c => c(app)
})