import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


// import index from '@/components/index/index' //路由正常加载
const homepage = resolve => require(['../components/index/homepage'], resolve)
const index = resolve => require(['../components/index/index'], resolve)// 路由懒加载
const member_list = resolve => require(['../components/member/member_list'], resolve)


export default new Router({
  routes: [
	    {
		    path: '/',
		    name: '首页',//命名路由调用$route.name可以获取这个路由的name值，例如面包屑那里使用
		    components: {
		        main:homepage
		    }
		},
	    { 
	    	path: '/member_list',
	    	name: '会员列表',
      		components: {
        		main:member_list
      		}
    	},
  	]


  	
})
