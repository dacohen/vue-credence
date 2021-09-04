import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        score: 0
    },
    mutations: {
        adjustScore: function(state, n) {
            state.score += n
        }
    }
})