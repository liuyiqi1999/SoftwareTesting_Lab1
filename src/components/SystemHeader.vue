<template>
    <el-page-header @back="goBack" content="lab1 - 基础模块开发">
    </el-page-header>
</template>

<script>
export default {
name: "SystemHeader",
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>
