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
    <DygieResult class="norm-margin" :result="outputJSON"></DygieResult>
  </div>
</template>

<script>
import DygieResult from "./result/DygieResult";
import {dygieRequest} from "../api/allenApi";

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
      ]
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