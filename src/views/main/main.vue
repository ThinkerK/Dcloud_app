<template>
  <div class="main">
    <head-top scanBtn = 'true' style="background: none">
      <div slot="address" class="select-area flex_between" @click="popupVisible = true">{{quName}}<i class="xiala"></i></div>
      <div slot="head_search" class="form-ipt flex_between">
        <input type="text" placeholder=" 请输入灯杆号" @click = "popupSearch = true">
      </div>
    </head-top>
    <div class="head-bg">
      <div class="head-wrap">
        <div class="head-pic"></div>
        <div class="name">{{userInfo.userName}}</div>
      </div>
    </div>
    
    <section class="flex_between">
        <div class="section-title flex_between">范围搜索</div>
      <div class="sec-item" v-for = "(item,index) in sectionList" :key="index" @click = "model(index)">
        <div class="icon" :class = "item.icon"></div>
        <div class="text" >{{item.name}}</div>
      </div>
    </section>
    <mt-popup v-model="popupVisible" position="bottom" class="mint-popup">
      <mt-picker :slots="areaSlot" @change = "AddressChangea" :showToolbar="true" :visible-item-count="5" valueKey = "xzqhmc" ref="genderPicker">
        <div class="flex_between padding padding_tb">
          <a class="btn-cancel" @click="popupVisible = !popupVisible">取消</a>
          <a class="btn-sure" @click="genderConfirm">确定</a>
        </div>
      </mt-picker>
    </mt-popup>
    <search-pop :popupSearch = "popupSearch" :xzqh = "xzqh" @searchHide = "searchHide"></search-pop>
  </div>
  
</template>

<script>
import api from '../../service/data.js'
import { Toast,Popup,Picker } from 'mint-ui'
import headTop from '@/components/header/mainHeader'
import searchPop from '@/components/header/search'
import { mapState,mapActions,mapGetters,mapMutations } from 'vuex'
export default {
  data () {
    return {
      
      xzqh:'110108',//行政区划
      cityId:'', // 城市ID 1101 1201
      popupSearch:false,   //搜索框 开关
      popupVisible:false,   //城市选择 开关
      areaSlot:[{          //城市选择  picker
        flex:1,
        className:'slot1',
        values:'',
      },{
        divider: true,
        content: '-',
        className: 'slot2'
      }, {
        flex: 1,
        values: '',
        className: 'slot3',
        textAlign: 'center'
      }],//地址下拉链表
      sectionList:[{'name':'街道','icon':'jiedao'},{'name':'台区','icon':'taiqu'},{'name':'集中器','icon':'jizhongqi'},{'name':'交接箱','icon':'jiaojiexiang'},{'name':'组别','icon':'zubei'},{'name':'区县','icon':'quxian'},{'name':'添加','icon':'tianjia'}],//搜索不同模块
    }
  },
  computed:{
    ...mapGetters([ 'cityArr','cityIndex','quIndex','quName','userInfo' ])
  },
  methods: {
    ...mapMutations([ 'SET_CITYINDEX','SET_QUINDEX','SET_QUNAME','SET_LUINDEX' ]),
    model(index){  //跳到单灯链表页
      if(index != this.sectionList.length-1){
        if(index == 5){
          this.$router.push({
            path: '/lightswitch',
            name:'lightswitch',
          })
        }else if(index == 2){
          this.$router.push({
            path: '/jzqmsg',
            name:'jzqmsg',
            query:{
              cityId:this.cityId
            }
          })
        }else if(index == 6){
          Toast('暂不支持')
        }else if(index == 7){
          Toast('暂不支持')
        }else{
          this.$router.push({
            path: '/singlelightmsg',
            name:'singlelightmsg',
            query: { 
              class:this.sectionList[index].name,
              cityId:this.cityId
              // areaIndex:Object.keys(address).indexOf(this.$refs.genderPicker.getValues()[0])
            }
          })
        }
      }else{
        Toast('暂不支持')
      }
      
    },
    searchHide(val){ //点击取消 关闭搜索页面
      this.popupSearch = val
    },
    genderConfirm(){ // 城市选择确定事件
      let values = this.$refs.genderPicker.getValues()
      if(values[1] != null){
        let qName= this.$refs.genderPicker.getValues()[1].xzqhmc.substring(0,3);
        let cIndex = this.cityArr.indexOf(values[0])
        let qIndex = this.cityArr[cIndex].qu.indexOf(values[1])
        this.cityId = values[0].index
        this.SET_QUNAME(qName)
        this.popupVisible = false
        this.SET_CITYINDEX(cIndex)
        this.SET_QUINDEX(qIndex)
        this.xzqh = values[1].xzqh
      }
      else{
        Toast('该市暂无城区，请重新选择')
      }
    },
    AddressChangea(picker, values){ //地址选择 二级联动
      let index =  this.cityArr.indexOf(values[0])   //所选城市下标
      if(index != -1){
        picker.setSlotValues(1, this.cityArr[index].qu)
      }
    }
  },
  components: {
    headTop,
    searchPop
  },
  watch: {
  },
  created() {
  },
  mounted() { 
    let _this = this
    if(this.cityArr[0].qu.length == 0 ){ //判断  如果没有store 请求获取 区的列表
      let _this =this
      let city1 = {
        czrbh:this.userInfo.userId,
        city:1101
      } 
      api.getAddressList(city1).then(function(res){
        _this.areaSlot[2].values = JSON.parse(res.qu)
        _this.areaSlot[2].defaultIndex = _this.quIndex
        _this.xzqh = res.qu[0].xzqh
      })
    }else{  //store 存在   直接赋值
      this.areaSlot[2].values = this.cityArr[this.cityIndex].qu
      _this.areaSlot[2].defaultIndex = _this.quIndex
      this.xzqh = this.areaSlot[2].values[this.quIndex].xzqh
    }
    this.areaSlot[0].values = this.cityArr  //城市列
    this.cityId = this.cityArr[this.cityIndex].index
    this.areaSlot[0].defaultIndex = this.cityIndex 
    this.SET_LUINDEX(0)
  },
}
</script>

<style scoped lang="scss">
@import '@/style/mixin.scss';
.select-area {
  @include sc(0.52rem,white)
  height: 100%;
  i{
    @include wh(0.4rem,0.25rem)
    display: inline-block;
    margin-left:0.1rem;
  } 
}
.head-bg{
  @include bg('../../images/main/bg.png')
  @include wh(100%,5.33rem)
}
.form-ipt{
  @include wh(7rem,100%)
  padding-left: 0.2rem;
  position: relative;
}
.head-wrap{
  @include wh(1.55rem,auto)
  @include cl()
  top:2.22rem;
  .name{
    @include sc(0.42rem,#fff)
    margin-top: 0.3rem;
    text-align:center
  }
}
.head-pic{
  @include wh(1.55rem,1.55rem)
  @include bg('../../images/main/tx.png')
  border-radius: 50%;
}
.section-title{
  @include wh(100%,auto)
  background:rgba(241,241,241,1);
  @include sc(0.48rem,#000)
  padding:0.3rem;
}

section{
  flex-wrap: wrap;
  .sec-item{
    @include wh(1.27rem,auto)
    margin:1.13rem 1.16rem 0 1.17rem;
    .icon{
      @include wh(1.27rem,1.30rem)
      display: inline-block
    }
    .text{
      margin: 0.23rem 0;
      width: 2.2rem;
      margin-left: -0.45rem;
    }
  }
}
.jiedao{
  @include bg('../../images/main/jd.png')
}
.taiqu{
  @include bg('../../images/main/tq.png')
}
.jizhongqi{
  @include bg('../../images/main/jzq.png')
}
.jiaojiexiang{
  @include bg('../../images/main/jjx.png')
}
.zubei{
  @include bg('../../images/main/zb.png')
}
.quxian{
  @include bg('../../images/main/qx.png')
}
.tianjia{
  @include bg('../../images/main/tj.png')
}

.xiala{
  @include bg('../../images/common/xiala.png')
}
.ycsj{
  @include bg('../../images/common/ycsj.png')
}
.xfjl{
  @include bg('../../images/common/xfjl.png')
}


.form-ipt::before{
    content: '';
    display: inline-block;
    width: 0.52rem;
    height: 0.52rem;
    position: absolute;
    left: 0.4rem;
    background: url('../../images/common/search.png') 100% no-repeat;
    background-size:100%; 
}
</style>
