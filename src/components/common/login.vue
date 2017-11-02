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
			            <Button type="primary" :loading="Loading" @click="handleSubmit('formInline')">
			              <span v-if="!Loading">登录</span>
	                      <span v-else>登录中...</span>
				        </Button>
			        </FormItem>
			    </Form>
	        </div>
	    </Card>
    </div>
</template>
<script>
	import { mapState } from 'vuex'
	import {mapMutations} from 'vuex'
	import qs from 'qs'//引入qs模块
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

        created () {
          this.$Loading.finish();
          this.userName ('');//需要重新登陆时把全局userName设置为空
        },
        methods: {
            ...mapMutations(['userName']),
        	...mapMutations(['submitLoading']),
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.submitLoading()
                        
                        this.$ajax({
                            method: 'POST',
                            url: this.ajaxUrl+'login/login_check',
                            data:
                                qs.stringify(this.formInline),
                         })
                        .then(function (response) {
                            if (response.data.code==0) {
                            	
                            	this.$Message.success('登陆成功 (ง •_•)ง');
                            	this.$emit('userSignIn', response.data.data.user_name);
                            	setTimeout(() => {
				                    this.$router.push('/homepage')
				                }, 1000);

                            }else{
                                this.$Message.error(response.data.data);
                                
                            }
                            this.submitLoading()

                        }.bind(this))
                        .catch(function (error) {
    
                            this.submitLoading()
                            this.$Message.error('提交失败 ┗( T﹏T )┛');
                        }.bind(this));
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            }
        },
        computed: mapState({
          ajaxUrl: state => state.ajaxUrl,//获取store中的ajaxUrl数据赋给ajaxUrl
          Loading: state => state.submitLoading,//获取store中的submitLoading数据赋给submitLoading
        }),

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