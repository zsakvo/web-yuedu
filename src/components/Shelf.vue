<template>
  <div class="shelf-wrapper">
    <div class="title">共有{{ bookNum }}本书籍</div>
    <el-divider />
    <div class="shelf">
      <div class="book" v-for="book in shelf" :key="book.noteUrl">
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
            <!-- <div class="size">共 {{ book.chapterListSize }} 章</div> -->
          </div>
          <div class="intro">
            {{ book.bookInfoBean.introduce }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// var Base64 = require("js-base64").Base64;
export default {
  name: "shelf",
  data() {
    return {};
  },
  methods: {
    toDetail(bookUrl, bookName) {
      sessionStorage.setItem("bookUrl", bookUrl);
      sessionStorage.setItem("bookName", bookName);
      // this.$store.commit("setNoteUrl", noteUrl);
      this.$router.push({
        path: "/chapter"
        // query: {
        //   id: Base64.encode(noteUrl),
        //   name: Base64.encode(name)
        // }
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
.shelf-wrapper {
  width: 84vw;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin-top: -2%;

  .title {
    width: fit-content;
    font-size: 18px;
    font-weight: 500;
    color: #777777;
  }

  .el-divider {
    margin: 24px 0 32px 0;
  }

  .shelf {
    .book {
      display: flex;
      padding-bottom: 36px;
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
  }
}
</style>
