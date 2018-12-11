<template>
    <div class="datacalltest full">
        <loading v-if='loadingShow'></loading>
        <head-top headTitle="数据召测结果" goBack="true"></head-top>
        <div class="section scroll-box">
            <div class="con-list-sm padding">
                <light-cell lfCon="集中器名称" :rtCon="pole.jzkzqmc"></light-cell>
                <light-cell lfCon="集中器资产编号" :rtCon="pole.zcbh"></light-cell>
            </div>
            <div class="con-list-sm padding">
                <light-cell lfCon="运行状态"></light-cell>
                <light-cell msgIcon = "true" lfCon = "集中器时间" :mdCon = "zcState.xtsj" :zcCon = "zczt"></light-cell>   
            </div>
            <div class="con-list-sm padding">
                <light-cell lfCon="控制回路状态"></light-cell>
                <light-cell msgIcon="true" lfCon="节点1" :mdCon="'状态：'+(zcState.jd1_zt?zcState.jd1_zt:'')" :zcCon="zczt"></light-cell>
                <light-cell msgIcon="true" lfCon="节点2" :mdCon="'状态：'+(zcState.jd1_zt?zcState.jd2_zt:'')" :zcCon="zczt"></light-cell>
            </div>
            <div class="con-list-sm padding">
                <light-cell lfCon="遥信信息"></light-cell>
                <light-cell msgIcon="true" lfCon="节点1" :mdCon="'状态：'+(zcState.jd1_zt?zcState.yx1_zt:'')" :zcCon="zczt"></light-cell>
                <light-cell msgIcon="true" lfCon="节点2" :mdCon="'状态：'+(zcState.jd1_zt?zcState.yx2_zt:'')" :zcCon="zczt"></light-cell>
            </div>
            <div class="con-list-sm padding">
                <light-cell lfCon='运行数据' :zcCon="dzczt"></light-cell>
                <light-cell>
                    <div slot="zc-box" class="flex_between zc-box-md zc-box-bg" style = "margin-left: 0.8rem;">
                        <div>总</div>
                        <div>A</div>
                        <div>B</div>
                        <div>C</div>
                    </div>
                </light-cell>
                <light-cell msgIcon="true" lfCon="有功功率">
                    <div slot="zc-box" class="flex_between zc-box-md zc-box-bg" v-if="zcData.dl_A != null">
                        <div>{{ zcData.yggl_Z | toFixed }}</div>
                        <div>{{ zcData.yggl_A | toFixed }}</div>
                        <div>{{ zcData.yggl_B | toFixed }}</div>
                        <div>{{ zcData.yggl_C | toFixed }}</div>
                    </div>
                </light-cell>
                <light-cell msgIcon="true" lfCon="无功功率">
                    <div slot="zc-box" class="flex_between zc-box-md zc-box-bg" v-if="zcData.dl_A != null">
                        <div>{{ zcData.wggl_Z | toFixed }}</div>
                        <div>{{ zcData.wggl_A | toFixed }}</div>
                        <div>{{ zcData.wggl_B | toFixed }}</div>
                        <div>{{ zcData.wggl_C | toFixed }}</div>
                    </div>
                </light-cell>
                <light-cell msgIcon="true" lfCon="电路">
                    <div slot="zc-box" class="flex_between zc-box-md zc-box-bg" v-if="zcData.dl_A != null">
                        <div>--</div>
                        <div>{{ zcData.dl_A | toFixed }}</div>
                        <div>{{ zcData.dl_B | toFixed }}</div>
                        <div>{{ zcData.dl_C | toFixed }}</div>
                    </div>
                </light-cell>
                <light-cell msgIcon="true" lfCon="电压">
                    <div slot="zc-box" class="flex_between zc-box-md zc-box-bg" v-if="zcData.dl_A != null">
                        <div>--</div>
                        <div>{{ zcData.dy_A | toFixed }}</div>
                        <div>{{ zcData.dy_B | toFixed }}</div>
                        <div>{{ zcData.dy_C | toFixed }}</div>
                    </div>
                </light-cell>
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
                msgList: [
                    { "title": "灯杆名称", "con": "智芯OUN" },
                    { "title": "灯杆号", "con": "21212345123213" },
                ],//展示数据
                portOptions: [{ lj: '逻辑节点:0', wl: '物理节点: 0', state: '1' }, { lj: '逻辑节点:1', wl: '物理节点: 1', state: '1' }, { lj: '逻辑节点:3 ', wl: '物理节点: 2', state: 'false' }],//逻辑节点
                lng: 154984238,   //经度
                lat: 586486481,  //纬度
                pole: '',// 灯杆信息
                ddkzqIdArr: [], // 单灯控制器数组
                zhaoceData: [],
                dataFlag: false,
                zczt: '正在召测',  // 节点召测状态
                dzczt:'正在召测', //电能表召测状态
                loadingShow: false,
                zcState:'',  //召测状态
                zcData:'',   //召测运行数据
            }
        },
        filters: {
            toFixed(val){
                val = parseFloat(val).toFixed(3)
                return val
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
            setPoleMsg(pole) {  //获取灯杆信息
                this.msgList[0].con = pole.dgmc
                this.msgList[1].con = pole.dgh
            },
            callTestFun(rwid, ddkzqIdArr) {  //巡测
                this.loadingShow = true
                let _this = this
                let data = {}
                data.czrbh = this.userInfo.userId
                data.jzkzqIds = ddkzqIdArr.join(',')
                api.jzqCallTest(data).then(function (result) {
                    xunce.jzqDataSend(result, 'jzq', 'xc', _this.zcCallBack)
                })
                api.jzqCallTest(data).then(function (result) {
                    xunce.dnbDataSend(result, 'jzq', 'xc', _this.dnbCallBack)
                })
            },
            zcCallBack(jzqArr) {  //展示巡测结果数据
                let _this = this
                let data = {}
                data.czlx ='jzqYxzt'
                data.bwid = jzqArr[0].bwid
                let i = 0
                this.forRequest = setInterval(function () {
                    i++
                    if (i < 10) {
                        api.jzqShowCallTestMsg(data).then(function (result) {
                            if (result[0].zxjg !=  '召测失败' && result[0].zxjg != undefined) {
                                _this.zczt = '召测成功'
                                _this.zcState = result[0]
                                clearInterval(_this.forRequest)
                            }
                            // if (result.data.length == _this.ddkzqIdArr.length) {
                            //     _this.zhaoceData = result.data[0]
                            //     _this.zczt = '成功'
                            //     clearTimeout(_this.forRequest)
                            //     _this.loadingShow = false
                            // }
                        })
                    } else {
                        clearInterval(_this.forRequest)
                        _this.zczt = "失败"
                        _this.loadingShow = false
                    }
                }, 1000)
            },
            dnbCallBack(jzqArr) {  //电箱巡测结果数据
                let _this = this
                let data = {}
                data.czlx ='jzqYxzt'
                data.bwid = jzqArr[0].bwid
                let i = 0
                this.dnbforRequest = setInterval(function () {
                    i++
                    if (i < 10) {
                        api.jzqShowCallTestMsg(data).then(function (result) {
                            if (result[0].dl_A != null) {
                                _this.zcData = result[0]
                                clearInterval(_this.dnbforRequest)
                                _this.loadingShow = false
                                _this.dzczt = '召测成功'
                            }
                            // if (result.data.length == _this.ddkzqIdArr.length) {
                            //     _this.zhaoceData = result.data[0]
                            //     _this.zczt = '成功'
                            //     clearTimeout(_this.dnbforRequest)
                            //     _this.loadingShow = false
                            // }
                        })
                    } else {
                        clearInterval(_this.dnbforRequest)
                        _this.dzczt = "失败"
                        _this.loadingShow = false
                    }
                }, 1000)
            },
            

        },
        created() {
            this.pole = this.$route.query.pole
            this.setPoleMsg(this.pole)
            this.ddkzqIdArr.push(this.pole.jzkzqId)
        },
        mounted() {
            console.log(this.zhaoceData)
            this.callTestFun(xunce.uuid(0, 12), this.ddkzqIdArr)
        },
        beforeDestroy() {
            Bus.$emit('jzqdataCallTest', this.pole)
            Bus.$off('jzqdataCallTest')
            clearInterval(this.forRequest)
            clearInterval(this.dnbforRequest)
        },
    }
</script>

<style scoped lang="scss">
    .zc-box-bg {
        width: 7.5rem;
    }
</style>