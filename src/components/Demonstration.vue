<template>
  <div id="demo">
    <el-tabs :tab-position="tabPosition">
      <el-tab-pane label="命名实体识别"><Ner></Ner></el-tab-pane>
      <el-tab-pane label="文献在线标注"><PdfLabeling></PdfLabeling></el-tab-pane>
      <el-tab-pane label="未开放">未开放</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Ner from './Ner.vue';
import PdfLabeling from "./PdfLabeling.vue";

export default {
  components: {
    Ner, PdfLabeling
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