<template>
    <div class="statesurver full">
        <loading v-if="loadingShow"></loading>
        <head-top headTitle="对时结果" goBack="true">
            <div slot="save" @click="againTime">对时</div>
        </head-top>
        <div class="section flex_col_left">
            <div class="con-list-sm padding">
                <light-cell lfCon="运行状态">
                    <div slot="zc-box" class="flex_between zc-box-md font-gray">
                        <div>成功数:{{sCount}}</div>
                        <div>失败数:{{fCount}}</div>
                    </div>
                </light-cell>
            </div>
            <div class="scroll-box flex1" id="scrollbox">
                <div id="scrollcon">
                    <div class="con-list-sm padding" v-for="(item,index) in poleArr" v-if="index<showIndex" :key="index">
                        <light-cell :lfCon="item.dgmc" :rtCon="item.zxjg" :mdCon='item.bzsj'></light-cell>
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
                pole: '',// 灯杆信息
                ddkzqIdArr: [],//单灯控制器地址
                sCount: 0,   //成功数
                fCount: 0,  //失败数
                zhaoceData: [],
                zczt: '正在对时',
                loadingShow: false,
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
			...mapGetters(['userInfo'])
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
            checkTime(rwid, ddkzqIdArr) {  //对时请求\
                this.loadingShow = true
                let _this = this
                let data = {}
                data.rwid = rwid
                data.ddkzqIds = ddkzqIdArr.join(',')
				data.czrbh = this.userInfo.userId
                api.checkTime(data).then(function (result) {
                    xunce.setDataSend(result, 'dd', 'ds', _this.checkTimeCB)
                })
            },
            checkTimeCB(bwid) {  //对时回调
                let _this = this
                let data = {}
                data.czlx = 2
                data.bwid = bwid
                let i = 0
                this.forRequest = setInterval(function () {
                    i++
                    if (i < 10) {
                        api.showCheckTime(data).then(function (result) {
                            if (result.length != 0) {
                                _this.zhaoceData = result.data
                                _this.sCount = _this.zhaoceData.length
                                for (var n = 0; n < _this.poleArr.length; n++) {
                                    for (var m = 0; m < _this.zhaoceData.length; m++) {
                                        if (_this.poleArr[n].ddkzqId == _this.zhaoceData[m].ddkzqId) {
                                            _this.poleArr[n] = _this.zhaoceData[m]
                                        }
                                    }
                                }
                            }
                            if (result.data.length == _this.ddkzqIdArr.length) {
                                _this.sCount = result.data.length
                                _this.zhaoceData = result.data
                                clearTimeout(_this.forRequest)
                                _this.loadingShow = false
                            }
                        })
                    } else {
                        for (let k = 0; k < _this.poleArr.length; k++) {
                            if (_this.poleArr[k].zxjg == '') {
                                _this.poleArr[k].zxjg = '对时失败'
                            }
                        }
                        clearInterval(_this.forRequest)
                        _this.loadingShow = false
                        _this.fCount = _this.ddkzqIdArr.length - _this.zhaoceData.length
                    }
                }, 1000)
            },
            againTime() {
                this.sCount = 0
                this.fCount = 0
                this.zczt = '正在对时'
                this.checkTime(xunce.uuid(0, 12), this.ddkzqIdArr)
            },
        },
        created() {
            this.poleArr = this.$route.query.poleArr
            for (var i = 0; i < this.poleArr.length; i++) {
                this.ddkzqIdArr.push(this.poleArr[i].ddkzqId)
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