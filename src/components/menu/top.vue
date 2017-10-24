<template>
    <div class="top">
        <Menu mode="horizontal" active-name="1">
            <Avatar style="margin:10px auto;" size="large" src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
            <Submenu name="3">
                <template slot="title">
                    <Icon type="android-settings"></Icon>
                    统计分析
                </template>
                <MenuItem name="3-1">新增和启动</MenuItem>
                <MenuItem name="3-2">活跃分析</MenuItem>
                <MenuItem name="3-3">时段分析</MenuItem>
            </Submenu>
                
        </Menu>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                theme1: 'light'
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

    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
</style>