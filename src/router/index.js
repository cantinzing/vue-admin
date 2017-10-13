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
		    components: {
		        main:homepage
		    }
		},
	    { 
	    	path: '/member_list',
      		components: {
        		main:member_list
      		}
    	},
  	]


  	
})
