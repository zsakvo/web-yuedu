<script>
export default {
  name: "pcontent",
  props: ["carray"],
  render: function(createElement) {
    return createElement(
      "div",
      this.carray.map(a => {
        return createElement("p", a);
      })
    );
  }
};
</script>

<style lang="stylus" scoped>
p {
  word-wrap: break-word;
  word-break: break-all;
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  word-wrap: break-word;
  word-break: break-all;
}
</style>
