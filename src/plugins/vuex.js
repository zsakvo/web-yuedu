import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    shelf: {},
    catalog: "",
    readingBook: {},
    popCataVisible: false,
    contentLoading: true,
    config: {
      theme: 0,
      font: 0,
      fontSize: 18,
      readWidth: 800
    },
    readSettingsVisible: false
  },
  mutations: {
    addBooks(state, books) {
      state.shelf = books;
    },
    setCatalog(state, catalog) {
      state.catalog = catalog;
    },
    setPopCataVisible(state, visible) {
      state.popCataVisible = visible;
    },
    setContentLoading(state, loading) {
      state.contentLoading = loading;
    },
    setReadingBook(state, readingBook) {
      state.readingBook = readingBook;
    },
    setConfig(state, config) {
      state.config = config;
    },
    setReadSettingsVisible(state, visible) {
      state.readSettingsVisible = visible;
    }
  }
});
