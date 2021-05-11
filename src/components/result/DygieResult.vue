<template>
  <div class="result">
    <div>
      <p>Entities:</p>
      <span v-for="word in fields.sentences">
        <span v-if="word.entity==='[OTHER]'">{{word.text}}&nbsp;</span>
        <el-tag v-else class="entity" type="success">{{word.text}} <span class="type">{{word.entity}}</span></el-tag>
      </span>
    </div>
    <div>
      <p>Relations:</p>
      <div v-for="relation in fields.relations">
        <span>Source: </span>
        <el-tag class="small-margin">{{relation.source}}</el-tag>
        <span>Target: </span>
        <el-tag type="success" class="small-margin">{{relation.target}}</el-tag>
        <span>Relation: </span>
        <el-tag type="danger" class="small-margin">{{relation.relation}}</el-tag>
      </div>
    </div>
    <div>
      <p>Clusters:</p>
      <div v-for="cluster in fields.clusters">
        <el-tag v-for="entity in cluster" class="small-margin">{{entity}}</el-tag>
      </div>
    </div>
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
      let ner_label = list_concat(doc_json["predicted_ner"]);
      let relation_label = list_concat(doc_json["predicted_relations"]);

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
        let index1 = relation[0];
        let index2 = relation[1];
        let index3 = relation[2];
        let index4 = relation[3];

        let label1 = sentences.slice(index1, index2 + 1).join(" ");
        let label2 = sentences.slice(index3, index4 + 1).join(" ");
        // let label1 = sentences_obj[relation[0]]["entity"];
        // let label2 = sentences_obj[relation[2]]["entity"];
        relations.push({
          "source": label1,
          "target": label2,
          "relation": relation[4]
        });
      }

      let merged_obj = mergeWords(sentences_obj);

      function index2word(x) {
        return sentences.slice(x[0], x[1] + 1).join(" ");
      }

      let clusters = [];

      for (let x = 0; x < doc_json["predicted_clusters"].length; x++) {
        let gruop = doc_json["predicted_clusters"][x];
        clusters.push(gruop.map(index2word));
      }

      return {
        "sentences": merged_obj,
        "relations": relations,
        "clusters": clusters
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

.small-margin {
  margin-left: 5px;
  margin-right: 10px;
}
</style>
