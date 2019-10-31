import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    shelf: {},
    bookNum: 0
  },
  mutations: {
    increaseBookNum(state, n) {
      state.bookNum = n;
    },
    addBooks(state, books) {
      state.shelf = books;
    }
  }
});
