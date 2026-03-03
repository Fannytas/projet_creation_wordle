<template>
    <div class="resultat">
        <div v-if="victoire" class="victoire">
            <h1> Victoire ! </h1>
        </div>

        <div v-else class="defaite">
            <h1> Défaite... </h1>
        </div>

        <div class="actions">
            <router-link to="/">⬅ Retour à l'accueil</router-link>
        </div>
    </div>
</template>


<script>
export default {
    name: "Resultat",

    // récupération des données depuis query params (envoyées par Jeu.vue)
    computed: {
        victoire() {
            return this.$route.query.victoire === 'true';
        },
    
        defaite() {
            return this.$route.query.defaite === 'true';
        },
    
        mot() {
            return this.$route.query.mot || '';
        }
  },

    // execution automatique après l'affichage de la page
    mounted() {
        console.log("Page Resultat chargée");
        console.log("Victoire:", this.victoire);
        console.log("Défaite:", this.defaite);
        console.log("Mot:", this.mot);
    
    // les données sont déjà sauvegardées dans localStorage par Jeu.vue
    // dans la méthode finPartie(), donc pas besoin de le refaire ici
    }
}
</script>

<style scoped>
.resultat {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 200px;

}

.victoire h1,
.defaite h1 {
  font-size: 4rem;
  text-align: center;
  margin-bottom: 50px;
}

.victoire h1 {
  color: #4caf50;  /* Vert pour victoire */
}

.defaite h1 {
  color: #f44336;  /* Rouge pour défaite */
}

.actions {
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 400px;
}

.actions a {
  text-decoration: none;
  width: 100%;
}

.actions button {
  width: 100%;
  padding: 18px 40px;
  font-size: 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  background-color: #2196f3;
  color: white;
}

.actions button:hover {
  background-color: #0b7dda;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
