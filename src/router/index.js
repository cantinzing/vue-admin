import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)



export default new Router({
  routes: [
  		{ 
	    	path: '/login',
	    	name: '登陆页面',
      		components: {
        		login:resolve => require(['../components/common/login'], resolve)
      		},
      		
    	},
	    {
		    path: '/',
		    name: '首页',//命名路由调用$route.name可以获取这个路由的name值，例如面包屑那里使用
		    components: {
		        main:resolve => require(['../components/index/homepage'], resolve)// 路由懒加载
		    },
		    meta: {
          		breadcrumbName: "首页"
        	}
		   
		},
	    { 
	    	path: '/member_list',
	    	name: '会员列表',
      		components: {
        		main:resolve => require(['../components/member/member_list'], resolve)
      		},
      		
    	},
    	{ 
	    	path: '/article_list',
	    	name: '文章列表',
      		components: {
        		main:resolve => require(['../components/article/article_list'], resolve)
      		},
      		children: [
	        {

	          path: 'add_article',
	          components:{
        		haha:resolve => require(['../components/article/add_article'], resolve)
      		  },
      		  meta: {
          		breadcrumbName: "添加文章"
        	  },
	        },
	        ],
      		meta: {
          		breadcrumbName: "文章列表"
        	},
    	},
    	// { 
	    // 	path: '/add_article',
	    // 	name: '添加文章',
     //  		components: {
     //    		main:resolve => require(['../components/article/add_article'], resolve)
     //  		},
     //  		meta: {
     //      breadcrumbName: "添加文章"
     //    }
    	// },
  	]


  	
})
