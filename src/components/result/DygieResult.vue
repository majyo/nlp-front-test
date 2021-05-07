<template>
  <div class="result">
    <span v-for="word in fields.sentences">
      <span v-if="word.entity==='[OTHER]'">{{word.text}}&nbsp;</span>
      <el-tag v-else class="entity" type="success">{{word.text}} <span class="type">{{word.entity}}</span></el-tag>
    </span>
  </div>
</template>

<script>
export default {
  name: "DygieResult",
  props: {
    result: {
      required: true,
      type: Object
    }
  },
  data() {
  },
  computed: {
    fields: function () {
      return this.parseDoc(this.result);
    }
  },
  methods: {
    parseDoc(doc_json) {
      function list_concat(list_of_list) {
        let result = [];
        for (let x = 0; x < list_of_list.length; x++) {
          result.push(...list_of_list[x]);
        }
        return result;
      }

      function token2word(token) {
        let t2w_map = {"-LRB-": "(", "-RRB-": ")", "-LSB-": "[", "-RSB-": ']'};
        let result = t2w_map[token];
        return result ? result : token;
      }

      function str2obj(str) {
        return {
          entity: "[OTHER]",
          text: str
        };
      }

      function mergeWords(words_obj) {
        let label = "";
        let result = {};
        let result_list = [];
        for (let x = 0; x < words_obj.length; x++) {
          let word_obj = words_obj[x];
          if (word_obj["entity"] !== label) {
            if (Object.keys(result).length !== 0) {
              result["text"] = result["text"].join(" ");
              result_list.push(result);
              // console.log(result);
              // console.log(result["text"] instanceof Array);
            }
            result = {
              "text": [word_obj["text"]],
              "entity": word_obj["entity"]
            };
            label = word_obj["entity"];
          } else {
            result["text"].push(word_obj["text"]);
          }
        }
        return result_list
      }

      let sentences = list_concat(doc_json["sentences"]);
      let ner_label = list_concat(doc_json["ner"]);
      let relation_label = list_concat(doc_json["relations"]);

      sentences = sentences.map(token2word);


      let sentences_obj = sentences.map(str2obj);


      for (let x = 0; x < ner_label.length; x++) {
        let label = ner_label[x];
        for (let i = label[0]; i <= label[1]; i++) {
          sentences_obj[i]["entity"] = label[2];
        }
      }


      let relations = []

      for (let x = 0; x < relation_label.length; x++) {
        let relation = relation_label[x];
        let label1 = sentences_obj[relation[0]]["entity"];
        let label2 = sentences_obj[relation[2]]["entity"];
        relations.push({
          "source": label1,
          "target": label2,
          "relation": relation[4]
        });
      }

      let merged_obj = mergeWords(sentences_obj);

      return {
        "sentences": merged_obj,
        "relations": relations
      };
    }
  }
}
</script>

<style scoped>
.result {
  font-size: 14px;
  line-height: 50px;
}
.entity {
  margin-right: 10px;
  margin-left: 10px;
  font-size: 14px;
}
.type {
  /*margin-left: 10px;*/
  /*margin-right: 10px;*/
  color: #7277ff;
  font-weight: bold;
  font-size: 12px;
}
</style>
