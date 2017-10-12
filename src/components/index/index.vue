<template>
    <div class="layout">
        <Row type="flex">
            
                <Menu active-name="1-2" theme="dark" width="240px" :open-names="['1']" accordion>
                    <div class="layout-logo-left"></div>
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="android-person" size="20"></Icon>
                            会员管理
                        </template>
                        <MenuItem name="1-1">会员列表</MenuItem>
                        <MenuItem name="1-2">选项 2</MenuItem>
                        <MenuItem name="1-3">选项 3</MenuItem>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="ios-keypad" size="20"></Icon>
                            导航二
                        </template>
                        <MenuItem name="2-1">选项 1</MenuItem>
                        <MenuItem name="2-2">选项 2</MenuItem>
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            <Icon type="ios-analytics" size="20"></Icon>
                            导航三
                        </template>
                        <MenuItem name="3-1">选项 1</MenuItem>
                        <MenuItem name="3-2">选项 2</MenuItem>
                    </Submenu>
                </Menu>
            
            <Col span="19">
                <div class="layout-header"></div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <BreadcrumbItem href="#">首页</BreadcrumbItem>
                        <BreadcrumbItem href="#">应用中心</BreadcrumbItem>
                        <BreadcrumbItem>某应用</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">
                      <!-- 路由 -->
                      <router-view name="main"></router-view>
                      <!-- 路由 -->
                    </div>
                </div>
                <div class="layout-copy">
                    2017-2030 &copy; cantinzing
                </div>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        
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
        padding: 10px;
    }
    .layout-copy{
        font-size: 15px;
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
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

    .layout-header{
      width: calc(100vw - 240px);
    }

    .layout-content{
      width: calc(100vw - 270px);
      height: 82vh;
    }
</style>