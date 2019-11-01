<template>
  <div class="chapter-wrapper">
    <div class="chapter">
      <div class="title">{{ title }}</div>
      <div class="content">{{ content }}</div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
var Base64 = require("js-base64").Base64;
export default {
  mounted() {
    const that = this;
    let chapterUrl = Base64.decode(this.$route.query.id);
    Axios.get(
      "http://" +
        localStorage.url +
        "/getBookContent?url=" +
        encodeURIComponent(chapterUrl)
    ).then(
      res => {
        let data = res.data.data;
        // data.trim();
        console.log(res.data);
        let dataArray = data.split("\n\n");
        if (dataArray.length > 1) {
          that.title = dataArray[0];
          that.content = dataArray[1];
        } else {
          that.content = dataArray[0];
        }
      },
      err => {
        console.log(err);
      }
    );
  },
  data() {
    return {
      title: "",
      content: ""
    };
  }
};
</script>

<style lang="stylus" scoped>
.chapter-wrapper {
  padding: 3% 8%;

  .chapter {
    font-family: 'Microsoft YaHei', PingFangSC-Regular, HelveticaNeue-Light, 'Helvetica Neue Light', sans-serif;
    text-align: left;
    color: #262626;

    .title {
      margin-bottom: 3%;
      font-size: 20px;
      font-weight: 600;
    }

    .content {
      white-space: pre-wrap;
      line-height: 1.8;
      overflow: hidden;
      font-size: 18px;
    }
  }
}
</style>
