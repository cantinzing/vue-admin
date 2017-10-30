<template>
  <div id="app">
 
  	<index v-if="userName">
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

	  export default {
	    data (){
	      return {
	         userName: '',
	      }
	    },
	    components: {

	        index
	    },

	    computed: mapState({
          ajaxUrl: state => state.ajaxUrl,//获取store中的ajaxUrl数据赋给ajaxUrl
        }),
	    created () {
	    	
          this.$ajax({
            method: 'GET',
            url: this.ajaxUrl+'login/is_login',
            
         })
          .then(function (response) {
            
            if (response.data.code==0) {
 
                this.userName=response.data.data
                
            }else{
                this.$router.push('/login')
            }
            
          }.bind(this))
          .catch(function (error) {

            this.$Message.error('网络出现了问题！ε(┬┬﹏┬┬)3');
            
          }.bind(this));
            

	    },

	    methods:{
		    userSignIn(userName){

		      this.userName = userName;
		    }
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
