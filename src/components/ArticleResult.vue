<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix">
<!--      <span class="title">The properties of graphene</span>-->
      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
    </div>
    <div>
      <p class="title">{{result["title"]}}</p>
      <el-divider></el-divider>
      <p>{{result["authors"].join(", ")}}</p>
      <p>{{result["journal"]}}</p>
      <p>{{result["year"]}}</p>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "ArticleResult",
  props: {
    result: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      id: null
    }
  }
}
</script>

<style scoped>
.title {
  font-weight: bold;
}
</style>