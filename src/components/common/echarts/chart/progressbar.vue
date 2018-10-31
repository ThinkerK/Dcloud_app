<template>
    <div class="progress_bar">
        <div class="tit_box">
           <slot name = "titcon"></slot>
        </div>
        <div class="progress_bar mysvg">

        </div>
    </div>
</template>

<script>
    import Highcharts from 'highcharts/highstock';
    import HighchartsMore from 'highcharts/highcharts-more';
    import SolidGauge from 'highcharts/modules/solid-gauge.js'
    HighchartsMore(Highcharts)
    SolidGauge(Highcharts);
    export default {
        name: 'progress-bar',
        data() {
            return {
                font_size: '',
            }
        },
        props: ['data', 'procolor', 'path'],
        methods: {
            chartDraw() {
                // 去掉这里的注释就是类似 Apple Watch 上的效果了
                if (!Highcharts.theme) {
                    Highcharts.setOptions({
                        chart: {
                            backgroundColor: 'transparent'
                        },
                        colors: [this.procolor],
                    });
                }
                Highcharts.chart(this.$el.children[1], {
                    chart: {
                        type: 'solidgauge',
                        marginTop: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 0,
                    },
                    credits: {
                        enabled: false
                    },
                    tooltip: {
                        enabled: false
                    },
                    title: {
                        text: '台区异常数据占比图',
                        style: {
                            fontSize: 0.42 * this.font_size,
                            color: this.procolor
                        },
                        y: -1000000
                    },
                    pane: {
                        startAngle: 0,
                        endAngle: 360,
                        background: [{
                            outerRadius: '112%',
                            innerRadius: '88%',
                            // backgroundColor: 'red',
                            backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.3).get(),
                            borderWidth: 0
                        }]
                    },
                    yAxis: {
                        min: 0,
                        max: 100,
                        lineWidth: 0,
                        tickPositions: []
                    },
                    plotOptions: {
                        solidgauge: {
                            borderWidth: '9%',
                            dataLabels: {
                                enabled: false
                            },
                            linecap: 'round',
                            stickyTracking: false
                        }
                    },
                    series: [{
                        name: 'Move',
                        borderColor: this.procolor,
                        data: [{
                            color: Highcharts.getOptions().colors[0],
                            // color:'yellow',
                            radius: '100%',
                            innerRadius: '100%',
                            y: parseInt(this.data)
                        }]
                    }]
                })
            }
        },
        mounted() {
            this.font_size = parseFloat(getComputedStyle(window.document.documentElement)['font-size'])
            this.chartDraw()
            let _this = this

            // setInterval(function(){
            //     _this.y = Math.ceil(Math.random()*100)
            //     _this.chartDraw()
            // },1000)
        },
        watch: {
            // path(){
            //     console.log(1)
            //     this.chartDraw()
            // }
        }
    }
</script>

<style scoped lang="scss">
    .progress_bar {
        position: relative;
        width: 100%;
        height: 100%
    }

    .tit_box {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 50%;
        height: 50%;
        color: white;
        padding-top: 3%;
    }
</style>