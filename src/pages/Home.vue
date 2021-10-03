<template>
  <div id="app">
    <header class="home-header">
      <img src="../assets/Icons/marvel-icon-png-1.png" />
    </header>
    <div class="home-container">
      <div class="animation-box">
        <img
          class="animation-image"
          src="../assets/what_if_____the_watcher_png_by_metropolis_hero1125_deohvz1-fullview.png"
          alt="watcher"
        />
      </div>
      <characters-list
        :characters-list="stateCharacterDataList"
        :favorites="stateFavoriteCharacterList"
        @deleteFavorite="deleteFavorite"
        @addFavorite="addFavorite"
      />
      <div class="list-container">
        <summary-favorites
          class="favorites-list"
          :favorites="stateFavoriteCharacterList"
          @addFavorite="addFavorite"
          @deleteFavorite="deleteFavorite"
          @eraseFavoriteCharacterList="eraseFavoriteCharacterList"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import CharactersList from "@/components/CharactersList";
  import SummaryFavorites from "@/components/SummaryFavorites";

  export default {
    name: "Home",
    components: {
      CharactersList,
      SummaryFavorites,
    },
    computed: {
      ...mapState(["stateCharacterDataList", "stateFavoriteCharacterList"]),
    },
    data() {
      return {};
    },
    async created() {
      const characterData = await this.getCharacterData();
      this.setCharacterData(characterData);
    },
    methods: {
      async getCharacterData() {
        const characters = await fetch(
          "https://gateway.marvel.com/v1/public/characters?ts=1632673465&apikey=67be2ccc88cf482edef8fd240708589b&hash=1d4f4badb0b59bab0750a76d14d2c290&limit=21"
        );
        const json = await characters.json();
        return json.data.results;
      },
      ...mapActions([
        "setCharacterData",
        "addFavorite",
        "deleteFavorite",
        "eraseFavoriteCharacterList",
      ]),
    },
  };
</script>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Marvel:ital,wght@0,400;0,700;1,400;1,700&display=swap");

  * {
    margin: 0;
    border: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Marvel", sans-serif;
  }

  body {
    margin: 0;
    background: #f8d40c;
  }
  .home-container {
    display: flex;
    justify-content: space-evenly;
  }

  .home-header {
    display: flex;
    justify-content: center;
  }

  .home-header img {
    margin-top: 1.5rem;
    max-width: 15%;
    max-height: 15%;
    -webkit-animation: fadein 5s;
    animation: fadein 5s;
  }

  .animation-box {
    max-width: 300px;
  }

  .animation-image {
    max-width: 100%;
    max-height: 100%;
    animation: go-back 1s infinite alternate;
  }
  @keyframes go-back {
    from {
      transform: translatey(100px);
    }
    to {
      transform: translatey(0);
    }
  }

  .list-container {
    max-width: 300px;
    height: 500px;
    background: red;
    margin-top: 174px;
    color: white;
  }

  .favorites-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 300px;
  }

  
  /* RESPONSIVO */

  @media screen and (max-width: 900px) {
    .animation-box {
      display: none;
    }
    .home-container {
      display: flex;
      flex-direction: column;
    }
    .list-container {
    max-width: 300px;
    height: 500px;
    background: red;
    color: white;
    margin-left: auto;
    margin-right: auto;
  }
  }
</style>
