<template>
    <div class="repairrecord full">
        <head-top goBack="true">
            <div slot="head_search" class="filter-box">
                <date-filter @timeRange='timeRange'></date-filter>
            </div>
        </head-top>
        <div class="section flex_col_left">
            <div class="font-blue flex_between padding_tb bgf">
                <div class="flex1" @click="ldbVisible = true">{{quName}}
                    <i class="xl-blue"></i>
                </div>
            </div>
            <div class="dates-box">{{dateRange.show}}</div>
            <div class="scroll-box flex1" id="scrollbox" style="background: #0d1019">
                <div id="scrollcon">
                    <div>
                        <div class="padding padding_tb gray bg_gray t_l">异常数据</div>
                        <div class='padding'>
                            <div class="position_re con-list-sm padding padding_tb bg_gray b_radius" style="height: 7.88rem">
                                <i class="position_ab enlarge pu_large" @click='enlargeClick(chartsData.bar)'></i>
                                <e-chart :option='chartsData.bar'></e-chart>
                            </div>
                        </div>
                        <div class='padding'>
                            <div class="con-list-sm padding padding_tb bg_gray b_radius">
                                <div class="ldb_wrap" ref="scrollabnormal">
                                    <ul class='ldb_box t_l'>
                                        <div class="li_box">
                                            <li class="ldb_tab" v-for="(item,index) in ldbArr" v-if="index<=ldbArr.length/2" :class="{active : nowIndex == index}" @click=tabClick(index,item)>
                                                {{item.ldbmc}}
                                            </li>
                                        </div>
                                        <br/>
                                        <div class="li_box">
                                            <li class="ldb_tab" v-for="(item,index) in ldbArr" v-if="index>ldbArr.length/2" :class="{active : nowIndex == index}" @click=tabClick(index,item)>
                                                {{item.ldbmc}}
                                            </li>
                                        </div>

                                    </ul>
                                </div>
                                <div class="padding_tb font-blue">{{ldbmc}}异常数据占比图</div>
                                <div class="padding_tb">
                                    <div class="charts">
                                        <progress-bar :data="abnormalCount.ldbNum/abnormalCount.ldbCount*100" procolor="#169AFF">
                                            <div slot="titcon">
                                                <div style="font-size: 0.70rem">
                                                    {{(abnormalCount.ldbNum/abnormalCount.ldbCount*100).toFixed(3) | carNan}}
                                                </div>
                                                <div style="font-size: 0.48rem">
                                                    {{abnormalCount.ldbNum}}条
                                                </div>
                                            </div>
                                        </progress-bar>
                                    </div>
                                </div>
                                <div class="padding_tb font-blue">{{quName}}异常总数：{{abnormalCount.ldbCount}}条</div>
                            </div>
                        </div>
                        <div class='padding'>
                            <div class="position_re con-list-sm padding padding_tb bg_gray b_radius" style="height: 5.73rem">
                                <i class="position_ab enlarge orange_large" @click='enlargeClick(chartsData.line)'></i>
                                <e-chart :option='chartsData.line'></e-chart>
                            </div>
                        </div>


                    </div>
                    <div>
                        <div class="padding padding_tb gray bg_gray t_l" style="margin-top: 0.3rem">修复数据</div>
                        <div class='padding'>
                            <div class="position_re con-list-sm padding padding_tb bg_gray b_radius" style="height: 7.88rem">
                                <i class="position_ab enlarge yellow_large" @click='enlargeClick(chartsData.barstack)'></i>
                                <e-chart :option='chartsData.barstack'></e-chart>
                            </div>
                        </div>
                        <div class='padding'>
                            <div class="con-list-sm padding padding_tb bg_gray b_radius">
                                <div class="ldb_wrap" ref="scrollrepair">
                                    <ul class='ldb_box t_l'>
                                        <div class="li_box">
                                            <li class="ldb_tab" v-for="(item,index) in ldbArr" v-if="index<=ldbArr.length/2" :class="{active : nowIndex == index}" @click=tabClick(index,item)>
                                                {{item.ldbmc}}
                                            </li>
                                        </div>
                                        <br/>
                                        <div class="li_box">
                                            <li class="ldb_tab" v-for="(item,index) in ldbArr" v-if="index>ldbArr.length/2" :class="{active : nowIndex == index}" @click=tabClick(index,item)>
                                                {{item.ldbmc}}
                                            </li>
                                        </div>
                                    </ul>
                                </div>
                                <div class="flex_between">
                                    <div class="flex1">
                                        <div class="padding_tb font_orgin">台区已修复数据占比图</div>
                                        <div class="padding_tb">
                                            <div class="repairCharts">
                                                <progress-bar :data="ldbRepairC.yccs/ldbRepairC.yccsCount*100" procolor="#FEE578">
                                                    <div slot="titcon">
                                                        <div style="font-size: 0.5rem">
                                                            {{(ldbRepairC.yccs/ldbRepairC.yccsCount*100).toFixed(3) | carNan}}
                                                        </div>
                                                        <div style="font-size: 0.36rem">
                                                            {{ldbRepairC.yccs}}条
                                                        </div>
                                                    </div>
                                                </progress-bar>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex1">
                                        <div class="padding_tb font-blue">台区未修复数据占比图</div>
                                        <div class="padding_tb">
                                            <div class="repairCharts">
                                                <progress-bar :data="(ldbRepairC.yccsCount-ldbRepairC.yccs)/ldbRepairC.yccsCount*100" procolor="#169AFF">
                                                    <div slot="titcon">
                                                        <div style="font-size: 0.5rem">
                                                            {{((ldbRepairC.yccsCount-ldbRepairC.yccs)/ldbRepairC.yccsCount*100).toFixed(3) | carNan}}
                                                        </div>
                                                        <div style="font-size: 0.36rem">
                                                            {{ldbRepairC.yccsCount-ldbRepairC.yccs}}条
                                                        </div>
                                                    </div>
                                                </progress-bar>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <mt-popup v-model="ldbVisible" position="bottom" class="mint-popup">
            <mt-picker :slots="ldbSlot" @change="onLdbChange" :showToolbar="true" valueKey="xzqhmc" :visible-item-count="5" ref="ldbPicker">
                <div class="flex_between padding padding_tb">
                    <a class="btn-cancel" @click="ldbVisible = !ldbVisible">取消</a>
                    <a class="btn-sure" @click="ldbConfirm">确定</a>
                </div>
            </mt-picker>
        </mt-popup>
        <!-- <mt-popup v-model="enlarge" position='right' class="enlarge_popup">
            <enlarge-chart :pOption = "chartOption" @chartHide = 'chartHide'></enlarge-chart>
        </mt-popup> -->
    </div>
</template>

<script>
    import headTop from '@/components/header/mainHeader'
    import dateFilter from '@/components/common/dateFilter'
    import api from '../../service/data.js'
    import enlargeChart from './enlargeChart.vue'
    import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'


    export default {
        components: {
            headTop,
            dateFilter,
            enlargeChart,
        },
        filters: {
            carNan(val) {
                if (val == "NaN") {
                    return "--"
                } else {
                    return val + '%'
                }
            }
        },
        data() {
            return {
                quName: '',   //区名称
                dateRange: '',  //时间范围
                ldbVisible: false,  //台区显示隐藏
                statusVisible: false,  //状态显示隐藏
                ldbmc: '',
                ldbId: '',  //
                ldbSlot: [{
                    flex: 1,
                    values: [],
                    className: 'slot1'
                }],
                xzqh: '',//行政区号
                nowIndex: 0,
                ldbArr: [],
                enlarge: false,//图标放大开关
                chartOption: '', //图表option
                chartsData: {

                    bar: {
                        grid: {
                            bottom: '30%',
                        },
                        dataZoom: [{  //滚动条
                            type: 'inside',
                            throttle: '0',
                            startValue: 0,
                            endValue: 11,
                        }],
                        title: {
                            text: '台区异常数据柱状图',
                            textStyle: {
                                color: '#FC2D8A',
                            },
                        },
                        xAxis: {
                            // data: ["10.24", "10.25", "10.26", "10.27", "10.28", "10.29", '10.30'],
                            data: [],
                            axisLabel: {
                                interval: 0,
                                formatter: function (value) {
                                    return value.split("").join("\n");
                                }
                            }
                        },
                        series: [{
                            name: '异常数',
                            type: 'bar',
                            color: "#FC2D8A",
                            data: [],
                            // data: [5, 20],
                            label: {
                                normal: {
                                    color: '#FC2D8A'
                                }
                            }
                        }]
                    },
                    line: {
                        grid: {
                            top: '28%',
                            bottom: "11%"
                        },
                        xAxis: {
                            boundaryGap: false, //从0开始
                            data: [],
                        },
                        title: {
                            text: '台区异常数据曲线图',
                            textStyle: {
                                color: '#FF5B2E',
                            },
                        },
                        series: [{
                            name: '异常数',
                            type: 'line',
                            color: "#FF5B2E",
                            areaStyle: {
                                normal: {
                                    color: {
                                        type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [{
                                            offset: 0, color: '#FF5B2E' // 0% 处的颜色
                                        }, {
                                            offset: 0.6, color: '#582B27'
                                        }, {
                                            offset: 1, color: 'transparent' // 100% 处的颜色
                                        }],
                                        globalCoord: false // 缺省为 false
                                    }
                                }
                            },
                            label: {
                                normal: {
                                    backgroundColor: '#FF5B2E',
                                    padding: [this.rem(0.1), this.rem(0.13)],
                                    borderRadius: this.rem(0.2)
                                    // position: 'top',
                                    // textStyle: {
                                    //   color: 'white'
                                    // }
                                }
                            },
                            smooth: true, //true 为平滑曲线，false为直线
                            data: []
                        }]
                    },
                    barstack: {
                        legend: {
                            // data: ['已修复', '异常数'],
                            data: [{
                                name: '已修复',
                                textStyle: {
                                    color: '#FEE578',
                                    fontSize:this.rem(0.36)
                                }
                            }, {
                                name: '异常数',
                                textStyle: {
                                    color: '#999999',
                                    fontSize:this.rem(0.36)
                                }
                            }],
                            width: this.rem(4.5),
                            height: this.rem(0.1),
                            itemWidth: this.rem(0.6),
                            itemHeight: this.rem(0.45),
                            itemGap:this.rem(0.3),
                            top:'10%'
                        },
                        title: {
                            text: '台区异常修复对比图',
                            textStyle: {
                                color: '#FEE578',
                            },
                        },
                        dataZoom: [{  //滚动条
                            type: 'inside',
                            throttle: '0',
                            startValue: 0,
                            endValue: 11,
                        }],
                        grid: {
                            bottom: '30%',
                            top:'23%'
                        },
                        xAxis: {
                            // data: ["10.24", "10.25", "10.26", "10.27", "10.28", "10.29", '10.30'],
                            data: [],
                            axisLabel: {
                                interval: 0,
                                formatter: function (value) {
                                    return value.split("").join("\n");
                                }
                            }
                        },
                        series: [
                            {
                                name: '异常数',
                                type: 'bar',
                                color: "#999999",
                                barWidth: this.rem(0.3),
                                barGap: '-100%',
                                data: [],
                                // data: [5, 20],
                                label: {
                                    normal: {
                                        color: '#FEE578'
                                    }
                                }
                            },
                            {
                                name: '已修复',
                                type: 'bar',
                                color: "#FEE578",
                                barWidth: this.rem(0.3),
                                data: [],
                                // data: [5, 20],
                                label: {
                                    normal: {
                                        color: '#FC2D8A'
                                    }
                                }
                            },

                        ]
                    }
                }
                ,
                abnormalCount: '', //台区异常数/ 全区异常数
                ldbRepairC: '', //修复数
                barRatioX: [], //修复柱状图x数据
                barRatioYall: [], //修复柱状图Y数据 总数
                barRatioYr: [],//修复柱状图Y数据 修复数
            }
        },
        computed: {
            ...mapGetters(['cityArr', 'cityIndex', 'quIndex', 'userInfo'])
        },
        methods: {
            ...mapMutations(['SET_CITYINDEX', 'SET_QUINDEX', 'SET_QUNAME']),
            chartHide(val) {
                this.enlarge = val
            },
            tabClick(index, item) {   //台区按钮点击
                this.nowIndex = index
                this.ldbId = item.ldbId
                this.ldbmc = item.ldbmc
                this.queryAbnormalPie()
                this.pieRepair()
                this.queryAbnormalLine()
            },
            Tolink(item, path) {  // 
                this.$router.push({
                    path: '/' + path,
                    name: path,
                    query: item
                })
            },
            timeRange(val) {  //获取时间范围
                this.dateRange = val
                if (this.ldbArr.length != 0) {
                    this.queryAbnormalPie()
                    this.queryAbnormalLine()
                    this.barAbnormal()
                    this.pieRepair()
                    this.repairRatio()
                }
            },
            onLdbChange() {  //台区选择
            },
            ldbConfirm() {   //台区选择确定事件
                this.ldbVisible = false
                let values = this.$refs.ldbPicker.getValues()
                let qIndex = this.cityArr[this.cityIndex].qu.indexOf(values[0])
                this.quName = values[0].xzqhmc.substring(0, 3)
                this.xzqh = values[0].xzqh
                this.ldbArr = this.ldbArray.filter((item) => { return item.sjqhm == this.xzqh })
                this.ldbId = this.ldbArr[0].ldbId
                this.ldbmc = this.ldbArr[0].ldbmc
                this.SET_QUNAME(this.quName)
                this.SET_QUINDEX(qIndex)
                this.nowIndex = 0
                this.queryAbnormalPie()
                this.queryAbnormalLine()
                this.barAbnormal()
                this.pieRepair()
                this.repairRatio()
            },
            aScroll() {  //台区盒子滚动监听
                let scrollL = this.$refs.scrollabnormal.scrollLeft
                this.$refs.scrollrepair.scrollLeft = scrollL
            },
            rScroll() { // 台区盒子滚动监听
                let scrollL = this.$refs.scrollrepair.scrollLeft
                this.$refs.scrollabnormal.scrollLeft = scrollL
            },
            getAddress() {   //获取台区数据
                let _this = this
                this.cityId = this.$route.query.cityId;
                let cityLdb = {
                    czrbh: this.userInfo.userId,
                    city: this.cityId
                }
                api.getLdbList(cityLdb).then(function (res) {
                    _this.ldbArray = JSON.parse(res.ldb)
                    _this.ldbArr = _this.ldbArray.filter((item) => { return item.sjqhm == _this.xzqh })
                    _this.ldbId = _this.ldbArr[0].ldbId
                    _this.ldbmc = _this.ldbArr[0].ldbmc
                    _this.queryAbnormalPie()
                    _this.queryAbnormalLine()
                    _this.barAbnormal()
                    _this.pieRepair()
                    _this.repairRatio()
                })
            },
            rem(val) {   // echarts 自适应
                let font_size = parseFloat(getComputedStyle(window.document.documentElement)['font-size'])
                val = val * font_size
                return val
            },
            enlargeClick(option) {   // 图标放大按钮点击
                // this.enlarge = true
                // this.chartOption = option
                this.$router.push({
                    path: '/chartenlatge',
                    name: 'chartenlarge',
                    query: {
                        pOption: option,
                        timeRange: this.dateRange.show
                    }
                })
            },
            load() {  // 获取行政区  台区档案
                this.ldbSlot[0].values = this.cityArr[this.cityIndex].qu
                this.ldbSlot[0].defaultIndex = this.quIndex
                this.quName = this.ldbSlot[0].values[this.quIndex].xzqhmc.substring(0, 3)
                this.xzqh = this.cityArr[this.cityIndex].qu[this.quIndex].xzqh
                this.getAddress()
                this.$refs.scrollabnormal.addEventListener('scroll', this.aScroll)
                this.$refs.scrollrepair.addEventListener('scroll', this.rScroll)
            },
            queryAbnormalPie() {  //台区异常数  /全区异常数
                let _this = this
                let data = {}
                data.kssj = this.dateRange.hid.start
                data.jssj = this.dateRange.hid.end
                data.xfbz = ''
                data.ldbId = this.ldbId
                data.xzqh = this.xzqh
                data.city = this.cityId
                api.queryAbnormalPie(data).then(function (res) {
                    _this.abnormalCount = res.data
                })
            },
            queryAbnormalLine() {  //查询台区异常折线图
                let _this = this
                let data = {}
                data.kssj = this.dateRange.hid.start
                data.jssj = this.dateRange.hid.end
                data.xzqh = this.xzqh
                data.ldbId = this.ldbId
                this.chartsData.line.title.text = this.ldbmc + "异常数据折线图"
                api.queryAbnormalLine(data).then(function (res) {
                    let data = JSON.parse(res.data)
                    let x = []
                    let y = []
                    for (let i = 0; i < data.length; i++) {
                        x.push(data[i].fssj.slice(5, 10))
                        y.push(data[i].yccs)
                    }
                    _this.chartsData.line.xAxis.data = x
                    _this.chartsData.line.series[0].data = y
                })
            },
            barAbnormal() {  //每个台区异常数
                let data = {}
                let _this = this
                data.kssj = this.dateRange.hid.start
                data.jssj = this.dateRange.hid.end
                data.xfbz = ''
                data.ldbId = ''
                data.xzqh = this.xzqh
                data.city = this.cityId
                this.chartsData.bar.title.text = this.quName + '台区异常数据柱状图'
                api.barAbnormal(data).then(function (res) {
                    let data = JSON.parse(res.data)
                    let x = []
                    let y = []
                    for (let i = data.length - 1; i >= 0; i--) {
                        x.push(data[i].ldbmc.split('(')[0])
                        y.push(data[i].yccs)
                    }
                    _this.chartsData.bar.xAxis.data = x
                    _this.chartsData.bar.series[0].data = y
                })
            },
            pieRepair() {  //修复饼图 数据
                let _this = this
                let data = {}
                data.kssj = this.dateRange.hid.start
                data.jssj = this.dateRange.hid.end
                data.xfbz = 1
                data.ldbId = this.ldbId
                data.xzqh = this.xzqh
                data.city = this.cityId
                api.pieRepair(data).then(function (res) {
                    _this.ldbRepairC = res.data
                })
            },
            repairRatio() {  //修复柱状图 数据
                let _this = this
                let data = {}
                data.kssj = this.dateRange.hid.start
                data.jssj = this.dateRange.hid.end
                data.xfbz = 1
                data.ldbId = ''
                data.xzqh = this.xzqh
                data.city = this.cityId
                this.chartsData.barstack.title.text = this.quName + "台区异常修复对比图"
                api.repairRatio(data).then(function (res) {
                    let no = res.data.listNo
                    let yes = res.data.listYes
                    let barRatioX = []
                    let barRatioYall = []
                    let barRatioYr = []
                    for (var i = 0; i < no.length; i++) {
                        barRatioX.push(no[i].ldbmc.split('(')[0])
                        barRatioYall.push(no[i].yccs)
                        barRatioYr.push('0')
                    }
                    for (var i = 0; i < no.length; i++) {
                        for (var k = 0; k < yes.length; k++) {
                            if (yes[k].ldbId == no[i].ldbId) {
                                barRatioYr[i] = yes[k].yccs
                                barRatioYall[i] = barRatioYall[i] + yes[k].yccs
                            }
                        }
                    }
                    _this.chartsData.barstack.xAxis.data = barRatioX.reverse()
                    _this.chartsData.barstack.series[0].data = barRatioYall.reverse()
                    _this.chartsData.barstack.series[1].data = barRatioYr.reverse()
                })
            }
        },
        mounted() {
            this.load()
        }
    }
</script>

<style scoped lang="scss">
    @import '@/style/mixin.scss';
    .filter-box {
        @include wh(100%, 100%)
    }

    .search-icon {
        position: absolute;
        right: 0.3rem;
        @include wh(0.56rem, 0.58rem) @include bg('../../images/common/sousuo.png')
    }

    .xl-blue {
        display: inline-block;
        margin-left: 0.11rem;
        margin-bottom: 0.05rem;
        @include wh(0.36rem, 0.2rem) @include bg('../../images/common/downblue.png')
    }

    .xfBtn {
        position: absolute;
        color: white;
        bottom: 0.3rem;
        right: 0.3rem;
        border-radius: 0.5rem;
        @include wh(2.2rem, 0.88rem);
        line-height: 0.88rem;
        background: rgba(22, 154, 255, 1);
    }

    .gray {
        color: #cccccc
    }

    .b_radius {
        border-radius: 0.4rem;
    }

    .bg_gray {
        background: #161824
    }

    .t_l {
        text-align: left
    }

    .ldb_wrap {
        overflow-x: scroll;
        width: 100%;
    }

    .ldb_box {
        width: max-content
    }

    .ldb_tab {
        float: left;
        padding: 0.12rem 0.3rem;
        color: white;
        border-radius: 40px;
        white-space: nowrap;
    }

    .active {
        background: rgba(37, 68, 109, 1);
    }

    .charts {
        @include wh(4.22rem, 4.22rem) margin: auto;
    }

    .repairCharts {
        @include wh(3.3rem, 3.3rem) margin: auto;
    }

    .enlarge {
        top: 0.3rem;
        right: 0.3rem;
        width: 0.58rem;
        height: 0.58rem;
        z-index: 100
    }

    .orange_large {
        @include bg('../../images/common/orangeenlarge.png')
    }

    .pu_large {
        @include bg('../../images/common/puenlarge.png')
    }

    .yellow_large {
        @include bg('../../images/common/yellowenlarge.png')
    }

    .enlarge_popup {
        width: 100%;
        height: 100%;
    }

    .li_box {
        height: 0.4rem;
    }
</style>