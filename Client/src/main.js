// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './app'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import toolbar from './components/toolbar.vue'
import fileupload from './components/fileupload.vue'
import schichtplan from './components/schichtplan.vue'
import draggable from 'vuedraggable'
import VueResource from 'vue-resource'
import {store} from './store/store'
import VueTheMask from 'vue-the-mask'

Vue.component('my-toolbar', toolbar)
Vue.component('my-fileupload', fileupload)
Vue.component('my-schichtplan', schichtplan)
Vue.component('draggable', draggable)

Vue.use(VueResource)
Vue.use(VueTheMask)
Vue.use(Vuetify, { theme: {
  
  plight:'#4dbe85',
  pdark:'#005e2e',
  primary: '#008d58',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})
Vue.http.options.root = 'http://localhost:8082'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
