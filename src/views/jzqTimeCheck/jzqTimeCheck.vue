<template>
    <div class="statesurver full">
        <loading v-if="loadingShow"></loading>
        <head-top headTitle="对时结果" goBack="true">
            <div slot="save" @click="againTime">对时</div>
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
                    <div class="con-list-sm padding" v-for="(item,index) in poleArr" v-if="index<showIndex" :key="index">
                        <light-cell :lfCon="item.jzkzqmc" :rtCon="item.zxjg"></light-cell>
                        <light-cell msgIcon="true" lfCon="时间" :mdCon="item.bzsj"></light-cell>
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


    export default {
        data() {
            return {
                pole: '',// 灯杆信息
                ddkzqIdArr: [],//单灯控制器地址
                sCount: 0,   //成功数
                fCount: 0,  //失败数
                zhaoceData: [],
                zczt: '正在对时',
                loadingShow: false,
                showIndex:10,
            }
        },
        components: {
            headTop,
            lightCell,
            iptApen,
            loading
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
            checkTime(rwid, ddkzqIdArr) {  //对时请求
                this.loadingShow = true
                let _this = this
                let data = {}
                data.jzkzqIds = ddkzqIdArr.join(',')
                api.jzqCallTest(data).then(function (result) {
                    xunce.jzqDataSend(result, 'jzq', 'ds', _this.checkTimeCB)
                })
            },
            checkTimeCB(jzqArr) {  //对时回调
                let _this = this
                let i = 0
                this.forRequest = setInterval(function () {
                    let zcArr = []
                    i++
                    if (i < 15) {
                        for (var j = 0; j < jzqArr.length; j++) {
                            let data = {}
                            data.czlx = 2
                            data.bwid = jzqArr[j].bwid
                            api.jzqShowCheckTime(data).then(function (result) {
                                if (result.data.length != 0) {
                                    for (let k = 0; k < _this.poleArr.length; k++) {
                                        if (_this.poleArr[k].jzkzqId == result.data[0].jzkzqId) {
                                            _this.poleArr[k].bzsj == result.data[0].bzsj
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
                                    _this.zczt = "对时完成"
                                }
                            })
                        }
                    } else {
                        for (let i = 0; i < _this.poleArr.length; i++) {
                            if (_this.poleArr[i].zxjg == '') {
                                _this.poleArr[i].zxjg = '对时失败'
                            }
                        }
                        clearInterval(_this.forRequest)
                        _this.zczt = "对时完成"
                        _this.fCount = _this.ddkzqIdArr.length
                        _this.loadingShow = false
                    }
                }, 1000)
            },
            againTime() {
                this.sCount = 0
                this.fCount = 0
                this.zczt = '正在对时'
                this.zhaoceData = []
                this.checkTime(xunce.uuid(0, 12), this.ddkzqIdArr)
            },
        },
        created() {
            this.poleArr = this.$route.query.poleArr
            for (var i = 0; i < this.poleArr.length; i++) {
                this.ddkzqIdArr.push(this.poleArr[i].jzkzqId)
            }
            this.checkTime(xunce.uuid(0, 12), this.ddkzqIdArr)
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