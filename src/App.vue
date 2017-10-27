<template>
  <div id="app">
 
  	<index>
  		<span slot="router">
  			<router-view name="main"></router-view>
  		</span>
  	</index>

			<router-view name="index"></router-view>
  </div>
</template>

<script>

	import index from './components/index/index'//引入子组件

	  export default {
	    data (){
	      return {
	        
	      }
	    },
	    components: {

	        index
	    },
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
