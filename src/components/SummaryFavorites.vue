<template>
  <div class="favorites-list">
    <h2>Sua equipe:</h2>

    <p v-if="favoriteListLength < maximumList && !saved">
      Adicione até 3 personagens
    </p>
    <div class="m-1 chosen-character">
      <p
        v-for="characterName in favorites"
        :key="characterName.id"
      >
        <img
          src="../assets/Icons/iconmonstr-check-mark-circle-thin.svg"
          width="20"
          alt="check icon"
        />
        {{ characterName }}
      </p>
    </div>
    <div>
      <p v-if="favoriteListLength > 1 && favoriteListLength < maximumList">
        Você pode adicionar mais {{ maximumList - favoriteListLength }} !
      </p>
      <p class="list-full" v-if="favoriteListLength == 3">
        Equipe completa!
      </p>
    </div>
    <div class="my-equip" v-if="favoriteListLength == 3">
      <p>
        Você deseja enviar esta equipe?
      </p>
      <button class="button-remove" @click="saveFavoriteCharacterList(favorites)">
        Enviar
      </button>
    </div>
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
import { mapActions, mapGetters} from "vuex";

export default {
  name: "SummaryFavorites",
  props: {
    favorites: {
      type: Array,

    }
  },
  data() {
    return {
      maximumList: 3,
    };
  },
  computed: {
        ...mapGetters({
      favoriteListLength: 'getFavoriteListLength'
    })
  }, 
  methods: {
    emptyFavoriteCharacterList() {
      this.$emit("eraseFavoriteCharacterList");
    },
    ...mapActions({
      saveFavoriteCharacterList: 'saveFavoriteCharacterList'
      })
  }
  }
</script>

<style scoped>
h2 {
  margin-top: 1rem;
}

.chosen-character {
  text-transform: capitalize;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.list-full {
  margin-top: 1rem;
  text-align: center;
}

.button-remove {
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

.m-1 {
  margin: 0.5rem 0 0.5rem;
}

.my-equip {
  margin-top: 1rem;
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
