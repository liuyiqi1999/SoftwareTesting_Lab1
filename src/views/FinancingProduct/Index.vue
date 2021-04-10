<template>
  <div>
    <SearchUser @search-user-event="showLevel"/>
    <el-container style="margin-top: 30px;font-size: 20px">
      账户信用等级：{{levelStr}}
    </el-container>
    <el-tabs v-model="activeTab" style="margin-top: 30px">
      <el-tab-pane v-if="level===1" label="股票" name="stock">

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
    }
  },
  methods:{
    showLevel(data){
      let customer = data
      let code = customer.code
      let that = this
      this.$axios.get("/financing/user/level?code="+code)
        .then(response => {
          that.level = response.data.level
          switch(that.level){
            case 1: that.levelStr = "一级(可以购买股票、基金和定期理财产品)"
                  break
            case 2: that.levelStr = "二级(可以购买基金和定期理财产品)"
                  break
            case 3: that.levelStr = "三级(只能购买定期理财产品)"
                  break
          }
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
