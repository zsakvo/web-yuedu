<template>
  <div class="chapter-wrapper">
    <div class="tool-bar">
      <div class="tools">
        <i class="el-icon-s-tools tool-icon"></i>
        <el-popover
          placement="right"
          width="700"
          trigger="click"
          v-model="popCataVisible"
        >
          <PopCata />
          <i slot="reference" class="el-icon-s-operation tool-icon"></i>
        </el-popover>
        <i class="el-icon-collection-tag tool-icon"></i>
      </div>
    </div>
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
import PopCata from "../components/PopCatalog.vue";
import Axios from "axios";
// var Base64 = require("js-base64").Base64;
export default {
  components: {
    PopCata
  },
  mounted() {
    const that = this;
    var title = sessionStorage.getItem("chapterName");
    var chapterUrl = sessionStorage.getItem("chapterUrl");
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
          that.content = "　　" + dataArray[1];
        } else {
          that.content = "　　" + dataArray[0];
        }
      },
      err => {
        throw err;
      }
    );
  },
  watch: {
    chapterName(to) {
      this.title = to;
    },
    chapterUrl(newChapterUrl) {
      let that = this;
      Axios.get(
        "http://" +
          localStorage.url +
          "/getBookContent?url=" +
          encodeURIComponent(newChapterUrl)
      ).then(
        res => {
          let data = res.data.data;
          let dataArray = data.split("\n\n");
          if (dataArray.length > 1) {
            that.content = "　　" + dataArray[1];
          } else {
            that.content = "　　" + dataArray[0];
          }
        },
        err => {
          that.content = "　　获取章节内容失败！";
          throw err;
        }
      );
    }
  },
  data() {
    return {
      title: "",
      content: "",
      visible: false
    };
  },
  computed: {
    name() {
      return sessionStorage.getItem("bookName");
    },
    chapterName() {
      return this.$store.state.chapterName;
    },
    chapterUrl() {
      return this.$store.state.chapterUrl;
    },
    popCataVisible: {
      get() {
        return this.$store.state.popCataVisible;
      },
      set(value) {
        this.$store.commit("setPopCataVisible", value);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.chapter-wrapper {
  padding: 3% 4%;

  .tool-bar {
    position: fixed;
    top: 6%;
    left: 4%;
    z-index: 100;

    .tools {
      display: flex;
      flex-direction: column;

      .tool-icon {
        line-height: 48px;
        font-size: 28px;
      }
    }
  }

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
