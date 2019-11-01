<template>
  <div class="detail-wrapper">
    <div class="detail">
      <div class="bar">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }" class="index"
            >书架</el-breadcrumb-item
          >
          <el-breadcrumb-item class="sub">目录</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-divider />
      <div class="catalog">
        <div
          class="note"
          v-for="note in this.$store.state.catalog"
          :key="note.durChapterIndex"
          @click="toChapter(note.durChapterUrl, note.durChapterName)"
        >
          {{ note.durChapterName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
var Base64 = require("js-base64").Base64;
export default {
  data() {
    return {
      key: "value"
    };
  },
  mounted() {
    const that = this;
    let noteUrl = Base64.decode(this.$route.query.id);
    Axios.get(
      "http://" +
        localStorage.url +
        "/getChapterList?url=" +
        encodeURIComponent(noteUrl)
    ).then(
      res => {
        that.$store.commit("setCatalog", res.data.data);
      },
      err => {
        throw err;
      }
    );
  },
  methods: {
    toChapter(chapterUrl, name) {
      this.$router.push({
        path: "/chapter",
        query: {
          id: Base64.encode(chapterUrl),
          name: Base64.encode(name)
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.detail-wrapper {
  padding: 3% 8%;

  .detail {
    .bar {
      .el-breadcrumb {
        font-size: 24px;
        font-weight: 500;
        line-height: 48px;

        .index {
          color: #333;
        }

        .sub {
          color: #676767;
        }
      }
    }

    .el-divider {
      margin-top: 2%;
    }

    .catalog {
      margin-top: 2%;
      display: grid;
      grid-template-columns: repeat(auto-fill, 300px);
      justify-content: space-between;

      .note {
        width: 200px;
        font-weight: 500;
        font-size: 14px;
        line-height: 40px;
        padding-left: 12px;
        padding-right: 12px;
        word-wrap: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        text-align: left;
      }
    }
  }
}
</style>
