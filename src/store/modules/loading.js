const loading = {
    state:{
        loadingSwitch:false
    },
    mutations:{
        SHOW_LOADING:(state) => {
            state.loadingSwitch = true
        },
        HIDE_LOADING:(state) => {
            state.loadingSwitch = false
        },
    },
    actions:{
        showLoading({commit}){
            commit('SHOW_LOADING')
        },
        hideLoading({commit}){
            commit('HIDE_LOADING')
        }
    }
}

export default loading