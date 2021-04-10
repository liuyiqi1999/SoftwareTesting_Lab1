<template>
  <div>
    <SearchUser @search-user-event="showData"/>
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
        {{code}}
      </el-table-column>
      <el-table-column
          prop="customerName"
          label="客户名">
        {{name}}
      </el-table-column>
      <el-table-column
          prop="loanStatus"
          label="贷款状态"
          width="50">
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
        <template slot-scope="scope">
          <el-button @click="repayAll(scope.row)" type="text" size="small">全部还款</el-button>
          <el-button @click="repayPart(scope.row)" type="text" size="small">部分还款</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import SearchUser from "@/components/SearchUser";
export default {
  name: "Index",
  components: {SearchUser},
  data() {
    return {
      tableData: [],
      code: "",
      name: "",
    }
  },
  methods: {
    queryData(getPath) {
      this.axios.get(getPath)
          .then(response => {
            return response.data
          })
          .catch(error => {
            console.log(error)
          })
    },
    showData(data) {
      let customer = data
      this.code = data.code
      this.name = data.name
      let loans = this.getLoanList(customer.code)
      for(let i=0;i<loans.length;i++){
        let temp = {}
        temp.iouNum = loans[i].iouNum
        switch (loans[i].status) {
          case 0: temp.status = "默认"
                break
          case 1: temp.status = "逾期，有罚金未还"
                break
          case 2: temp.status = "逾期，已还罚金"
                break
          case 3: temp.status = "正常还款"
        }
        temp.overdueAmount = loans[i].overdueAmount
        temp.createTime = loans[i].createTime
        temp.productName = loans[i].productName
        temp.productCode = loans[i].productCode
        this.tableData.push(temp)
      }
    },
    async getLoanList(code) {
      let loanList = await this.queryData('/loan/list?code='+code)
      let loans = []
      for(let i=0;i<loanList.length;i++){
        let loan = await this.queryData('/loan/product?iouNum='+loanList[i])
        loans.push(loan)
      }
      return loans
    },
    repayAll(row) {
      console.log(row)
    },
    repayPart(row) {
      console.log(row)
    },
  }
}
</script>

<style scoped>

</style>
