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
        {{ code }}
      </el-table-column>
      <el-table-column
          prop="customerName"
          label="客户名">
        {{ name }}
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
          <el-button @click="repay(scope.row)" type="text" size="small">详情</el-button>
          <el-dialog
              title="详情"
              :visible.sync="repayDialogVisible"
              width="50%"
          >
            <p style="font-size: 20px">未还账单：</p>
            <el-table
                :data="unpayTableData"
            >
              <el-table-column
                  prop="planNum"
                  label="期数"
              ></el-table-column>
              <el-table-column
                  prop="planDate"
                  label="计划还款日期"
              ></el-table-column>
              <el-table-column
                  prop="status"
                  label="贷款状态"
              ></el-table-column>
              <el-table-column
                  prop="planPrincipal"
                  label="本金"
              ></el-table-column>
              <el-table-column
                  prop="planInterest"
                  label="利息"
              ></el-table-column>
              <el-table-column
                  prop="remainAmount"
                  label="剩余应还金额"
              ></el-table-column>
              <el-table-column
                  prop="fine"
                  label="罚金"
              ></el-table-column>
            </el-table>
            <el-row style="display: flex;align-items: center;margin-top: 10px">
              <el-col :span="8">
                <p style="font-size: 20px">总罚金：{{totalFine}}元</p>
              </el-col>
              <el-col :span="16">
                <el-button type="primary" :disabled="totalFine<=0" @click="payFine(scope.row)">支付罚金</el-button>
              </el-col>
            </el-row>
            <p style="font-size: 20px">应还总金额：{{payOverdueAmount}}元</p>
            <el-row style="display: flex;align-items: center;margin-top: 15px">
              <el-col :span="8">
                <el-button type="success" :disabled="payOverdueAmount<=0 || (!paidFine && totalFine>0)" @click="repayAll(scope.row)">全额还款（本期）</el-button>
              </el-col>
              <el-col :span="16">
                <el-row>
                  <el-input v-model="partRepayAmount" placeholder="请输入还款金额">
                    <el-button slot="append" :disabled="payOverdueAmount<=0 || (!paidFine && totalFine>0)" @click="repayPart(scope.row)">部分还款</el-button>
                  </el-input>
                </el-row>
              </el-col>
            </el-row>
          </el-dialog>
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
      repayDialogVisible: false,
      unpayTableData: [],
      totalFine: 0,
      paidFine: false,
      partRepayAmount: null,
      payOverdueAmount: 0,
    }
  },
  methods: {
    async showData(data) {
      this.code = data.code
      this.name = data.name
      let loans = await this.getLoanList(this.code)
      let tempData = []
      for (let i = 0; i < loans.length; i++) {
        let temp = {}
        temp.iouNum = loans[i].iouNum
        temp.overdueAmount = loans[i].dueBalance
        temp.createTime = loans[i].loadDate.split("T")[0]
        temp.productName = loans[i].productName
        temp.productCode = loans[i].productCode
        tempData.push(temp)
      }
      this.tableData = tempData
    },
    async getLoanList(code) {
      let response = await this.axios.get('/loan/customerLoans?code=' + code)
      let loanList = response.data
      return loanList
    },
    repay(row) {
      this.payOverdueAmount = row.overdueAmount
      this.repayDialogVisible = true
      let that = this
      this.axios.get('/loan/unPayPlans?iouNum=' + row.iouNum)
          .then(response => {
            let unPayPlans = response.data
            let tempData = []
            for(let i=0;i<unPayPlans.length;i++){
              let temp = unPayPlans[i]
              temp.planNum = "第"+temp.planNum+"期"
              temp.planDate = temp.planDate.split("T")[0]
              switch (temp.status) {
                case 0: temp.status = "默认"
                  break
                case 1: temp.status = "逾期，有罚金未还"
                  break
                case 2: temp.status = "逾期，已还罚金"
                  break
                case 3: temp.status = "正常还款"
                  break
              }
              tempData.push(temp)
              that.totalFine += temp.fine
            }
            that.unpayTableData = tempData
          })
    },
    payFine(row){
      let that = this
      this.axios.post('/loan/fine',{
        iouNum: row.iouNum
      })
          .then(response => {
            console.log(response.data)
            if(response.data.message==="repay fine success") that.$message('支付罚金成功')
            else that.$message('支付罚金失败')
          })
          .catch(error => {
            console.log(error)
          })
    },
    repayAll(row){
      let that = this
      this.axios.post('/loan/repay/all', {
        iouNum: row.iouNum,
      })
        .then(response => {
          console.log(response.data)
          if(response.data.message==="success") that.$message('还款成功')
          else that.$message('还款失败')
        })
        .catch(error => {
          console.log(error)
        })
    },
    repayPart(row){
      let that = this
      this.axios.post('/loan/repay/part', {
        iouNum: row.iouNum,
        repayAmount: that.partRepayAmount,
      })
          .then(response => {
            console.log(response.data)
            if(response.data.message==="success") that.$message('还款成功')
            else that.$message('还款失败')
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
