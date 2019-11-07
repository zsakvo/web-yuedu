<template>
  <div
    class="chapter-wrapper"
    v-loading.fullscreen.lock="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgb(255,255,255)"
  >
    <div class="tool-bar">
      <div class="tools">
        <i class="el-icon-arrow-up tool-icon" @click="toTop"></i>
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
    <div class="read-bar">
      <div class="tools">
        <i class="el-icon-arrow-up tool-icon" @click="toTop"></i>
        <i
          class="el-icon-arrow-right
 tool-icon"
          @click="toNextChapter"
        ></i>
        <i
          class="el-icon-arrow-left
 tool-icon"
          @click="toLastChapter"
        ></i>
        <i class="el-icon-arrow-down tool-icon" @click="toBottom"></i>
      </div>
    </div>
    <div class="chapter-bar">
      <!-- <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }" class="item"
          >书架</el-breadcrumb-item
        >
        <el-breadcrumb-item class="item">{{ name }}</el-breadcrumb-item>
      </el-breadcrumb> -->
    </div>
    <div class="chapter" ref="content">
      <div class="title">{{ title }}</div>
      <div class="content">
        <!-- {{ content }} -->
        <Pcontent :carray="content" />
      </div>
    </div>
  </div>
</template>

<script>
import PopCata from "../components/PopCatalog.vue";
import Pcontent from "../components/Content.vue";
import Axios from "axios";
// var Base64 = require("js-base64").Base64;
export default {
  components: {
    PopCata,
    Pcontent
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    var chapterUrl = sessionStorage.getItem("chapterUrl");
    this.getContent(chapterUrl);
  },
  watch: {
    chapterName(to) {
      this.title = to;
    },
    chapterUrl(newChapterUrl) {
      this.getContent(newChapterUrl);
    },
    content() {
      this.$store.commit("setContentLoading", false);
    }
  },
  data() {
    return {
      title: "",
      content: [],
      nextFlag: true,
      preContent: [],
      currentID: parseInt(sessionStorage.getItem("chapterID")),
      preRemove: 0,
      removeFlag: false
    };
  },
  computed: {
    catalog() {
      return JSON.parse(sessionStorage.getItem("catalog"));
    },
    name() {
      return sessionStorage.getItem("bookName");
    },
    chapterName() {
      return this.$store.state.chapterName;
    },
    chapterUrl() {
      return this.$store.state.chapterUrl;
    },
    windowHeight() {
      return window.innerHeight;
    },
    contentHeight() {
      return this.$refs.content.offsetHeight;
    },
    popCataVisible: {
      get() {
        return this.$store.state.popCataVisible;
      },
      set(value) {
        this.$store.commit("setPopCataVisible", value);
      }
    },
    loading: {
      get() {
        return this.$store.state.contentLoading;
      },
      set(value) {
        this.$store.commit("setContentLoading", value);
      }
    }
  },
  methods: {
    getContent(url, pre) {
      window.scrollTo({
        top: 0
      });
      this.currentID = sessionStorage.getItem("chapterID");
      this.title = this.catalog[this.currentID].durChapterName;
      sessionStorage.setItem("chapterUrl", url);
      let that = this;
      Axios.get(
        "http://" +
          localStorage.url +
          "/getBookContent?url=" +
          encodeURIComponent(url)
      ).then(
        res => {
          // var title = sessionStorage.getItem("chapterName");
          // that.title = title;
          let data = res.data.data;
          let dataArray = data.split("\n\n");
          let contentData = "";
          if (dataArray.length > 1) {
            contentData = ("　　" + dataArray[1]).split("\n");
          } else {
            contentData = ("　　" + dataArray[0]).split("\n");
          }
          this.$store.commit("setContentLoading", true);
          if (!pre) {
            that.content = contentData;
          } else {
            that.preContent = contentData;
          }
        },
        err => {
          that.content = "　　获取章节内容失败！";
          throw err;
        }
      );
    },
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
    toBottom() {
      let distance =
        document.documentElement.scrollHeight || document.body.scrollHeight;

      window.scrollTo({
        top: distance,
        behavior: "smooth"
      });
    },
    toNextChapter() {
      this.$store.commit("setContentLoading", true);
      this.currentID++;
      let nextUrl = this.catalog[this.currentID].durChapterUrl;
      sessionStorage.setItem("chapterID", this.currentID);
      this.getContent(nextUrl);
    },
    toLastChapter() {
      this.$store.commit("setContentLoading", true);
      this.currentID--;
      let lastUrl = this.catalog[this.currentID].durChapterUrl;
      sessionStorage.setItem("chapterID", this.currentID);
      this.getContent(lastUrl);
    },
    handleScroll() {
      let scrollHeight = document.documentElement.scrollTop;
      // console.log(window.innerHeight);
      // console.log(document.documentElement.scrollTop);
      // console.log(this.$refs.content.offsetHeight
      if (
        this.windowHeight * 2 + scrollHeight >= this.contentHeight &&
        this.nextFlag
      ) {
        this.getNext();
      }
    },
    getNext() {
      this.nextFlag = false;
      let nextUrl = this.catalog[this.currentID + 1].durChapterUrl;
      this.getContent(nextUrl, true);
    }
  }
};
</script>

<style lang="stylus" scoped>
.chapter-wrapper {
  padding: 3% 4%;

  .tool-bar {
    position: fixed;
    top: 7%;
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

  .read-bar {
    position: fixed;
    bottom: 7%;
    right: 4%;
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
    // margin-top: 24px;
    padding: 0 4%;

    .title {
      margin-bottom: 16px;
      font: 24px / 32px PingFangSC-Regular, HelveticaNeue-Light, 'Helvetica Neue Light', 'Microsoft YaHei', sans-serif;
    }

    .content {
      font-size: 18px;
      line-height: 1.8;
      overflow: hidden;
      margin: 0.8em 0;
      font-family: 'Microsoft YaHei', PingFangSC-Regular, HelveticaNeue-Light, 'Helvetica Neue Light', sans-serif;
    }
  }
}
</style>
