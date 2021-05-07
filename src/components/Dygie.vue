<template>
  <div class="left-align">
    <h2 class="left-align">GPT语言模型</h2>
    <el-divider></el-divider>
    <p class="norm-margin">
      使用dygie++模型搭建的联合式关系抽取任务。
    </p>
    <p class="norm-margin">
      在文本输入框中输入包含实体的文章片段或从下拉菜单中选择预设文本，之后点击运行获取结果。
    </p>
    <el-card class="box-card norm-margin" shadow="hover">
      <p class="small-margin">预设文本</p>
      <el-select v-model="inputText" placeholder="请选择">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <p class="small-margin">文本输入</p>
      <el-input
          type="textarea"
          autosize
          placeholder="请输入内容"
          v-model="inputText"
          class="small-margin">
      </el-input>
      <el-button @click="submit" type="primary" class="small-margin">运行</el-button>
    </el-card>
    <DygieResult class="norm-margin" v-if="testJSON" :result="testJSON"></DygieResult>
  </div>
</template>

<script>
import DygieResult from "./result/DygieResult.vue";
import {dygieRequest} from "../api/allenApi.js";

export default {
  components: {
    DygieResult
  },
  name: "Dygie",
  data() {
    return {
      inputText: "",
      outputJSON: null,
      options: [
        {
          value: "",
          label: "文本1"
        },
        {
          value: "",
          label: "文本2"
        },
        {
          value: "",
          label: "文本3"
        }
      ],
      testJSON: {
        "doc_key": "X96-1059",
        "dataset": "scierc",
        "sentences": [["Recognition", "of", "proper", "nouns", "in", "Japanese", "text", "has", "been", "studied", "as", "a", "part", "of", "the", "more", "general", "problem", "of", "morphological", "analysis", "in", "Japanese", "text", "processing", "-LRB-", "-LSB-", "1", "-RSB-", "-LSB-", "2", "-RSB-", "-RRB-", "."], ["It", "has", "also", "been", "studied", "in", "the", "framework", "of", "Japanese", "information", "extraction", "-LRB-", "-LSB-", "3", "-RSB-", "-RRB-", "in", "recent", "years", "."], ["Our", "approach", "to", "the", "Multi-lingual", "Evaluation", "Task", "-LRB-", "MET", "-RRB-", "for", "Japanese", "text", "is", "to", "consider", "the", "given", "task", "as", "a", "morphological", "analysis", "problem", "in", "Japanese", "."], ["Our", "morphological", "analyzer", "has", "done", "all", "the", "necessary", "work", "for", "the", "recognition", "and", "classification", "of", "proper", "names", ",", "numerical", "and", "temporal", "expressions", ",", "i.e.", "Named", "Entity", "-LRB-", "NE", "-RRB-", "items", "in", "the", "Japanese", "text", "."], ["The", "analyzer", "is", "called", "``", "Amorph", "''", "."], ["Amorph", "recognizes", "NE", "items", "in", "two", "stages", ":", "dictionary", "lookup", "and", "rule", "application", "."], ["First", ",", "it", "uses", "several", "kinds", "of", "dictionaries", "to", "segment", "and", "tag", "Japanese", "character", "strings", "."], ["Second", ",", "based", "on", "the", "information", "resulting", "from", "the", "dictionary", "lookup", "stage", ",", "a", "set", "of", "rules", "is", "applied", "to", "the", "segmented", "strings", "in", "order", "to", "identify", "NE", "items", "."], ["When", "a", "segment", "is", "found", "to", "be", "an", "NE", "item", ",", "this", "information", "is", "added", "to", "the", "segment", "and", "it", "is", "used", "to", "generate", "the", "final", "output", "."]],
        "ner": [[[0, 3, "Task"], [2, 3, "OtherScientificTerm"], [5, 6, "Material"], [19, 20, "Task"], [22, 24, "Task"]], [[34, 34, "Generic"], [43, 45, "Task"]], [[56, 56, "Generic"], [59, 64, "Task"], [66, 67, "Material"], [73, 73, "Generic"], [76, 78, "Task"], [80, 80, "Material"]], [[83, 84, "Method"], [93, 103, "Task"], [97, 103, "OtherScientificTerm"], [106, 111, "OtherScientificTerm"], [114, 115, "Material"]], [[118, 118, "Generic"], [121, 123, "Method"]], [[125, 125, "Method"], [127, 128, "OtherScientificTerm"], [133, 134, "Method"], [136, 137, "Method"]], [[141, 141, "Generic"], [146, 146, "OtherScientificTerm"], [151, 153, "OtherScientificTerm"]], [[164, 166, "Method"], [171, 171, "OtherScientificTerm"], [182, 183, "OtherScientificTerm"]], [[193, 194, "OtherScientificTerm"]]], "predicted_ner": [[[0, 3, "Task", 15.8233, 1.0], [5, 6, "Material", 22.5534, 1.0], [19, 20, "Task", 18.9713, 1.0], [22, 24, "Task", 8.1343, 0.9861]], [[34, 34, "Generic", 29.9142, 1.0]], [[56, 56, "Generic", 17.7999, 1.0], [59, 64, "Task", 9.8616, 0.9998], [66, 67, "Material", 27.9063, 1.0], [73, 73, "Generic", 19.2006, 1.0], [76, 78, "Task", 26.5481, 1.0], [80, 80, "Material", 10.9466, 1.0]], [[83, 84, "Method", 32.6579, 1.0], [93, 98, "Task", 9.5276, 0.9999], [100, 103, "OtherScientificTerm", 16.7426, 1.0], [106, 111, "OtherScientificTerm", 9.1954, 0.9999], [114, 115, "Material", 21.0752, 1.0]], [[118, 118, "Generic", 14.8011, 0.9999], [121, 123, "Method", 12.1019, 0.9784]], [[125, 125, "Method", 21.5174, 1.0], [131, 131, "Generic", 18.7743, 1.0], [133, 134, "Task", 16.4739, 1.0], [136, 137, "Task", 16.4392, 1.0]], [[141, 141, "Generic", 26.4813, 1.0], [146, 146, "Generic", 0.5005, 0.6223]], [[164, 166, "Method", 14.3487, 1.0], [171, 171, "OtherScientificTerm", 15.8237, 1.0]], [[202, 202, "Generic", 1.6871, 0.8438], [204, 204, "Generic", 14.505, 1.0]]],
        "relations": [[[0, 3, 19, 20, "PART-OF"], [2, 3, 5, 6, "PART-OF"], [19, 20, 22, 24, "USED-FOR"]], [[43, 45, 34, 34, "USED-FOR"]], [[56, 56, 59, 64, "USED-FOR"], [59, 64, 66, 67, "USED-FOR"], [76, 78, 73, 73, "USED-FOR"], [80, 80, 76, 78, "USED-FOR"]], [[83, 84, 93, 103, "USED-FOR"], [106, 111, 97, 103, "HYPONYM-OF"], [106, 111, 114, 115, "PART-OF"]], [], [[125, 125, 127, 128, "USED-FOR"], [133, 134, 125, 125, "PART-OF"], [133, 134, 136, 137, "CONJUNCTION"], [136, 137, 125, 125, "PART-OF"]], [[146, 146, 141, 141, "USED-FOR"], [146, 146, 151, 153, "USED-FOR"]], [[164, 166, 171, 171, "USED-FOR"], [171, 171, 182, 183, "USED-FOR"]], []], "predicted_relations": [[], [], [[56, 56, 59, 64, "USED-FOR", 9.2674, 0.9999], [76, 78, 66, 67, "USED-FOR", 5.8514, 0.9971], [76, 78, 73, 73, "USED-FOR", 4.3284, 0.9869], [80, 80, 76, 78, "FEATURE-OF", 1.2991, 0.7587]], [[83, 84, 93, 98, "USED-FOR", 17.3388, 1.0], [83, 84, 100, 103, "USED-FOR", 8.1079, 0.9997]], [], [[133, 134, 131, 131, "HYPONYM-OF", 8.6513, 0.9998], [133, 134, 136, 137, "CONJUNCTION", 13.509, 1.0], [136, 137, 131, 131, "HYPONYM-OF", 11.1307, 1.0]], [[146, 146, 141, 141, "USED-FOR", 9.24, 0.9999]], [], []],
        "clusters": [[[59, 64], [73, 73]], [[0, 3], [34, 34]], [[5, 6], [66, 67], [80, 80], [114, 115]], [[19, 20], [76, 78]], [[83, 84], [118, 118], [121, 123], [125, 125], [141, 141]], [[133, 134], [164, 166]], [[106, 111], [127, 128], [182, 183], [193, 194]]], "predicted_clusters": [[[0, 3], [34, 34], [93, 98], [204, 204]], [[56, 56], [83, 84], [118, 118]], [[121, 123], [125, 125], [141, 141]]]
      }
    }
  },
  methods: {
    submit() {
      let data = {
        text: this.inputText
      };
      dygieRequest(data).then(response => {
        this.outputJSON = response.data;
      });
    }
  }
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