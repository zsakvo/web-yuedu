<template>
  <div class="cata-wrapper">
    <div class="title">
      目录
    </div>
    <div class="cata">
      <div
        class="log"
        v-for="note in this.$store.state.catalog"
        :key="note.durChapterIndex"
      >
        {{ note.durChapterName }}
      </div>
    </div>
  </div>
</template>

<script>
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
      line-height: 32px;
    }
  }
}
</style>
