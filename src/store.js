import {createStore} from 'vuex'

export const store = createStore({
    state() {
       dernierResultat: null
    },
    getters: {
        dernierResultat: (state) => state.dernierResultat
    },

    mutations: {
       SET_RESULTAT(state, resultat) {
        state.dernierResultat = resultat;
    }
    },
})
