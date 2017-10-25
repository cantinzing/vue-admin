<template>
    <div class="layout">
        <Row>
            <Col :span="spanLeft" class="layout-menu-left">
                <left></left>
            </Col>
            <Col :span="spanRight" class="layout-menu-right">
                <top></top>
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
    import left from '../menu/left'
    import top from '../menu/top'
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
        components: {
            left,
            top,
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
        margin-top: 65px;
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
        background: #fff;
        border-right: 1px solid #e9eaec;   
        position:fixed;
        float: left;
        height:100vh; 
    }
    .layout-menu-right{
        float: right;
        height: 100vh;
    }
    
    

</style>