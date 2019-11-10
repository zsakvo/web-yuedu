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
          <div class="setting-connect">
            已连接 192.168.0.120:1122
          </div>
        </div>
      </div>
    </div>
    <div class="shelf-wrapper">
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
      ]
    };
  },
  mounted() {
    if (localStorage.url) {
      const that = this;
      Axios.get("http://" + localStorage.url + "/getBookshelf")
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
        margin: 18px 0 0 18px;

        .recent-book {
          font-size: 14px;
          font-weight: 400;
          margin: 12px 0;
          font-weight: 500;
          color: #6B7C87;
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

      .setting-connect {
        margin: 18px 0 0 18px;
        font-size: 14px;
        font-weight: 500;
        color: #6B7C87;
      }
    }
  }

  .shelf-wrapper {
    padding: 48px 48px;

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
