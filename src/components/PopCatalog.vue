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
      //   console.log(to);
      //   console.log(from);
      this.$store.commit("setChapterName", to.query.title);
      this.$store.commit("setChapterUrl", to.query.chapterUrl);
    }
  },
  methods: {
    gotoChapter(chapterUrl, chapterName) {
      sessionStorage.setItem("chapterUrl", chapterUrl);
      sessionStorage.setItem("chapterName", chapterName);
      // let name = this.$route.query.name;
      //   console.log(chapterUrl);
      //   console.log(title);
      //   this.$route.query.id = Base64.encode(chapterUrl);
      //   this.$route.query.title = Base64.encode(title);
      this.$router.go(0);
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
    }
  }
}
</style>
