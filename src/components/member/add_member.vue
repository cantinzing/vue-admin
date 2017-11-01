<template>
    <Form :ref="formname" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="昵称" prop="nickname">
            <Input v-model="formValidate.nickname" placeholder="请输入昵称"></Input>
        </FormItem>
        <FormItem label="姓名" prop="real_name">
            <Input v-model="formValidate.real_name" placeholder="请输入昵称"></Input>
        </FormItem>
        <FormItem label="手机号码" prop="mobile">
            <Input v-model="formValidate.mobile" placeholder="请输入手机号码"></Input>
        </FormItem>
        <FormItem label="邮箱" prop="email">
            <Input v-model="formValidate.email" placeholder="请输入邮箱"></Input>
        </FormItem>
        <FormItem label="生日">
            <Row>
                <Col span="11">
                    <FormItem prop="birthday">
                        <DatePicker type="date" placeholder="选择生日" v-model="formValidate.birthday"></DatePicker>
                    </FormItem>
                </Col>
            </Row>
        </FormItem>
        <FormItem label="性别" prop="sex">
            <RadioGroup v-model="formValidate.sex">
                <Radio :label="0">保密</Radio>
                <Radio :label="1">男</Radio>
                <Radio :label="2">女</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="头像" prop="avatar">
            <upload v-on:uploadSuccess="uploadSuccess" ref="avatar" :picUrl.sync="formValidate.avatar"></upload>
        </FormItem>
        <FormItem label="介绍" prop="desc">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="随便写点什么吧！"></Input>
        </FormItem>
    </Form>
</template>
<script>
    import { mapState } from 'vuex'
    import {mapMutations} from 'vuex' //使用辅助函数mapMutations直接将触发函数submitLoading映射到methods上
    import qs from 'qs'//引入qs模块
    import upload from '../common/upload_pic'
    export default {
        data () {
            return {
                formname:'formValidate',
                formValidate: {
                    nickname: '',
                    real_name:'',
                    mobile:'',
                    email: '',
                    sex: 0,
                    birthday: '',
                    desc: '',
                    avatar:'',
                },
                
                ruleValidate: {
                    nickname: [
                        { type: 'string', min: 4, max:25, message: '昵称4字至25字之间', trigger: 'blur' },
                        { required: true, message: '昵称不能为空', trigger: 'blur' }
                    ],
                    email: [
                        
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                    ],
                    sex: [
                        { required: true, type:'number', message: '请选择性别', trigger: 'change' }
                    ],
                    mobile: [
                        { type: 'string', min: 11, message: '请填写正确的手机号码', trigger: 'blur' }
                    ],

                    birthday: [
                        { required: true, type: 'date', message: '请选择生日日期', trigger: 'change' }
                    ],
                    
                    avatar: [
                        { required: true,  message: '请选择上传头像', trigger: 'blur' }
                    ],
                    desc: [
                        { type: 'string', min: 1, message: '介绍不能少于1字', trigger: 'blur' }
                    ]
                }
            }
        },
        props: ['memberId'],
        components: {
          upload,
        },
        computed: mapState({
          ajaxUrl: state => state.ajaxUrl,//获取store中的ajaxUrl数据赋给ajaxUrl
        }),
        methods: {
            ...mapMutations(['submitLoading']), //这submitLoading被映射了相当于一个在methods可直接调用的函数

            handleSubmit (name) {
                
                this.$refs[name].validate((valid) => {
                    if (valid) {

                        this.submitLoading()

                        this.$ajax({
                            method: 'POST',
                            url: this.ajaxUrl+'member/add_member/id/'+this.memberId,
                            data:
                                qs.stringify(this.formValidate),
                         })
                        .then(function (response) {
                            if (response.data.code==0) {
                                this.$emit('addSuccess')
                                this.submitLoading()
                                this.$Message.success('提交成功 (ง •_•)ง');
                            }else{
                                this.$Message.error(response.data.data);
                                this.submitLoading()

                                if (response.data.code ==-1) {//用户未登录
                                    this.$router.push('/login')
                                }
                            }
                            
                            
                        }.bind(this))
                        .catch(function (error) {
                            this.submitLoading()
                            this.$Message.error('提交失败 ┗( T﹏T )┛');
                        }.bind(this));//这两个回调函数都有各自独立的作用域，如果直接在里面访问 this，无法访问到 Vue 实例，这时只要添加一个 .bind(this) 就能解决这个问题

                       
                    } else {
                        this.$Message.error('表单验证失败 ┗( T﹏T )┛');
                    }
                })
            },
            uploadSuccess(){

              this.formValidate.avatar=(this.$refs.avatar.picUrl)
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
