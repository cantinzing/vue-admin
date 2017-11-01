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
                    <breadcrumb></breadcrumb>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">
                      <!-- 路由分发 -->
                      <slot name="router"></slot>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
</template>
<script>
    import left from '../menu/left'
    import top from '../menu/top'
    import breadcrumb from '../common/breadcrumb'
    export default {
        data() {
          return {
            spanLeft: 3,
            spanRight: 21,
            iconSize:18,
          }
        },
        components: {
            left,
            top,
            breadcrumb,
        },
        computed: {

        },
        methods: {


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