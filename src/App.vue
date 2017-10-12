<template>
  <div id="app">
  	<!-- <top></top> -->
  	<!-- <left></left> -->
  	<index></index>
    <!-- <router-view name="main"></router-view> -->

  </div>
</template>

<script>

	import left from './components/menu/left' //引入子组件
	import top from './components/menu/top'
	import index from './components/index/index'

	  export default {
	    data (){
	      return {
	        
	      }
	    },
	    components: {
	        left,
	        top,
	        index
	    },
	  }

</script>

<style scoped>
	html{
		font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
	}
</style>
