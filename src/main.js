// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import goods from './components/goods/goods'
import ratings from './components/ratings/ratings'
import seller from './components/seller/seller'
import './common/stylus/index.styl'


Vue.use(VueRouter);
Vue.use(VueResource);
const routes = [
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings },
  { path: '/seller', component: seller }
]
const router = new VueRouter({
  routes
})
router.push('/goods');
/*const app = new Vue({
	...App,
  router
});
app.$mount('#app');*/

// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
// let app=Vue.extend(App);
// let router;
// router.map({
// 	'/goods':{
// 		component:goods
// 	}
// })
// router.start(app,'#app');
