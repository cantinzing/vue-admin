<template>
    <div>
        <div class="table_header" style="margin-bottom: 30px;">
            <Button type="info" @click="add_member">添加会员</Button>
            <Input  placeholder="输入会员名称关键词筛选数据" style="width: 250px"></Input>
        </div>
        <Table :loading="loading" ref="selection" :columns="columns7" :data="dataList"></Table>
        <Modal
                v-model="modal1"
                title="添加会员"
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
          <Page :total="total" :page-size="listRows" show-total @on-change="fetchData"></Page>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import addMember from './add_member'
    import {mapMutations} from 'vuex'
    import qs from 'qs'//引入qs模块
    export default {
        data () {
            return {
                loading: false,
                // submitLoading: false,
                modal1:false,
                total:0,
                columns7: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },

                    {
                        title: '头像',
                        key: 'avatar',
                        render: (h, params) => {//render函数渲染自定义组件,这里渲染的是avatar组件,是iview自带的组件
                            return h('avatar', {
                                props: {//avatar组件的参数
                                        src: this.ajaxUrl+params.row.avatar,
                                        size:'large'
                                    }
                            });
                        }
                    },
                    {   
                        title: '姓名',
                        key: 'nickname',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.nickname)
                            ]);
                        }
                    },
                    {
                        title: '年龄',
                        key: 'city_id'
                    },
                    {
                        title: '地址',
                        key: 'city'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index,params.row.member_id)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                
                dataList:[],
            }
        },
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
                url: this.ajaxUrl+'member/member_list',
                data:qs.stringify({
                  page:current?current:1,
                  listRows:this.listRows
                })
                
             })
              .then(function (response) {
                this.loading = false
                this.dataList=response.data.data
                this.total=response.data.total
              }.bind(this))
              .catch(function (error) {
                console.log(error);
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
            ...mapMutations(['logicDel']),
            remove (index,id) {
              this.$Modal.confirm({
                    title: '确认对话框标题',
                    content: '<p>一些对话框内容</p><p>一些对话框内容</p>',
                    onOk: () => {
                        var status=this.logicDel()
                        if () {this.$Message.info('点击了取消');}
                        
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