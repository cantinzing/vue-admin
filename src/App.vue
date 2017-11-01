<template>
  <div id="app">

  	<index v-if="login">
  		<span slot="router">
  			<router-view name="main"></router-view>
  		</span>
  	</index>
	
	<router-view @userSignIn="userSignIn" name="login"></router-view>

  </div>
</template>

<script>

	import index from './components/index/index'//引入子组件
	import { mapState } from 'vuex'
	import {mapMutations} from 'vuex' //使用辅助函数mapMutations直接将触发函数submitLoading映射到methods上

	  export default {
	    data (){
	      return {
	         
	      }
	    },
	    components: {

	        index
	    },

	    computed: mapState({
          ajaxUrl: state => state.ajaxUrl,//获取store中的ajaxUrl数据赋给ajaxUrl
          login: state => state.userName,//获取store中的userName数据赋给login 
        }),
	    created () {
	      //用户刷新页面时重新请求后台判断用户是否已经登录
          this.$ajax({
            method: 'GET',
            url: this.ajaxUrl+'login/is_login',
            
         })
          .then(function (response) {
            
            if (response.data.code==0) {
 
                this.userName(response.data.data)//调用mutations赋值store中的userName
                
            }else{
                this.$router.push('/login')//没有登录就跳转到登录页面
            }
            
          }.bind(this))
          .catch(function (error) {

            this.$Message.error('网络出现了问题！ε(┬┬﹏┬┬)3');
            
          }.bind(this));
            

	    },

	    methods:{
	    	...mapMutations(['userName']), //这userName被映射了相当于一个在methods可直接调用的函数

		    userSignIn(userName){//登录成功

		      this.userName (userName);//调用mutations赋值store中的userName
		    },
		    
		  }
	  }

</script>

<style scoped>
	body{
		font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
	}

	.page{
    	margin-top: 20px;
    }
</style>
