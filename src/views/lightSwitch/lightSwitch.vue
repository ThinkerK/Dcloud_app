<template>
  <div class="light-switch full">
    <loading v-if="loadingShow"></loading>
    <head-top headTitle="全区开关灯" goBack="true">
      <div slot="back" style="width: 0.5rem"></div>
      <div slot="save" class="address" @click="popupVisible = true">{{quName}}
        <i></i>
      </div>
    </head-top>
    <div class="section scroll-box">
      <div :class="lightState == 'on'?'light-on':'light-off'"></div>
      <div class="count">
        <div style="font-size: 0.6rem;color: #fff">{{searchResult.length}}</div>
        <div>设备总数</div>
      </div>
      <div class="chart-list flex_between">
        <div class="count">
            <progress-bar data="77" procolor="#FEE578">
                <div slot="titcon">
                    <div style="font-size: 0.48rem">
                        355
                    </div>
                    <div style="font-size: 0.32rem">
                       成功数
                    </div>
                </div>
            </progress-bar>
        </div>
        <div class="count"><progress-bar data="23" procolor="#2256E5">
            <div slot="titcon">
                <div style="font-size: 0.48rem">
                    32
                </div>
                <div style="font-size: 0.32rem">
                   失败数
                </div>
            </div>
        </progress-bar></div>
        <div class="count"><progress-bar data="77" procolor="#169AFF">
            <div slot="titcon">
                <div style="font-size: 0.48rem">
                    77%
                </div>
                <div style="font-size: 0.32rem">
                   成功率
                </div>
            </div>
        </progress-bar></div>
      </div>
      <div class="switch-box">
        <div class="switch-btn" @click="switchClick">{{lightState == 'on' ?'关灯':'开灯'}}</div>
      </div>
    </div>
    <mt-popup v-model="popupVisible" position="bottom" class="mint-popup">
      <mt-picker :slots="areaSlot" @change="AddressChangea" :showToolbar="true" :visible-item-count="5" valueKey="xzqhmc" ref="genderPicker">
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
  import { Toast, Popup, Picker, MessageBox } from 'mint-ui'
  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
  import api from '../../service/data.js'
  import xunce from '../../service/xunce.js'
  import loading from '@/components/loading/loading'
  import F2 from '@antv/f2'


  export default {
    data() {
      return {
        quName: '',
        popupVisible: false, //地址选择开关
        areaSlot: [{          //城市选择  picker
          flex: 1,
          className: 'slot1',
          values: '',
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: '',
          className: 'slot3',
          textAlign: 'center'
        }],//地址下拉链表
        lightState: 'off',
        xzqh: '',//行政区号
        searchResult: '',//
        loadingShow: false,
        ddkzqIdArr: [],
        sCount:0,   //成功数
        fCount:0 ,  //失败数
        zhaoceData:[]
      }
    },
    computed: {
      ...mapGetters(['cityArr', 'cityIndex', 'quIndex', 'userInfo'])
    },
    methods: {
      ...mapActions(['login']),
      ...mapMutations(['SET_CITYINDEX', 'SET_QUINDEX', 'SET_QUNAME']),
      genderConfirm() { // 城市选择确定事件
        let values = this.$refs.genderPicker.getValues()
        if (values[1] != null) {
          let qName = this.$refs.genderPicker.getValues()[1].xzqhmc.substring(0, 3);
          let cIndex = this.cityArr.indexOf(values[0])
          let qIndex = this.cityArr[cIndex].qu.indexOf(values[1])
          this.quName = qName
          this.SET_QUNAME(qName)
          this.popupVisible = false
          this.SET_CITYINDEX(cIndex)
          this.SET_QUINDEX(qIndex)
          this.xzqh = values[1].xzqh
          this.getDdList()
        }
        else {
          Toast('该市暂无城区，请重新选择')
        }
      },
      AddressChangea(picker, values) { //地址选择 二级联动
        let index = this.cityArr.indexOf(values[0])   //所选城市下标
        if (index != -1) {
          picker.setSlotValues(1, this.cityArr[index].qu)
        }
        this.xzqh = values[1] ? values[1].xzqh : ''
      },
      lightSwitch(rwid, ddkzqIdArr, kzlx) {    //开关灯
        this.loadingShow = true
        let _this = this
        let data = {}
        data.rwid = rwid
        data.ddkzqIds = ddkzqIdArr.join(',')
        data.kzlx = kzlx
        api.lightSwitch(data).then(function (result) {
          xunce.setDataSend(result, 'dd', kzlx == 1 ? 'kd' : 'gd', _this.lightCB)
        })
      },
      lightCB(bwid, kzlx) {  //开关灯回调
        let _this = this
        let data = {}
        data.czlx = 2
        data.bwid = bwid
        data.kzlx = kzlx
        let i = 0
        this.forRequest = setInterval(function () {
          i++
          if (i < 10) {
            api.showLightSwitch(data).then(function (result) {
              if (result.length != 0) {
                _this.zhaoceData = result.data
                _this.sCount = _this.zhaoceData.length
              }
              if (result.data.length == _this.ddkzqIdArr.length) {
                _this.sCount = result.data.length
                _this.zhaoceData = result.data
                clearTimeout(_this.forRequest)
                _this.loadingShow = false
              }
            })
          } else {
            clearInterval(_this.forRequest)
            _this.loadingShow = false
            _this.fCount = _this.fCount = _this.ddkzqIdArr.length - _this.zhaoceData.length
          }
        }, 1000)
      },
      switchClick() {
        let _this = this
        MessageBox.prompt('请输入密码', {
          inputType: 'password',
        }).then((val) => {
          let formData = {
            name: this.userInfo.loginId,
            password: val.value
          }
          this.login(formData).then(function (res) {
            if (res) {
              if (_this.lightState == 'on') {
                MessageBox.confirm('', {
                  message: '当前状态为【打开】是否【关闭】',
                  showCancelButton: true
                })
                  .then(action => {
                    if (action == 'confirm') {     //确认的回调
                      _this.lightState = 'off'
                      _this.sCount = 0
                      _this.fCount = 0
                      _this.lightSwitch(xunce.uuid(0, 12), _this.ddkzqIdArr, '0')
                    }
                  })

              } else {
                MessageBox.confirm('', {
                  message: '当前状态为【关闭】是否【打开】',
                  showCancelButton: true
                })
                  .then(action => {
                    if (action == 'confirm') {     //确认的回调
                      _this.lightState = 'on'
                      _this.sCount = 0
                      _this.fCount = 0
                      _this.lightSwitch(xunce.uuid(0, 12), _this.ddkzqIdArr, '1')
                    }
                  })
              }
            } else {
              Toast('输入的密码有误')
            }
          })
        }, () => {
          console.info('cancel')
        })
      },
      getDdList() {  //获取该区的单灯
        let _this = this
        let data = {};
        data.sblx = 1;
        data.xzqhQx = this.xzqh
        data.dgh = ''
        api.getJzqDdxq(data).then(function (res) {
          _this.searchResult = res.data
          for (var i = 0; i < _this.searchResult.length; i++) {
            _this.ddkzqIdArr.push(_this.searchResult[i].ddkzqId)
          }
        })
      },
      sChart(){
        let chart = new F2.Chart({
        })
      }
    },
    mounted() {
      this.areaSlot[2].values = this.cityArr[this.cityIndex].qu
      this.areaSlot[0].values = this.cityArr
      this.areaSlot[0].defaultIndex = this.cityIndex
      this.areaSlot[2].defaultIndex = this.quIndex
      this.quName = this.areaSlot[2].values[this.quIndex].xzqhmc.substring(0, 3)
      this.xzqh = this.cityArr[this.cityIndex].qu[this.quIndex].xzqh
      this.getDdList()
    },
    components: {
      headTop,
      loading
    },
    beforeDestroy() {
      clearInterval(this.forRequest)
    },
  }
</script>

<style scoped lang="scss">
  @import '@/style/mixin.scss';
  .head_goback {
    width: 1.5rem;
  }

  .address {
    font-size: 0.42rem;
    i {
      @include wh(0.4rem, 0.25rem) display: inline-block;
      margin-left: 0.1rem;
      @include bg('../../images/common/xiala.png')
    }
  }

  .section {
    background: linear-gradient(180deg, rgba(18, 32, 67, 1), rgba(63, 121, 169, 1));
    .light-on {
      transition: background-image 1.8s linear;
      @include wh(100%, 9.5rem) @include bg('../../images/common/lighton.png')
    }
    .light-off {
      transition: background-image 1.8s linear;
      @include wh(100%, 9.5rem) @include bg('../../images/common/lightoff.png')
    }
    .chart-list {
      @include wh(100%, auto) padding: 0.35rem 0.7rem;
      .count {
        @include wh(2.34rem, 2.34rem)
      }
    }
    .switch-box {
      padding: 0.2rem;
      border-radius: 50%;
      margin: auto;
      display: inline-block;
      background: rgba(0, 0, 0, 0.2);
      @include sc(0.52rem, #fff);
      line-height: 2.54rem;
      .switch-btn {
        background: linear-gradient(-30deg, rgba(52, 113, 214, 1), rgba(97, 192, 232, 1));
        border-radius: 50%;
        @include wh(2.54rem, 2.54rem);
      }
    }
  }
</style>