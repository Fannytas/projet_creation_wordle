<template>
  <div class="jeu">
    <p>
      <router-link to="/"> Retour à l'accueil</router-link>
    </p>

    <div class="chrono-container">
      <Chrono ref="chrono" @temps-ecoule="notifFinChrono"/>
    </div>

    <h2 class="tentatives">
      Nombre de tentatives restantes : 
      <span :class="{'ok': nombreTentative > 3, 'low': nombreTentative <= 3}">
        {{ nombreTentative }}
      </span>
    </h2>

    <div class="historique">
      <div v-for="(essai, index) in historique" :key="index" class="ligne">
        <span
          v-for="(lettre, i) in essai.lettres"
          :key="i"
          class="case"
          :style="{ color: essai.couleurs[i] }"
        >
          {{ lettre }}
        </span>
      </div>
    </div>


     <div class="mot-a-trouver">
      <span v-for="(lettre, index) in motJoueur" :key="index">
        {{ lettre }}
      </span>
      <span v-for="i in 5 - motJoueur.length" :key="'v'+i">
        _
      </span>
    </div>

    <div v-if="messageErreur" class="message-erreur">
      {{ messageErreur }}
    </div>


    <Keyboard
      @lettre="gererLettre"
      @enter="validerMot"
      @delete="supprimerLettre"
      :motJoueurLength="motJoueur.length"
    />

    <button  class="button-activite" id="button-abandonner" @click="abandonner">
      Abandonner
    </button>
  </div>
</template>

<script>
import Chrono from "./Chrono.vue";
import Keyboard from "./Keyboard.vue";
import axios from "axios";
import { mapMutations } from "vuex";


export default {
  name: "Jeu",
  components: { Chrono, Keyboard },

  data() {
    return {
      motSecret: "",
      motJoueur: [],
      historique: [],
      nombreTentative: 6,
      defaite: false,
      victoire: false,
      messageErreur: "",
    };
  },

  methods: {
    ...mapMutations(["SET_RESULTAT"]),

    async newWord() {
      const response = await axios.get("https://vue-project-backend-eta.vercel.app/api/new-game");
      this.motSecret = response.data.word.toUpperCase();
      console.log("MOT SECRET =", this.motSecret);
    },

    notifFinChrono() {
      this.defaite = true;
      this.finPartie();
    },

    abandonner() {
      this.defaite = true;
      this.finPartie();
    },

    gererLettre(lettre) {
      if (this.motJoueur.length < 5) {
        this.motJoueur.push(lettre);
      }
    },

    supprimerLettre() {
      this.motJoueur.pop();
    },

    verifierMot() {
      return this.motJoueur.length === 5;
    },

    toucheClavier(e) {
      const key = e.key.toUpperCase();
      //Lettre A-Z
      if (/^[A-Z]$/.test(key)) {
        if (this.motJoueur.length < 5) {
          this.motJoueur.push(key);
        }
        return;
      }

      // Supprimer
      if (key === "BACKSPACE") {
        this.supprimerLettre();
        return;
      }

      // Valider
      if (key === "ENTER") {
        this.validerMot();
        return;
      }
    },

    async motFrancais(mot) {
      const response = await axios.post( "https://vue-project-backend-eta.vercel.app/api/check-word",
      { word: mot.toLowerCase() }
      );
      console.log(mot);
      console.log("Réponse API :", response.data);
      return response.data.isWord;
    },

    perdreTentative() {
      this.nombreTentative--;
      if (this.nombreTentative === 0) {
        this.defaite = true;
        this.finPartie();
      }
      this.motJoueur = [];
    },

    verifierLettres(mot, motSecret) {
      const resultat = Array(mot.length).fill("red");
      const secretRestant = motSecret.split("");

      // lettres bien placées
      for (let i = 0; i < mot.length; i++) {
        if (mot[i] === motSecret[i]) {
          resultat[i] = "green";
          secretRestant[i] = null; 
        }
      }

      //lettres mal placées
      for (let i = 0; i < mot.length; i++) {
        if (resultat[i] === "green") continue;

        const index = secretRestant.indexOf(mot[i]);
        if (index !== -1) {
          resultat[i] = "yellow";
          secretRestant[index] = null;
        }
      }

      return resultat;
    },

    async validerMot() {
      if (!this.verifierMot()) return;

      const mot = this.motJoueur.join("");
      
      const estFrancais = await this.motFrancais(mot.toLowerCase());

      if (!estFrancais) {
        console.error("Mot non français !");
        this.messageErreur  = "Le mot n'est pas dans le dictionnaire."; 
        this.motJoueur = [];
        return; // on ne perd pas de tentative
      }
      this.messageErreur = ""; // Réinitialiser le message d'erreur si le mot est valide

      const couleurs = this.verifierLettres(mot, this.motSecret);

      // Ajoute au tableau d’historique pour affichage
      this.historique.push({
        lettres: mot.split(""),
        couleurs
      });

      if (mot === this.motSecret) {
        console.log("victoire")
        this.victoire = true;
        this.finPartie();
      } else {
        this.perdreTentative();
      }
    },

    finPartie() {
      console.log("Debut fin de partie");
      // AJOUT À L’HISTORIQUE
      const historique = JSON.parse(localStorage.getItem("historique") || "[]");
      const tempsRestant = this.$refs.chrono.getTempsRestant();
      const tempsPasse = 600 - tempsRestant;


      historique.push({
        motSecret: this.motSecret,
        victoire: this.victoire,
        defaite: this.defaite,
        tentatives: 6 - this.nombreTentative,
        date: new Date().toLocaleString(),
        tempsPasse : tempsPasse
      });
      console.log("Historique mis à jour");

      localStorage.setItem("historique", JSON.stringify(historique));

      this.SET_RESULTAT({
        victoire: this.victoire,
        tempsPasse,
        tentatives: 6 - this.nombreTentative,
        date: new Date().toLocaleString()
      });

      console.log("Resultat enregistré.");
      // ROUTER VERS LA PAGE RESULTAT
      this.$router.push({
        name: "Resultat",
        query: {
          victoire: this.victoire,
          defaite: this.defaite,
          mot: this.motSecret
        }
      });
      console.log("Fin de la partie, redirection vers Résultat.");
    }
  },

  mounted() {
    this.newWord();
    window.addEventListener("keydown", this.toucheClavier);
  },

  beforeUnmount() {
    window.removeEventListener("keydown", this.toucheClavier);
  },
};
</script>

// Quand chrono fini on nombre tentatives max ajouter jeu à l'historique et affiche Resultat defaite ou victoire
<style scoped>
.jeu {
  width: 100%;
  height: 100vh;
  position: relative;
  padding: 10px;
}

.retour {
  position: absolute;
  top: 20px;
  left: 20px;
}

.btn-retour {
  padding: 6px 10px;
  border: 1px solid #666;
  border-radius: 6px;
  background: white;
}

.chrono-container {
  position: absolute;
  top: 20px;
  right: 40px;
  font-size: 24px;
  font-family: monospace;
}

.tentatives {
  margin-top: 50px;
  font-size: 24px;
}

.ok { color: green; }
.low { color: red; }

.mot-a-trouver {
  font-size: 40px;
  letter-spacing: 15px;
  margin: 40px 0;
}

.keyboard-zone {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

#button-abandonner {
  margin-top: 40px;
  padding: 10px 18px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  border: 1px solid #ddd;
  cursor: pointer;
  background-color: white; 
  transition: background-color 0.2s, transform 0.1s;
}

#button-abandonner:hover {
  background-color: #cfcfcf; 
}

.historique {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; /* centre horizontalement */
}

.ligne {
  display: flex;
  gap: 10px;
  margin-bottom: 8px;
}

.case {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
}

.message-erreur {
  color: red;
  font-weight: bold;
  margin: 10px 0;
  text-align: center;
}


</style>
