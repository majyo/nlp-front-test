<template>
  <div id="task2" class="left-align" v-loading="loading">
    <h2 class="left-align">文本分类</h2>
    <el-divider></el-divider>
    <p class="norm-margin">
      使用文献名在线检索文献，并对文本进行分类。
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
    <ArticleResult v-for="article in searchResult['ArticleList']" :result="article.article" @labelText="labeling" class="norm-margin"></ArticleResult>
    <el-divider v-if="labelResult" content-position="left">标记结果</el-divider>
    <TextLabelResult v-for="article in labelResult" :result="article"></TextLabelResult>
  </div>
</template>

<script>
import ArticleResult from "./ArticleResult.vue";
import LabelResult from "./LabelResult.vue";
import TextLabelResult from "./TextLabelResult.vue";
import {searchArticle, searchProteinArticle, labelPdf, textClassification} from "../api/api.js";

export default {
  components: {
    ArticleResult, LabelResult, TextLabelResult
  },
  name: "PdfLabeling",
  data() {
    return {
      inputText: "",
      searchResult: null,
      inputSmb: "",
      labelResult: null,
      loading: false
    }
  },
  methods: {
    openLoading() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 50000);
    },
    search() {
      let data = {
        title: this.inputText,
        limit: 10
      };
      searchProteinArticle(data).then(response => {
        this.searchResult = response.data;
        console.log(this.searchResult);
      });
    },
    labeling(data) {
      this.inputUrl = data;
      let jsonData = {
        smb: this.inputUrl
      };

      this.openLoading();

      textClassification(jsonData).then(response => {
        this.loading = false;
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
