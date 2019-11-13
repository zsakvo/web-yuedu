<template>
  <div class="chapter-wrapper" :style="bodyColor">
    <div class="tool-bar" :style="leftBarTheme">
      <div class="tools">
        <el-popover
          placement="right"
          width="820"
          trigger="click"
          v-model="popCataVisible"
          popper-class="pop-cata"
        >
          <PopCata @getContent="getContent" ref="popCata" />

          <div
            class="tool-icon"
            :class="{ 'no-point': noPoint }"
            slot="reference"
            style="border-bottom:none"
          >
            <i class="el-icon-tickets"></i>
            <div class="icon-text">目录</div>
          </div>
        </el-popover>
        <el-popover
          placement="right"
          width="470"
          trigger="click"
          v-model="readSettingsVisible"
        >
          <ReadSettings />

          <div
            class="tool-icon"
            style="border-bottom:none"
            :class="{ 'no-point': noPoint }"
            slot="reference"
          >
            <i class="el-icon-s-tools " @click="toTop"></i>
            <div class="icon-text">设置</div>
          </div>
        </el-popover>
        <div class="tool-icon" style="border-bottom:none" @click="toShelf">
          <i class="el-icon-notebook-1"></i>
          <div class="icon-text">书架</div>
        </div>
        <div
          class="tool-icon"
          :class="{ 'no-point': noPoint }"
          style="border-bottom:none"
          @click="toTop"
        >
          <i class="el-icon-top-right"></i>
          <div class="icon-text">顶部</div>
        </div>
        <div
          class="tool-icon"
          :class="{ 'no-point': noPoint }"
          @click="toBottom"
        >
          <i class="el-icon-bottom-left"></i>
          <div class="icon-text">底部</div>
        </div>
      </div>
    </div>
    <div class="read-bar" :style="rightBarTheme">
      <div class="tools">
        <div
          class="tool-icon"
          :class="{ 'no-point': noPoint }"
          style="border-bottom:none"
          @click="toLastChapter"
        >
          <i class="el-icon-arrow-up"></i>
        </div>
        <div
          class="tool-icon"
          :class="{ 'no-point': noPoint }"
          @click="toNextChapter"
        >
          <i class="el-icon-arrow-down"></i>
        </div>
      </div>
    </div>
    <div class="chapter-bar"></div>
    <div class="chapter" ref="content" :style="chapterTheme">
      <div class="content">
        <div class="top-bar" ref="top"></div>
        <div class="title" ref="title">{{ title }}</div>
        <Pcontent :carray="content" />
        <div class="bottom-bar" ref="bottom"></div>
      </div>
    </div>
  </div>
</template>

<script>
import PopCata from "../components/PopCatalog.vue";
import ReadSettings from "../components/ReadSettings.vue";
import Pcontent from "../components/Content.vue";
import Axios from "axios";
import jump from "../plugins/jump";
import config from "../plugins/config";
export default {
  components: {
    PopCata,
    Pcontent,
    ReadSettings
  },
  created() {
    var config = JSON.parse(localStorage.getItem("config"));
    if (config != null) this.$store.commit("setConfig", config);
  },
  mounted() {
    //初始化设置项目
    // var config = this.initConfig();
    // this.theme = config.theme;
    // 初始化进度条
    this.loadingFlag = true;
    this.loading = this.$loading({
      target: this.$refs.content,
      lock: true,
      text: "正在获取内容",
      spinner: "el-icon-loading",
      background: "rgb(255,255,255)"
    });
    //获取书籍数据
    const that = this;
    let bookUrl = sessionStorage.getItem("bookUrl");
    let bookName = sessionStorage.getItem("bookName");
    var book = JSON.parse(localStorage.getItem(bookUrl));
    if (book == null) {
      book = {
        bookName: bookName,
        bookUrl: bookUrl,
        index: 0
      };
      localStorage.setItem(bookUrl, JSON.stringify(book));
    }
    this.getCatalog(bookUrl).then(
      res => {
        let catalog = res.data.data;
        book.catalog = catalog;
        that.$store.commit("setReadingBook", book);
        var index = that.$store.state.readingBook.index || 0;
        this.getContent(index);
      },
      err => {
        that.loading.close();
        that.$message.error("获取书籍目录失败");
        throw err;
      }
    );
  },
  watch: {
    chapterName(to) {
      this.title = to;
    },
    content() {
      this.$store.commit("setContentLoading", false);
    },
    chapterColor(color) {
      this.chapterTheme.background = color.background;
    },
    readWidth(width) {
      console.log(width);
      this.chapterTheme.width = width;
      let leftToolMargin = -((parseInt(width) + 130) / 2 + 68) + "px";
      let rightToolMargin = -((parseInt(width) + 130) / 2 + 52) + "px";
      this.leftBarTheme.background = this.popupColor.background;
      this.leftBarTheme.marginLeft = leftToolMargin;
      this.rightBarTheme.background = this.popupColor.background;
      this.rightBarTheme.marginRight = rightToolMargin;
    }
  },
  data() {
    return {
      title: "",
      content: [],
      nextFlag: true,
      noPoint: true,
      chapterTheme: {
        background: config.themes[0].content.background,
        width: this.$store.state.config.readWidth
      },
      leftBarTheme: {
        background: config.themes[0].popup.background,
        marginLeft: "-468px"
      },
      rightBarTheme: {
        background: config.themes[0].popup.background,
        marginRight: "-452px"
      },
      currentID: parseInt(sessionStorage.getItem("chapterID"))
    };
  },
  computed: {
    catalog() {
      return this.$store.state.catalog;
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
    readSettingsVisible: {
      get() {
        return this.$store.state.readSettingsVisible;
      },
      set(value) {
        this.$store.commit("setReadSettingsVisible", value);
      }
    },
    config() {
      return this.$store.state.config;
    },
    bodyColor() {
      return config.themes[this.config.theme].body;
    },
    chapterColor() {
      return config.themes[this.config.theme].content;
    },
    popupColor() {
      return config.themes[this.config.theme].popup;
    },
    readWidth() {
      return this.$store.state.config.readWidth - 130 + "px";
    }
  },
  methods: {
    getCatalog(bookUrl) {
      return Axios.get(
        "http://" +
          localStorage.url +
          "/getChapterList?url=" +
          encodeURIComponent(bookUrl)
      );
    },
    getContent(index) {
      //展示进度条
      if (!this.loading.visible) {
        this.loading = this.$loading({
          target: this.$refs.content,
          lock: true,
          text: "正在获取内容",
          spinner: "el-icon-loading",
          background:
            "    background: #ede7da url('../assets/imgs/themes/content_0.png') repeat;"
        });
      }
      //保存阅读进度
      let bookUrl = sessionStorage.getItem("bookUrl");
      let book = JSON.parse(localStorage.getItem(bookUrl));
      book.index = index;
      localStorage.setItem(bookUrl, JSON.stringify(book));
      this.$store.state.readingBook.index = index;
      let chapterUrl = this.$store.state.readingBook.catalog[index]
        .durChapterUrl;
      let chapterName = this.$store.state.readingBook.catalog[index]
        .durChapterName;
      this.title = chapterName;
      //强制滚回顶层
      jump(this.$refs.top, { duration: 0 });
      let that = this;
      Axios.get(
        "http://" +
          localStorage.url +
          "/getBookContent?url=" +
          encodeURIComponent(chapterUrl)
      ).then(
        res => {
          let data = res.data.data;
          let dataArray = data.split("\n\n");
          let contentData = "";
          if (dataArray.length > 1) {
            contentData = ("　　" + dataArray[1]).split("\n");
          } else {
            contentData = ("　　" + dataArray[0]).split("\n");
          }
          that.content = contentData;
          this.$store.commit("setContentLoading", true);
          that.loading.close();
          that.noPoint = false;
        },
        err => {
          that.$message.error("获取章节内容失败");
          that.content = "　　获取章节内容失败！";
          throw err;
        }
      );
    },
    toTop() {
      jump(this.$refs.top);
    },
    toBottom() {
      jump(this.$refs.bottom);
    },
    toNextChapter() {
      this.$store.commit("setContentLoading", true);
      let index = this.$store.state.readingBook.index;
      index++;
      this.getContent(index);
    },
    toLastChapter() {
      this.$store.commit("setContentLoading", true);
      let index = this.$store.state.readingBook.index;
      index--;
      this.getContent(index);
    },
    toShelf() {
      this.$router.push("/");
    },
    handleScroll() {
      let scrollHeight = document.documentElement.scrollTop;
      if (
        this.windowHeight * 2 + scrollHeight >= this.contentHeight &&
        this.nextFlag
      ) {
        this.getNext();
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.chapter-wrapper {
  padding: 0 4%;
  flex-direction: column;
  align-items: center;

  >>>.no-point {
    pointer-events: none;
  }

  .tool-bar {
    position: fixed;
    top: 0;
    left: 50%;
    // margin-left: -468px;
    z-index: 100;

    .tools {
      display: flex;
      flex-direction: column;

      .tool-icon {
        font-size: 18px;
        width: 58px;
        height: 60px;
        border: 1px solid #D9D0B4;
        text-align: center;
        padding-top: 16px;
        cursor: pointer;
        outline: none;
        color: #000;

        .icon-text {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.4);
        }
      }
    }
  }

  .read-bar {
    position: fixed;
    bottom: 0;
    right: 50%;
    // margin-right: -452px;
    z-index: 100;

    .tools {
      display: flex;
      flex-direction: column;

      .tool-icon {
        font-size: 18px;
        width: 42px;
        height: 42px;
        line-height: 42px;
        border: 1px solid #D9D0B4;
        text-align: center;
        align-items: center;
        cursor: pointer;
        outline: none;
        color: #000;

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
    padding: 0 65px;
    min-height: 100vh;
    width: 670px;
    margin: 0 auto;

    >>>.el-icon-loading {
      font-size: 36px;
      color: #B5B5B5;
    }

    >>>.el-loading-text {
      font-weight: 500;
      color: #B5B5B5;
    }

    .content {
      font-size: 18px;
      line-height: 1.8;
      overflow: hidden;
      font-family: 'Microsoft YaHei', PingFangSC-Regular, HelveticaNeue-Light, 'Helvetica Neue Light', sans-serif;

      .title {
        margin-bottom: 57px;
        font: 24px / 32px PingFangSC-Regular, HelveticaNeue-Light, 'Helvetica Neue Light', 'Microsoft YaHei', sans-serif;
      }

      .bottom-bar, .top-bar {
        height: 64px;
      }
    }
  }
}
</style>
