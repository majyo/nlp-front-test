<template>
  <p class="title">{{result["title"]}}</p>
  <p class="abstract">{{result["abstract"]}}</p>
  <div class="article-body" v-for="body in result['body']">
    <p class="subtitle" v-for="subtitle in body['heads']">{{subtitle}}</p>
    <div v-for="text in body['texts']">
      <div v-for="sent in text['sentence']">
        <div class="positive" v-if="sent['label']===1">{{sent['sentence']}}</div>
        <div class="positive" v-else>{{sent['sentence']}}</div>
      </div>
    </div>
<!--    <NerResult v-for="text in body['texts']" :result="text"/>-->
  </div>
</template>

<script>
import NerResult from "./NerResult.vue";

export default {
  components: {
    NerResult
  },
  name: "LabelResult",
  props: {
    result: {
      required: true,
      type: Object
    }
  }
}
</script>

<style scoped>
.title {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}

.abstract {
  font-size: 14px;
  line-height: 30px;
}

.subtitle {
  font-size: 18px;
}

.positive {
  background-color: yellow;
}
</style>