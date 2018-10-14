<template>
  <div class="light-switch full">
    <head-top headTitle = "全区开关灯" goBack = "true">
      <div slot="back" style="width: 0.5rem"></div>
      <div slot="save" class="address" @click = "popupVisible = true">{{quName}}<i></i></div>
    </head-top>
    <div class="section scroll-box">
      <div :class="lightState == 'on'?'light-on':'light-off'"></div>
      <div class="count">
        <div style="font-size: 0.6rem;color: #fff">{{searchResult.length}}</div>
        <div>设备总数</div> 
      </div>
      <div class="chart-list flex_between">
        <div class="count"></div>
        <div class="count"></div>
        <div class="count"></div>
      </div>
      <div class="switch-box">
        <div class="switch-btn" @click = "switchClick">{{lightState == 'on' ?'关灯':'开灯'}}</div>
      </div>
    </div>
    <mt-popup v-model="popupVisible" position="bottom" class="mint-popup">
        <mt-picker :slots="areaSlot"  @change = "AddressChangea" :showToolbar="true" :visible-item-count="5" valueKey = "xzqhmc" ref="genderPicker">
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
import { Toast,Popup,Picker,MessageBox  } from 'mint-ui'
import { mapState,mapActions,mapGetters,mapMutations } from 'vuex'
import api from '../../service/data.js'


export default {
  data () {
    return {
      popupVisible:false, //地址选择开关
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
      lightState:'off',
      xzqh:''  ,//行政区号
      searchResult:'',//
    }
  },
  computed:{
    ...mapGetters([ 'cityArr','cityIndex','quIndex','quName' ])
  },
  methods:{
    ...mapMutations([ 'SET_CITYINDEX','SET_QUINDEX','SET_QUNAME' ]),
    genderConfirm(){ // 城市选择确定事件
      let values = this.$refs.genderPicker.getValues()
      console.log(values[1])
      if(values[1] != null){
        let qName= this.$refs.genderPicker.getValues()[1].xzqhmc.substring(0,3);
        let cIndex = this.cityArr.indexOf(values[0])
        let qIndex = this.cityArr[cIndex].qu.indexOf(values[1])
        this.SET_QUNAME(qName)
        this.popupVisible = false
        this.SET_CITYINDEX(cIndex)
        this.SET_QUINDEX(qIndex)
        this.xzqh = values[1].xzqh
        this.getDdList()
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
      this.xzqh = values[1]?values[1].xzqh:''
    },
    switchClick(){
      if(this.lightState == 'on'){
        MessageBox.confirm('',{
          message: '当前状态为【打开】是否【关闭】',
          showCancelButton: true
        })
        .then(action => { 
          if (action == 'confirm') {     //确认的回调
            this.lightState = 'off' 
          }
        })
        
      }else{
        MessageBox.confirm('',{
          message: '当前状态为【关闭】是否【打开】',
          showCancelButton: true
        })
        .then(action => { 
          if (action == 'confirm') {     //确认的回调
            this.lightState = 'on' 
          }
        })
      }
    },
    getDdList(){  //获取该区的单灯
        let _this = this
        let data = {};
        data.sblx = 1;
        data.xzqhQx = this.xzqh
        data.dgh = ''
        api.getJzqDdxq(data).then(function(res){
            _this.searchResult = res.data
        })
      },
  },
  mounted() {
    this.areaSlot[2].values = this.cityArr[this.cityIndex].qu
    this.areaSlot[0].values = this.cityArr
    this.areaSlot[0].defaultIndex = this.cityIndex
    this.areaSlot[2].defaultIndex = this.quIndex
    this.xzqh = this.cityArr[this.cityIndex].qu[this.quIndex].xzqh
    this.getDdList()
  },
  components:{
    headTop
  }
}
</script>

<style scoped lang = "scss">
@import '@/style/mixin.scss';
.head_goback{
  width: 1.5rem;
}
.address{
  font-size: 0.42rem;
  i{
    @include wh(0.4rem,0.25rem)
    display: inline-block;
    margin-left:0.1rem;
    @include bg('../../images/common/xiala.png')
  } 
}
.section{
  background:linear-gradient(180deg,rgba(18,32,67,1),rgba(63,121,169,1));
  .light-on{
    transition: background-image 1.8s linear;
    @include wh(100%,9.5rem)
    @include bg('../../images/common/lighton.png')
  }
  .light-off{
    transition: background-image 1.8s linear;
    @include wh(100%,9.5rem)
    @include bg('../../images/common/lightoff.png')
  }
  .chart-list{
    @include wh(100%,auto)
    padding: 0.35rem 0.7rem;
    .count{
      @include wh(2.34rem,2.34rem)
      background: rgba(0,0,0,0.2);
      border-radius: 50%;
    }
  }
  .switch-box{
    padding: 0.2rem;
    border-radius:50%;
    margin:auto;
    display: inline-block;
    background: rgba(0,0,0,0.2);
    @include sc(0.52rem,#fff);
    line-height:2.54rem;
    .switch-btn{
      background:linear-gradient(-30deg,rgba(52,113,214,1),rgba(97,192,232,1));
      border-radius:50%;
      @include wh(2.54rem,2.54rem);
    }
  }
}
</style>
