<template>
    <div class="layout">
        <Row type="flex">
            <Col :span="spanLeft" class="layout-menu-left">
                <Menu :active-name="setActive" theme="dark" width="auto" :open-names="['/']" accordion @on-select="routeTo">
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
                            <Icon type="ios-keypad" :size="iconSize"></Icon>
                            导航二
                        </template>
                        <MenuItem name="2-1">选项 1</MenuItem>
                        <MenuItem name="2-2">选项 2</MenuItem>
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
            </Col>
            <Col :span="spanRight">
                <div class="layout-header"></div>
                <!-- 面包屑 -->
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <BreadcrumbItem v-bind:href="current_router" v-bind:replace="is_add">{{ $route.name }}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">
                      <!-- 路由 -->
                      <router-view name="main"></router-view>
                      
                    </div>
                </div>
            </Col>
        </Row>
    </div>
</template>
<script>

    export default {
        data() {
          return {
            spanLeft: 3,
            spanRight: 21,
            iconSize:18,
            is_add:true,
            router:this.$route.path
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
            current_router(){
              return this.$route.path;
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
    .layout{
        background: #f5f7f9;
        position: relative;
    }
    .ivu-row-flex{
      height: 100vh;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 20px 10px 20px 10px;
    }
    .layout-menu-left{
        background: #464c5b;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
</style>