<template>
    <mt-popup v-model="popupSelect" position="bottom">
        <head-top headTitle = "集中器信息"  noneIcon = "true">
            <div slot="save" @click = "hide">取消</div>
        </head-top>
        <div class="section scroll-box" id="scrollboxC">
            <div id="scrollconC">
                <div class="con-list-sm padding padding_tb flex_between" v-for="(item,index) in poleArr" v-if="index<showIndex">
                    <div class="label"  @click="goCheck($event)"></div>
                    <div class='con-left check checkAll' @click = "chuandi($event)">
                        <mt-checklist v-model="checkedArr" :options="[item]"></mt-checklist>
                    </div>
                    <div class="con-middle">
                        <div class="flex_between">
                            <div class="ellipsis">{{item.jzkzqmc}}</div>
                            <div class="ellipsis">{{item.zcbh}}</div>
                        </div>
                        <div class="flex_between fontsm padding_tb font-gray">供电台区:{{item.ldbmc}} </div>
                    </div>
                </div>
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
                <div class="f-btn padding_tb" @click = "ToLink('jzqdstatesurver')">数据召测</div>
                <div class="f-btn padding_tb" @click = "ToLink('jzqkgd', 1)">设备开灯</div>
                <div class="f-btn padding_tb" @click = "ToLink('jzqkgd', 0)">设备关灯</div>
                <div class="f-btn padding_tb" @click = "ToLink('jzqtimecheck')">设备对时</div>
            </div>
        </footer> 
    </mt-popup>
</template>

<script>
import { Popup,MessageBox,Toast } from 'mint-ui'
import headTop from '@/components/header/mainHeader'
import listItem from './listItem'
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
        checkedArr:[],
        allFlag:[],
        showIndex:7
    }
  },
  props:['popupSelect','poleArr','selectFlag','nowIndex'],
  components:{
    listItem,
    headTop
  },
  computed:{
    ...mapGetters(['userInfo'])
  },
  methods:{
    ...mapActions(['login']),
    ToLink(url, kzlx) {   //页面跳转
                let _this = this
                if (kzlx == undefined) {
                    kzlx == 0
                }
                if (this.checkedArr.length > 0) {
                    MessageBox.prompt('请输入密码', {
                        inputType: 'password',
                    }).then((val) => {
                        let formData = {
                            name: this.userInfo.loginId,
                            password: val.value
                        }
                        this.login(formData).then(function (res) {
                            if (res) {
                                _this.$router.push({
                                    path: '/' + url,
                                    name: url,
                                    query: {
                                        poleArr: _this.checkedArr,
                                        kzlx: kzlx
                                    }
                                })
                            }else{
                                Toast('输入的密码有误')
                            }
                        })
                    }, () => {
                        console.info('cancel')
                    })
                } else {
                    Toast('请先选择')
                }
            },
    onScroll(){
        let scrollbox = document.querySelector('#scrollboxC')
        if(document.querySelector('#scrollconC').clientHeight < (document.querySelector('#scrollboxC').clientHeight+scrollbox.scrollTop)){
            this.showIndex += 6
        }
    },
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
                    this.ToLink('jzqkgd',1)
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
                    this.ToLink('jzqkgd',0)
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
                    Toast('对时失败')
                }
            })
        }else(Toast('请选择需要对时的设备'))
    }
  },
  mounted() {
      let scrollbox = document.querySelector('#scrollboxC')
      scrollbox.addEventListener('scroll',this.onScroll)
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
