<template>
  <div id="task" class="left-align">
    <h2 class="left-align">命名实体识别</h2>
    <el-divider></el-divider>
    <p class="norm-margin">
      采用allennlp scispacy搭建的生物化学物质命名实体识别工具，可识别的种类包括:
    </p>
    <div class="norm-margin">
      <el-space wrap>
        <el-tag>AMINO_ACID</el-tag>
        <el-tag>ANATOMICAL_SYSTEM</el-tag>
        <el-tag>CANCER</el-tag>
        <el-tag>CELL</el-tag>
        <el-tag>CELLULAR_COMPONENT</el-tag>
        <el-tag>DEVELOPING_ANATOMICAL_STRUCTURE</el-tag>
        <el-tag>GENE_OR_GENE_PRODUCT</el-tag>
        <el-tag>IMMATERIAL_ANATOMICAL_ENTITY</el-tag>
        <el-tag>MULTI-TISSUE_STRUCTURE</el-tag>
        <el-tag>ORGAN</el-tag>
        <el-tag>ORGANISM</el-tag>
        <el-tag>ORGANISM_SUBDIVISION</el-tag>
        <el-tag>ORGANISM_SUBSTANCE</el-tag>
        <el-tag>PATHOLOGICAL_FORMATION</el-tag>
        <el-tag>SIMPLE_CHEMICAL</el-tag>
        <el-tag>TISSUE</el-tag>
      </el-space>
    </div>
    <p class="norm-margin">
      在文本输入框中输入包含实体的文章片段或从下拉菜单中选择预设文本，之后点击运行获取识别结果。
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
      <NerResult v-if="outputJSON" :result="outputJSON"></NerResult>
<!--      <p v-if="outputJSON">{{outputJSON}}</p>-->
    </el-card>
  </div>
</template>

<script>
import NerResult from "./NerResult.vue";
import {nerSubmit} from "../api/api";

export default {
  components: {
    NerResult
  },
  name: "Ner",
  data() {
    return {
      inputText: "",
      outputJSON: null,
      options: [{
        value: 'Moreover, the protective effect of the antioxidant NAC on monomer-induced MAPK activation and ' +
            'apoptosis suggested that MAPK activation was redoxsensitive but not the primary mechanism of ' +
            'monomer-induced apoptosis .Alternatively, we hypothesized that monomer-induced apoptosis may be ' +
            'initiated by the cellular response to oxidative DNA damage followed by the formation of DNA ' +
            'double-strand breaks (DSB).',
        label: '文本1'
      }, {
        value: 'A 2-fold increase in the amount of mitochondrial superoxide anions after a 24 h exposure to HEMA' +
            ' (6e8 mM) was paralleled by a considerable decrease in the mitochondrial membrane potential (MMP).' +
            'Additionally, expression of proteins critical for the signaling of apoptosis through the intrinsic ' +
            'mitochondrial pathway was detected.',
        label: '文本2'
      }, {
        value: 'Activation of ATM was detected in cell cultures exposed to resin monomers after long exposure periods. ' +
            'Moreover, phosphorylation of H2AX to form g-H2AX was induced by resin monomers and increased expression ' +
            'and phospyhorylation of p53 was reported as well.',
        label: '文本3'
      }]
    }
  },
  methods: {
    submit() {
      let data = {
        "mode": "simple",
        "text": this.inputText
      };
      nerSubmit(data).then(response => {
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