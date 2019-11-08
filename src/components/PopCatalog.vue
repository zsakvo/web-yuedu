<template>
  <div class="cata-wrapper">
    <div class="title">
      目录
    </div>
    <div class="data-wrapper" ref="cataData">
      <div class="cata">
        <div
          class="log"
          v-for="note in catalog"
          :class="{ selected: index == note.durChapterIndex }"
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
  props: {
    cata: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      index: sessionStorage.getItem("chapterID")
    };
  },
  computed: {
    catalog() {
      return JSON.parse(sessionStorage.getItem("catalog"));
    }
  },
  mounted() {
    // console.log(this.$refs.cataData[this.index]);
    if (this.scroll == null) this.scroll = new BScroll(this.$refs.cataData, {});
  },
  watch: {
    $route(to) {
      console.log(this.index);
      this.$store.commit("setChapterName", to.query.title);
      this.$store.commit("setChapterUrl", to.query.chapterUrl);
    },
    index(to) {
      console.log(this.$refs.cata[to]);
      this.scroll = new BScroll(this.$refs.cataData, {});
      this.scroll.scrollToElement(this.$refs.cata[to]);
      // this.scroll.scrollTo(0, 455);
    }
  },
  methods: {
    gotoChapter(note) {
      this.index = this.catalog.indexOf(note);
      sessionStorage.setItem("chapterID", this.index);
      this.$store.commit("setPopCataVisible", false);
      this.$store.commit("setContentLoading", true);
      document.documentElement.scrollTop = 0;
      sessionStorage.setItem("chapterUrl", note.durChapterUrl);
      sessionStorage.setItem("chapterName", note.durChapterName);
      this.$store.commit("setChapterUrl", note.durChapterUrl);
      this.$store.commit("setChapterName", note.durChapterName);
    }
  }
};
</script>

<style lang="stylus" scoped>
.cata-wrapper {
  padding: 18px 0 24px 48px;

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
        width: 340px;
        height: 40px;
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
