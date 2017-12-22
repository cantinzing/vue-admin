<template>
    <div>
          
        <tableList v-on:getData="getData" ref="table" :columns="columns" adminUrl="member/member_list" name="会员" sqlTable="member" search="输入会员名称关键词筛选数据">
            <span slot="header"><!-- 把这个块分发到table的slot='header'具名插槽里 -->
                <Button class="tableHead" type="ghost" @click="add_member">添加会员</Button>
            </span>
        </tableList>
        <Modal
                v-model="modal"
                title="添加会员"
                v-bind:mask-closable="false"><!-- 布尔值数据要用v-bind，否则报错 -->
                <addMember v-on:addSuccess="addSuccessq" ref="addMember" :memberId="id"></addMember>
                <!-- 通过在子组件上引用ref,从而获得子组件实例并通过this.$refs.addMember调用子组件方法或数据 -->
                <div slot="footer">
                    <Button type="dashed" @click="rest">重置</Button>
                    <Button type="primary" :loading="submitLoading" @click="save">
                      <span v-if="!submitLoading">提交</span>
                      <span v-else>提交中...</span>
                    </Button>
                </div>
        </Modal>
    </div>
</template>
<script>
    import tableList from '../common/table'
    import addMember from './add_member'
    import { mapState } from 'vuex'
    export default {
        data () {
            return {
                modal:false,
                id:0,
                columns: [
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
                        width: 170,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'ghost',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.$refs.table.show(params.index);
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'ghost',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.$refs.table.edit(params.row.id,'member/get_edit_data');
                                            this.id=params.row.id;
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'ghost',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.$refs.table.remove(params.index,params.row.id)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
            }
        },

        computed: mapState({
          ajaxUrl: state => state.ajaxUrl,//获取store中的ajaxUrl数据赋给ajaxUrl
          submitLoading: state => state.submitLoading,//获取store中的submitLoading数据赋给submitLoading
        }),

        components: {
          tableList,
          addMember,
        },

        methods: {

            add_member(){
              this.id=0;
              this.rest();
              this.modal=true;
            },

            addSuccessq(){

              this.$refs.table.fetchData()
              this.modal=false;

            },

            getData(){
                this.rest();
                this.$refs.addMember.formValidate=this.$refs.table.editData;
            this.$refs.addMember.formValidate.birthday=new Date(this.$refs.table.editData.birthday);//把数据库取出的时间先格式化，否则保存修改时时间控件会报错
                this.modal=true;
                this.$Spin.hide();
            },

            save(){
              this.$refs.addMember.handleSubmit(this.$refs.addMember.formname);//访问add_member.vue子组件的handleSubmit方法
            },

            rest(){
              this.$refs.addMember.handleReset(this.$refs.addMember.formname);//同上
            },
            
        }
    }
</script>
