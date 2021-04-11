<template>
  <el-row>
    <el-col :span="16">
      <el-row>
        <el-input
            placeholder="请输入客户证件号"
            prefix-icon="el-icon-info"
            v-model="userIdentification"
        >
          <template slot="prepend">证件号</template>
        </el-input>
      </el-row>
    </el-col>
    <el-col :span="8" align="left">
      <el-button type="primary" icon="el-icon-search" @click="searchUser" style="margin-left: 15px">查询</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "SearchUser",
  data() {
    return {
      userIdentification: "",
      customer: {},
    }
  },
  methods: {
    searchUser() {
      let that = this
      that.axios.get('/loan/customerInfo?idNumber=' + that.userIdentification)
          .then(response => {
            that.customer = response.data
            that.$emit('search-user-event', that.customer)
          })
          .catch(error => {
            console.log(error)
            that.$message("查询失败")
          })
    }
  }
}
</script>

<style scoped>

</style>
