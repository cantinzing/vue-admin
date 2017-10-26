<template>
	<div class="login">
	    <Card>
	        <div style="text-align:center">
	        	<div class="logo">
	        		<img src="https://avatars1.githubusercontent.com/u/24792871?v=4&s=460">
	        	</div>
	            <Form ref="formInline" :model="formInline" :rules="ruleInline">
			        <FormItem prop="user">
			            <Input type="text" v-model="formInline.user" placeholder="Username">
			                <Icon type="ios-person-outline" slot="prepend"></Icon>
			            </Input>
			        </FormItem>
			        <FormItem prop="password">
			            <Input type="password" v-model="formInline.password" placeholder="Password">
			                <Icon type="ios-locked-outline" slot="prepend"></Icon>
			            </Input>
			        </FormItem>
			        <FormItem>
			            <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
			        </FormItem>
			    </Form>
	        </div>
	    </Card>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            }
        }
    }
</script>

<style scoped>
	.login{
		width: 350px;
		margin:10% auto;
	}

	.logo img{
		width: 100px;
		margin-bottom: 40px;
	}
</style>