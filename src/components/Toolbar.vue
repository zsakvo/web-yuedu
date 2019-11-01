<template>
  <div class="toolbar-wrapper">
    <div class="bar">
      <div class="title">阅读</div>
      <div class="menus">
        <i class="el-icon-setting" @click="open"></i>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "toolbar",
  data() {
    return {
      url: ""
    };
  },
  mounted() {
    if (localStorage.url) {
      const that = this;
      axios
        .get("http://" + localStorage.url + "/getBookshelf")
        .then(function(response) {
          that.$store.commit("increaseBookNum", response.data.data.length);
          that.$store.commit("addBooks", response.data.data);
        })
        .catch(function(error) {
          throw error;
        });
    }
  },
  methods: {
    open() {
      const that = this;
      this.$prompt("请输入 IP 和端口 ( 如：127.0.0.1:9527 )", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^((2[0-4]\d|25[0-5]|[1]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[1]?\d\d?):([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-6][0-5][0-5][0-3][0-5])$/,
        inputErrorMessage: "url 形式不正确",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "校验中……";
            axios
              .get("http://" + instance.inputValue + "/getBookshelf")
              .then(function(response) {
                instance.confirmButtonLoading = false;
                that.$store.commit(
                  "increaseBookNum",
                  response.data.data.length
                );
                that.$store.commit("addBooks", response.data.data);
                done();
              })
              .catch(function(error) {
                instance.confirmButtonLoading = false;
                instance.confirmButtonText = "确定";
                that.$message.error("访问失败，请检查您输入的 url");
                throw error;
              });
          } else {
            done();
          }
        }
      })
        .then(({ value }) => {
          localStorage.url = value;
          this.$message({
            type: "success",
            message: "与" + value + "连接成功"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
.toolbar-wrapper {
  .bar {
    padding: 3% 8%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .title {
      font-size: 24px;
      font-weight: 500;
      line-height: 48px;
      color: #333;
    }

    .el-icon-setting {
      line-height: 48px;
      font-size: 20px;
    }
  }
}
</style>
