import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)



export default new Router({
  routes: [
  		{ 
	    	path: '/login',
      	component: resolve => require(['../components/common/login'], resolve),
      		
    	},

      { 
        path: '/index',
        component: resolve => require(['../components/index/index'], resolve),
        children: [
          {

            path: '/homepage',
            component:resolve => require(['../components/index/homepage'], resolve),
            meta: {
              breadcrumbName: "首页"
            }
          },
          { 
            path: '/member_list',
            component: resolve => require(['../components/member/member_list'], resolve),
            meta: {
              breadcrumbName: "会员列表"
            }
          },
          { 
            path: '/article_list',
            component: resolve => require(['../components/article/article_list'], resolve),
            meta: {
              breadcrumbName: "文章列表"
            },
          },
          { 
            path: '/add_article',
            component: resolve => require(['../components/article/add_article'], resolve),
            meta: {
              breadcrumbName: "添加文章"
            }
          },


        ],
          
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