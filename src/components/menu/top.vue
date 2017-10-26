<template>
    <div class="top">
        <Menu mode="horizontal" @on-select="logout">
            <div class="top_menu">
                <Avatar style="margin:10px auto;" size="large" src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                        
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="android-settings"></Icon>
                        cantinzing
                    </template>
                    <MenuItem name="3-1">新增和启动</MenuItem>
                    <MenuItem name="3-2">清除缓存</MenuItem>
                    <MenuItem name="3-3">注销</MenuItem>
                </Submenu>
            </div>    
        </Menu>
<!--         <Dropdown style="margin-left: 20px">
        <a href="javascript:void(0)">
            菜单(居中)
            <Icon type="arrow-down-b"></Icon>
        </a>
        <DropdownMenu slot="list">
            <DropdownItem>驴打滚</DropdownItem>
            <DropdownItem>炸酱面</DropdownItem>
            <DropdownItem>豆汁儿</DropdownItem>
            <DropdownItem>冰糖葫芦</DropdownItem>
            <DropdownItem>北京烤鸭</DropdownItem>
        </DropdownMenu>
    </Dropdown> -->
    </div>
</template>
<script>
    export default {
        data () {
            return {
                
            }
        },
        methods: {

          logout(){
            this.$router.push('/login')
          },

        },
    }
</script>

<style scoped>
    .top{
        position:fixed;
        top:0px;
        z-index: 1000;
        width:100%;
    }
    
    .top_menu{
        width: 27%;
        float: right;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }

    .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu-active, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu:hover{
        border-bottom: 0px !important;
        color: #495060;
    }
</style>