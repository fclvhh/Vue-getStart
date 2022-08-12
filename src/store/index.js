import Vue from 'vue'
import Vuex from 'vuex'
import user from "@/store/modules/user";
import goods_create from "@/store/modules/goods_create";


Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    user,
    goods_create,
  }
})
