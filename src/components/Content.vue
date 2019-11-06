<script>
export default {
  name: "pcontent",
  props: ["carray"],
  render: function(createElement) {
    if (this.carray instanceof Array) {
      return createElement(
        "div",
        this.carray.map(a => {
          return createElement("p", a);
        })
      );
    } else {
      return createElement();
    }
  }
};
</script>

<style></style>
