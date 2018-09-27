<template>
  <div class="single-light full">
    <head-top :headTitle = "headTitle" goBack = "true">
        <div class="select" slot="save" @click = "popupSelect = true">多选</div>
    </head-top>
    <div class="section flex_col_left">
        <div class="font-blue padding_tb bgf" @click="popupVisible = true">{{checkedArea}}<i class="xiala"></i></div>
        <ul class="tab-title">
            <li v-for = "(item,index) in titList" @click = "titClick(index)" :class = "[nowIndex == index?'active':'']">{{item}}</li>
        </ul>
        <div class="scroll-box" style="flex: 1">
            <div class="con-list-sm padding padding_tb flex_between" v-for="(item,index) in poleArr[nowIndex]" @click = "goDeviceMsg(item.poleId)">
                <div class="con-middle">
                    <div class="flex_between">
                        <div>{{item.dgmc}}</div>
                        <div>灯杆号：{{item.dgh}}</div>
                    </div>
                    <div v-if= "nowIndex == 0">
                        <div class="flex_between fontsm padding_tb font-gray">灯杆管理器地址：{{item.zcbh}} </div>
                        <div class="flex_between fontsm font-gray">用电管理器地址：{{item.zcbh}} </div>
                    </div>
                    <div v-if= "nowIndex == 1">
                        <div class="flex_between fontsm padding_tb font-gray">单灯控制器地址：{{item.ddkzqId}} </div>
                    </div>
                    <div v-if= "nowIndex == 2">
                        <div class="flex_between fontsm padding_tb font-gray">时控器编号：{{item.zcbh}} </div>
                    </div>
                </div>
                <div class="con-right" :class="item.yxxbz == 1?'font-blue':'font-gray'">{{item.yxxbz == 1?'有效':'无效'}}</div>
            </div>
            <div class="con-list-sm padding padding_tb font-gray" v-if ="poleArr[nowIndex].length == 0">没有任何数据</div>
        </div>
    </div>
    <select-all :popupSelect = "popupSelect" @hide = "selectHide" :poleArr = "poleArr[nowIndex]" :nowIndex = "nowIndex"></select-all>
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
        qu:'',//区
        cityId: '',  //城市id
        popupVisible:false, //地址选择显示隐藏 
        class:'',  // 查询类别
        jdArr:'',  //地址选择二级数组
        // jdIndex:'',//地址选择二级下标
        checkedArea:'信息路', //选择的街道
        headTitle:'单灯信息',  //头部标题
        nowIndex:0,    //tab切换下标
        titList:['光纤','WPLC','时控器'],  //单灯信息 tab切换titlesz
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
        poleArr:[[],[],[]]
    }
  },
  computed:{
    ...mapGetters(['quIndex','quName','luIndex' ])
  },
//   beforeRouteLeave (to, from, next) {
//     if(to.name == 'devicemsg'){
//         from.meta.isBack = true
//         next()
//     }else{
//         from.meta.isBack = false;
//         next()
//     }
//   },
  methods:{
    ...mapMutations([ 'SET_QUINDEX','SET_LUINDEX','SET_QUNAME' ])  ,
    addressSelect(){
        let _this = this;
        _this.popupVisible = true
        _this.$refs.genderPicker.setSlotValues(0,this.jdArr)
    },
    titClick(index){ //控制tab切换效果
        this.nowIndex = index
    },
    selectHide(val){  //控制多选页的显示隐藏
        this.popupSelect = val
    },
    goDeviceMsg(poleId){  //跳转到详细息
        this.$router.push({
            path:'/deviecmsg',
            name:'devicemsg',
            query: { 
                poleId:poleId
            }
        })
    },
    AddressChange(picker, values){ //地址选择 二级联动
        if(values[0]){
            let xzqh = values[0].xzqh
            let jdArr = this.jdArr
            let newJd = jdArr.filter((item)=>{return item.sjqhm == xzqh})
            picker.setSlotValues(1,newJd);
        }
    },
    genderConfirm(){   //地址选择 确定
        let values = this.$refs.genderPicker.getValues()
        let xzqh = values[0].xzqh
        let qName = values[0].xzqhmc.substring(0,3);
        let qIndex = this.qu.indexOf(values[0])
        let lIndex = this.jdArr.filter((item)=>{return item.sjqhm == xzqh}).indexOf(values[1])
        this.SET_QUINDEX(qIndex)
        this.SET_LUINDEX(lIndex)
        this.SET_QUNAME(qName)
        this.checkedArea = values[1].xzqhmc
        this.popupVisible = false
        this.getDdxq(values[1])
    },
    newlist(arr,mc){    //台区筛选
        for(let i = 0;i<arr.length;i++){
            arr[i].xzqhmc = arr[i][mc]
        }
        return arr
    },
    getDdxq(values){
        let _this = this
        let data = {};
        data.sblx = 1;
        if(values.ldbId){
            data.ldbIds = values.ldbId
        }
        if(!values.ldbId && values.xzqh){
            data.xzqhs = values.xzqh
        }
        if(values.jjxId){
            data.jjxIds = values.jjxId
        }
        api.getJzqDdxq(data).then(function(res){
            let gx = res.data.filter((item)=>{return item.txfs == '光纤'})
            let wplc = res.data.filter((item) => {return item.txfs == 'WPLC'})
            let skq = res.data.filter((item) => {return item.txfs == '时控器'})
            _this.poleArr = [gx,wplc,skq]
        })
    },
    setAddress(){  //设置地址picker
        let _this = this
        let xzqh = _this.qu[_this.quIndex].xzqh
        _this.areaSlot[0].values = _this.qu
        _this.areaSlot[2].values = _this.jdArr
        _this.areaSlot[0].defaultIndex = _this.quIndex
        _this.areaSlot[2].defaultIndex = _this.luIndex
        let values = this.jdArr.filter((item)=>{return item.sjqhm == xzqh})[this.luIndex]
        this.checkedArea = values.xzqhmc
        _this.getDdxq(values)
        
    },
    getAddress(){   //设定初始的地址选择
        let _this = this
        this.class = this.$route.query.class;
        this.cityId = this.$route.query.cityId;
        let cityQu = {
            czrbh:'0016FnI00005',
            city:this.cityId
        }
        if(this.class == '街道'){
            api.getAddressList(cityQu).then(function(res){
                _this.qu = JSON.parse(res.qu)
                _this.jdArr = JSON.parse(res.jd)
                _this.setAddress()
            })
        }
        if(this.class == '台区'){
            api.getLdbList(cityQu).then(function(res){
                _this.qu = JSON.parse(res.qu)
                _this.jdArr = _this.newlist(JSON.parse(res.ldb),'ldbmc')
                _this.setAddress()
            })
        }
        if(this.class == '交接箱'){
            api.getJjxList(cityQu).then(function(res){
               _this.qu = JSON.parse(res.qu)
               _this.jdArr = _this.newlist(JSON.parse(res.jjx),'jjxmc')
               _this.setAddress()
            })
        }
    }
  },
  created() {
  },
  mounted(){
    this.getAddress()
  },
  components:{
      headTop,
      selectAll
  },
  activated() { //keepalive 钩子
      if(!this.$route.meta.isBack){
        // this.setAddress()
      }else{
        console.log('不刷新页面')
      }
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
