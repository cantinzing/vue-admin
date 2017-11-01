<template>
    <div>
        <div class="table_header">

            <Button class="tableHead" :disabled="!selection.length" type="ghost" @click="remove">批量删除</Button>
            <slot name="header"></slot>
            <Input v-model="keyWord" :placeholder="search" style="width: 250px" @on-enter="fetchData"></Input>
            <Button type="ghost" shape="circle" icon="ios-search" @click="fetchData"></Button>
            
        </div>
        <Table :loading="loading" ref="selection" :columns="columns" :data="dataList" @on-selection-change="select"></Table>
        
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
                total:0,
                keyWord:'',
                selection:[],
                dataList:[],
                editData:'',
            }
        },
        props: ['columns','adminUrl','name','sqlTable','search'],
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
                
                if (response.data.code==0) {
                    
                    this.$Loading.finish();
                    this.dataList=response.data.data.data
                    this.total=response.data.data.total

                }else{

                    this.$Message.error(response.data.data);
                    this.$Loading.error();

                    if (response.data.code ==-1) {//用户未登录
                        this.$router.push('/login')
                    }
                }
                this.loading = false
              }.bind(this))
              .catch(function (error) {
                this.$Message.error('网络出现了问题！ε(┬┬﹏┬┬)3');
                this.$Loading.error();
              }.bind(this));//这两个回调函数都有各自独立的作用域，如果直接在里面访问 this，无法访问到 Vue 实例，这时只要添加一个 .bind(this) 就能解决这个问题
            },


            show (index) {
                this.$Modal.info({
                    title: '用户信息',
                    content: `姓名：${this.dataList[index].nickname}<br>年龄：${this.dataList[index].age}<br>地址：${this.dataList[index].address}`
                })
            },

            edit (id,editUrl) {
                this.$Spin.show();
                this.$ajax({
                method: 'POST',
                url: this.ajaxUrl+editUrl,
                data:qs.stringify({
                  id:id,
                })
                
                })
              .then(function (response) {

                if (response.data.code==0) {
                    this.editData=response.data.data;
                    this.$emit('getData')
                }else{
                    this.$Spin.hide();
                    this.$Message.error('获取数据出现了问题！ε(┬┬﹏┬┬)3');
                    if (response.data.code ==-1) {//用户未登录
                        this.$router.push('/login')
                    }
                }
                

              }.bind(this))
              .catch(function (error) {
                this.$Spin.hide();
                this.$Message.error('网络出现了问题！ε(┬┬﹏┬┬)3');
                this.$Loading.error();
              }.bind(this));
            },

            select(selection){//全选删除

                var select=[];
                for (var i = 0; i <selection.length; i++) {
                    
                    select.push(selection[i]['member_id']);
                    
                }
                this.selection=select;
            },

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
                        if (response.data.code==0) {
                            this.loading = false;
                            this.$Loading.finish();
                            this.fetchData();
                        }else{
                            this.$Message.error(response.data.data);
                            if (response.data.code ==-1) {//用户未登录
                                this.$router.push('/login')
                            }
                        }

                      }.bind(this))
                      .catch(function (error) {
                        this.$Message.error('网络出现了问题！ε(┬┬﹏┬┬)3');
                        this.$Loading.error();
                      }.bind(this));
                      
                        
                    },
                    onCancel: () => {
                        // this.$Message.info('点击了取消');
                    }
                });
                
                // this.dataList.splice(index, 1);
            }
        }
    }
</script>
<style scoped>

</style>