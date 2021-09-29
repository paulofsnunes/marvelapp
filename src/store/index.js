import { createStore } from "vuex";

const store = createStore({
  state: {
    stateCharacterDataList: [],
    stateFavoriteCharacterList: [],
    loggedIn: false
  },
  actions: {
    setUserLoggedIn(context) {
      context.commit("setUserLoggedIn");
    },
    setCharacterData(context, payload) {
      context.commit("setCharacterData", payload);
    },
    setFavoriteCharacterList(context, payload) {
      context.commit("setFavoriteCharacterList", payload);
    },
    addFavorite(context, payload) {
      context.commit("addFavorite", payload);
    },
    deleteFavorite(context, payload) {
      context.commit("deleteFavorite", payload);
    },
    eraseFavoriteCharacterList(context) {
      context.commit("eraseFavoriteCharacterList");
    }
  },
  mutations: {
    setUserLoggedIn(state) {
      state.loggedIn = true;
    },
    setCharacterData(state, list) {
      state.stateCharacterDataList = list;
    },
    setFavoriteCharacterList(state, list) {
      state.stateFavoriteCharacterList = list;
    },
    addFavorite(state, name) {
      state.stateFavoriteCharacterList.push(name);
    },
    deleteFavorite(state, item) {
      state.stateFavoriteCharacterList.splice(item, 1);
    },
    eraseFavoriteCharacterList(state) {
      state.stateFavoriteCharacterList = [];
    }
  }
});

export default store;
