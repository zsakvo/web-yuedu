<script>
import config from "../plugins/config";
export default {
  name: "pcontent",
  props: ["carray"],
  render() {
    const { fontFamily } = this;
    return (
      <div>
        {this.carray.map(a => {
          return <p style={fontFamily}>{a}</p>;
        })}
      </div>
    );
  },
  computed: {
    fontFamily() {
      return config.fonts[this.$store.state.config.font];
    }
  }
};
</script>

<style lang="stylus" scoped>
p {
  display: block;
  word-wrap: break-word;
  word-break: break-all;
}
</style>
