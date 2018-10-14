import Vue from 'vue'
import Vuex from 'vuex'
import address from './modules/address'
import getters from './getters'
import loading from './modules/loading'
import user from './modules/user'


Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        address,
        loading,
        user
    },
    getters
})

export default store

