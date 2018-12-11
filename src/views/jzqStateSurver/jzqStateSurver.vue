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
                        <light-cell :lfCon="item.jzkzqmc"></light-cell>
                        <light-cell msgIcon="true" lfCon='集中器时间' :mdCon="item.xtsj" :rtCon="item.zxjg"></light-cell>
                        <light-cell msgIcon="true" lfCon='运行状态' :rtCon="item.zxjg"></light-cell>
                        <light-cell nullIcon="true" lfCon="控制回路状态"></light-cell>
                        <light-cell nnullIcon="true" lfCon="节点1" :mdCon="'状态：'+(item.jd1_zt?item.jd1_zt:'')"></light-cell>
                        <light-cell nnullIcon="true" lfCon="节点2" :mdCon="'状态：'+(item.jd2_zt?item.jd2_zt:'')"></light-cell>
                        <light-cell nullIcon="true" lfCon="遥信信息"></light-cell>
                        <light-cell nnullIcon="true" lfCon="节点1" :mdCon="'状态：'+(item.yx1_zt?item.yx1_zt:'')"></light-cell>
                        <light-cell nnullIcon="true" lfCon="节点2" :mdCon="'状态：'+(item.yx2_zt?item.yx2_zt:'')"></light-cell>
                        <light-cell msgIcon="true" lfCon="运行数据" :rtCon="item.datazxjg"></light-cell>
                        <light-cell>
                            <div slot="zc-box" class="flex_between zc-box-md zc-box-bg" style="    margin-left: 0.8rem;">
                                <div>总</div>
                                <div>A</div>
                                <div>B</div>
                                <div>C</div>
                            </div>
                        </light-cell>
                        <light-cell nullIcon="true" lfCon="有功功率">
                            <div slot="zc-box" class="flex_between zc-box-md zc-box-bg">
                                <div>{{ item.yggl_Z | toFixed }}</div>
                                <div>{{ item.yggl_A | toFixed }}</div>
                                <div>{{ item.yggl_B | toFixed }}</div>
                                <div>{{ item.yggl_C | toFixed }}</div>
                            </div>
                        </light-cell>
                        <light-cell nullIcon="true" lfCon="无功功率">
                            <div slot="zc-box" class="flex_between zc-box-md zc-box-bg">
                                <div>{{ item.wggl_Z | toFixed }}</div>
                                <div>{{ item.wggl_A | toFixed }}</div>
                                <div>{{ item.wggl_B | toFixed }}</div>
                                <div>{{ item.wggl_C | toFixed }}</div>
                            </div>
                        </light-cell>
                        <light-cell nullIcon="true" lfCon="电路">
                            <div slot="zc-box" class="flex_between zc-box-md zc-box-bg">
                                <div>--</div>
                                <div>{{ item.dl_A | toFixed }}</div>
                                <div>{{ item.dl_B | toFixed }}</div>
                                <div>{{ item.dl_C | toFixed }}</div>
                            </div>
                        </light-cell>
                        <light-cell nullIcon="true" lfCon="电压">
                            <div slot="zc-box" class="flex_between zc-box-md zc-box-bg">
                                <div>--</div>
                                <div>{{ item.dy_A | toFixed }}</div>
                                <div>{{ item.dy_B | toFixed }}</div>
                                <div>{{ item.dy_C | toFixed }}</div>
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
                zhaoceData: [],  // 召测运行状态
                zcData: [],  //召测运行数据
                zczt: '正在召测', //召测状态
                sCount: 0,   //成功数
                fCount: 0,  //失败数
                loadingShow: false,
                showIndex: 6, //懒加载初始值
            }
        },
        filters: {
            toFixed(val) {
                if (!val) {
                    return ''
                } else {
                    val = parseFloat(val).toFixed(3)
                    return val
                }

            },
            bullVal(val) {
                if (!val) {
                    return ''
                } else {
                    return val
                }
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
                data.czrbh = this.userInfo.userId
                data.rwid = rwid
                data.jzkzqIds = ddkzqIdArr.join(',')
                api.jzqCallTest(data).then(function (result) {
                    xunce.jzqDataSend(result, 'jzq', 'xc', _this.zcCallBack)
                })
                api.jzqCallTest(data).then(function (result) {
                    xunce.dnbDataSend(result, 'jzq', 'xc', _this.dnbCallBack)
                })
            },
            filter(val) {
                let con = this.zhaoceData.filter((items) => { return items.ddkzqId == item.ddkzqId })[0]
                return con
            },
            zcCallBack(jzqArr) {  //展示巡测结果数据
                let zcArr = []
                let _this = this
                let i = 0
                this.forRequest = setInterval(function () {
                    i++
                    if (i < 15) {
                        for (var j = 0; j < jzqArr.length; j++) {
                            let data = {}
                            data.czlx = 'jzqYxzt'
                            data.bwid = jzqArr[j].bwid
                            api.jzqShowCallTestMsg(data).then(function (result) {
                                if (result[0].xtsj != '' && result[0].xtsj != undefined) {
                                    if (zcArr.indexOf(result[0]) == -1) {
                                        zcArr.push(result[0])
                                        for (let k = 0; k < _this.poleArr.length; k++) {
                                            if (_this.poleArr[k].jzkzqId == result[0].jzkzqId) {
                                                _this.poleArr[k].jd1_zt = result[0].jd1_zt
                                                _this.poleArr[k].jd2_zt = result[0].jd2_zt
                                                _this.poleArr[k].yx1_zt = result[0].yx1_zt
                                                _this.poleArr[k].yx2_zt = result[0].yx2_zt
                                                _this.poleArr[k].zxjg = result[0].zxjg
                                                _this.poleArr[k].xtsj = result[0].xtsj
                                                if (_this.zhaoceData.indexOf(k) == -1) {
                                                    _this.zhaoceData.push(k)
                                                }
                                            }
                                        }
                                    }
                                    _this.sCount = _this.zhaoceData.length
                                }
                                if (_this.zhaoceData.length == _this.ddkzqIdArr.length) {
                                    clearInterval(_this.forRequest)
                                    _this.zczt = '召测完成'
                                }
                            })
                        }
                    } else {
                        clearInterval(_this.forRequest)
                        for (let i = 0; i < _this.poleArr.length; i++) {
                            if (_this.poleArr[i].zxjg == '') {
                                _this.poleArr[i].zxjg = '召测失败'
                            }
                        }
                        _this.loadingShow = false
                        _this.zczt = '召测完成'
                        _this.fCount = _this.ddkzqIdArr.length - _this.zhaoceData.length
                    }
                }, 1000)
            },

            dnbCallBack(jzqArr) {  //电能表巡测结果数据
                let zcArr = []
                let _this = this
                let i = 0
                this.dnbforRequest = setInterval(function () {
                    i++
                    if (i < 15) {
                        for (var j = 0; j < jzqArr.length; j++) {
                            let data = {}
                            data.czlx = 'jzqYxzt'
                            data.bwid = jzqArr[j].bwid
                            api.jzqShowCallTestMsg(data).then(function (result) {
                                if (result[0].dl_A != null && result[0].dl_A != undefined) {
                                    if (zcArr.indexOf(result[0]) == -1) {
                                        zcArr.push(result[0])
                                        for (let k = 0; k < _this.poleArr.length; k++) {
                                            if (_this.poleArr[k].jzkzqId == result[0].jzkzqId) {
                                                _this.poleArr[k].yggl_Z = result[0].yggl_Z
                                                _this.poleArr[k].yggl_A = result[0].yggl_A
                                                _this.poleArr[k].yggl_B = result[0].yggl_B
                                                _this.poleArr[k].yggl_C = result[0].yggl_C
                                                _this.poleArr[k].wggl_Z = result[0].wggl_Z
                                                _this.poleArr[k].wggl_A = result[0].wggl_A
                                                _this.poleArr[k].wggl_B = result[0].wggl_B
                                                _this.poleArr[k].wggl_C = result[0].wggl_C
                                                _this.poleArr[k].dl_A = result[0].dl_A
                                                _this.poleArr[k].dl_B = result[0].dl_B
                                                _this.poleArr[k].dl_C = result[0].dl_C
                                                _this.poleArr[k].dy_A = result[0].dy_A
                                                _this.poleArr[k].dy_B = result[0].dy_B
                                                _this.poleArr[k].dy_C = result[0].dy_C
                                                if (_this.zcData.indexOf(k) == -1) {
                                                    _this.zcData.push(k)
                                                }
                                            }
                                        }
                                    }
                                }
                                if (_this.zcData.length == _this.ddkzqIdArr.length) {
                                    clearInterval(_this.dnbforRequest)
                                }
                            })
                        }
                    } else {
                        _this.loadingShow = false
                        clearInterval(_this.dnbforRequest)
                        for (let i = 0; i < _this.poleArr.length; i++) {
                            if (_this.poleArr[i].yggl_Z == undefined ) {
                                _this.poleArr[i].datazxjg = '召测失败'
                            } else {
                                _this.poleArr[i].datazxjg = '召测成功'
                            }
                        }
                    }

                    if (_this.zcData.length == _this.ddkzqIdArr.length && _this.zhaoceData.length == _this.ddkzqIdArr.length) {
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
        },
        beforeDestroy() {
            clearInterval(this.forRequest)
            clearInterval(this.dnbforRequest)
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
    .zc-box-bg {
        width: 7.5rem;
    }
</style>