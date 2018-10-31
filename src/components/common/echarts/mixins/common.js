
class mixin {
	constructor(){
		this.methods = {
			base(){
                let font_size = parseFloat(getComputedStyle(window.document.documentElement)['font-size'])
				return {
                    grid: {
                        left: '10%',   //距离左边的距离
                        right: '5%', //距离右边的距离
                        top: '18%' //距离上边的距离
                    },
                    tooltip: {},
                    // legend: {
                    //     data: ['销量']
                    // },
                    dataZoom: [{  //滚动条
                        type: 'inside',
                        throttle:'0',
                        startValue: 0,
                        endValue: 6,
                    }],
                    title:{
                        text:'',
                        show:true,
                        textStyle:{
                            fontSize:0.42*font_size,
                            fontWeight:'normal',
                        },
                        textColor:'red',
                        left:'center'
                    },
                    xAxis: {
                        splitLine: { show: false },  //网格线
                        axisLine: {
                            lineStyle: {
                                type: 'solid',
                                color: '#000',
                                width: '1'
                            }
                        },
                        axisLabel: { //字体样式
                            show: true,
                            textStyle: {
                                color: '#999999',
                                fontSize: 0.36 * this.font_size
                            },
                        },
                        axisTick: {  //刻度线
                            show: false
                        }, 
                    },
                    yAxis: {
                        type: 'value',
                        splitLine: { show: false },  //网格线
                        axisLine: {   //轴样式
                            lineStyle: {
                                type: 'solid',
                                color: '#000',
                                width: '1'
                            }
                        },
                        axisLabel: { //字体样式
                            show: true,
                            textStyle: {
                                color: '#999999',
                                fontSize: 0.36 * this.font_size
                            }
                        },
                        axisTick: {  //刻度线
                            show: false
                        }
                    },
                    series: [{
                        name: '异常数',
                        type: 'line',
                        color: "#FF5B2E",
                        // symbol:'circel',      //拐点样式
                        symbolSize: 0.25 * this.font_size,//拐点大小
                        itemStyle: {  //节点样式
                            normal: {
                                lineStyle: {
                                    width: 0.1*this.font_size
                                },
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                color: 'white',
                                fontSize: 0.36*font_size
                            }
                        },
                        barWidth:0.3*font_size,
                        smooth: true, //true 为平滑曲线，false为直线
                    }],
                    
                };
			},
		}
	}
}



export default new mixin();
