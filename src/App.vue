<template>
  <div id="app">
  	<!-- <top></top> -->
  	<!-- <left></left> -->
  	<index></index>
<!--   	<div class="layout-content">
                    <div class="layout-content-main">
                      <router-view name="main"></router-view> 
                    </div>
                </div> -->
   <!--  <router-view name="main"></router-view> -->

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
	body{
		font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
	}
</style>
