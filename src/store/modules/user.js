export default {
  state: {
    user: {},
    token: false
  },
  getters: {},
  mutations: {
    login(state = this.state, user) {
      // 放入vuex中管理
      state.user = user
      state.token = user.token
      //  本地持久化
      window.sessionStorage.setItem("user", JSON.stringify(state.user))
      window.sessionStorage.setItem('token', state.token)
    },
    initUser(state) {
      let user = window.sessionStorage.getItem('user')
      // 如果存在
      if (user) {
        state.user = JSON.parse(user)
        state.token = state.user.token
      }
    },
    logout(state) {
      state.user = {}
      state.token = false
      window.sessionStorage.clear()
    }
  },
  actions: {}
}
