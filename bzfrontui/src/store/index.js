import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tagsName:[]
  },
  mutations: {// 方法
    addTags(state,obj){
        state.tagsName.push(obj)
    },
    set (state, msg) {
      let key = msg.type
      let data = msg.data
      for (let index in data) {
        state.axiosDate[key].push(data[index])
      }
    },
  }
})
