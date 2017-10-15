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
                <Radio label="0">保密</Radio>
                <Radio label="1">男</Radio>
                <Radio label="2">女</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="头像" prop="avatar">
            <upload></upload>
        </FormItem>
        <FormItem label="介绍" prop="desc">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="随便写点什么吧！"></Input>
        </FormItem>
    </Form>
</template>
<script>
    import { mapState } from 'vuex'
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
                    sex: '',
                    birthday: '',
                    desc: ''
                },
                ruleValidate: {
                    nickname: [
                        { required: true, message: '昵称不能为空', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                    ],
                    sex: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    birthday: [
                        { required: true, type: 'date', message: '请选择生日日期', trigger: 'change' }
                    ],
                    desc: [
                        { type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur' }
                    ]
                }
            }
        },
        components: {
          upload,
        },
        computed: mapState({
          ajaxUrl: state => state.ajaxUrl,//获取store中的ajaxUrl数据赋给ajaxUrl
        }),
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {

                        this.$ajax({
                            method: 'POST',
                            headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                      },
                            url: this.ajaxUrl+'member/add_member',
                            params:{firstName: 'Fred',
    lastName: 'Flintstone'},
                         })
                        .then(function (response) {
                            
                            this.dataList=response.data
                        }.bind(this))
                        .catch(function (error) {
                            console.log(error);
                        }.bind(this));//这两个回调函数都有各自独立的作用域，如果直接在里面访问 this，无法访问到 Vue 实例，这时只要添加一个 .bind(this) 就能解决这个问题



                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
