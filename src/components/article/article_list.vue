<template>
    <div>
        <tableList  ref="table" :columns="columns" adminUrl="member/member_list" name="文章" sqlTable="member" search="输入文章标题关键词筛选数据">
                <span slot="header"><!-- 把这个块分发到table的slot='header'具名插槽里 -->
                    <router-link to="add_article"><Button class="tableHead" type="ghost">添加文章</Button></router-link>
                </span>
        </tableList>
    </div>
</template>
<script>
    import tableList from '../common/table'
    import addArticle from './add_article'
    import { mapState } from 'vuex'
    export default {
        data () {
            return {
                modal:false,
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
                                            this.$refs.table.edit(params.row.member_id,'member/get_edit_data');
                                            this.member_id=params.row.member_id;
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
                                            this.$refs.table.remove(params.index,params.row.member_id)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
            }
        },

        components: {
          tableList,
          addArticle,
        },
        computed: mapState({
          ajaxUrl: state => state.ajaxUrl,//获取store中的ajaxUrl数据赋给ajaxUrl
          submitLoading: state => state.submitLoading,//获取store中的submitLoading数据赋给submitLoading
        }),
        methods: {

            add_article(){
              this.rest();
              this.modal=true;
            },

            addSuccessq(){

              this.$refs.table.fetchData()
              this.modal=false;

            },

            save(){
              this.$refs.addMember.handleSubmit(this.$refs.addMember.formname);//访问add_member.vue子组件的handleSubmit方法
            },

            rest(){
              // this.$refs.addMember.handleReset(this.$refs.addMember.formname);//同上
            },
        },
        mounted () {
            
        },
        
    }
</script>
