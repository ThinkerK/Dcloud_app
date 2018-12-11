<template>
    <div class="echarts"></div>
</template>

<script>
    // 引入基本模板
    let echarts = require('echarts')
    // 引入柱状图组件
    require('echarts/lib/chart/bar')
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')
    import chartCommon from '../mixins/common.js'

    export default {
        mixins: [chartCommon],
        name: 'e-chart',
        data() {
            return {
                font_size: '',
            }
        },
        props:['option'],
        methods: {
            deepObjectMerge(FirstOBJ, SecondOBJ) { // 深度合并对象
                for (var key in SecondOBJ) {
                    FirstOBJ[key] = FirstOBJ[key] && FirstOBJ[key].toString() === "[object Object]" ?
                        this.deepObjectMerge(FirstOBJ[key], SecondOBJ[key]) : FirstOBJ[key] = SecondOBJ[key];
                }
                return FirstOBJ;
            },
            chartDraw() {
                let echart = echarts.init(this.$el)
                let option = this.deepObjectMerge(this.base(),this.option)
                // let option = {
                //     grid: {
                //         left: '10%',   //距离左边的距离
                //         right: '5%', //距离右边的距离
                //         bottom: '11%',//距离下边的距离
                //         top: '5%' //距离上边的距离
                //     },
                //     tooltip: {},
                //     // legend: {
                //     //     data: ['销量']
                //     // },
                //     dataZoom: [{  //滚动条
                //         type: 'inside',
                //         throttle: '0',
                //         startValue: 0,
                //         endValue: 6,
                //     }],
                //     xAxis: {
                //         boundaryGap: false,
                //         data: this.xData,
                //         axisLine: {
                //             lineStyle: {
                //                 type: 'solid',
                //                 color: '#000',
                //                 width: '1'
                //             }
                //         },
                //         axisLabel: { //字体样式
                //             show: true,
                //             textStyle: {
                //                 color: '#999999',
                //                 fontSize: 0.36 * this.font_size
                //             }
                //         },
                //         axisTick: {  //刻度线    
                //             show: false
                //         }
                //     },
                //     yAxis: {
                //         type: 'value',
                //         splitLine: { show: false },  //网格线
                //         axisLine: {   //轴样式
                //             lineStyle: {
                //                 type: 'solid',
                //                 color: '#000',
                //                 width: '1'
                //             }
                //         },
                //         axisLabel: { //字体样式
                //             show: true,
                //             textStyle: {
                //                 color: '#999999',
                //                 fontSize: 0.36 * this.font_size
                //             }
                //         },
                //         axisTick: {  //刻度线
                //             show: false
                //         }
                //     },
                //     series: [{
                //         name: '异常数',
                //         type: 'line',
                //         color: "#FF5B2E",
                //         // symbol:'circel',      //拐点样式
                //         symbolSize: 0.25 * this.font_size,//拐点大小
                //         areaStyle: {
                //             normal: {
                //                 color: new echarts.graphic.LinearGradient(
                //                     0, 0, 0, 1,
                //                     [
                //                         { offset: 0, color: '#FF5B2E' },
                //                         { offset: 0.6, color: '#582B27' },
                //                         { offset: 1, color: 'transparent' }
                //                     ]
                //                 )

                //             }
                //         },
                //         itemStyle: {  //节点样式
                //             normal: {
                //                 lineStyle: {
                //                     width: 0.1 * this.font_size
                //                 }
                //             }
                //         },
                //         smooth: true, //true 为平滑曲线，false为直线
                //         data: this.yData
                //     }]
                // };
                echart.setOption(option)
            }
        },
        mounted() {
            this.font_size = parseFloat(getComputedStyle(window.document.documentElement)['font-size'])
            this.chartDraw()
            let _this = this
            // setInterval(function(){
            //     _this.yData = []
            //     for(var i=0;i<7;i++){
            //         _this.yData.push(Math.ceil(Math.random()*1000))
            //     }
            //     _this.chartDraw()
            // },1000)
        },
        watch:{
            option:{
                handler (val, oldVal) {
                    this.chartDraw()
                },
                deep:true
            }
        }
    }
</script>

<style scoped lang="scss">
    .echarts {
        width: 100%;
        height: 100%
    }
</style>