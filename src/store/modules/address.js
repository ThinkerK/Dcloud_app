import api from '../../service/data.js'

const address = {
    state:{
        cityIndex:0, //选择城市下标
        cityArr:[
                    {'index':'1101','xzqhmc':'北京市','qu':[]},
                    {'index':'1201','xzqhmc':'天津市','qu':[]}
                ],
        quIndex:0,  //选择区的下标
        quName:'海淀区',  //区名称
        luIndex:0, //地址选择二级（街道下标）
    },
    mutations:{
        SET_CITYARR: (state,cityObj) => {
            state.cityArr.filter(item => item.index == cityObj.cityIndex)[0].qu = cityObj.qu
        },
        SET_CITYINDEX: (state,index) => {
            state.cityIndex = index
        },
        SET_QUINDEX: (state,index) => {
            state.quIndex = index
        },
        SET_QUNAME: (state,index) => {
            state.quName = index
        },
        SET_LUINDEX: (state,index) => {
            state.luIndex = index
        },
    },
    actions:{
        async getCityArr( {commit} , cityId ) {
            let res = await api.getAddressList(cityId);
            let cityObj = {
                qu: JSON.parse(res.qu),
                cityIndex: cityId.city
            }
            commit('SET_CITYARR', cityObj)
        },
    }
}

export default address