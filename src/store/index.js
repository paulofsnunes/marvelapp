import { createStore } from "vuex";
import axios from 'axios'

const store = createStore({
  state: {
    stateCharacterDataList: [],
    stateFavoriteCharacterList: [],
    loggedIn: false
  },
  getters: {
    getFavorite: state => state.stateFavoriteCharacterList,
    getFavoriteListLength: (state, getters) => {
      return getters.getFavorite.length
  }
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
    addFavorite(context, favorites) {
      context.commit("addFavorite", favorites);
    },
    deleteFavorite(context, payload) {
      context.commit("deleteFavorite", payload);
    },
    eraseFavoriteCharacterList(context) {
      context.commit("eraseFavoriteCharacterList");
    },
    async saveFavoriteCharacterList({ commit }, favorites) {
      console.log(favorites)
      await axios.post('https://61591c7d5167ba00174bbc86.mockapi.io/favorites', {favorites}).then(() => {
        commit('addFavorite', favorites)
          alert('Lista salva!')
      })
  },
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
