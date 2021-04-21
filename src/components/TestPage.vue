<template>
<div>
  <div v-loading="loading" class="content">
    <p class="title">An annotated corpus with nanomedicine and pharmacokinetic parameters</p>
    <p class="abstract">A vast amount of data on nanomedicines is being generated and published, and natural
      language processing (NLP) approaches can automate the extraction of unstructured text-based
      data. Annotated corpora are a key resource for NLP and information extraction methods which
      employ machine learning. Although corpora are available for pharmaceuticals, resources for
      nanomedicines and nanotechnology are still limited. To foster nanotechnology text mining
      (NanoNLP) efforts, we have constructed a corpus of annotated drug product inserts taken from
      the US Food and Drug Administration’s Drugs@FDA online database. In this work, we present
      the development of the Engineered Nanomedicine Database corpus to support the evaluation
      of nanomedicine entity extraction. The data were manually annotated for 21 entity mentions
      consisting of nanomedicine physicochemical characterization, exposure, and biologic response
      information of 41 Food and Drug Administration-approved nanomedicines. We evaluate the
      reliability of the manual annotations and demonstrate the use of the corpus by evaluating two
      state-of-the-art named entity extraction systems, OpenNLP and Stanford NER. The annotated
      corpus is available open source and, based on these results, guidelines and suggestions for future
      development of additional nanomedicine corpora are provided.
    </p>
      <p class="subtitle">Introduction</p>
      <p>Nanotechnology is enabling new strategies to detect and treat disease through
        multifunctional (eg, targeted, activatable, diagnostic, and therapeutic) drug design.
        Formulating a drug as a nanomedicine can also improve its therapeutic index by chang-
        ing its stability, pharmacokinetics, and toxicity. For several decades, researchers have
        primarily designed new nanomedicines based on an empirical approach. However, the
        number of possible nanomedicine formulations continues to increase exponentially
        as new nanomaterials, surface coatings, bioconjugates, and drug combinations are
        developed. As a consequence, experimentally assessing all possible nanomedicine
        formulations for efficacy and safety is not feasible or realistic. There is a critical need
        to automatically extract information and synthesize knowledge and trends in nano-
        medicine research to rationally prioritize testing and development.</p>
      <p class="subtitle">Materials and methods</p>
      <p>The documents selected for annotation were drug product
        labels for 41 nanomedicines that are currently approved
        for clinical use by the FDA. The labels were obtained from
        the Drugs@FDA online database. This document type was
        chosen for two reasons: compared to nanomedicines in the
        pipeline, FDA-approved nanomedicines are 1) expected
        to have the most number of unique publications in the
        literature; 2) already being prescribed by physicians, and
        therefore, mentions could be contained in clinical notes.
        The list of nanomedicines chosen was based on review
        articles.4,5 The annotated drug product labels described
        nanomedicines consisting of liposomes, micelles, polymer
        conjugates, protein conjugates, and nanoparticles, which are
        listed in Table 1. The extracted entities relate to nanoparticle
        physicochemical properties, exposure, pharmacokinetics,
        and biologic response in addition to description information.
        A complete list of these entities is shown in Table 2.</p>
  </div>
<!--  <el-table-->
<!--      v-loading="loading"-->
<!--      :data="tableData"-->
<!--      style="width: 100%">-->
<!--    <el-table-column-->
<!--        prop="date"-->
<!--        label="日期"-->
<!--        width="180">-->
<!--    </el-table-column>-->
<!--    <el-table-column-->
<!--        prop="name"-->
<!--        label="姓名"-->
<!--        width="180">-->
<!--    </el-table-column>-->
<!--    <el-table-column-->
<!--        prop="address"-->
<!--        label="地址">-->
<!--    </el-table-column>-->
<!--  </el-table>-->
  <el-button type="primary" @click="changeLoading">buttonCont</el-button>
  <el-button
      type="primary"
      @click="openFullScreen1"
      v-loading.fullscreen.lock="fullscreenLoading">
    指令方式
  </el-button>
  <el-button
      type="primary"
      @click="openFullScreen2">
    服务方式
  </el-button>
</div>
</template>

<script>
export default {
  name: "TestPage",
  data() {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      loading: true,
      fullscreenLoading: false
    };
  },
  methods: {
    openFullScreen1() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 2000);
    },
    openFullScreen2() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        loading.close();
      }, 2000);
    },
    changeLoading() {
      this.loading = !this.loading;
    }
  }
}
</script>

<style scoped>
.content {
  text-align: left;
}
.title {
  text-align: center;
  font-size: 20px;
}

.abstract {
  font-size: 14px;
  line-height: 30px;
}

.subtitle {
  font-size: 18px;
}
</style>