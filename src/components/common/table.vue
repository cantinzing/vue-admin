<template>
    <div>
        <div class="table_header">
            <Button class="tableHead" :disabled="!selection.length" type="ghost" @click="remove">批量删除</Button>
            <Button class="tableHead" type="ghost" @click="add_member">添加{{name}}</Button>
            <Input v-model="keyWord" placeholder="输入会员名称关键词筛选数据" style="width: 250px"></Input>
            <Button type="ghost" shape="circle" icon="ios-search" @click="fetchData"></Button>
            <slot></slot>
        </div>
        <Table :loading="loading" ref="selection" :columns="columns" :data="dataList" @on-selection-change="select"></Table>
        <Modal
                v-model="modal1"
                :title="name"
                v-bind:mask-closable="false"><!-- 布尔值数据要用v-bind，否则报错 -->
                <addMember v-on:addSuccess="addSuccessq" ref="addMember"></addMember>
                <!-- 通过在子组件上引用ref,从而获得子组件实例并通过this.$refs.addMember调用子组件方法或数据 -->
                <div slot="footer">
                    <Button type="dashed" @click="rest">重置</Button>
                    <Button type="primary" :loading="submitLoading" @click="save">
                      <span v-if="!submitLoading">提交</span>
                      <span v-else>提交中...</span>
                    </Button>
                </div>
        </Modal>
        <div class="page">
          <Page :total="total" :page-size="listRows" size="small" show-total @on-change="fetchData"></Page>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import {mapMutations} from 'vuex'
    import qs from 'qs'//引入qs模块
    import addMember from '../member/add_member'
    export default {
        data () {
            return {
                loading: false,
                modal1:false,
                total:0,
                keyWord:'',
                selection:[],
                dataList:[],
            }
        },
        props: ['columns','adminUrl','name','sqlTable'],
        components: {
          addMember,
        },
        created () {
          // 组件创建完后获取数据，
          // 此时 data 已经被 observed(看到; 观察) 了
          this.fetchData()
        },

        computed: mapState({
          ajaxUrl: state => state.ajaxUrl,//获取store中的ajaxUrl数据赋给ajaxUrl
          submitLoading: state => state.submitLoading,//获取store中的submitLoading数据赋给submitLoading
          listRows: state => state.listRows,
        }),

        methods: {

            fetchData (current) {
              this.loading = true
              this.$ajax({
                method: 'POST',
                url: this.ajaxUrl+this.adminUrl,
                data:qs.stringify({
                  page:current?current:1,
                  listRows:this.listRows,
                  keyWord:this.keyWord,
                })
                
             })
              .then(function (response) {
                this.loading = false
                this.$Loading.finish();
                this.dataList=response.data.data
                this.total=response.data.total
              }.bind(this))
              .catch(function (error) {
                this.$Message.error('网络出现了问题！ε(┬┬﹏┬┬)3');
                this.$Loading.error();
              }.bind(this));//这两个回调函数都有各自独立的作用域，如果直接在里面访问 this，无法访问到 Vue 实例，这时只要添加一个 .bind(this) 就能解决这个问题
            },


            add_member(){
              this.modal1=true;
            },

            addSuccessq(){

              this.fetchData()
              this.modal1=false;

            },

            save(){
              this.$refs.addMember.handleSubmit(this.$refs.addMember.formname);//访问add_member.vue子组件的handleSubmit方法
            },

            rest(){
              this.$refs.addMember.handleReset(this.$refs.addMember.formname);//同上
            },

            show (index) {
                this.$Modal.info({
                    title: '用户信息',
                    content: `姓名：${this.dataList[index].nickname}<br>年龄：${this.dataList[index].age}<br>地址：${this.dataList[index].address}`
                })
            },

            select(selection){

                var select=[];
                for (var i = 0; i <selection.length; i++) {
                    
                    select.push(selection[i]['member_id']);
                    
                }
                this.selection=select;
            },

            ...mapMutations(['logicDel']),
            remove (index,id) {
              this.$Modal.confirm({
                    title: '确认要删除此'+this.name+'吗？',
                    content: '<p>'+this.name+'被删除后数据仍然会保留！</p>',
                    width:300,
                    onOk: () => {  

                        if (isNaN(index)) {//如果index是数字，说明是点击操作表格里的删除，否则是全选删除
                          var idArr=this.selection;
                        }else{
                          var idArr=id;
                        }
                                             
                      this.loading = true
                      this.$ajax({
                        method: 'POST',
                        url: this.ajaxUrl+'common/dataDel',
                        data:qs.stringify({
                          id:idArr,
                          sqlTable:this.sqlTable,
                        })
                        
                     })
                      .then(function (response) {
                        this.loading = false
                        this.$Loading.finish();
                        this.dataList=response.data.data
                        this.total=response.data.total
                      }.bind(this))
                      .catch(function (error) {
                        this.$Message.error('网络出现了问题！ε(┬┬﹏┬┬)3');
                        this.$Loading.error();
                      }.bind(this));
                      
                        
                    },
                    onCancel: () => {
                        this.$Message.info('点击了取消');
                    }
                });
                
                // this.dataList.splice(index, 1);
            }
        }
    }
</script>
<style scoped>

</style>