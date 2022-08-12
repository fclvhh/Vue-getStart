<template>
  <div id="app">
    <router-view></router-view>
    <el-dialog
        title="提示"
        :visible.sync="imageModel"
        width="30%"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
         <el-button @click="dialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="confirm">确 定</el-button>
       </span>
    </el-dialog>
  </div>
</template>

<script>


export default {
  name: 'app',
  // 依赖注入
  provide() {
    return {
      app: this
    }
  },
  components: {},
  created() {
    this.$store.commit('initUser')
  },
  data() {
    return {
      imageModel: false,
      callback: false
    }
  },
  methods: {
    open(callback) {
      this.callback = callback
      this.imageModel = true

    },
    hide() {
      this.imageModel = false
      this.callback = false
    },
    confirm() {
      if (typeof this.callback === 'function') {
        // 调用传入的callback
        this.callback('选中图片的url')
      }
      this.hide()
    }
  },
}
</script>

<style>
@import '~@/assets/css/common.css';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  overflow: hidden;
}


</style>
