<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Row>
            <Col span="7">
                <FormItem label="文章标题" prop="title">
                    <Input v-model="formValidate.title" placeholder="请输入文章标题"></Input>
                </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="7">
            <FormItem label="文章分类">
                <Select v-model="formValidate.cat_id">
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                </Select>
            </FormItem>
            </Col>
        </Row>
        <FormItem label="选择日期">
          
                    <FormItem prop="date">
                        <DatePicker type="date" placeholder="选择日期" v-model="formValidate.date"></DatePicker>
                    </FormItem>
           
        </FormItem>
        <Row>
            <Col span="10">
            <FormItem label="文章描述" prop="desc">
                <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入..."></Input>
            </FormItem>
            </Col>
        </Row>
        <FormItem label="文章内容" prop="content">
            <UE :defaultMsg=defaultMsg :config=config ref="ue"></UE>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
</template>
<script>
    import UE from '../common/ueditor';
    export default {
        data () {
            return {
                defaultMsg: '这里是UE测试',
                config: {
                  initialFrameWidth: null,
                  initialFrameHeight: 350
                },
                formValidate: {
                    title: '',
                    desc:'',
                    mail: '',
                    city: '',
                    gender: '',
                    cat_id: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: '',
                    content:'',
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: '请选择城市', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: '至少选择一个爱好', trigger: 'change' },
                        { type: 'array', max: 2, message: '最多选择两个爱好', trigger: 'change' }
                    ],
                    date: [
                        { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'date', message: '请选择时间', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请输入个人介绍', trigger: 'blur' },
                        { type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur' }
                    ]
                }
            }
        },
        components: {
          UE,
        },

        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
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
