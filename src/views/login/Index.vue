<template>
  <div class="out-div">
    <el-card class="in-card" style="width: 350px">
      <div slot="header">
        <span>登录</span>
      </div>
      <div style="padding: 10px 20px">
        <el-row class="row">
          <el-input
              placeholder="用户名"
              prefix-icon="el-icon-info"
              v-model="username"
          >
          </el-input>
        </el-row>
        <el-row class="row">
          <el-input
              placeholder="密码"
              prefix-icon="el-icon-lock"
              v-model="password"
          >
          </el-input>
        </el-row>
        <el-row>
          <el-button type="primary" round @click="login">登录</el-button>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods:{
    login(){
      let that = this
      let data = new FormData()
      data.append('username',that.username)
      data.append('password', that.password)
      that.axios.post('/sys/login/restful',data)
        .then(response => {
          that.$message('登陆成功')
          localStorage.setItem('token', response.data.token)
          that.$router.push({path: '/home'})
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.out-div {
  position: relative;
}

.in-card {
  top: 50%;
  margin: 150px auto;
}

.row{
  margin-bottom: 20px;
}

</style>
