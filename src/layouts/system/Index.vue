<template>
  <el-container>
    <el-header>
      <SystemHeader/>
    </el-header>
    <el-container>
      <SideBar></SideBar>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideBar from "@/components/SideBar";
import SystemHeader from "@/components/SystemHeader";

export default {
  name: "Index",
  components: {SystemHeader, SideBar},
}
</script>

<style scoped>

</style>
