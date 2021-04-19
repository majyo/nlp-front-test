<template>
  <div id="task2" class="left-align">
    <h2 class="left-align">文献在线检索与标注</h2>
    <el-divider></el-divider>
    <p class="norm-margin">
      使用文献名在线检索文献，并使用allennlp scispacy工具对文献正文进行在线标注。
    </p>
    <p class="norm-margin">
      在文本输入框中输入检索关键字，之后点击检索获取标题中带有检索关键字的文献。
    </p>
    <el-card class="box-card norm-margin" shadow="hover">
      <p class="small-margin">标题检索</p>
      <el-input
          type="textarea"
          autosize
          placeholder="请输入关键字"
          v-model="inputText"
          class="small-margin">
      </el-input>
      <el-button @click="search" type="primary" class="small-margin">检索</el-button>
    </el-card>
    <el-divider v-if="searchResult" content-position="left">文章列表</el-divider>
    <ArticleResult v-for="article in searchResult" :result="article.article" @labelText="labeling" class="norm-margin"></ArticleResult>
    <el-divider v-if="labelResult" content-position="left">标记结果</el-divider>
    <LabelResult v-for="article in labelResult" :result="article"></LabelResult>
  </div>
</template>

<script>
import ArticleResult from "./ArticleResult.vue";
import LabelResult from "./LabelResult.vue";
import {searchArticle, labelPdf} from "../api/api.js";

export default {
  components: {
    ArticleResult, LabelResult
  },
  name: "PdfLabeling",
  data() {
    return {
      inputText: "",
      searchResult: null,
      inputSmb: "",
      labelResult: null
    }
  },
  methods: {
    search() {
      let data = {
        title: this.inputText,
        limit: 10
      };
      searchArticle(data).then(response => {
        this.searchResult = response.data;
      });
    },
    labeling(data) {
      this.inputSmb = data;
      let jsonData = {
        smb: this.inputSmb
      };
      labelPdf(jsonData).then(response => {
        this.labelResult = response.data;
      });
    }
  }
}
</script>

<style scoped>
#task2 {
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
