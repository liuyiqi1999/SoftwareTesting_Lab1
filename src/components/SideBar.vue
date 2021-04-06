<template>
  <el-aside width="250px">
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>贷款系统</span>
        </template>
        <el-menu-item index="1-1">柜面归还贷款</el-menu-item>
        <el-menu-item index="1-2">自动归还贷款</el-menu-item>
      </el-submenu>
      <el-menu-item index="2">账户流水</el-menu-item>
      <el-menu-item index="3">理财产品购买及查询</el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "SideBar"
}
</script>

<style scoped>

</style>
