<template>
  <div class="search">
    <mt-popup v-model="popupSearch" position="right">
        <head-top>
            <div slot="head_search" class="form-ipt flex_between">
                <input type="search" v-model = "Dgbh" autocomplete="off" id="popupIpt" placeholder=" 请输入灯杆号" @blur = "onSearchKeyUp(Dgbh)" @search = "onSearchKeyUp(Dgbh)">
            </div>
            <div slot='save' class="fullLeft" @click = "hide">取消</div>
        </head-top>
        <div class="section scroll-box">
            <div class="result-wrap">
                <div class="title padding flex_between">搜索 {{Dgbh}} 的结果</div>
                <ul class="con-list-sm">
                    <li class="flex_between padding border" v-for = "(item,index) in searchResult" @click = "toDevice(item)">
                        <div class="left">灯杆: {{item.dgh}}</div> 
                        <div class="right">{{item.dgmc}}</div> 
                    </li>
                    <li class=" padding border font-gray" v-if = "searchResult.length == 0">没有任何数据</li>
                </ul>
            </div>
        </div>
    </mt-popup>
  </div>
</template>

<script>
import { Toast,Popup,Picker } from 'mint-ui'
import headTop from './mainHeader'
import api from '../../service/data.js'

export default {
  data () {
    return {
        popup:this.popupSearch,   //控制搜索框的出现
        Dgbh:''  ,           //输入的灯杆号
        searchResult:[],     //搜索结果链表
    }
  },
  props:['popupSearch','xzqh'],
  components:{
      headTop
  },
  methods:{
      hide(){
        this.$emit('searchHide', false)
      },
      onSearchKeyUp(val){
        this.getDdList(val)
      },
      getDdList(val){
        let _this = this
        let data = {};
        data.sblx = 1;
        data.xzqhQx = this.xzqh
        console.log(this.xzqh)
        data.dgh = val
        api.getJzqDdxq(data).then(function(res){
            console.log(res)
        })
      },
      toDevice(item){
          this.$router.push({
            path: '/devicemsg',
            name:'devicemsg',
            params: { 
                name: 'name', 
            }
            /*query: {
                name: 'name', 
                dataObj: this.msg
            }*/
        })
      }
  },
  watch:{
    popupSearch(val){
        if(val){
            let popupIpt = document.getElementById('popupIpt')
            popupIpt.focus();
        }
        else{
        }
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/style/mixin.scss';
.mint-popup{
    height: 100%;
    z-index: 101;
}
.search .head_left{
    min-width: 0;
}
.form-ipt{
  @include wh(9.09rem,100%)
  position: relative;
}
.form-ipt::before{
    content: '';
    display: inline-block;
    width: 0.52rem;
    height: 0.52rem;
    position: absolute;
    left: 0.2rem;
    background: url('../../images/common/search.png') 100% no-repeat;
    background-size:100%; 
}
.result-wrap{
    background: #ffffff;
    .title{
        @include wh(100%,1rem)
        font-size: 0.42rem;
        font-weight:500;
    }
    .con-list-sm{
        li{
            .left{
                color: #999999;
            }
        }
    }
}


</style>
