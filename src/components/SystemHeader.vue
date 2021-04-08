<template>
    <el-row>
      <el-col :span="22">
        <el-page-header @back="goBack" content="lab1 - 基础模块开发">
        </el-page-header>
      </el-col>
      <el-col :span="2">
        <el-button type="text" @click="logout">登出</el-button>
      </el-col>
    </el-row>

</template>

<script>
export default {
name: "SystemHeader",
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    logout(){
      this.axios.get('/sys/logout')
        .then(() => {
          this.$message('登出成功')
          localStorage.removeItem('token')
          this.$router.push({path: '/login'})
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
