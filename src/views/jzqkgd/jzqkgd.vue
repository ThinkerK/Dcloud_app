<template>
    <div class="statesurver full">
        <loading v-if="loadingShow"></loading>
        <head-top headTitle="开关灯结果" goBack="true">
        </head-top>
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
                    <div class="con-list-sm padding" v-for="(item,index) in poleArr" v-if = "index<showIndex" :key="index">
                        <light-cell :lfCon="item.jzkzqmc" :rtCon="item.zxjg"></light-cell>
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
                sCount: 0,   //成功数
                fCount: 0,  //失败数
                zczt: '正在召测', //
                zhaoceData: [],
                loadingShow: '',
                showIndex: 12, //懒加载初始值
            }
        },
        components: {
            headTop,
            lightCell,
            iptApen,
            loading
        },
        computed:{
            ...mapGetters([ 'userInfo' ])
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
            lightSwitch(rwid, ddkzqIdArr, kzlx) {    //开关灯
                this.loadingShow = true
                let _this = this
                let data = {}
                data.czrbh = this.userInfo.userId
                data.jzkzqIds = ddkzqIdArr.join(',')
                data.kzlx = kzlx
                api.jzqCallTest(data).then(function (result) {
                    xunce.jzqDataSend(result, 'jzq', kzlx == 1 ? 'kd' : 'gd', _this.lightCB)
                })
            },
            lightCB(jzqArr, kzlx) {  //开关灯回调
                let zcArr = []
                let _this = this
                let i = 0
                this.forRequest = setInterval(function () {
                    i++
                    if (i < 10) {
                        for (var j = 0; j < jzqArr.length; j++) {
                            let data = {}
                            data.czlx = 2
                            data.bwid = jzqArr[j].bwid
                            data.kzlx = kzlx
                            api.jzqShowLightSwitch(data).then(function (result) {
                                if (result.data.length != 0) {
                                    for (let k = 0; k < _this.poleArr.length; k++) {
                                        if (_this.poleArr[k].jzkzqId == result.data[0].jzkzqId) {
                                            _this.poleArr[k].zxjg == result.data[0].zxjg
                                            if (_this.zhaoceData.indexOf(k) == -1) {
                                                _this.zhaoceData.push(k)
                                            }
                                        }
                                    }
                                    _this.sCount = _this.zhaoceData.length
                                }
                                if (_this.zhaoceData.length == _this.ddkzqIdArr.length) {
                                    clearInterval(_this.forRequest)
                                    _this.loadingShow = false
                                    _this.zczt = '召测完成'
                                }
                            })
                        }
                    } else {
                        for (let i = 0; i < _this.poleArr.length; i++) {
                            if (_this.poleArr[i].zxjg == '') {
                                _this.poleArr[i].zxjg = '失败'
                            }
                        }
                        clearInterval(_this.forRequest)
                        _this.zczt = '召测完成'
                        _this.fCount = _this.fCount = _this.ddkzqIdArr.length - _this.zhaoceData.length
                        _this.loadingShow = false
                    }
                }, 1000)
            },
        },
        created() {
            this.poleArr = this.$route.query.poleArr
            for (var i = 0; i < this.poleArr.length; i++) {
                this.ddkzqIdArr.push(this.poleArr[i].jzkzqId)
            }
            this.lightSwitch(xunce.uuid(0, 12), this.ddkzqIdArr, this.$route.query.kzlx)
            this.zczt = this.$route.query.kzlx == 1 ? "正在开灯" : '正在关灯'
        },

        beforeDestroy() {
            clearInterval(this.forRequest)
        },
        mounted() {
            let scrollbox = document.querySelector('#scrollbox')
            scrollbox.addEventListener('scroll',this.onScroll)
        },
    }
</script>

<style scoped lang="scss">
</style>