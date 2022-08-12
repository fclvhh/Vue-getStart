<template>
  <div class="wrapper">
    <!--    el-container
              el-head
                el-menu
              el-main
                el-menu
      -->
    <el-container class="el-container-init" style="overflow: hidden">
      <el-header class="header-wrap">
        <div class="logo">
          <a>{{ $config.logo }}</a>
        </div>
        <el-menu :default-active="headerNav.activeIndex.toString()" class="el-menu-demo" mode="horizontal"
                 @select="headerSelect">
          <el-menu-item v-for="(item, index) in this.headerNav.list" :key='index' :index="index|numToString">
            {{ item.title }}
          </el-menu-item>
          <el-submenu index="20">
            <template slot="title">
              <el-avatar size="small" :src=" userInfo.avatar "></el-avatar>
              {{ userInfo.username }}
            </template>
            <el-menu-item index="20-1">修改</el-menu-item>
            <el-menu-item index="20-2">退出</el-menu-item>
          </el-submenu>

        </el-menu>
      </el-header>
      <el-container>
        <el-aside width="200px" style="height: calc(100vh - 60px)">
          <el-menu
              :default-active="getAsideActiveIndex.toString()"
              class="el-menu-vertical-demo"
              @select="asideSelect"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">

            <el-menu-item v-for="(item,index) in getAsideMenuArr" :index="index|numToString" :key="index">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.asideTitle }}</span>
            </el-menu-item>

          </el-menu>
        </el-aside>
        <el-main style="height: calc(100vh - 60px); overflow-y: scroll" class="el-main">
          <!--    面包屑导航      -->
          <div class="bread-wrap" v-show="breadRouterCache.length > 0">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item v-for="(item,index) in breadRouterCache" :key="index"
                                  :to="{ path: item.path }">{{ item.title }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <router-view class="up-show"></router-view>
          <!--          <div style="height: 100px"></div>-->
          <el-backtop target=".el-main" :bottom="100">
            <div
                style="{
                      height: 100%;
                      width: 100%;
                      background-color: #f2f5f6;
                      box-shadow: 0 0 6px rgba(0,0,0, .12);
                      text-align: center;
                      line-height: 40px;
                      color: #1989fa;
                      }"
            >
              UP
            </div>
          </el-backtop>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
import common from "@/common/mixins/common";
import axios from "axios";

export default {
  name: "Layout",
  components: {},
  mixins: [common],
  data() {
    return {
      breadRouterCache: [],
      headerNav: ''
    }
  },
  // 因为组件第一次创建时，是 Home 和 Layout ，从而cache是空，所以 bread 不会出现
  // 点击其他位置时，getBreadcrumbRouter 就不会被调用了
  // 现在的需求就是 只要route 发生变化，那么就调用对应getBreadcrumbRouter
  watch: {
    $route() {
      // 记录ui状态
      window.localStorage.setItem('navigation', JSON.stringify({
        headerActiveIndex: this.headerNav.activeIndex,
        asideActiveIndex: this.getAsideActiveIndex
      }))
      // 只要route一变化，就触发
      this.getBreadcrumbRouter()
    }
  },
  computed: {
    // 拿到侧栏 数组
    getAsideMenuArr() {
      return this.headerNav.list[this.headerNav.activeIndex].asideMenu || []
    },
    // 拿到侧栏 activeIndex
    getAsideActiveIndex() {
      return this.headerNav.list[this.headerNav.activeIndex].asideActiveIndex || "0"
    },
    //  从Vuex 中获取 用户信息
    userInfo() {
      return this.$store.state.user.user
    }
  },
  methods: {
    initUi() {
      let uiRecord = localStorage.getItem('navigation')
      uiRecord = JSON.parse(uiRecord)
      if (uiRecord) {
        this.headerNav.activeIndex = uiRecord.headerActiveIndex
        this.headerNav.list[this.headerNav.activeIndex].asideActiveIndex = uiRecord.asideActiveIndex
      }
    },
    //获取面包屑导航
    getBreadcrumbRouter() {
      let {matched} = this.$route
      // 确保有name
      const filterArray = matched.filter((item) => item.name)
      let cache = []
      filterArray.forEach((item) => {
        if (item.name === 'Home' || item.name === 'Layout') return
        cache.push({
          name: item.name,
          path: item.path,
          title: item.meta.title
        })
      })

      if (cache.length > 0) {
        cache.unshift({
          name: 'Home',
          path: '/',
          title: "后台首页"
        })
      }

      this.breadRouterCache = cache

    },
    //头部导航select
    headerSelect(index, path) {
      // console.log('header-chose-index:' + index);
      // console.log(path);
      console.log('headerSelect');
      // 用户退出
      if (index === "20-1") {
        console.log('修改数据');
      }
      if (index === "20-2") {
        console.log('退出');
        this.logOut()
      }
      if (path[0] !== '20') {
        // 更新 激活的 索引
        this.headerNav.activeIndex = index
        // 跳转到当前激活的路由
        console.log(this.getAsideMenuArr);

        if (this.getAsideMenuArr.length > 0) {
          console.log(this.getAsideMenuArr[this.getAsideActiveIndex].pathname)
          let pathName = this.getAsideMenuArr[this.getAsideActiveIndex].pathname
          this.$router.push({name: pathName})
        }
      }


    },
    // 侧栏select
    asideSelect(key) {
      // console.log(key, value);
      //更新 子nav 的 active 索引
      console.log('asideSelect');
      this.headerNav.list[this.headerNav.activeIndex].asideActiveIndex = key


      // 路由跳转
      console.log('---------------');
      console.log(this.getAsideMenuArr[key].pathname);
      let pathName = this.getAsideMenuArr[key].pathname
      this.$router.push({name: pathName})


    },
    logOut() {
      axios.post('/admin/logout', {}, {
        token: true
      }).then((response) => {
        console.log(response);
        this.$message({
          type: 'success',
          message: "退出成功",
        })
        this.$store.commit('logout')
        this.$router.push({name: 'Login'})
      }).catch(() => {
        this.$store.commit('logout')
        this.$router.push({name: 'Login'})
      })
    }

  },
  created() {
    // 初始化导航菜单
    this.headerNav = this.$config.headerNav
    this.getBreadcrumbRouter()
    // 页面刷新时，初始化ui状态
    this.initUi()
  },
  mounted() {
    console.log(this.$store.state.user.user.avatar);
  }
}
</script>

<style scoped lang="scss">
// 容器初始化 样式
.el-container-init {
  overflow: hidden;
}

.el-header {
  border: 1px solid yellowgreen;
}

.el-aside {
  border: 1px solid red;
  height: calc(100vh - 60px);
  padding: 0;
  background-color: #545c64;
}

.el-main {
  border: 1px solid antiquewhite;
  padding: 0;
}

// 导航栏样式
.header-wrap {
  display: flex;
  justify-content: space-between;
  align-content: center;

  .el-menu {
    margin-right: 40px;
  }

  .logo {
    height: 60px;
    line-height: 60px;
    margin-left: 15px;
    padding: 0 15px;
  }
}

// 面包屑样式
.bread-wrap {
  //border: 1px solid red;
  padding: 15px;
  border-bottom: 1px solid #cccccc;
}


</style>
