
<template>
  <div class="dateFilter flex_between">
    <div class="tab-box flex_between">
        <div v-for = "(item,index) in tablist" ::key="index" class="tab-btn" 
        :class = "{'b-radus-l':index == 0,'b-radus-r':index == 2,'active':nowIndex == index}" 
        @click = 'tabClick(index,item)'>{{item.name}}</div>
    </div>
    <div class="dateBtn" @click = "open"></div>
    <mt-datetime-picker
        ref="picker"
        type="date"
        v-model="datevalue"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        @confirm="dateChange">
    </mt-datetime-picker>
  </div>
</template>

<script>
import { DatetimePicker } from 'mint-ui';
import { dateFormat,getFirstDayOfMonth,getFirstDayOfYear,getBeforSeven } from '@/config/commonFun/date.js'
export default {
  data () {
    return {
        nowIndex:0, // tab 高亮下标
        dateFlag:false, //控制日期选择的显示隐藏
        datevalue:dateFormat(new Date()), //当前时间
        tablist:[{'name':'最近七天','date':dateFormat(getBeforSeven())},{'name':'本月','date':dateFormat(getFirstDayOfMonth())},{'name':'本年','date':dateFormat(getFirstDayOfYear())}],
    }
  },
  methods:{
    open(){  //日期控件显示影藏
        this.$refs['picker'].open();
    },
    tabClick(index,item){ //tab 切换
        this.nowIndex = index;
        this.$emit('timeRange',item.date)
    },
    dateChange(value){  //日期确定
        let item = {
            date:dateFormat(value)
        }
        this.tabClick(3,item)
    }
  },
  created() {
      this.$emit('timeRange',this.tablist[0].date)
  },
}
</script>

<style scoped lang = "scss">
@import '@/style/mixin.scss';
.dateFilter{
    @include wh(100%,0.85rem)
    line-height: 0.845rem;
    color: white;
    font-size: 0.42rem;
    padding-right:0.4rem;
    .active{
        background: white;
        color:#169AFF;
    }
}
.tab-box{
    margin-left:1rem;
    width: 5.7rem;
    height: 100%;
    border:1px solid white;
    border-radius: 0.5rem
}
.tab-btn{
    height: 100%;
    flex: 1;
    border-right: 1px solid white;
    transition: all .5s;
}
.dateBtn{
    @include wh(0.56rem,0.58rem)
    @include bg('../../images/common/date.png')
}
.b-radus-l{
    border-radius: 0.5rem 0 0 0.5rem
}
.b-radus-r{
    border-radius: 0 0.5rem 0.5rem 0
}
</style>
