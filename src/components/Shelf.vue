<template>
  <div class="shelf-wrapper">
    <div class="shelf">
      <div class="title">共有{{ bookNum }}本书籍</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "shelf",
  data() {
    return {};
  },
  computed: {
    bookNum() {
      console.log(this.$store.state.shelf);
      return this.$store.state.shelf.data.length;
    }
  }
};
</script>

<style lang="stylus" scoped></style>
