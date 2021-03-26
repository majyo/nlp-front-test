<template>
  <div class="result">
    <span v-for="field in json2fields(result)">
      <span v-if="field.type==='plain'">{{field.text}}</span>
      <el-tag v-else class="entity" type="success">{{field.text}} <span class="type">{{field.entity}}</span></el-tag>
    </span>
  </div>
</template>

<script>
export default {
  name: "NerResult",
  props: {
    result: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      fields: [
        {type: "plain", text: "It is a"}, {type: "entity", text: "good", entity: "EMOTION"}, {type: "plain", text: "day!"}
      ],
    }
  },
  methods: {
    json2fields(json) {
      let createIndexList = (text, ents) => {
        let indexList = [0];
        for (let i=0; i < ents.length; i++) {
          indexList.push(ents[i]["start"]);
          indexList.push(ents[i]["end"]);
        }
        indexList.push(text.length);
        return indexList;
      };

      let splitText = (json_dict, indexList) => {
        let splitedText = [];
        for (let i = 0; i < indexList.length - 1; i++) {
          let field = {};
          field["text"] = json_dict["text"].substring(indexList[i], indexList[i + 1]);
          if (i % 2 === 1) {
            let entity_idx = Math.floor(i / 2);
            field["type"] = "entity";
            field["entity"] = json_dict["ents"][entity_idx]["label"];
          } else {
            field["type"] = "plain";
          }
          splitedText.push(field);
        }
        console.log(splitedText);
        return splitedText;
      };

      let indexList = createIndexList(json["text"], json["ents"]);
      return splitText(json, indexList);
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