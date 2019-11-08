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
        <el-popover
          placement="right"
          width="820"
          trigger="click"
          v-model="popCataVisible"
        >
          <PopCata />

          <div class="tool-icon" slot="reference" style="border-bottom:none">
            <i class="el-icon-tickets"></i>
            <div class="icon-text">目录</div>
          </div>
        </el-popover>
        <div class="tool-icon" style="border-bottom:none">
          <i class="el-icon-s-tools " @click="toTop"></i>
          <div class="icon-text">设置</div>
        </div>
        <div class="tool-icon" style="border-bottom:none" @click="toShelf">
          <i class="el-icon-notebook-1"></i>
          <div class="icon-text">书架</div>
        </div>
        <div class="tool-icon" style="border-bottom:none" @click="toTop">
          <i class="el-icon-top-right"></i>
          <div class="icon-text">顶部</div>
        </div>
        <div class="tool-icon" @click="toBottom">
          <i class="el-icon-bottom-left"></i>
          <div class="icon-text">底部</div>
        </div>
      </div>
    </div>
    <div class="read-bar">
      <div class="tools">
        <div
          class="tool-icon"
          style="border-bottom:none"
          @click="toLastChapter"
        >
          <i class="el-icon-arrow-up"></i>
        </div>
        <div class="tool-icon" @click="toNextChapter">
          <i class="el-icon-arrow-down"></i>
        </div>
      </div>
    </div>
    <div class="chapter-bar"></div>
    <div class="chapter" ref="content">
      <div class="content">
        <div class="title">{{ title }}</div>
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
      currentID: parseInt(sessionStorage.getItem("chapterID"))
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
    getContent(url) {
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
          that.content = contentData;
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
    toShelf() {
      this.$router.push("/");
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
  padding: 0 4%;
  display: flex;
  flex-direction: row;
  justify-content: center;

  .tool-bar {
    position: fixed;
    top: 0;
    left: 6vw;
    z-index: 100;

    .tools {
      display: flex;
      flex-direction: column;

      .tool-icon {
        font-size: 18px;
        width: 58px;
        height: 60px;
        border: 1px solid #d8d8d8;
        text-align: center;
        padding-top: 16px;

        .icon-text {
          font-size: 12px;
        }
      }
    }
  }

  .read-bar {
    position: fixed;
    bottom: 0;
    right: 8vw;
    z-index: 100;

    .tools {
      display: flex;
      flex-direction: column;

      .tool-icon {
        font-size: 18px;
        width: 42px;
        height: 42px;
        line-height: 42px;
        border: 1px solid #d8d8d8;
        text-align: center;
        align-items: center;

        .icon-text {
          font-size: 12px;
        }
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
    .content {
      .title {
        margin-bottom: 57px;
        font: 24px / 32px PingFangSC-Regular, HelveticaNeue-Light, 'Helvetica Neue Light', 'Microsoft YaHei', sans-serif;
      }

      font-size: 18px;
      line-height: 1.8;
      overflow: hidden;
      // margin: 0.8em 0;
      width: 630px;
      margin-top: 52px;
      font-family: 'Microsoft YaHei', PingFangSC-Regular, HelveticaNeue-Light, 'Helvetica Neue Light', sans-serif;
    }
  }
}
</style>
