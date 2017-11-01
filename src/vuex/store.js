import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
// 注册vuex
Vue.use(Vuex)

// 初始化一些常用数据，根据vue的理念，使用到的数据都必须先进行初始化设置。
let state = {

  //设置全局的ajax请求网址
  ajaxUrl:'http://gym.dev/',

  userName:'',

  // 表单提交按钮状态
  submitLoading:false,

  //数据列表页每页显示条数
  listRows:10,

}







// 导出一个新生成的Store对象
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
