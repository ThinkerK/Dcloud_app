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
            <div class="dates-box">{{dateRange}}</div>
            <div class="scroll-box flex1" id="scrollbox" style="background: #0d1019">
                <div id="scrollcon">
                    <div>
                        <div class="padding padding_tb gray bg_gray t_l">异常数据</div>
                        <div class='padding'>
                            <div class="con-list-sm padding padding_tb bg_gray b_radius">
                                <div class="ldb_wrap" ref="scrollabnormal">
                                    <ul class='ldb_box t_l'>
                                        <li class="ldb_tab" v-for="(item,index) in ldbArr" :key="index" :class="{active : nowIndex == index}" @click=tabClick(index,item)>
                                            {{item.ldbmc}}
                                        </li>
                                    </ul>
                                </div>
                                <div class="padding_tb font-blue">台区异常数据占比图</div>
                                <div class="padding_tb">
                                    <div class="charts">
                                        <progress-bar data="60" procolor="#169AFF">
                                            <div slot="titcon">
                                                <div style="font-size: 0.9rem">
                                                    60%
                                                </div>
                                                <div style="font-size: 0.48rem">
                                                    231条
                                                </div>
                                            </div>
                                        </progress-bar>
                                    </div>
                                </div>
                                <div class="padding_tb font-blue">异常总数：12341条</div>
                            </div>
                        </div>
                        <div class='padding'>
                            <div class="con-list-sm padding padding_tb bg_gray b_radius" style="height: 5.73rem">
                                <e-chart :option='chartsData.line'></e-chart>
                            </div>
                        </div>
                        <div class='padding'>
                            <div class="con-list-sm padding padding_tb bg_gray b_radius" style="height: 7.88rem">
                                <e-chart :option='chartsData.bar'></e-chart>
                            </div>
                        </div>

                    </div>
                    <div>
                        <div class="padding padding_tb gray bg_gray t_l" style="margin-top: 0.3rem">修复数据</div>
                        <div class='padding'>
                            <div class="con-list-sm padding padding_tb bg_gray b_radius">
                                <div class="ldb_wrap" ref="scrollrepair">
                                    <ul class='ldb_box t_l'>
                                        <li class="ldb_tab" v-for="(item,index) in ldbArr" :key="index" :class="{active : nowIndex == index}" @click=tabClick(index,item)>
                                            {{item.ldbmc}}
                                        </li>
                                    </ul>
                                </div>
                                <div class="flex_between">
                                    <div class="flex1">
                                        <div class="padding_tb font-blue">台区已修复数据占比图</div>
                                        <div class="padding_tb">
                                            <div class="repairCharts">
                                                <progress-bar data="60" procolor="#169AFF">
                                                    <div slot="titcon">
                                                        <div style="font-size: 0.72rem">
                                                            60%
                                                        </div>
                                                        <div style="font-size: 0.36rem">
                                                            231条
                                                        </div>
                                                    </div>
                                                </progress-bar>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex1">
                                        <div class="padding_tb font_orgin">台区已修复数据占比图</div>
                                        <div class="padding_tb">
                                            <div class="repairCharts">
                                                <progress-bar data="60" procolor="#FEE578">
                                                    <div slot="titcon">
                                                        <div style="font-size: 0.72rem">
                                                            60%
                                                        </div>
                                                        <div style="font-size: 0.36rem">
                                                            231条
                                                        </div>
                                                    </div>
                                                </progress-bar>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='padding'>
                            <div class="con-list-sm padding padding_tb bg_gray b_radius" style="height: 7.88rem">
                                <e-chart :option='chartsData.barstack'></e-chart>
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
    </div>
</template>

<script>
    import headTop from '@/components/header/mainHeader'
    import dateFilter from '@/components/common/dateFilter'
    import api from '../../service/data.js'
    import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'


    export default {
        components: {
            headTop,
            dateFilter
        },
        data() {
            return {
                quName: '',   //区名称
                dateRange: '',  //时间范围
                ldbVisible: false,  //台区显示隐藏
                statusVisible: false,  //状态显示隐藏
                ldbmc: '门头沟区',
                ldbSlot: [{
                    flex: 1,
                    values: ['门头沟区', '海淀区'],
                    className: 'slot1'
                }],
                xzqh: '',//行政区号
                nowIndex: 0,
                ldbArr: [],
                chartsData: {
                    line: {
                        grid: {
                            top: '25%',
                            bottom: "11%"
                        },
                        xAxis: {
                            boundaryGap: false, //从0开始
                            data: ["10.24", "10.25", "10.26", "10.27", "10.28", "10.29", '10.30'],
                        },
                        title: {
                            text: '台区异常数据占比图',
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
                            data: [5, 20, 36, 10, 10, 20, 5]
                        }]
                    },
                    bar: {
                        grid: {
                            bottom: '30%',
                        },
                        title: {
                            text: '台区异常数据占比图',
                            textStyle: {
                                color: '#FC2D8A',
                            },
                        },
                        xAxis: {
                            // data: ["10.24", "10.25", "10.26", "10.27", "10.28", "10.29", '10.30'],
                            data: ['四海汽车', '永定分校', '绝对是更加稳固', '', '', '', '', '', '', '', ''],
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
                            data: [5, 20, 36, 10, 10, 20, 5, 5, 20, 36, 10, 10, 20, 5],
                            // data: [5, 20],
                            label: {
                                normal: {
                                    color: '#FC2D8A'
                                }
                            }
                        }]
                    },
                    barstack: {
                        // legend: {
                        //     data: ['已修复', '异常数']
                        // },
                        title: {
                            text: '台区异常数据占比图',
                            textStyle: {
                                color: '#FEE578',
                            },
                        },
                        grid: {
                            bottom: '30%',
                        },
                        xAxis: {
                            // data: ["10.24", "10.25", "10.26", "10.27", "10.28", "10.29", '10.30'],
                            data: ['四海汽车', '永定分校', '绝对是更加稳固', '', '', '', '', '', '', '', ''],
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
                            data: [5, 20, 36, 10, 10, 20, 5, 5, 20, 36, 10, 10, 20, 5],
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
                            data: [2, 12, 20, 6, 7, 18, 3, 4, 18, 22, 1, 6, 12, 3],
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

            }
        },
        computed: {
            ...mapGetters(['cityArr', 'cityIndex', 'quIndex', 'userInfo'])
        },
        methods: {
            ...mapMutations(['SET_CITYINDEX', 'SET_QUINDEX', 'SET_QUNAME']),
            tabClick(index, item) {
                this.nowIndex = index
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
                this.SET_QUNAME(this.quName)
                this.SET_QUINDEX(qIndex)
                this.nowIndex = 0
            },
            aScroll() {
                let scrollL = this.$refs.scrollabnormal.scrollLeft
                this.$refs.scrollrepair.scrollLeft = scrollL
            },
            rScroll() {
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
                })
            },
            rem(val) {
                let font_size = parseFloat(getComputedStyle(window.document.documentElement)['font-size'])
                val = val * font_size
                return val
            }
        },
        mounted() {
            this.ldbSlot[0].values = this.cityArr[this.cityIndex].qu
            this.ldbSlot[0].defaultIndex = this.quIndex
            this.quName = this.ldbSlot[0].values[this.quIndex].xzqhmc.substring(0, 3)
            this.xzqh = this.cityArr[this.cityIndex].qu[this.quIndex].xzqh
            this.getAddress()
            this.$refs.scrollabnormal.addEventListener('scroll', this.aScroll)
            this.$refs.scrollrepair.addEventListener('scroll', this.rScroll)
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
        width: 1000rem;
    }

    .ldb_tab {
        float: left;
        padding: 0.12rem 0.3rem;
        color: white;
        border-radius: 40px;
    }

    .active {
        background: rgba(37, 68, 109, 1);
    }

    .charts {
        @include wh(4.22rem, 4.22rem) margin: auto;
    }

    .repairCharts {
        @include wh(3rem, 3rem) margin: auto;
    }
</style>