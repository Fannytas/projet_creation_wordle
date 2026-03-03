import { createWebHistory, createRouter } from "vue-router";
import Home from "@/components/Home.vue";
import Jeu from "@/components/Jeu.vue";
import Resultat from "@/components/Resultat.vue";
import Historique from "@/components/Historique.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Jeu",
    name: "Jeu",
    component: Jeu,
  },
  {
    path: "/Resultat",
    name: "Resultat",
    component: Resultat,
  },
  {
    path: "/Historique",
    name: "Historique",
    component: Historique,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
