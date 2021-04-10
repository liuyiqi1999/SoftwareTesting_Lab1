<template>
  <el-aside>
    <el-menu
        class="el-menu-vertical-demo"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-money"></i>
          <span>贷款业务</span>
        </template>
        <el-menu-item index="1-1" @click="$router.push({name: 'LoanRepayment'}).catch(err => err)">贷款账户管理</el-menu-item>
        <el-menu-item index="1-2" @click="$router.push({name: 'DailyRepayment'}).catch(err => err)">日终处理</el-menu-item>
      </el-submenu>
      <el-menu-item index="2" @click="$router.push({name:'TradingList'})">账户流水</el-menu-item>
      <el-menu-item index="3" @click="$router.push({name: 'FinancingProduct'}).catch(err => err)">理财产品购买及查询</el-menu-item>
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
