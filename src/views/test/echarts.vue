<template>
    <div class="full">
        <div class="chart_box">
            <e-chart :option='line'></e-chart>
        </div>
        <div class="bar_chart">
            <e-chart :option='bar'></e-chart>
        </div>
        <div class="bar_stack">
            <e-chart :option="barstack"></e-chart>
        </div>
        <div class="progress_bar">
            <progress-bar data="10" procolor="#169AFF">
                <div slot="tit">
                    123
                </div>
            </progress-bar>
        </div>
        <div class="progress_bar">
            <progress-bar data="20" procolor="#169Add"></progress-bar>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
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
                    series: [{
                        name: '已修复',
                        type: 'bar',
                        color: "#FEE578",
                        stack: "异常",
                        barWidth: this.rem(0.3),
                        data: [2, 12, 20, 6, 7, 18, 3, 4, 18, 22, 1, 6, 12, 3],
                        // data: [5, 20],
                        label: {
                            normal: {
                                show:false
                            }
                        }
                    }, {
                        name: '异常数',
                        type: 'bar',
                        color: "#999999",
                        barWidth: this.rem(0.3),
                        // barGap: '-100%',
                        stack: "异常",
                        data: [5, 20, 36, 10, 10, 20, 5, 5, 20, 36, 10, 10, 20, 5],
                        // data: [5, 20],
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                color: 'white',
                                fontSize: this.rem(0.36)
                            }
                        },
                    },



                    ]
                }
            }
        },
        methods: {
            rem(val) {
                let font_size = parseFloat(getComputedStyle(window.document.documentElement)['font-size'])
                val = val * font_size
                return val
            }
        },
        mounted() {

        },
    }
</script>

<style scoped lang="scss">
    .full {
        background: #161824;
        height: auto
    }

    .chart_box {
        height: 5.53rem;
    }

    .bar_chart {
        height: 7.88rem
    }

    .bar_stack {
        height: 7.88rem
    }

    .progress_bar {
        height: 5rem;
        width: 5rem;
    }
</style>