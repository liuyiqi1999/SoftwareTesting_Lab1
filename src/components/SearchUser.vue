<template>
  <el-row>
    <el-col :span="16">
      <el-row>
        <el-col :span="8">
          <p style="line-height: 40px; margin: 0">客户号：</p>
        </el-col>
        <el-col :span="16">
          <el-input
              placeholder="请输入客户号"
              prefix-icon="el-icon-info"
              v-model="userIdentification"
          >
          </el-input>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="8">
      <el-button type="primary" icon="el-icon-search" @click="searchUser">查询</el-button>
    </el-col>
  </el-row>
</template>

<script>
import qs from "qs"
export default {
  name: "SearchUser",
  data() {
    return {
      userIdentification: "",
      customers: [],
    }
  },
  methods: {
    searchUser(){
      console.log(this.userIdentification)
      let that = this
      let data = {
        pageSize: 10,
        pageNum: 1,
        params: '{ "orderBy": "order by b.updateTime desc" }'
      }
      that.axios.get('/loan?'+ qs.stringify(data,{arrayFormat: 'indices'}))
        .then(response => {
          let list = response.data.list
          for(let i=0;i<list.length;i++){
            if(that.userIdentification!==""){
              if (list[i].customerCode === that.userIdentification)
                that.customers.push(list[i])
            }else{
              that.customers = [...list]
              break
            }
          }
          that.$emit('search-user-event', that.customers)
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
