<template>
  <div>
    <Breadcrumb>
        <BreadcrumbItem v-for="(item,index) in brumblist" :key="index" :href="item.path" >{{item.meta.breadcrumbName}}</BreadcrumbItem>
    </Breadcrumb>

  </div>
</template>

<script>

  export default {
    created () {
      this.getBreadcrumb();
    },
    data () {
      return {
        title: '',  // 页面标题
        brumblist: '' // 路由集合
      }
    },

    methods: {
      getBreadcrumb () {
        this.brumblist = this.$route.matched;
        this.$route.matched.forEach((item, index) => {
          // 判断父级路由是否为空字符串或者meta是否为首页,直接复写路径到根目录
          // 后面的就是判断路由和当前遍历的项目是否一致,是的话把标题的值给上
          item.meta.breadcrumbName === '首页' ? item.path = '/' : this.$route.path === item.path ? this.title = item.meta.breadcrumbName : '';
        })
      }
    },
    watch: {
      $route () {
        this.getBreadcrumb();
      }
    }
  }
</script>