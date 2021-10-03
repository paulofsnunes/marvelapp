<template>
  <div class="characters">
    <div>
      <span>Escolha seus personagens favoritos!</span>
      <div>
        <div class="search-input__container">
          <input
            list="characters"
            v-model="search"
            type="text"
            class="search-input"
            placeholder="Buscar pelo nome"
            @keyup.enter="searchCharacter()"
          />
          <button class="button-search" @click="searchCharacter()">
            Buscar
          </button>
          <h3>{{ search }}</h3>
        </div>
        <div v-show="searchEmpty" class="characters-list">
          <p
            v-for="(characters, index) in charactersList"
            :key="characters.id"
            class="characters-list-item"
          >
            {{ index + 1 + ". " }}
            {{ characters.name }}
            <img
              class="character-image"
              :src="
                characters.thumbnail.path + '.' + characters.thumbnail.extension
              "
            />

            <button
              v-show="!favorites.includes(characters.name)"
              class="button-card"
              @click="setFavorites(characters.name)"
            >
              Adicionar
            </button>
            <button
              v-show="favorites.includes(characters.name)"
              class="button-remove"
              @click="setFavorites(characters.name)"
            >
              Remover
            </button>
          </p>
        </div>
        <div class="characters-list">
          <p
            v-for="(characters, index) in arrSearch"
            :key="characters.id"
            class="characters-list-item"
          >
            {{ index + 1 + ". " }}
            {{ characters.name }}
            <img
              class="character-image"
              :src="
                characters.thumbnail.path + '.' + characters.thumbnail.extension
              "
            />
            <button
              v-show="!favorites.includes(characters.name)"
              class="button-card"
              @click="setFavorites(characters.name)"
            >
              Adicionar
            </button>
            <button
              v-show="favorites.includes(characters.name)"
              class="button-remove"
              @click="setFavorites(characters.name)"
            >
              Remover
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import { mapActions } from "vuex";

  export default {
    name: "CharactersList",
    props: {
      charactersList: {
        type: Array,
        required: true,
      },
      favorites: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        search: null,
        searchEmpty: true,
        arrSearch: "",
      };
    },
    computed: {
      favoriteListLength() {
        return this.favorites.length;
      },
    },
 
    methods: {
      setFavorites(name) {
        if (this.favorites.includes(name)) {
          const indexInArray = this.favorites.indexOf(name);
          this.$emit("deleteFavorite", indexInArray);
          return;
        }
        if (this.favoriteListLength < 4) {
          this.$emit("addFavorite", name);
        }
      },
      async getCharacterData() {
        const characters = await fetch(
          "https://gateway.marvel.com/v1/public/characters?ts=1632673465&apikey=67be2ccc88cf482edef8fd240708589b&hash=1d4f4badb0b59bab0750a76d14d2c290&limit=21"
        );
        const json = await characters.json();
        return json.data.results;
      },
      searchCharacter() {
        if (this.search.length >= 3) {
          axios
            .get(
              `http://gateway.marvel.com/v1/public/characters?&nameStartsWith=${this.search}&ts=1632673465&apikey=67be2ccc88cf482edef8fd240708589b&hash=1d4f4badb0b59bab0750a76d14d2c290&limit=21`
            )
            .then((response) => {
              this.arrSearch = response.data.data.results;
              this.setCharacterData(this.arrSearch);
              this.searchEmpty = false;
            });
        }
      },
      ...mapActions(["setCharacterData"]),
    },
  };
</script>

<style lang="css" scoped>
  h1 {
    font-size: 16px;
  }

  .characters {
    display: flex;
  }

  .characters span {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    font-family: "Marvel", sans-serif;
    font-size: 30px;
    font-weight: bold;
  }

  .characters-list {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-column-gap: 015px;
    grid-row-gap: 15px;
  }

  .characters-list-item {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 2rem;
    background: white;
    box-shadow: 5px 5px 15px rgb(0 0 0 / 20%);
    border-radius: 8px;
    width: 200px;
  }

  .character-image {
    width: 120px;
    height: 80px;
    border-radius: 8px;
    margin-top: 10px;
  }

  .button-card {
    margin-top: 2rem;
    padding: 0.4rem;
    width: 100%;
    background: linear-gradient(to left, #4776e6, #8e54e9);
    cursor: pointer;
    color: white;
    font-family: "Marvel", sans-serif;
    font-size: 0.9rem;
    font-weight: 300;
    border-radius: 4px;
    transition: all 0.3s ease;
    border: none;
  }

    .button-card:hover {
    letter-spacing: 0.5px;
    background: linear-gradient(to right, #4776e6, #8e54e9);
    }

  .button-search {
    margin-top: 2rem;
    padding: 0.4rem;
    width: 100px;
    height: 40px;
    background: linear-gradient(to left, #4776e6, #8e54e9);
    cursor: pointer;
    color: white;
    font-family: "Marvel", sans-serif;
    font-size: 0.9rem;
    font-weight: 300;
    border-radius: 4px;
    transition: all 0.3s ease;
    border: none;
  }

  .button-search:hover {
    letter-spacing: 0.5px;
    background: linear-gradient(to right, #4776e6, #8e54e9);
  }

  .button-remove {
    margin-top: 2rem;
    padding: 0.4rem;
    width: 100%;
    background: linear-gradient(to left, #e66747, #e95454);
    cursor: pointer;
    color: white;
    font-family: "Marvel", sans-serif;
    font-size: 0.9rem;
    font-weight: 300;
    border-radius: 4px;
    transition: all 0.3s ease;
    border: none;
  }

  .button-remove:hover {
  letter-spacing: 0.5px;
  background: linear-gradient(to right, #e66747, #e95454);
  }

  .search-input__container {
    text-align: center;
  }

  .search-input {
    height: 40px;
    border-radius: 4px;
    outline: none;
    font-size: 0.9rem;
    color: rgba(0, 0, 0, 0.7);
    width: 250px;
    border: none;
    font-family: "Marvel", sans-serif;
    padding-left: 15px;
    margin-right: 5px;
  }

  
  /* RESPONSIVO */

  @media screen and (max-width: 900px) {
    .characters {
    display: flex;
    justify-content: center;
  }
    .characters-list {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-column-gap: 015px;
    grid-row-gap: 15px;
    margin-left: auto;
    margin-right: auto;
    width: 18em;
  }
    .characters-list-item {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 2rem;
    background: white;
    box-shadow: 5px 5px 15px rgb(0 0 0 / 20%);
    border-radius: 8px;
    width: 300px;
  }
    .character-image {
    width: 50%;
    height: 50%;
    border-radius: 8px;
    margin-top: 10px;
  }
    .characters span {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    font-family: "Marvel", sans-serif;
    font-size: 20px;
    font-weight: bold;
  }
  .search-input {
    height: 40px;
    border-radius: 4px;
    outline: none;
    font-size: 0.9rem;
    color: rgba(0, 0, 0, 0.7);
    width: 200px;
    border: none;
    font-family: "Marvel", sans-serif;
    padding-left: 15px;
    margin-right: 5px;
  }
  }

</style>
