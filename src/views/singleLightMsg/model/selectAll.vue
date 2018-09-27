<template>
    <mt-popup v-model="popupSelect" position="bottom">
        <head-top headTitle = "单灯信息"  noneIcon = "true">
            <div slot="save" @click = "hide">取消</div>
        </head-top>
        <div class="section scroll-box">
            <div class="con-list-sm padding padding_tb flex_between" v-for="(item,index) in poleArr">
                <div class="label"  @click="goCheck($event)"></div>
                <div class='con-left check checkAll' @click = "chuandi($event)">
                    <mt-checklist v-model="checkedArr" :options="[item]"></mt-checklist>
                </div>
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
            <div class="con-list-sm padding padding_tb font-gray" v-if ="poleArr.length == 0">没有任何数据</div>
        </div>   
        <footer class="padding padding_tb">
            <div class="flex_between check">
                <div class="allchecked" @click = "allClick($event)"></div>
                <div @click = 'allcd($event)'>
                    <mt-checklist v-model="allFlag" :options="['全选']"></mt-checklist>
                </div>
                <span class = "font-deepgray">选中的设备数 {{checkedArr.length}}</span>
            </div>
            <div class="flex_between padding_tb">
                <div class="f-btn padding_tb">状态巡测</div>
                <div class="f-btn padding_tb">时钟巡测</div>
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
import listItem from './listItem'
export default {
  data () {
    return {
        checkedArr:[],
        allFlag:[]
    }
  },
  props:['popupSelect','poleArr','selectFlag','nowIndex'],
  components:{
    listItem,
    headTop
  },
  methods:{
    chuandi(e){  //点击传递
        e.currentTarget.getElementsByClassName('mint-checklist-label')[0].click()
    },
    allcd(e){  //点击传递
        e.currentTarget.getElementsByClassName('mint-checklist-label')[0].click()
    },
    allClick($event){  //点击传递
        $event.path[1].children[1].click()
        if(this.allFlag.length ==0){ 
            this.checkedArr = this.poleArr
        }else{
            this.checkedArr = []
        }
    },
    hide(){ //关闭多选页
        this.$emit('hide', false)
        this.checkedArr = []
        this.allFlag = []
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
.allchecked{
    margin-top: 0.1rem;
    position: absolute;
    height: 1rem;
    width: 1.7rem;
    top: 0;
    z-index: 1000
}
</style>
