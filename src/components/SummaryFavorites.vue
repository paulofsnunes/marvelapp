<template>
  <div class="favorites-list">
    <h2>Sua Lista:</h2>
    <p v-if="favoriteListLength < maximumList">
      Adicione até 3 personagens
    </p>
    <p
      v-for="(characterName, index) in favorites"
      :key="index"
      class="chosen-character"
    >
      <img
        src="../assets/Icons/iconmonstr-check-mark-circle-thin.svg"
        width="20"
        alt="check icon"
      />
      {{ characterName }}
    </p>
    <p v-if="favoriteListLength > 1 && favoriteListLength < maximumList">
      Você pode adicionar mais {{ maximumList - favoriteListLength }} !
    </p>
    <p class="list-full" v-if="favoriteListLength == 3">
      Equipe completa!
    </p>
    <p class="list-full" v-if="favoriteListLength > 3">
      Sua lista está cheia!! <br />A equipe recebe 3 personagens no máximo!
    </p>
    <p v-if="favoriteListLength > 3">
      Você gostaria de
      <button class="button-remove" @click="emptyFavoriteCharacterList">
        Limpar
      </button>
      sua lista?
    </p>
  </div>
</template>

<script>
export default {
  name: "SummaryFavorites",
  props: {
    favorites: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      maximumList: 3
    };
  },
  computed: {
    favoriteListLength() {
      return this.favorites.length;
    }
  },
  methods: {
    emptyFavoriteCharacterList() {
      this.$emit("eraseFavoriteCharacterList");
    }
  }
};
</script>

<style scoped>
.chosen-character {
  text-transform: capitalize;
}

.list-full {
  text-align: center;
}

.button-remove {
  margin-top: 2rem;
  padding: 0.4rem;
  width: 40%;
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
</style>
