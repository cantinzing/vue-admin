// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import axios  from 'axios'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './assets/css/common.css'

Vue.prototype.$ajax = axios//如果不添加这行，在其它的组件中，是无法使用 axios 命令的。但如果将 axios 改写为 Vue 的原型属性，就能解决这个问题
axios.defaults.withCredentials=true;//让ajax携带cookie，向后端发送cookie，解决由于跨域前端每次访问后端session_id都不同的问题  
Vue.use(iView)

//iview顶部加载进度条
router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    next();
});


// router.beforeEach((to,from,next) => {

//     if(to.meta.auth) {//是否对路由进行验证
//         if(localStorage.getItem("userName")) { // 已经登陆
//             next()     // 正常跳转到你设置好的页面
//         }else{
//             // 未登录则跳转到登陆界面，query:{ Rurl: to.fullPath}表示把当前路由信息传递过去方便登录后跳转回来；
// 　　 　　　　next({path:'/login',query:{ redirect: to.fullPath} })
//  　　　　　} 
//  	}else{
//  		next()
//  	}
// 　
// })

// router.afterEach(route => {
//     iView.LoadingBar.finish();
// });



var routeList = []

router.beforeEach((to, from, next) => {
  var index = routeList.indexOf(to.name)
  if (index !== -1) {
    //如果存在路由列表，则把之后的路由都删掉
    routeList.splice(index + 1, routeList.length - index - 1)
  } else {
    routeList.push(to.name)
  }
  to.meta.routeList = routeList
  next()
})




Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  //注入路由
  router,
  // 注入vuex的store
  store,
  template: '<App/>',
  components: { App }
}).$mount('#app')
