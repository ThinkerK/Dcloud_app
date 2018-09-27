<template>
    <mt-popup v-model="popupSelect" position="bottom">
        <head-top headTitle = "单灯信息"  noneIcon = "true">
            <div slot="save" @click = "hide">取消</div>
        </head-top>
        <div class="section scroll-box">
            <div class="con-list-sm padding padding_tb flex_between" v-for="(item,index) in poleArr[0]">
                <div class="label"  @click="goCheck($event)"></div>
                <div class='con-left check checkAll' @click = "chuandi($event)">
                    <mt-checklist v-model="checkedArr" :options="[item]"></mt-checklist>
                </div>
                <div class="con-middle">
                    <div class="flex_between">
                        <div>{{item.name}}</div>
                        <div>灯杆号：{{item.poleId}}</div>
                    </div>
                    <div class="flex_between fontsm padding_tb font-gray">灯杆管理器地址：{{item.dgglq}} </div>
                    <div class="flex_between fontsm font-gray">用电管理器地址：{{item.ydglq}} </div>
                </div>
                <div class="con-right" :class="item.state == 1?'font-blue':'font-gray'">{{item.state == 1?'有效':'无效'}}</div>
            </div>
        </div>   
        <footer class="padding padding_tb">
            <div class="flex_between check">
                <mt-checklist v-model="allFlag" :options="['全选']"></mt-checklist>
                <span class = "font-deepgray">选中的设备数 {{checkedArr.length}}</span>
            </div>
            <div class="flex_between padding_tb">
                <div class="f-btn padding_tb">数据召测</div>
                <div class="f-btn padding_tb" @click = "lightOn">设备开灯</div>
                <div class="f-btn padding_tb" @click = "lightOff">设备关灯</div>
                <div class="f-btn padding_tb" @click = 'timeCheck'>设备对时</div>
            </div>
        </footer> 
    </mt-popup>
</template>

<script>
import { Popup,MessageBox,Toast } from 'mint-ui'
import headTop from '@/components/header/mainHeader'
export default {
  data () {
    return {
        checkedArr:[],
        allFlag:[]
    }
  },
  props:['popupSelect','poleArr','selectFlag'],
  components:{
    headTop
  },
  methods:{
    chuandi(e){
        e.currentTarget.getElementsByClassName('mint-checklist-label')[0].click()
    },
    hide(){ //关闭多选页
        this.$emit('hide', false)
    },
    goCheck($event){
        $event.path[1].children[1].click()
    },
    lightOn(){ //开灯
        if(this.checkedArr.length>0){
            MessageBox.confirm('',{
                message: '是否执行开灯操作？',
                showCancelButton: true
            })
            .then(action => { 
                if (action == 'confirm') {
                    Toast('开灯成功')
                }
            })
        }else{
            Toast('请选择需要开灯的设备')
        }
        
    },
    lightOff(){  //关灯
        if(this.checkedArr.length>0){
            MessageBox.confirm('',{
                message: '是否执行关灯操作？',
                showCancelButton: true
            })
            .then(action => { 
                if (action == 'confirm') {
                    Toast('关灯成功')
                }
            })
        }else{
            Toast('请选择需要关灯的设备')
        }
    },
    timeCheck(){
        if(this.checkedArr.length>0){
            MessageBox.confirm('',{
                message: '是否执行设备对时？',
                showCancelButton: true
            })
            .then(action => { 
                if (action == 'confirm') {
                    Toast('对时成功')
                }
            })
        }else(Toast('请选择需要对时的设备'))
    }
  },
  watch:{
    allFlag(val){
        if(val.length>0){
            for(let i = 0;i<this.poleArr.length;i++){
                if(this.checkedArr.indexOf(this.poleArr[0][i]) == -1){
                    this.checkedArr.push(this.poleArr[0][i])
                }
            }
        }else{
            this.checkedArr = []
        }
    },
  }
}
</script>

<style scoped lang = "scss">
@import '@/style/mixin.scss';
.mint-popup{
    height: 100%;
    z-index: 101
}
.con-middle{
    flex: 1;
}
.con-right{
    padding-left: 0.2rem;
}
.label{
    position: absolute;
    z-index: 101;
    width: 100%;
    height: 100%
}
.con-list-sm{
    position: relative;
}
footer{
    position: fixed;
    bottom: 0;
    z-index: 1000;
    width:100%;
    background: #fff;
    padding-bottom:0;
}
.f-btn{
    background:linear-gradient(150deg,rgba(22,154,255,1),rgba(0,112,198,1));
    border-radius:0.1rem;
    flex: 1;
    margin-right:0.2rem;
    color: white
}
.f-btn:last-child{
    margin-right: 0
}
</style>
