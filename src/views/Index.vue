<template>
  <div class="index-wrapper">
    <div class="navigation-wrapper">
      <div class="navigation-title">
        阅读
      </div>
      <div class="navigation-sub-title">
        清风不识字，何故乱翻书
      </div>
      <div class="search-wrapper">
        <el-input
          size="mini"
          placeholder="搜索书籍"
          v-model="search"
          class="search-input"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
      <div class="recent-wrapper">
        <div class="recent-title">
          最近阅读
        </div>
        <div class="reading-recent">
          <div
            v-for="book in readingRecent"
            :key="book.url"
            class="recent-book"
          >
            {{ book.name }}
          </div>
        </div>
      </div>
      <div class="setting-wrapper">
        <div class="setting-title">
          基本设定
        </div>
        <div class="setting-item">
          <div
            class="setting-connect"
            :class="{ 'no-point': newConnect }"
            @click="setIP"
          >
            {{ connectStatus }}
          </div>
        </div>
      </div>
    </div>
    <div class="shelf-wrapper" ref="shelfWrapper">
      <div class="books-wrapper">
        <div
          class="book"
          v-for="book in shelf"
          :key="book.noteUrl"
          @click="toDetail(book.bookInfoBean.noteUrl, book.bookInfoBean.name)"
        >
          <div class="cover-img">
            <img
              class="cover"
              :src="book.customCoverPath || book.bookInfoBean.coverUrl"
              alt=""
            />
          </div>
          <div
            class="info"
            @click="toDetail(book.bookInfoBean.noteUrl, book.bookInfoBean.name)"
          >
            <div class="name">{{ book.bookInfoBean.name }}</div>
            <div class="sub">
              <div class="author">作者：{{ book.bookInfoBean.author }}</div>
            </div>
            <div class="intro">
              {{ book.bookInfoBean.introduce }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/shlffont.css";
import Axios from "axios";
export default {
  data() {
    return {
      search: "",
      readingRecent: [
        { name: "诡秘之主", url: "https://www.baidu.com/1" },
        { name: "特拉福买家俱乐部", url: "https://www.baidu.com/2" },
        { name: "未来天王", url: "https://www.baidu.com/3" }
      ],
      connectStatus: "正在连接后端服务器……",
      newConnect: true
    };
  },
  mounted() {
    this.loading = this.$loading({
      target: this.$refs.shelfWrapper,
      lock: true,
      text: "正在连接后端服务器……",
      spinner: "el-icon-loading",
      background: "rgb(247,247,247)"
    });
    if (localStorage.url) {
      const that = this;
      Axios.get("http://" + localStorage.url + "/getBookshelf", {
        timeout: 3000
      })
        .then(function(response) {
          that.$store.commit("increaseBookNum", response.data.data.length);
          that.$store.commit("addBooks", response.data.data);
          that.connectStatus = "已连接 " + localStorage.url;
          that.newConnect = false;
        })
        .catch(function(error) {
          that.loading.close();
          that.connectStatus = "后端连接失败";
          that.$message.error("连接失败，请检查后端状态");
          that.newConnect = false;
          throw error;
        });
    }
  },
  methods: {
    setIP() {
      const that = this;
      this.$prompt("请输入 IP 和端口 ( 如：127.0.0.1:9527 )", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^((2[0-4]\d|25[0-5]|[1]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[1]?\d\d?):([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-6][0-5][0-5][0-3][0-5])$/,
        inputErrorMessage: "url 形式不正确",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            that.newConnect = true;
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "校验中……";
            Axios.get("http://" + instance.inputValue + "/getBookshelf", {
              timeout: 3000
            })
              .then(function(response) {
                instance.confirmButtonLoading = false;
                that.$store.commit(
                  "increaseBookNum",
                  response.data.data.length
                );
                that.$store.commit("addBooks", response.data.data);
                that.newConnect = false;
                done();
              })
              .catch(function(error) {
                instance.confirmButtonLoading = false;
                instance.confirmButtonText = "确定";
                that.$message.error("访问失败，请检查您输入的 url");
                that.newConnect = false;
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
        .catch(() => {});
    },
    toDetail(bookUrl, bookName) {
      sessionStorage.setItem("bookUrl", bookUrl);
      sessionStorage.setItem("bookName", bookName);
      this.$router.push({
        path: "/chapter"
      });
    }
  },
  computed: {
    bookNum() {
      return this.$store.state.bookNum;
    },
    shelf() {
      return this.$store.state.shelf;
    }
  }
};
</script>

<style lang="stylus" scoped>
.index-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;

  .navigation-wrapper {
    width: 260px;
    min-width: 260px;
    padding: 48px 36px;
    background-color: #F7F7F7;

    .navigation-title {
      font-size: 24px;
      font-weight: 500;
      font-family: FZZCYSK;
    }

    .navigation-sub-title {
      font-size: 16px;
      font-weight: 300;
      font-family: FZZCYSK;
      margin-top: 16px;
      color: #b1b1b1;
    }

    .search-wrapper {
      .search-input {
        border-radius: 50%;
        margin-top: 24px;

        >>> .el-input__inner {
          border-radius: 50px;
          border-color: #E3E3E3;
        }
      }
    }

    .recent-wrapper {
      margin-top: 36px;

      .recent-title {
        font-size: 14px;
        color: #b1b1b1;
        font-family: FZZCYSK;
      }

      .reading-recent {
        margin: 18px 0;

        .recent-book {
          font-size: 14px;
          font-weight: 400;
          margin: 12px 0;
          font-weight: 500;
          color: #6B7C87;
          cursor: pointer;
          padding: 6px 18px;
        }

        .recent-book:hover {
          background-color: #e6e6e6;
        }
      }
    }

    .setting-wrapper {
      margin-top: 36px;

      .setting-title {
        font-size: 14px;
        color: #b1b1b1;
        font-family: FZZCYSK;
      }

      .no-point {
        pointer-events: none;
      }

      .setting-connect {
        margin: 18px 0;
        font-size: 14px;
        font-weight: 500;
        color: #6B7C87;
        cursor: pointer;
        padding: 6px 18px;
      }

      .setting-connect:hover {
        background-color: #e6e6e6;
      }
    }
  }

  .shelf-wrapper {
    padding: 48px 48px;
    width: 100%;

    >>>.el-icon-loading {
      font-size: 36px;
      color: #B5B5B5;
    }

    >>>.el-loading-text {
      font-weight: 500;
      color: #B5B5B5;
    }

    .books-wrapper {
      height: 100%;
      overflow: auto;

      .book {
        display: flex;
        cursor: pointer;
        margin-bottom: 18px;
        padding: 24px 24px;
        flex-direction: row;
        justify-content: space-around;

        .cover-img {
          width: 84px;
          height: 112px;

          .cover {
            width: 84px;
            height: 112px;
          }
        }

        .info {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: left;
          height: 112px;
          margin-left: 20px;

          .name {
            width: fit-content;
            font-size: 16px;
            font-weight: 700;
            color: #33373D;
          }

          .sub {
            display: flex;
            flex-direction: row;
            font-size: 12px;
            font-weight: 600;
            color: #6b6b6b;

            .author {
              margin-right: 5px;
            }
          }

          .intro {
            color: #969ba3;
            font-size: 14px;
            font-weight: 500;
            word-wrap: break-word;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            text-align: left;
          }
        }
      }

      .book:hover {
        background-color: #f2f2f2;
      }
    }

    .books-wrapper::-webkit-scrollbar {
      width: 0 !important;
    }
  }
}
</style>
