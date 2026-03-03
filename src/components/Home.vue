<template>
  <div class="home-container">

    <!-- Bloc infos à gauche -->
    <div class="infos">
      <p>Barcelo Fanny</p>
      <p>Veronika Radionova</p>
      <p>TPA51</p>
    </div>

    <!-- Logo centré -->
    <img
      src="/images/logomocha.png" 
      class="logo-img"
    />

    <!-- Contenu central -->
    <div class="centre">
      <h1>Bienvenue</h1>

      <p class="dernier">
      Dernière partie jouée :
      <span v-if="!dernierResultat" class="aucune">
        Aucune
      </span>
      <span v-else :class="dernierResultat.victoire ? 'victoire' : 'defaite'">
        {{ dernierResultat.victoire ? "Victoire" : "Défaite" }}
      </span>
    </p>

      <router-link to="/Historique">
        <button id="btn-historique" class="btn">Voir l'historique</button>
      </router-link>

      <router-link to="/jeu">
        <button id="btn-lancer-partie" class="btn">Démarrer une nouvelle partie</button>
      </router-link>
    </div>

  </div>

</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapGetters(["dernierResultat"])
  }
};

</script>

<style scoped>
.home-container {
  width: 100%;
  height: 100vh;
  padding: 20px;
  position: relative;
}

.infos {
  position: absolute;
  top: 20px;
  left: 20px;
  text-align: left;
  line-height: 1.4;
}

.logo-img {
  width: 250px;
  height: auto;
  object-fit: contain;
}


.centre {
  text-align: center;
  margin-top: 10px;
}

.aucune {
  color: black;
}

.victoire {
  color: green;
  font-weight: bold;
}

.defaite {
  color: red;
  font-weight: bold;
}

.btn {
  margin-top: 15px;
  padding: 10px 18px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 10px;
  border: 1px solid #ddd;
  cursor: pointer;
  background-color: white;
  transition: background-color 0.2s, transform 0.1s;
}

.btn:hover {
  background-color: #cfcfcf;
}

.start {
  margin-top: 25px;
}
</style>
