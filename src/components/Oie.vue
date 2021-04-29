<template>
  <div class="left-align">
    <h2 class="left-align">开放信息抽取</h2>
    <el-divider></el-divider>
    <p class="norm-margin">
      使用AllenNLP提供的任务模型搭建的开放信息抽取任务。
    </p>
  </div>
</template>

<script>
export default {
name: "Oie"
}
</script>

<style scoped>
#task {
  margin-left: 40px;
  margin-right: 140px;
}
.left-align {
  text-align: left;
}
.norm-margin {
  margin-top: 30px;
  margin-bottom: 30px;
}
.small-margin {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>