<template>
    <div>
        <div class="demo-upload-list" v-if="picUrl !=''">
            <template>
                <img :src="ajaxUrl+picUrl">
                <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(picUrl)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(picUrl)"></Icon>
                </div>
            </template>
        </div>
        <Upload
            ref="upload"
            :show-upload-list="false"
            :default-file-list="defaultList"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png','gif']"
            :max-size="1024"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            type="drag"
            name="pic"
            :action="ajaxUrl+'upload/upload_one_pic'"
            style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="camera" size="20"></Icon>
            </div>
        </Upload>
        <Modal title="查看图片" v-model="visible">
            <div class="view_pic">
                <img :src="ajaxUrl+ imgUrl" v-if="visible" style="width: 100%">
            </div>
        </Modal>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import qs from 'qs'//引入qs模块
    export default {
        data () {
            return {
 
                defaultList: [
                    {
                        'name': 'a42bdcc1178e62b4694c830f028db5c0',
                        'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                    },
                    {
                        'name': 'bc7521e033abdd1e92222d733590f104',
                        'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                    }
                ],
                imgUrl: '',
                visible: false, 
            }
        },
        props: ['picUrl'],
        computed: mapState({
          ajaxUrl: state => state.ajaxUrl,//获取store中的ajaxUrl数据赋给ajaxUrl

        }),
        methods: {
            handleView (url) {
                this.imgUrl = url;
                this.visible = true;
            },
            handleRemove (url) {

                this.$ajax({
                            method: 'POST',
                            url: this.ajaxUrl+'upload/del_pic',
                            data:
                                qs.stringify({
                                    url:url,
                                    id:this.sqlId,
                                    table:this.table,
                                }),
                         })
                        .then(function (response) {

                            if (response.data.code==0) {
                                this.picUrl=''
                                this.$Message.success(response.data.msg);
                            }

                            if (response.data.code==2) {
                                this.picUrl=''
                                this.$Message.error(response.data.msg);
                            }else{
                                this.$Message.error(response.data.msg);
                            }
                                
                            

                        }.bind(this))
                        .catch(function (error) {
                            this.$Message.error(error.data.msg);
                        }.bind(this));//这两个回调函数都有各自独立的作用域，如果直接在里面访问 this，无法访问到 Vue 实例，这时只要添加一个 .bind(this) 就能解决这个问题
                            
                          
            },
            handleSuccess (res, file) {

                if (res.code==0) {
                    this.picUrl=res.data.url;
                    this.$emit('uploadSuccess')
                }else{
                    this.$Notice.error({
                    title: res.data,
                });
                }
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                });
            },
            handleBeforeUpload () {
                const check = this.picUrl.length <1;
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 1 张图片。'
                    });
                }
                return check;
            }
        },
        
    }
</script>
<style>
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
