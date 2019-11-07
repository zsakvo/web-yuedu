<template>
  <div class="cata-wrapper">
    <div class="title">
      目录
    </div>
    <div class="cata">
      <div
        class="log"
        v-for="note in catalog"
        :class="{ selected: index == note.durChapterIndex }"
        :key="note.durChapterIndex"
        @click="gotoChapter(note)"
      >
        {{ note.durChapterName.replace(/（.+）/g, "") }}
      </div>
    </div>
  </div>
</template>

<script>
// var Base64 = require("js-base64").Base64;
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
  mounted() {
    console.log(this.currentID);
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
  watch: {
    $route(to) {
      this.$store.commit("setChapterName", to.query.title);
      this.$store.commit("setChapterUrl", to.query.chapterUrl);
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
  padding: 24px 0 24px 48px;

  .title {
    font-size: 23px;
    font-weight: 600;
    line-height: 64px;
  }

  .cata {
    height: 400px;
    overflow: auto;
    display: grid;
    grid-template-columns: repeat(2, 50%);

    .selected {
      color: #EB4259;
    }

    .log {
      font-size: 14px;
      line-height: 42px;
      padding-right: 64px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      word-wrap: break-word;
      text-overflow: ellipsis;
    }
  }
}
</style>
