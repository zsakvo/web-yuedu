import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    shelf: {},
    bookNum: 0,
    currentBookID: "",
    noteUrl: "",
    catalog: ""
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
    }
  }
});
