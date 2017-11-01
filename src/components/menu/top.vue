<template>
    <div class="top">
        <Menu mode="horizontal" @on-select="logout">
            <div class="top_menu">
                <Avatar style="margin:10px auto;" size="large" src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                        
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="android-settings"></Icon>
                        {{admin}}
                    </template>
                    <MenuItem name="3-1">新增和启动</MenuItem>
                    <MenuItem name="3-2">清除缓存</MenuItem>
                    <MenuItem name="3-3">注销</MenuItem>
                </Submenu>
            </div>    
        </Menu>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                
            }
        },
        methods: {

          logout(name){
            if (name=='3-3') {
                this.$ajax({
                    method: 'GET',
                    url: this.$store.state.ajaxUrl+'login/login_out',
                })
                .then(function (response) {
                    if (response.data.code==0) {
                        
                        this.$Message.success(response.data.data);
                        
                    }else{
                        this.$Message.error(response.data.data);
                        
                    }
                    
                    setTimeout(() => {
                            this.$router.push('/login')
                        }, 2000);

                }.bind(this))
                .catch(function (error) {
                    this.$Message.error('网络出现了问题！ ┗( T﹏T )┛');
                }.bind(this));

              }
            },
        },

        computed: {
          admin () {
            return this.$store.state.userName
          }
        }
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