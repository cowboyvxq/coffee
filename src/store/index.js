import Vue from 'vue'
import Vuex from 'vuex'


// npm i -S vuex-persistedstate
import persistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [persistedState()],
  state: {
    //初始化购物数量
    msg: 0
  },
  mutations: {
    shopbagnum(state, payload) {
      //state: vuex的state对象
      //payload: 载荷(组件提交的参数)
      // console.log('payload ==> ', payload);
      //state.msg = 'mutations修改了state';
      state.msg = payload.data;
    },
  },
  actions: {
  },
  modules: {
  }
})
