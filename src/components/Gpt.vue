<template>
  <div class="left-align">
    <h2 class="left-align">GPT语言模型</h2>
    <el-divider></el-divider>
    <p class="norm-margin">
      使用AllenNLP提供的任务模型搭建的文本生成任务。
    </p>
    <p class="norm-margin">
      在文本输入框中输入包含实体的文章片段或从下拉菜单中选择预设文本，之后点击运行获取结果。
    </p>
    <el-card class="box-card norm-margin" shadow="hover"></el-card>
  </div>
</template>

<script>
export default {
name: "Gpt"
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