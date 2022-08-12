<template>
  <div class="wrapper">
    <el-card class="box-card">
      <div class="text item">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="form.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')" :loading="loading">提交</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
// import mapMutations from "vuex/dist/vuex.mjs";

export default {
  name: "index",
  data() {
    return {
      form: {
        name: "",
        pass: ""
      },
      loading: false
    }
  },
  methods: {
    submitForm: function (formName) {
      this.$refs[formName].validate((valid) => {
        console.log(this.form.name)
        this.loading = true

        if (valid) {
          // 前端校验通过
          axios.post('/admin/login', {
            username: this.form.name,
            password: this.form.pass
          }).then((response) => {
            console.log(response);
            this.$store.commit("login", response.data.data)
            console.log(response.data.data);
            //为了 模拟 loading 属性的情景
            setTimeout(() => {
              this.$message({
                message: "登陆成功",
                type: 'success'
              })
              this.loading = false
              this.$router.push({path: '/home'})
            }, 1500)
          }, () => {
            // this.$message.error(err.response.data.msg);
            this.loading = false
          })
        } else {
          // 前端校验失败
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      console.log('重置');
      this.$refs[formName].resetFields();
    },
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -30%);
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
</style>
