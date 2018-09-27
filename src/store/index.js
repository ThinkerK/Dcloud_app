import Vue from 'vue'
import Vuex from 'vuex'
import address from './modules/address'
import getters from './getters'
import loading from './modules/loading'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        address,
        loading
    },
    getters
})

export default store

