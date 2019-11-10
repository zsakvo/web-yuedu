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
import jump from "../plugins/jump";
import "../assets/catafont.css";
export default {
  name: "PopCata",
  data() {
    return {
      index: this.$store.state.readingBook.index
    };
  },
  computed: {
    catalog() {
      return this.$store.state.readingBook.catalog;
    },
    popCataVisible() {
      return this.$store.state.popCataVisible;
    }
  },
  mounted() {},
  watch: {
    popCataVisible() {
      this.$nextTick(function() {
        let index = this.$store.state.readingBook.index;
        let wrapper = this.$refs.cataData;
        // this.scroll = new BScroll(this.$refs.cataData, {});
        // this.scroll.scrollToElement(this.$refs.cata[index]);
        jump(this.$refs.cata[index], { container: wrapper, duration: 0 });
      });
    }
  },
  methods: {
    isSelected(index) {
      return index == this.$store.state.readingBook.index;
    },
    gotoChapter(note) {
      this.index = this.catalog.indexOf(note);
      this.$store.commit("setPopCataVisible", false);
      this.$store.commit("setContentLoading", true);
      this.$emit("getContent", this.index);
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
        cursor: pointer;
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
