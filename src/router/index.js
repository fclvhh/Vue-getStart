import Vue from 'vue'
import VueRouter from 'vue-router'
// import Layout from '@/views/layout'
import Home from '@/views/home'
import routes from "@/common/config/routes";

Vue.use(VueRouter)


const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // console.log('守卫拦截')
  // console.log(to.path);
  // debugger
  console.log(to);
  console.log(from);
  console.log(next);
  let token = window.sessionStorage.getItem('token')
  if (token) {
    // 防止重复登陆
    if (to.path === "/login") {
      Vue.prototype.$message({
        message: '请不要重复登陆！',
        type: 'warning'
      })

      return next({name: from.name ? from.name : 'Home'})
    }

    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      Vue.prototype.$message.error('请先登陆！')
      next({name: 'Login'})
    }


  }
})
export default router
