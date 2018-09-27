<template>
  <div class="single-light full">
    <head-top headTitle = "集中器信息" goBack = "true">
        <div class="select" slot="save" @click = "popupSelect = true">多选</div>
    </head-top>
    <div class="section flex_col_left">
        <div class="font-blue padding_tb bgf" @click="addressSelect">{{checkedArea}}<i class="xiala"></i></div>
        <ul class="tab-title">
            <li v-for = "(item,index) in titList" @click = "titClick(index)" :class = "[nowIndex == index?'active':'']">{{item}}</li>
        </ul>
        <div class="scroll-box" style="flex: 1">
                <div class="con-list-sm padding padding_tb flex_between" v-for="(item,index) in poleArr[nowIndex]" @click = "goDeviceMsg(item.poleId)">
                        <div class="con-middle">
                            <div class="flex_between">
                                <div>{{item.dgmc}}</div>
                                <div>{{item.dgh}}</div>
                            </div>
                            <div class="flex_between fontsm padding_tb font-gray">供电台区{{item.zcbh}} </div>
                        </div>
                        <!-- <div class="con-right" :class="item.yxxbz == 1?'font-blue':'font-gray'">{{item.yxxbz == 1?'有效':'无效'}}</div> -->
                    </div>
                    <div class="con-list-sm padding padding_tb font-gray" v-if ="poleArr[nowIndex].length == 0">没有任何数据</div>
        </div>
    </div>
    <select-all :popupSelect = "popupSelect" @hide = "selectHide" :poleArr = "poleArr"></select-all>
    <mt-popup v-model="popupVisible" position="bottom" class="mint-popup">
        <mt-picker :slots="areaSlot" @change="AddressChange" valueKey = "xzqhmc" :showToolbar="true" :visible-item-count="5" ref="genderPicker">
            <div class="flex_between padding padding_tb">
            <a class="btn-cancel" @click="popupVisible = !popupVisible">取消</a>
            <a class="btn-sure" @click="genderConfirm">确定</a>
            </div>
        </mt-picker>
    </mt-popup>
  </div>
</template>

<script>
import headTop from '@/components/header/mainHeader'
import selectAll from './model/selectAll'
import { mapActions,mapGetters,mapMutations } from 'vuex'
import api from '../../service/data.js'
export default {
  data () {
    return {
        cityId: '',  //城市id
        popupVisible:false, //地址选择显示隐藏 
        class:'',  // 查询类别
        jdArr:'',  //地址选择二级数组
        // jdIndex:'',//地址选择二级下标
        checkedArea:'海淀区', //选择的街道
        headTitle:'单灯信息',  //头部标题
        nowIndex:0,    //tab切换下标
        titList:['物理集中器','虚拟集中器'],  //单灯信息 tab切换titlesz
        popupSelect:false,   //多选页 开关
        areaSlot: [
          {
            flex: 1,
            values: '',
            className: 'slot1',
            textAlign: 'center',
            // defaultIndex:0,
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: '',
            className: 'slot3',
            textAlign: 'center',
            valueKey:"123",
            // defaultIndex:0,
          }
        ],
        poleArr:[[],[]]
    }
  },
  computed:{
    ...mapGetters([ 'cityArr','cityIndex','quIndex','quName' ])
  },
  beforeRouteLeave (to, from, next) {
    if(to.name == 'devicemsg'){
        from.meta.isBack = true
        next()
    }else{
        from.meta.isBack = false;
        next()
    }
  },
  methods:{
    ...mapMutations([ 'SET_QUINDEX','SET_LUINDEX','SET_QUNAME','SET_CITYINDEX' ])  ,
    addressSelect(){
        let _this = this;
        _this.popupVisible = true
    },
    titClick(index){ //控制tab切换效果
        this.nowIndex = index
    },
    selectHide(val){  //控制多选页的显示隐藏
        this.popupSelect = val
    },
    goJzqMsg(poleId){  //跳转到详细息
        this.$router.push({
            // path:'/deviecmsg',
            // name:'devicemsg',
            // query: { 
            //     poleId:poleId
            // }
        })
    },
    getJzqxq(values){
        let _this = this;
        let data = {};
        data.sblx = 0;
        data.xzqhQx = values.xzqh;
        api.getJzqDdxq(data).then(function(res){
            // console.log(res)
        })
    },
    setAddress(){
        this.areaSlot[2].values = this.cityArr[this.cityIndex].qu
        this.areaSlot[0].values = this.cityArr
        this.areaSlot[0].defaultIndex = this.cityIndex
        this.areaSlot[2].defaultIndex = this.quIndex
        let values = this.$refs.genderPicker.getValues()[1]
        this.checkedArea = values.xzqhmc
        this.getJzqxq(values)
    },
    genderConfirm(){ // 城市选择确定事件
      let values = this.$refs.genderPicker.getValues()
      if(values[1] != null){
        let qName= this.$refs.genderPicker.getValues()[1].xzqhmc.substring(0,3);
        let cIndex = this.cityArr.indexOf(values[0])
        let qIndex = this.cityArr[cIndex].qu.indexOf(values[1])
        this.SET_QUNAME(qName)
        this.popupVisible = false
        this.SET_CITYINDEX(cIndex)
        this.SET_QUINDEX(qIndex)
        this.checkedArea = values[1].xzqhmc
        this.getJzqxq(values[1])
      }
      else{
        Toast('该市暂无城区，请重新选择')
      }
    },
    AddressChange(picker, values){ //地址选择 二级联动
      let index =  this.cityArr.indexOf(values[0])   //所选城市下标
      if(index != -1){
        picker.setSlotValues(1, this.cityArr[index].qu)
      }
    }
  },
  created() {
  },
  mounted(){
    this.setAddress()
  },
  components:{
      headTop,
      selectAll
  }
}
</script>

<style scoped lang = "scss">
@import '@/style/mixin.scss';
.single-light{
    background: #F9F9F9
}
.xiala{
    width: 0.4rem;
    height: 0.25rem;
    display: inline-block;
    margin-left: 0.1rem;
}
.tab-title{
    display: flex;
    background: #fff;
    li{
        padding:0.3rem 0;
        flex:1;
        border-bottom:2px solid transparent;
        transition: all .6s;
    }
    .active{
        border-bottom: 2px solid #169AFF;
        color: #169AFF
    }
}
.con-middle{
    flex: 1;
}
.con-right{
    padding-left: 0.2rem;
}
</style>
