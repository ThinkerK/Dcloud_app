<template>
  <div class="main">
    <head-top scanBtn='true' :class="{'main-header':headerBg}">
      <div slot="address" class="select-area flex_between" @click="popupVisible = true">{{quName}}
        <i class="xiala"></i>
      </div>
      <div slot="head_search" class="form-ipt flex_between">
        <input type="text" placeholder=" 请输入灯杆号" @click="popupSearch = true">
      </div>
    </head-top>
    <div class="head-bg">
      <div class="head-wrap">
        <div class="head-pic"></div>
      </div>
      <div class="name">
        <span>{{userInfo.userName}}</span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
        <span @click="signOut">安全退出</span>
      </div>
    </div>

    <section class="flex_between pdgbtm">
      <div class="section-title flex_between">范围搜索</div>
      <div class="sec-item" v-for="(item,index) in sectionList" :key="index" @click="model(item)">
        <div class="icon" :class="item.icon"></div>
        <div class="text">{{item.name}}</div>
      </div>
      <div class="section-title flex_between margin-top">数据档案</div>
      <div class="sec-item" v-for="(item,index) in sectionList2" @click="model(item)">
        <div class="icon" :class="item.icon"></div>
        <div class="text">{{item.name}}</div>
      </div>
    </section>
    <mt-popup v-model="popupVisible" position="bottom" class="mint-popup">
      <mt-picker :slots="areaSlot" @change="AddressChangea" :showToolbar="true" :visible-item-count="5" valueKey="xzqhmc" ref="genderPicker">
        <div class="flex_between padding padding_tb">
          <a class="btn-cancel" @click="popupVisible = !popupVisible">取消</a>
          <a class="btn-sure" @click="genderConfirm">确定</a>
        </div>
      </mt-picker>
    </mt-popup>
    <search-pop :popupSearch="popupSearch" :xzqh="xzqh" @searchHide="searchHide"></search-pop>
  </div>

</template>

<script>
  import {
	removeToken
} from '@/utils/common'
  import api from '../../service/data.js'
  import { Toast, Popup, Picker } from 'mint-ui'
  import headTop from '@/components/header/mainHeader'
  import searchPop from '@/components/header/search'
  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
  export default {
    data() {
      return {
        headerBg:true,
        quName: '无权限',
        xzqh: '',//行政区划
        cityId: '', // 城市ID 1101 1201
        popupSearch: false,   //搜索框 开关
        popupVisible: false,   //城市选择 开关
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
        sectionList: [{ 'name': '街道', 'icon': 'jiedao', 'link': 'singlelightmsg' }, { 'name': '台区', 'icon': 'taiqu', 'link': 'singlelightmsg' }, { 'name': '集中器', 'icon': 'jizhongqi', 'link': 'jzqmsg' }, { 'name': '交接箱', 'icon': 'jiaojiexiang', 'link': 'singlelightmsg' }, { 'name': '组别', 'icon': 'zubei', 'link': 'singlelightmsg' }, { 'name': '区县', 'icon': 'quxian', 'link': 'lightswitch' }],//搜索不同模块
        // sectionList2: [{ 'name': '异常数据', 'icon': 'yichang' }, { 'name': '修复记录', 'icon': 'xuifu' }, { 'name': '数据展示', 'icon': 'sjzs'}],
        sectionList2: [{ 'name': '异常数据', 'icon': 'yichang', 'link': 'abnormaldata' }, { 'name': '修复记录', 'icon': 'xuifu', 'link': 'repairrecord' }, { 'name': '数据展示', 'icon': 'sjzs', 'link': 'datadisplay' },{'name': 'GIS','icon': 'quxian','link': 'gis'}]
      }
    },
    computed: {
      ...mapGetters(['cityArr', 'cityIndex', 'quIndex', 'userInfo'])
    },
    methods: {
      ...mapActions(['getCityArr']),
      ...mapMutations(['SET_CITYINDEX', 'SET_QUINDEX', 'SET_QUNAME', 'SET_LUINDEX']),
      signOut() {
        sessionStorage.clear();
				removeToken();
        this.$router.push('/login')
        localStorage.removeItem("name");
        localStorage.removeItem("password");
      },
      model(item) {  //跳到单灯链表页
        if (this.quName != '无权限') {
          if (item.link != null) {
            this.$router.push({
              path: '/' + item.link,
              name: item.link,
              query: {
                class: item.name,
                cityId: this.cityId
                // areaIndex:Object.keys(address).indexOf(this.$refs.genderPicker.getValues()[0])
              }
            })
          } else {
            Toast('暂不支持')
          }
        } else {
          Toast('你没有任何权限')
        }


      },
      searchHide(val) { //点击取消 关闭搜索页面
        this.popupSearch = val
      },
      genderConfirm() { // 城市选择确定事件
        let values = this.$refs.genderPicker.getValues()

        if (values[1] != null) {
          let qName = this.$refs.genderPicker.getValues()[1].xzqhmc.substring(0, 3);
          let cIndex = this.cityArr.indexOf(values[0])
          let qIndex = this.cityArr[cIndex].qu.indexOf(this.cityArr[cIndex].qu.filter(item => item.xzqhmc == this.$refs.genderPicker.getValues()[1].xzqhmc)[0])
          this.cityId = values[0].index
          this.quName = qName
          this.SET_QUNAME(qName)
          this.popupVisible = false
          this.SET_CITYINDEX(cIndex)
          this.SET_QUINDEX(qIndex)
          this.xzqh = values[1].xzqh
        }
        else {
          Toast('请该市暂无城区，重新选择')
        }
      },
      AddressChangea(picker, values) { //地址选择 二级联动
        let index = this.cityArr.indexOf(values[0])   //所选城市下标
        if (index != -1) {
          picker.setSlotValues(1, this.cityArr[index].qu)
        }
      },
      handleScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if(scrollTop>88){
            this.headerBg = false
        }else {
          this.headerBg = true
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
      let city1 = {
        czrbh: this.userInfo.userId,
        city: 1101
      }
      let city2 = {
        czrbh: this.userInfo.userId,
        city: 1201
      }
      this.getCityArr(city1),
        this.getCityArr(city2)
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll)
      let _this = this
      if (this.cityArr[0].qu.length == 0) { //判断  如果没有store 请求获取 区的列表
        let _this = this
        let city1 = {
          czrbh: this.userInfo.userId,
          city: this.userInfo.xzqh
        }
        api.getAddressList(city1).then(function (res) {
          _this.areaSlot[2].values = JSON.parse(res.qu)
          _this.areaSlot[2].defaultIndex = _this.quIndex
          _this.quName = JSON.parse(res.qu)[_this.quIndex].xzqhmc.substring(0, 3)
          _this.xzqh = JSON.parse(res.qu)[0].xzqh
        })
      } else {  //store 存在   直接赋值
        this.areaSlot[2].values = this.cityArr[this.cityIndex].qu
        _this.areaSlot[2].defaultIndex = _this.quIndex
        this.quName = this.areaSlot[2].values[_this.quIndex].xzqhmc.substring(0, 3)
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
    @include sc(0.52rem, white) height: 100%;
    i {
      @include wh(0.4rem, 0.25rem) display: inline-block;
      margin-left: 0.1rem;
    }
  }

  .head-bg {
    @include bg('../../images/main/bg.png') @include wh(100%, 5.33rem)
  }

  .form-ipt {
    @include wh(7rem, 100%) padding-left: 0.2rem;
    position: relative;
  }

  .head-wrap {
    @include wh(1.55rem, auto) @include cl() top: 2.22rem;

  }

  .name {
    position: absolute;
    width: 100%;
    @include cl() top: 3.7rem;
    @include sc(0.48rem, #fff) margin-top: 0.3rem;
    text-align: center;
    span {
      display: inline-block;
      min-width: 2.5rem;
    }
  }

  .head-pic {
    @include wh(1.55rem, 1.55rem) @include bg('../../images/main/tx.png') border-radius: 50%;
  }

  .section-title {
    @include wh(100%, auto) background: rgba(241, 241, 241, 1);
    @include sc(0.48rem, #000) padding: 0.3rem;
  }

  section {
    flex-wrap: wrap;
    .sec-item {
      @include wh(1.27rem, auto) margin: 1.13rem 1.16rem 0 1.17rem;
      .icon {
        @include wh(1.27rem, 1.30rem) display: inline-block
      }
      .text {
        margin: 0.23rem 0;
        width: 2.2rem;
        margin-left: -0.45rem;
      }
    }
  }

  .jiedao {
    @include bg('../../images/main/jd.png')
  }

  .taiqu {
    @include bg('../../images/main/tq.png')
  }

  .jizhongqi {
    @include bg('../../images/main/jzq.png')
  }

  .jiaojiexiang {
    @include bg('../../images/main/jjx.png')
  }

  .zubei {
    @include bg('../../images/main/zb.png')
  }

  .quxian {
    @include bg('../../images/main/qx.png')
  }

  .tianjia {
    @include bg('../../images/main/tj.png')
  }

  .xiala {
    @include bg('../../images/common/xiala.png')
  }

  .yichang {
    @include bg('../../images/common/ycsj.png')
  }

  .xuifu {
    @include bg('../../images/common/xfjl.png')
  }

  .sjzs {
    @include bg('../../images/common/sjzs.png')
  }


  .form-ipt::before {
    content: '';
    display: inline-block;
    width: 0.52rem;
    height: 0.52rem;
    position: absolute;
    left: 0.4rem;
    background: url('../../images/common/search.png') 100% no-repeat;
    background-size: 100%;
  }

  .margin-top {
    margin-top: 1rem;
  }

  .pdgbtm {
    padding-bottom: 1rem;
  }

  .main-header {
    background: none !important;
  }
</style>