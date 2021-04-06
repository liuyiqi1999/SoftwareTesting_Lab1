<template>
  <el-row>
    <el-col :span="16">
      <el-row>
        <el-col :span="8">
          身份证号：
        </el-col>
        <el-col :span="16">
          <el-input
              placeholder="请输入客户身份证号"
              prefix-icon="el-icon-info"
              v-model="userIdentification"
          >
          </el-input>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="8">
      <el-button type="primary" icon="el-icon-search">查询</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "SearchUser",
  data() {
    return {
      userIdentification: "",

    }
  }
}
</script>

<style scoped>

</style>
