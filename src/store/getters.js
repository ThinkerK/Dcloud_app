const getters = {
    cityArr: state => state.address.cityArr,    //城市列表
    cityIndex: state => state.address.cityIndex, //选择城市的下标
    quIndex: state => state.address.quIndex,     //选择区的下标
    quName: state => state.address.quName,      //区的名称
    loadingSwitch : state => state.loading.loadingSwitch,  //loading开关
    luIndex: state => state.address.luIndex,    //(街道下标)
}

export default getters
