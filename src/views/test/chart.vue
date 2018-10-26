<template>
    <div class="chart-page">
    	
    	<div class="list">
    		<h-chart :option="areaspline" @ready="liu"></h-chart>
    	</div>
    	<div class="list">
    		<h-chart :option="column"></h-chart>
    	</div>
    	<div class="list">
    		<h-chart :option="column2"></h-chart>
    	</div>
    </div>
</template>
<script>
export default {
	data(){
		return {
			areaspline:{
				chart:{
					type: 'areaspline'
				},
				xAxis: {
					categories:['周一','周二','周三','周四','周五','周六','周日'],
					lineColor: '#000'
				},
				yAxis:{
					gridLineWidth: 0,
					lineColor: '#000'
				},
				plotOptions:{
					series: {
						dataLabels: {
							enabled: true,
							borderRadius: 6,
							padding: 2,
							backgroundColor: '#ff5b2e',
							borderWidth: 0,
							y: -10,
							style:{
								fontSize: 12,
								fontWeight: 'none',
							}
						}
					},
					areaspline:{
						fillColor: {
							linearGradient: {
								x1: 0,
								y1: 0,
								x2: 0,
								y2: 1
							},
							stops: [
								[0, '#612e27'],
								[1, '#301f25']
							]
						}
					}
				},
				series: [{
					dataLabels: {
						color: '#fff',
					},
					color:'#ff5b2e',
					name: '异常数据',
					data: [231, 315, 316, 350, 458, 342, 209]
				}]
			},
			column:{
				chart:{
					type: 'column',
					marginBottom:'60',
					marginTop: '30',
				},
				xAxis: {
					type: 'category',
					labels: {
						rotation: -45,  // 设置轴标签旋转角度
					},
					lineColor: '#000'					
				},
				yAxis:{
					gridLineWidth: 0,
					lineColor: '#000'
				},
				series: [{
					dataLabels: {
						color: '#fc2d8a',
					},
					color:'#fc2d8a',
					name: '安装，实施人员',
					data: [
						['上海', 125],
						['卡拉奇', 150],
						['北京', 151],
						['德里', 178],
						['拉各斯', 106],
						['天津', 120],
						['伊斯坦布尔', 116],
						['东京', 151],
						['广州', 108],
						['孟买', 144],
						['莫斯科', 119],
						['圣保罗', 103]
					]
				}]
			},
			column2:{
				chart:{
					type: 'column',
					marginBottom:'60'
				},
				xAxis: {
					categories: ['苹果', '橘子', '梨', '葡萄', '香蕉'],
					lineColor: '#000'
				},
				yAxis: {
					stackLabels: {  // 堆叠数据标签
						enabled: true,
						style: {
							fontWeight: 'bold',
							color: '#fee578'
						}
					},
					gridLineWidth: 0,
					lineColor: '#000'
				},
				plotOptions: {
					series: {
						stacking: 'normal',
						dataLabels: {
							enabled: false,
						}
					},
				},
				series: [{
					name: '小张',
					data: [5, 3, 4, 7, 2],
					color: '#999999'
				}, {
					name: '小彭',
					data: [2, 2, 3, 2, 1],
					color: '#fee578'
				}]
			},
			
			type:'daterange',
	        pickerOptions2: {
	          shortcuts: [{
	            text: '最近一周',
	            onClick(picker) {
	              const end = new Date();
	              const start = new Date();
	              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
	              picker.$emit('pick', [start, end]);
	            }
	          }]
	        },
	        value5: '',
			
			
		}
	},
	watch:{
		value5:function(val,obj){
			this.type = 'month';
		}
	},
	methods:{
		liu(){
			
		},
		selectedtime: function () {
			
   		}
	}
}
</script>
<style scoped>
.chart-page{
  	width:100%;
  	height:100%;
  	
}
.list{
	width: 100%;
	height: 350px;
	border: 2px solid goldenrod;
	background: #161824;
}
</style>