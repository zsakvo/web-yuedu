<template>
  <div class="cata-wrapper">
    <div class="title">
      目录
    </div>
    <div class="cata">
      <div
        class="log"
        v-for="note in catalog"
        :key="note.durChapterIndex"
        @click="gotoChapter(note.durChapterUrl, note.durChapterName)"
      >
        {{ note.durChapterName }}
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
  mounted() {},
  data() {
    return {
      key: "value"
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
    gotoChapter(chapterUrl, chapterName) {
      this.$store.commit("setPopCataVisible", false);
      this.$store.commit("setContentLoading", true);
      document.documentElement.scrollTop = 0;
      sessionStorage.setItem("chapterUrl", chapterUrl);
      sessionStorage.setItem("chapterName", chapterName);
      this.$store.commit("setChapterUrl", chapterUrl);
      this.$store.commit("setChapterName", chapterName);
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
