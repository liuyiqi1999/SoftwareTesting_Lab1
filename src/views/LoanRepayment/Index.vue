<template>
  <div>
    <SearchUser @search-user-event="showUsers"/>
    <el-table
        :data="tableData"
        border
        style="margin-top: 30px">
      <el-table-column
          prop="iouNum"
          label="借据号">
      </el-table-column>
      <el-table-column
          prop="customerCode"
          label="客户号">
      </el-table-column>
      <el-table-column
          prop="customerName"
          label="客户名">
      </el-table-column>
      <el-table-column
          prop="loanStatus"
          label="贷款状态"
          width="100px">
      </el-table-column>
      <el-table-column
          prop="productName"
          label="贷款产品">
      </el-table-column>
      <el-table-column
          prop="productCode"
          label="贷款产品编号">
      </el-table-column>
      <el-table-column
          prop="overdueAmount"
          label="逾期金额(元)">
      </el-table-column>
      <el-table-column
          prop="createTime"
          label="发放日期">
      </el-table-column>
      <el-table-column
          prop="actions"
          label="操作">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import SearchUser from "@/components/SearchUser";

export default {
  name: "Index",
  components: {SearchUser},
  data(){
    return{
      tableData: [],
    }
  },
  methods: {
    showUsers(data) {
      for(let i=0;i<data.length;i++){
        let customer = data[i]
        let temp = {}
        temp.iouNum = customer.iouNum
        temp.customerCode = customer.customerCode
        temp.customerName = customer.customerName
        temp.loanStatus = customer.loanStatus
        temp.productName = customer.productName
        temp.productCode = customer.productCode
        temp.overdueAmount = customer.overdueBalance
        temp.createTime = customer.createTime
        this.tableData.push(temp)
      }
    }
  }
}
</script>

<style scoped>

</style>
