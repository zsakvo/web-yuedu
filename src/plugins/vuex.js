import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    shelf: {},
    bookNum: 0,
    currentBookID: "",
    noteUrl: "",
    catalog: "",
    chapterName: "",
    chapterUrl: "",
    bookName: "",
    popCataVisible: false,
    contentLoading: true
  },
  mutations: {
    increaseBookNum(state, n) {
      state.bookNum = n;
    },
    addBooks(state, books) {
      state.shelf = books;
    },
    setCurrentBook(state, name) {
      state.currentBookID = name.MD5();
    },
    setNoteUrl(state, url) {
      state.noteUrl = url;
    },
    setCatalog(state, catalog) {
      state.catalog = catalog;
    },
    setChapterName(state, chapterName) {
      state.chapterName = chapterName;
    },
    setChapterUrl(state, chapterUrl) {
      state.chapterUrl = chapterUrl;
    },
    setBookName(state, bookName) {
      state.bookName = bookName;
    },
    setPopCataVisible(state, visible) {
      state.popCataVisible = visible;
    },
    setContentLoading(state, loading) {
      state.contentLoading = loading;
    }
  }
});
