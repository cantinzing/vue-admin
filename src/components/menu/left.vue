<template>
  <div>
    <Menu :active-name="setActive" theme="light" width="auto" :open-names="['/']" accordion @on-select="routeTo">
        <div class="layout-logo-left"></div>
        <MenuItem name="/">
            <Icon type="ios-navigate" :size="iconSize"></Icon>
            <span class="layout-text">首页</span>
        </MenuItem>
        <Submenu name="1">
            <template slot="title">
                <Icon type="android-person" :size="iconSize"></Icon>
                会员管理
            </template>
            <MenuItem name="member_list">会员列表</MenuItem>
            <MenuItem name="1-2">选项 2</MenuItem>
            <MenuItem name="1-3">选项 3</MenuItem>
        </Submenu>
        <Submenu name="2">
            <template slot="title">
                <Icon type="compose" :size="iconSize"></Icon>
                文章管理
            </template>
            <MenuItem name="2-1">文章分类</MenuItem>
            <MenuItem name="/article_list">文章列表</MenuItem>
        </Submenu>
        <Submenu name="3">
            <template slot="title">
                <Icon type="ios-analytics" :size="iconSize"></Icon>
                导航三
            </template>
            <MenuItem name="3-1">选项 1</MenuItem>
            <MenuItem name="3-2">选项 2</MenuItem>
        </Submenu>
    </Menu>
  </div>
</template>
<script>
    export default {
        data () {
            return {
                iconSize:18,
            }
        },
        computed: {
            setActive() {
              if(this.$route.path=='/'){//首页路由不应去掉/
                return this.$route.path;
              }
              else{
                return this.$route.path.replace('/','');//其它路由去掉/，否则不能高亮侧栏当前选中的栏目
              }
            },  
        },
        methods: {

          routeTo(path){
            this.$router.push(path)
          },

        },
    }
</script>
<style scoped>


    .layout-logo-left{
       /* width: 90%;
        height: 30px;*/
        /*background: #5b6270;*/
        /*border-radius: 3px;*/
        margin: 15px auto;
    }
    
    .ivu-menu-vertical.ivu-menu-light:after{
        content: '';
        display: block;
        width: 0px;
        height: 100vh;
        background: white;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 1;
    }
</style>