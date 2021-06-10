<template>
  <div id="demo">
    <el-tabs :tab-position="tabPosition">
      <el-tab-pane label="命名实体识别"><Ner></Ner></el-tab-pane>
      <el-tab-pane label="文献在线标注"><PdfLabeling></PdfLabeling></el-tab-pane>
      <el-tab-pane label="文本分类"><TextLabeling></TextLabeling></el-tab-pane>
      <el-tab-pane label="开放信息抽取">未开放</el-tab-pane>
      <el-tab-pane label="语言模型">未开放</el-tab-pane>
      <el-tab-pane label="信息抽取"><Dygie></Dygie></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Ner from './Ner.vue';
import PdfLabeling from "./PdfLabeling.vue";
import TestPage from "./TestPage.vue";
import Dygie from "./Dygie.vue";
import TextLabeling from "./TextLabeling.vue";

export default {
  components: {
    Ner, PdfLabeling, TestPage, Dygie, TextLabeling
  },
  name: "Demonstration",
  data() {
    return {
      tabPosition: 'left'
    };
  }
}
</script>

<style scoped>
#demo {
  margin-top: 40px;
  margin-left: 80px;
}
</style>