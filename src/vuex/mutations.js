// vuex中state的数据只能被mutations方法所更改

const mutations = {

  // 修改表单提交按钮状态
  submitLoading: (state) => {
    state.submitLoading = !state.submitLoading
  },


  //数据逻辑删除操作
  logicDel:(state)=>{
    return true;
  },
















  // 判断访问设备是否PC 不是返回false
  // ispcfun: (state) => {
  //   let userAgentInfo = navigator.userAgent;
  //   let Agents = ["Android", "iPhone",
  //               "SymbianOS", "Windows Phone",
  //               "iPad", "iPod"];
  //   let flag = true;
  //   for (let v = 0; v < Agents.length; v++) {
  //       if (userAgentInfo.indexOf(Agents[v]) > 0) {
  //           flag = false;
  //           break;
  //       }
  //   }
  //   state.ispc=flag;

    
  // },

  // ajax获取到用户数据
  // getData: (state, data) => {
  //   // 将ajax获取到的值赋予state
  //   state.data = data
  //   // ajax状态更改为结束
  //   state.isAjax = true
  // },
  // // 标题
  // changTitle: (state, { title }) => {
  //   state.headerTitle = title
  // },
  // // 获取当前获得关注的朋友的_id
  // getActiveId: (state, { activeId }) => {
  //   state.activeId = activeId
  // },
  // 消息队列，聊天队列处理
  // changeList: (state, obj) => {
  //   let now = new Date()
  //   let time = `${now.getHours()}:${now.getMinutes()}`
  //   // 判断信息是自己的还是ai的，然后插入聊天队列中
  //   if (obj.self) {
  //     // 信息是自己发送的
  //     state.messageList.forEach((item, index, arr) => {
  //       if (item._id === obj._id) {
  //         obj._id = 0
  //         item.list.push({ ...obj, time })
  //       }
  //     })
  //   } else {
  //     // 信息是ai发送的
  //     state.messageList.forEach((item, index, arr) => {
  //       if (item._id === obj._id) {
  //         item.list.push({ ...obj, time })
  //       }
  //     })
  //   }
  // },
  // // 删除消息
  // removeMessage(state, { _id }) {
  //   state.messageList.forEach((item, index, arr) => {
  //     // 判断信息列表中id与正在删除的信息id是否相同，如果相同，就删除信息
  //     if (item._id === _id) {
  //       arr.splice(index, 1)
  //     }
  //   })
  // }
}

export default mutations
