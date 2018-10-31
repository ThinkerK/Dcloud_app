<template>
    <div class="highstock">
        <div id="container"></div>
    </div>
</template>
<script>

    import Highcharts from 'highcharts/highstock'
    export default {
        data() {
            return {

            }
        },
        watch: {
           
        },
        methods: {
            path() {
                Highcharts.stockChart('container', {
                    chart: {
                        panning: true,
                        zoomType: null,
                        pinchType: null,
                        followTouchMove:false
                    },
                    rangeSelector: {
                        selected: 1
                    },
                    title: {
                        text: '滑动'
                    },
                    scrollbar:{
                        enabled:false
                    },
                    navigator: {
                        enabled: false
                    },
                    series: [{
                        name: '滑动',
                        data:[ ['周一',123],
                            ['周二',10],
                            ['周三',30],
                            ['周四',50],
                            ['周五',80],
                            ['周六',160],
                            ['周日',50],
                            ['周期',10]],
                        type: 'areaspline',
                        threshold: null,
                        fillColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, Highcharts.getOptions().colors[0]],
                                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                            ]
                        }
                    }]
                });
            }
        },
        mounted() {
            this.path()
            console.log(Highcharts)
        }
    }
</script>
<style scoped>
    .highstock {
        width: 100%;
        height: 100%;

    }
</style>