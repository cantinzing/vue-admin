<template>
    <div style="background:#eee;padding: 20px">
        <Card :bordered="false">
            <p slot="title">无边框标题</p>
            <p>无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充。</p>
        </Card>
        <div @click="showPage">点我切换路由</div>
    </div>
</template>
<script>
    export default {
        data() {
          return {
          }
        },
        methods: {
          showPage: function(){
            this.$router.push('/member_list')
          }
        },
    }
</script>
