<template>
    <div class="statesurver full">
        <loading v-if='loadingShow'></loading>
        <head-top headTitle="状态巡测结果" goBack="true"></head-top>
        <div class="section flex_col_left">
            <div class="con-list-sm padding">
                <light-cell lfCon="运行状态" :rtCon="zczt">
                    <div slot="zc-box" class="flex_between zc-box-md font-gray">
                        <div>成功数:{{sCount}}</div>
                        <div>失败数:{{fCount}}</div>
                    </div>
                </light-cell>
            </div>
            <div class="scroll-box flex1" id="scrollbox">
                <div id="scrollcon">
                    <div class="con-list-sm padding" v-for="(item,index) in poleArr" v-if="index<showIndex" :key="index">
                        <light-cell :lfCon="item.dgmc"></light-cell>
                        <light-cell msgIcon="true" lfCon="节点">
                            <div slot="zc-box" class="flex_between zc-box-md">
                                <div>1</div>
                                <div>2</div>
                                <div>3</div>
                            </div>
                        </light-cell>
                        <light-cell msgIcon="true" lfCon="回路状态" :zcCon="item.txjg">
                            <div slot="zc-box" class="flex_between zc-box-md">
                                <div>{{item.ddzt.split('|')[0]}}</div>
                                <div>{{item.ddzt.split('|')[1]}}</div>
                                <div>{{item.ddzt.split('|')[2]}}</div>
                            </div>
                        </light-cell>
                        <light-cell msgIcon="true" lfCon="运行状态" :zcCon="item.txjg">
                            <div slot="zc-box" class="flex_between zc-box-md">
                                <div>{{item.ddzt.split('|')[0]}}</div>
                                <div>{{item.ddzt.split('|')[1]}}</div>
                                <div>{{item.ddzt.split('|')[2]}}</div>
                            </div>
                        </light-cell>
                        <light-cell msgIcon="true" lfCon="功率" :zcCon="item.txjg">
                            <div slot="zc-box" class="flex_between zc-box-md">
                                <div>{{item.gl1}}</div>
                                <div>{{item.gl1}}</div>
                                <div>{{item.gl1}}</div>
                            </div>
                        </light-cell>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '@/components/header/mainHeader.vue'
    import lightCell from '@/components/common/lightCell'
    import iptApen from '@/components/common/iptApen'
    import Bus from "@/config/bus.js";
    import api from '../../service/data.js'
    import xunce from '../../service/xunce.js'
    import loading from '@/components/loading/loading'
    import { mapGetters } from 'vuex'


    export default {
        data() {
            return {
                poleArr: '',//
                pole: '',// 灯杆信息
                ddkzqIdArr: [],//单灯控制器地址
                zhaoceData: [],  //
                zczt: '正在召测', //召测状态
                sCount: 0,   //成功数
                fCount: 0,  //失败数
                loadingShow: false,
                showIndex: 6, //懒加载初始值
            }
        },
        computed:{
            ...mapGetters([ 'userInfo' ])
        },
        components: {
            headTop,
            lightCell,
            iptApen,
            loading,
        },
        methods: {
            onScroll() {   //滚动监听
                let scrollbox = document.querySelector('#scrollbox')
                if (document.querySelector('#scrollcon').clientHeight < (document.querySelector('#scrollbox').clientHeight + scrollbox.scrollTop)) {
                    if (this.showIndex < this.poleArr.length) {
                        this.showIndex += 6
                    }
                }

            },
            callTestFun(rwid, ddkzqIdArr) {  //巡测
                let _this = this
                let data = {}
                data.rwid = rwid
                data.ddkzqIds = ddkzqIdArr.join(',')
                data.czrbh = this.userInfo.userId
                console.log(data)
                api.callTest(data).then(function (result) {
                    xunce.setDataSend(result, 'dd', 'xc', _this.zcCallBack)
                })
            },
            filter(val) {
                let con = this.zhaoceData.filter((items) => { return items.ddkzqId == item.ddkzqId })[0]
                return con
            },
            zcCallBack(bwid) {  //展示巡测结果数据
                let _this = this
                let data = {}
                data.czlx = 2
                data.bwid = bwid
                data.czbz = 'jd'
                let i = 0
                this.forRequest = setInterval(function () {
                    i++
                    if (i < 10) {
                        api.showCallTestMsg(data).then(function (result) {
                            if (result.length != 0) {
                                _this.zhaoceData = result
                                for (var n = 0; n < _this.poleArr.length; n++) {
                                    for (var m = 0; m < _this.zhaoceData.length; m++) {
                                        if (_this.poleArr[n].ddkzqId == _this.zhaoceData[m].ddkzqId) {
                                            _this.poleArr[n] = _this.zhaoceData[m]
                                        }
                                    }
                                }
                                _this.sCount = _this.zhaoceData.length
                            }
                            if (result.length == _this.ddkzqIdArr.length) {
                                _this.zczt = '召测完成'
                                clearInterval(_this.forRequest)
                                _this.zhaoceData = result
                                _this.sCount = _this.zhaoceData.length
                                _this.loadingShow = false
                            }
                        })
                    } else {
                        for (let k = 0; k < _this.poleArr.length; k++) {
                            if (_this.poleArr[k].txjg == '') {
                                _this.poleArr[k].txjg = '召测失败'
                            }
                        }
                        console.log(_this.poleArr)
                        clearInterval(_this.forRequest)
                        _this.loadingShow = false
                        _this.zczt = '召测完成'
                        _this.fCount = _this.ddkzqIdArr.length - _this.zhaoceData.length
                    }
                }, 1000)
            },
        },
        created() {
            this.poleArr = this.$route.query.poleArr
            for (var i = 0; i < this.poleArr.length; i++) {
                this.ddkzqIdArr.push(this.poleArr[i].ddkzqId)
            }
        },
        beforeDestroy() {
            clearInterval(this.forRequest)
        },
        mounted() {
            this.loadingShow = true
            this.callTestFun(xunce.uuid(0, 12), this.ddkzqIdArr)
            let scrollbox = document.querySelector('#scrollbox')
            scrollbox.addEventListener('scroll',this.onScroll)
        },
    }
</script>

<style scoped lang="scss">
</style>