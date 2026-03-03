<template>
  <div class="historique">
    <p>
      <router-link to="/"> Retour à l'accueil</router-link>
    </p>

    <!-- aucune partie jouée -->
    <div v-if="parties.length === 0" class="vide">
      <p> Aucune partie jouée pour le moment </p>
    </div>

    <div v-else class="contenu">

      <div class="section-parties">
        <h2>Dernières parties jouées</h2>

        <div class="partie" v-for="(partie, index) in partiesTriees" :key="partie.id">
          <!-- numéro de la partie - inversé pour afficher Partie 1, 2, 3... -->
          <h3>Partie {{ parties.length - index }} :</h3>
          
          <!-- date et résultat de la partie -->
          <p>{{ partie.date }} : 
            <span :class="partie.victoire ? 'victoire-text' : 'defaite-text'">
              {{ partie.victoire ? 'Victoire' : 'Defaite' }}
            </span>
          </p>
          
          <!-- mot à deviner -->
          <p>Mot à trouver : {{ partie.motSecret.toUpperCase() }}</p>
          
          <!-- tentatives et temps -->
          <p>{{ partie.tentatives }} tentatives en {{ formatTemps(partie.tempsPasse) }}</p>

        </div>
      </div>


      <div class="section-stats">
        <h2>  STATISTIQUES :</h2>
        
        <div class="stat">
          <strong>Nombre de parties jouées : {{ nombreParties }}</strong>
        </div>

        <div class="stat">
          <strong>Temps moyen de jeu :</strong>
          <p>{{ formatTemps(tempsMoyen) }}</p>
        </div>

        <!-- tentatives moyennes -->
        <div class="stat">
          <strong>Nombre de tentatives moyennes : {{ tentativesMoyennes }}</strong>
        </div>

        <!-- taux de victoires -->
        <div class="stat">
          <strong>Taux de victoires : {{ pourcentageVictoire }}%</strong>
        </div>
      </div>
        
    </div>

  </div>
</template>

<script>

export default {
  name: "Historique",

  data() {
    return {
      parties: [] // Sera rempli depuis localStorage
    };
  },

  computed: {

    // tri des parties du plus récent au plus ancien
    partiesTriees() {
      return [...this.parties].reverse();
    },

    // nombre total de parties
    nombreParties() {
      return this.parties.length;
    },
    
    // calcul du nombre moyen de tentatives
    tentativesMoyennes() {
      if (this.parties.length === 0) return 0;
      const total = this.parties.reduce((sum, p) => sum + p.tentatives, 0);
      return Math.round(total / this.parties.length);
    },
    
    // calcul du pourcentage de victoires
    pourcentageVictoire() {
      if (this.parties.length === 0) return 0;
      const victoires = this.parties.filter(p => p.victoire).length;
      return Math.round((victoires / this.parties.length) * 100);
    },

    // calcul du temps moyen 
    tempsMoyen() {
      const partiesAvecTemps = this.parties.filter(p => p.tempsPasse !== undefined);
      const total = partiesAvecTemps.reduce((sum, p) => sum + p.tempsPasse, 0);
      return Math.round(total / partiesAvecTemps.length);
    }
    
  },

  mounted() {
    // Charger les parties depuis localStorage
    this.chargerHistorique();
  },
  
  methods: {
    // charger l'historique depuis localStorage
    chargerHistorique() {
      try {
        // récupérer la chaîne JSON depuis localStorage
        const historique = localStorage.getItem("historique");
        
        // si des données existent, les parser
        if (historique) {
          this.parties = JSON.parse(historique);
          console.log("Historique chargé:", this.parties);
        } else {
          this.parties = [];
          console.log("Aucun historique trouvé");
        }
      } catch (error) {
        console.error("Erreur lors du chargement de l'historique:", error);
        this.parties = [];
      }
    }, 

    formatTemps(secondes) {
      if (!secondes) return "0 minutes 0 secondes";
      const minutes = Math.floor(secondes / 60);
      const secs = secondes % 60;
      return `${minutes} minutes ${secs} secondes`;
    }
  }
};
</script>


<style scoped>
.historique {
  padding: 30px;
  max-width: 1400px;
  margin: 0 auto;
}

.vide {
  text-align: center;
  padding: 50px;
}

.vide p {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

/* Layout en 2 colonnes */
.contenu {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
}

/* des parties (gauche) */
.parties h2 {
  font-size: 1.8rem;
  margin-bottom: 30px;
  font-weight: bold;
}

.partie {
  background-color: #fffdfa;
  padding: 10px 0px; 
}

.partie h3 {
  font-size: 1.1rem;
  margin-bottom: 5px;
}

.partie p {
  margin: 5px 0;
  font-size: 1rem;
}

.victoire-text {
  color: #4caf50;
  font-weight: bold;
}

.defaite-text {
  color: #f44336;
  font-weight: bold;
}


/* des statistiques (droite) */
.statistiques {
  padding-left: 40px;
  border-left: 2px solid #ddd;
}

.statistiques h2 {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 40px;
}

.stat {
  margin-bottom: 35px;
}

.stat strong {
  display: block;
  font-size: 1rem;
  margin-bottom: 8px;
}

.stat p {
  font-size: 1rem;
  margin: 0;
}
</style>