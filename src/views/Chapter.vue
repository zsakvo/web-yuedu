<template>
  <div class="chapter-wrapper">
    <div class="chapter-bar">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }" class="item"
          >书架</el-breadcrumb-item
        >
        <el-breadcrumb-item class="item">{{ name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
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
    this.name = Base64.decode(this.$route.query.name);
    var title = Base64.decode(this.$route.query.title);
    let chapterUrl = Base64.decode(this.$route.query.id);
    Axios.get(
      "http://" +
        localStorage.url +
        "/getBookContent?url=" +
        encodeURIComponent(chapterUrl)
    ).then(
      res => {
        let data = res.data.data;
        let dataArray = data.split("\n\n");
        that.title = title;
        if (dataArray.length > 1) {
          that.content = dataArray[1];
        } else {
          that.content = dataArray[0];
        }
      },
      err => {
        throw err;
      }
    );
  },
  data() {
    return {
      name: "",
      title: "",
      content: ""
    };
  }
};
</script>

<style lang="stylus" scoped>
.chapter-wrapper {
  .chapter-bar {
    .el-breadcrumb {
      .item {
        font-size: 14px;
        color: #606266;
      }
    }
  }

  .chapter {
    font-family: 'Microsoft YaHei', PingFangSC-Regular, HelveticaNeue-Light, 'Helvetica Neue Light', sans-serif;
    text-align: left;
    color: #262626;
    margin-top: 24px;
    padding: 0 4%;

    .title {
      margin-bottom: 16px;
      font-size: 16px;
      font-weight: 600;
    }

    .content {
      white-space: pre-wrap;
      line-height: 1.8;
      overflow: hidden;
      font-size: 16px;
      font-weight: 500;
    }
  }
}
</style>
