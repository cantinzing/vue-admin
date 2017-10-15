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
                <addMember ref="addMember"></addMember>
                <!-- 通过在子组件上引用ref,从而获得子组件实例并通过this.$refs.addMember调用子组件方法或数据 -->
                <div slot="footer">
                    <Button type="dashed" :loading="submitLoading" @click="rest">
                      <span v-if="!submitLoading">提交</span>
                      <span v-else>提交中...</span>
                    </Button>
                    <Button type="primary" @click="save">提交</Button>
                </div>
        </Modal>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import addMember from './add_member'
    export default {
        data () {
            return {
                loading: false,
                submitLoading: false,
                modal1:false,
                columns7: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
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
                                            this.remove(params.index)
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
        }),

        methods: {

            fetchData () {
              this.loading = true
              this.$ajax({
                method: 'GET',
                url: this.ajaxUrl+'member/member_list',
             })
              .then(function (response) {
                this.loading = false
                this.dataList=response.data
              }.bind(this))
              .catch(function (error) {
                console.log(error);
              }.bind(this));//这两个回调函数都有各自独立的作用域，如果直接在里面访问 this，无法访问到 Vue 实例，这时只要添加一个 .bind(this) 就能解决这个问题
            },


            add_member(){
              this.modal1=true;
            },

            save(){
              this.$refs.addMember.handleSubmit(this.$refs.addMember.formname);
            },

            rest(){
              this.$refs.addMember.handleReset(this.$refs.addMember.formname);
            },

            show (index) {
                this.$Modal.info({
                    title: '用户信息',
                    content: `姓名：${this.dataList[index].nickname}<br>年龄：${this.dataList[index].age}<br>地址：${this.dataList[index].address}`
                })
            },
            remove (index) {
                this.dataList.splice(index, 1);
            }
        }
    }
</script>
<style scoped>

</style>