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
        >
          {{ note.durChapterName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      key: "value"
    };
  },
  mounted() {
    const that = this;
    Axios.get(
      "http://" +
        localStorage.url +
        "/getChapterList?url=" +
        this.$store.state.noteUrl
    ).then(
      res => {
        console.log(res.data);
        that.$store.commit("setCatalog", res.data.data);
      },
      err => {
        console.log(err);
      }
    );
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
        width: 300px;
        font-weight: 500;
        font-size: 20px;
        line-height: 48px;
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
