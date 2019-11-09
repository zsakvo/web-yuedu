<template>
  <div class="cata-wrapper">
    <div class="title">
      目录
    </div>
    <div class="data-wrapper" ref="cataData">
      <div class="cata">
        <div
          class="log"
          v-for="(note, index) in catalog"
          :class="{ selected: isSelected(index) }"
          :key="note.durChapterIndex"
          @click="gotoChapter(note)"
          ref="cata"
        >
          {{ note.durChapterName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// var Base64 = require("js-base64").Base64;
import BScroll from "better-scroll";
import "../assets/catafont.css";
export default {
  name: "PopCata",
  // props: {
  //   cata: {
  //     type: Object,
  //     default: function() {
  //       return {};
  //     }
  //   }
  // },
  data() {
    return {
      index: this.$store.state.readingBook.index
    };
  },
  computed: {
    // index: {
    //   get() {
    //     return this.$store.state.readingBook.index;
    //   }
    // },
    catalog() {
      return this.$store.state.readingBook.catalog;
    },
    popCataVisible() {
      return this.$store.state.popCataVisible;
    }
  },
  mounted() {
    // console.log(this.$refs.cataData[this.index]);
    // if (this.scroll == null) this.scroll = new BScroll(this.$refs.cataData, {});
    // this.$nextTick(function() {
    //   this.index =
    //   console.log(this.index);
    //   console.log(this.$refs.cata[this.index]);
    //   this.scroll = new BScroll(this.$refs.cataData, {});
    //   this.scroll.scrollToElement(this.$refs.cata[this.index]);
    // });
  },
  watch: {
    $route(to) {
      console.log(this.index);
      this.$store.commit("setChapterName", to.query.title);
      this.$store.commit("setChapterUrl", to.query.chapterUrl);
    },
    index(to) {
      this.scroll = new BScroll(this.$refs.cataData, {});
      this.scroll.scrollToElement(this.$refs.cata[to]);
      // this.scroll.scrollTo(0, 455);
    },
    popCataVisible() {
      let that = this;
      this.$nextTick(function() {
        let index = this.$store.state.readingBook.index;
        that.index = index;
      });
    }
    // popCataVisible(to) {
    //   if (to) {
    //     this.index = this.$store.state.readingBook.index;
    //     this.scroll.scrollToElement(this.$refs.cata[this.index]);
    //   }
    // }
  },
  methods: {
    beginScroll(index) {
      let that = this;
      this.$nextTick(function() {
        console.log(index);
        that.index = index;
      });
    },
    isSelected(index) {
      return index == this.$store.state.readingBook.index;
    },
    gotoChapter(note) {
      this.index = this.catalog.indexOf(note);
      // sessionStorage.setItem("chapterID", this.index);
      this.$store.commit("setPopCataVisible", false);
      this.$store.commit("setContentLoading", true);
      this.$emit("getContent", this.index);
      // document.documentElement.scrollTop = 0;
      // sessionStorage.setItem("chapterUrl", note.durChapterUrl);
      // sessionStorage.setItem("chapterName", note.durChapterName);
      // this.$store.commit("setChapterUrl", note.durChapterUrl);
      // this.$store.commit("setChapterName", note.durChapterName);
    }
  }
};
</script>

<style lang="stylus" scoped>
.cata-wrapper {
  padding: 18px 0 24px 25px;

  .title {
    font-size: 18px;
    font-weight: 400;
    font-family: FZZCYSK;
    margin: 0 0 20px 0;
    color: #ed4259;
    width: fit-content;
    border-bottom: 1px solid #ed4259;
  }

  .data-wrapper {
    height: 300px;
    overflow: auto;

    .cata {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;

      .selected {
        color: #EB4259;
      }

      .log {
        width: 365px;
        height: 40px;
        padding-right: 25px;
        float: left;
        max-width: 80%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        border-bottom: 1px solid #F2F2F2;
        font: 16px / 40px PingFangSC-Regular, HelveticaNeue-Light, 'Helvetica Neue Light', 'Microsoft YaHei', sans-serif;
      }
    }
  }
}
</style>
