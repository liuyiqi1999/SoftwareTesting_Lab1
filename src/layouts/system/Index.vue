<template>
  <v-app
      class="app"
  >
    <el-container>
      <el-header>
        <el-page-header @back="goBack" content="lab1 - 基础模块开发">
        </el-page-header>
      </el-header>
      <el-container>
        <SideBar></SideBar>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </v-app>
</template>

<script>
import SideBar from "@/components/SideBar";
export default {
name: "Index",
  components: {SideBar},
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>
