<template>
  <div>
    <SearchUser @search-user-event="showLevel"/>
    <el-container style="margin-top: 30px;font-size: 20px">
      账户信用等级：{{levelStr}}
    </el-container>
    <el-tabs v-model="activeTab" style="margin-top: 30px">
      <el-tab-pane v-if="level===1" label="股票" name="stock">
        <el-table
          :data="stockTableData"
          border
        >
          <el-table-column
            prop="code"
            label="股票编号"
          ></el-table-column>
          <el-table-column
              prop="name"
              label="股票名"
          ></el-table-column>
          <el-table-column
              prop="amount"
              label="持有股数"
          ></el-table-column>
          <el-table-column
              prop="action"
              label="详情"
          >
<!--            <template slot-scope="scope">-->
<!--              <el-input v-model="buyStockAmount" placehoder="请输入购买股数">-->
<!--                <el-button slot="append" :disabled="buyStockAmount<=0" @click="buyStock(scope.row)" type="text" size="small">购入(股)</el-button>-->
<!--              </el-input>-->
<!--            </template>-->
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane v-if="level===1||level===2" label="基金" name="fund">

      </el-tab-pane>
      <el-tab-pane v-if="level===1||level===2||level===3" label="定期理财产品" name="term">

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import SearchUser from "@/components/SearchUser";
export default {
  name: "Index.vue",
  components: {SearchUser},
  data(){
    return{
      activeTab:"stock",
      level:1,
      levelStr: "/",
      buyStockAmount: 0,
      customerCode: "",
      stockTableData: [],
    }
  },
  methods:{
    async showLevel(data){
      let customer = data
      if(!customer.idNumber) {
        this.$message('查询失败！')
        return
      }
      this.customerCode = customer.customerCode
      let that = this
      let levelResponse = await this.$axios.get("/financing/user/level?idNumber="+customer.idNumber)
      that.level = levelResponse.data.level
      switch(that.level){
        case 1: that.levelStr = "一级(可以购买股票、基金和定期理财产品)"
          break
        case 2: that.levelStr = "二级(可以购买基金和定期理财产品)"
          break
        case 3: that.levelStr = "三级(只能购买定期理财产品)"
          break
      }
      let stockDataResponse = await this.axios.get('/financing/product/stock?code='+this.customerCode)
      this.stockTableData = stockDataResponse.data
    },
    buyStock(row){
      let that = this
      this.axios.post('/financing/myProduct/stock/buy',{
        customerCode: that.customerCode,
        stockCode: row.code,
        amount: that.buyStockAmount,
      })
        .then(response => {
          console.log(response.data)
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
