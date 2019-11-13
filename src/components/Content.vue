<script>
import config from "../plugins/config";
export default {
  name: "pcontent",
  data() {
    return {
      show: false
    };
  },
  props: ["carray"],
  render() {
    const { fontFamily, fontSize } = this;
    let style = fontFamily;
    style.fontSize = fontSize;
    if (this.show) {
      return (
        <div>
          {this.carray.map(a => {
            return <p style={style}>{a}</p>;
          })}
        </div>
      );
    } else {
      return <div />;
    }
  },
  computed: {
    fontFamily() {
      return config.fonts[this.$store.state.config.font];
    },
    fontSize() {
      return this.$store.state.config.fontSize + "px";
    }
  },
  watch: {
    fontSize() {
      let that = this;
      that.show = false;
      this.$nextTick(() => {
        that.show = true;
      });
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
