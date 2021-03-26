<template>
  <div id="base">
    <el-row id="menu">
<!--      <el-col :span="6"><div class="grid-content bg-purple">test1</div></el-col>-->
<!--      <el-col :span="6" :offset="6"><div class="grid-content bg-purple">test2</div></el-col>-->
      <el-col :span="6" id="title"><div>NLP</div></el-col>
      <el-col :span="4" :offset="14">
        <el-menu   :default-active="activeIndex"
                   class="el-menu-demo"
                   mode="horizontal"
                   @select="handleSelect">
          <el-menu-item index="1">展示</el-menu-item>
          <el-menu-item index="2">文档</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <Demonstration></Demonstration>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Demonstration from "./Demonstration.vue";

export default {
  components: {
    Demonstration
  },
  name: "baseComponent",
  data() {
    return {
      activeIndex: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      // alert(key + keyPath);
    }
  }
}
</script>

<style scoped>
#menu {
  border-bottom: 1px solid #dcdfe6;
  /*box-shadow: 0 1px 1px gray;*/
}
#title {
}
</style>