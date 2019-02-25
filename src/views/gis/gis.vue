<template>
	<div class="map-warning">
		<head-top goBack="true" headTitle="GIS实况">
		</head-top>
		<div class="city-map">
			<baidu-map class="map" :center="center" :zoom="zoom" :mapStyle="mapTheme" :dragging=true :scroll-wheel-zoom=true
			 :minZoom=4 :maxZoom=19 @ready="handler" @longpress="markerLongTab" @click="mapTab">
				<!--海量点-->
				<!-- <bm-point-collection v-for="(item,index) in addMassPointData" :points="item.points" :shape="item.shape" :color="item.color"
				 :size="item.size" :key='index+"b"'></bm-point-collection> -->
				<bm-point-collection v-for="(item,index) in addMassPointData" :points="item.points" :shape="item.shape" :color="item.color"
				 :size="item.size" :key='index+"b"'></bm-point-collection>
				<!--覆盖物-->
				<!-- <bm-label content="" :position="item.position" :labelStyle="labelStyle" :offset="labelOffset"  :key=index v-for="(item,index) in addMarkerPointsData"/> -->
				<bm-marker :position="item.position" :key=index v-for="(item,index) in addMarkerPointsData" :title="item.title"
				 :icon="{url: item.icon, size: {width: item.size.width, height: item.size.height}}" @click='showInfo(item,index)'>
					<bm-label content="" :labelStyle="labelStyle" :offset="labelOffset" v-if="index == labelIndex" />
				</bm-marker>

				<bm-marker :position="topmarker.position" :title="topmarker.title" :icon="{url: topmarker.icon, size: {width: topmarker.size.width, height: topmarker.size.height}}"
				 v-if="infoFlag">
				</bm-marker>
				<!-- <bm-circle :center="circleCenter" :radius="circleRadius" stroke-color="transparent" :stroke-opacity="1" fill-color="#169AFF" :stroke-weight="0" v-if ="infoFlag"></bm-circle> -->
			</baidu-map>
		</div>
		<mt-popup v-model="infoFlag" position="bottom" style="background:none" :modal="false">
			<div class="info-box">
				<div class="info-tit">{{ipoleInfo.dgmc}} <span>{{ipoleInfo|statusInfo}}</span></div>
				<div class="info-con">灯杆号：{{ipoleInfo.dgbh}}</div>
				<div class="info-con">供电路由：{{ipoleInfo.ldbmc}}</div>
			</div>
		</mt-popup>
		<ul v-show="longTabBox" :style="{left:meauLeft+'px',top:meauTop+'px'}" class="long-tab-box" @click="menuSelect">
			<li>运行数据</li>
			<li>上报事件</li>
			<li>操作记录</li>
			<li>标记备注</li>
		</ul>
	</div>
</template>

<script>
	import themes from './themes'
	import getImg from './getImg'
	import service from './service'
	import headTop from '@/components/header/mainHeader'
	import { vueTouch } from './touch'
	import { Toast } from 'mint-ui'

	export default {
		name: 'map-warning',
		components: {
			headTop
		},
		data() {
			return {
				longTabBox: false,
				topmarker: {},   //marker 选中之后的覆盖物 信息
				labelIndex: '-1',
				labelStyle: {},
				labelOffset: {},
				circleCenter: {
					lat: '122.223',
					lng: '23.223'
				},
				circleRadius: '',
				infoFlag: false,
				ipoleInfo: {},
				center: '门头沟',
				zoom: 15,
				map: null,
				mapTheme: { styleJson: [] },//地图主题
				equipmentType: JSON.stringify([{ systemId: 'zm01,cs01', sblx: '0' }]),//设备
				addMassPointData: [],
				addMarkerPointsData: [],
				gisThemeSwitch: false,//黑夜
				//设备
				lightData: [],//灯数
				//headTab开关
				toggleHeatMapFlag: false,// 热力图切换标识
				meauLeft: -100,
				meauTop: -100,
				font_size: '',
			}
		},
		created() {
			this.mapTheme.styleJson = themes.night_theme;//默认地图主题
		},
		mounted() {
			this.font_size = parseFloat(getComputedStyle(window.document.documentElement)['font-size'])
		},
		filters: {
			statusInfo(obj) {
				let str = ''
				var ddjdyxzt = obj.ddjdyxzt;	//单灯节点运行状态
				var ipoleState = obj.ddldzt;	//单灯节点亮灯 1亮 0闭合 
				var ipoleFault = obj.ddjdycbz;	//灯杆异常1 异常 0不异常
				var defaultFlah = obj.sjczbs;	//判断未知
				if (defaultFlah === "1") { //有灯杆状态信息
					if (obj.ddtxycbz == 1) {// 通讯异常
						str = '通讯异常'
					}
					if (obj.ddddycbz == 1) {// 设备断电
						str = '电流异常'
					}
					if (ipoleState == 1 && ipoleFault == 0) {	//正常

					} else if (ipoleState == 1 && ipoleFault == 1) {	//异常
						str = "未知异常"
					} else if (ipoleState == 0 && ipoleFault == 0) {	//关灯

					} else if (ipoleState == 0 && ipoleFault == 1) {	//故障
						str = "未知故障"
					}

				}
				return str
			}
		},
		methods: {
			mapTab() {
				this.longTabBox = false
				// this.infoFlag = false
			},
			markerLongTab(e) {
				if (e.domEvent.path[0].className == "BMap_Marker BMap_noprint") {
					this.longTabBox = true
					const menuMinWidth = 3 * this.font_size
					const menuMinHeight = 5 * this.font_size
					const offsetLeft = this.$el.getBoundingClientRect().left
					const offsetWidth = this.$el.offsetWidth
					const maxLeft = window.screen.width - menuMinWidth
					const maxTop = window.screen.height - menuMinHeight - 2.5*this.font_size
					const left = e.pixel.x
					const top = e.pixel.y
					const boxMargin = 0.3 * this.font_size

					if (left+boxMargin > maxLeft) {
						this.meauLeft = left - menuMinWidth - boxMargin
					} else {
						this.meauLeft = left + boxMargin
					}
					if (top+boxMargin > maxTop) {
						this.meauTop = top - menuMinHeight - boxMargin
					} else {
						this.meauTop = top + boxMargin
					}
				} else {
					console.log('none')
				}

				// this.meauTop = e.pixel.y + 15
			},
			markerClearTab() {
				console.log('clear')
			},
			handler({ BMap, map }) {
				this.map = map;
				let { addEventListenerMap } = this;
				addEventListenerMap();//监听地图拖拽缩放	
			},
			showInfo(item, index) {
				this.topmarker = item
				this.labelIndex = index
				this.circleCenter.lat = item.position.lat
				this.circleCenter.lng = item.position.lng
				// console.log(this.circleCenter)
				this.ipoleInfo = item.data
				this.infoFlag = true
			},
			//监听大地图的拖拽以及缩放事件
			addEventListenerMap() {
				let { map, zoomChange } = this;

				//监听缩放
				map.addEventListener("zoomend", function () {
					zoomChange();
				});
				// 监听拖动事件
				map.addEventListener("moveend", function () {
					zoomChange();
				});
			},
			zoomChange() {
				this.infoFlag = false
				this.longTabBox = false
				let { map, clearMapData, parameter, addMarkers, addMassPoint } = this;
				clearMapData();
				let data = parameter(map);
				let zoom = map.getZoom();//获取zoom
				if (zoom >= 17) {
					this.labelIndex = '-1'
					addMarkers(data);
					if (zoom == 17) {
						this.circleRadius = 22
						this.labelStyle = {
							width: '25px',
							height: '25px',
							borderRadius: '100px',
							background: '#169AFF',
							border: 'none'
						},
							this.labelOffset = { width: 2, height: -5 }
					}
					if (zoom == 18) {
						this.circleRadius = 12
						this.labelStyle = {
							width: '30px',
							height: '30px',
							borderRadius: '100px',
							background: '#169AFF',
							border: 'none',
							zIndex: 1
						}
						this.labelOffset = { width: 0, height: -7 }
					}
					if (zoom == 19) {
						this.circleRadius = 8
						this.labelStyle = {
							width: '34px',
							height: '34px',
							borderRadius: '100px',
							background: '#169AFF',
							border: 'none'
						}
						this.labelOffset = { width: 5, height: -7 }
					}
				} else if (zoom >= 14 && zoom < 17) {
					addMassPoint(data);//添加海量点
				}
			},
			//调接口前初始化数据
			clearMapData() {
				let { map } = this;
				//清除数据
				this.lightData = [];//灯数据
				this.addMassPointData = [];//清除海量点
				this.addMarkerPointsData = [];//清楚覆盖物点
				map.clearOverlays();
			},
			//掉借口所传参数
			parameter() {
				let { map, equipmentType } = this;
				let bs = map.getBounds(); // 获取可视区域
				if (bs.getSouthWest() == null) {
					return
				}
				let bssw = bs.getSouthWest(); // 可视区域左下角
				let bsne = bs.getNorthEast(); // 可视区域右上角
				let data = {}
				data.zhcq = "110109"
				data.ldbId = ''
				data.norflag = '1,2'
				data.unusflag = '1,2'
				data.sbztflag = '1,2'
				data.lng1BigDecimal = bssw.lng
				data.lat1BigDecimal = bssw.lat
				data.lng2BigDecimal = bsne.lng
				data.lat2BigDecimal = bsne.lat
				return data;
			},
			//大地图添加海量点
			addMassPoint(data) {
				let { massPointSize, gisThemeSwitch } = this;
				let that = this;
				service.getAllData(data).then(data => {
					let normalArr = [];//正常
					let abnormalArr = [];//异常
					let offLightArr = [];//关灯
					for (var i = 0; i < data.length; i++) {
						var obj = data[i];
						obj.lng = obj.jd;
						obj.lat = obj.wd;
						var ipoleState = obj.ddldzt;	// 单灯节点亮灯	 1：亮         0：不亮 
						var defaultFlah = obj.sjczbs;	// 判断未知
						if (defaultFlah === "1") { // 有灯杆状态信息
							if (obj.ddjddlycbz == 1 || obj.ddjdztycbz == 1) {	//故障（继电器异常或电流异常显示为红色故障）
								abnormalArr.push(obj);
								continue;
							}
							if (ipoleState == 1) {// 正常
								normalArr.push(obj);
							} else if (ipoleState == 0) {// 关灯
								offLightArr.push(obj);
							}
						} else {	//关灯状态
							offLightArr.push(obj);
						}
					}
					let color = gisThemeSwitch ? '#adadad' : "#fff";//颜色
					var size = massPointSize();

					that.addMassPointData = [{ points: normalArr, shape: 'BMAP_POINT_SHAPE_CIRCLE', color: "#f5de1f", size: size },
					{ points: abnormalArr, shape: 'BMAP_POINT_SHAPE_CIRCLE', color: "#e00303", size: size },
					{ points: offLightArr, shape: 'BMAP_POINT_SHAPE_CIRCLE', color: "#adadad", size: size }];
					//					afterAddMarker();
				})
			},
			//大地图海量点大小
			massPointSize() {
				const { map } = this;
				let zoom = map.getZoom();
				let size = '';
				if (zoom == 14) {
					size = 'BMAP_POINT_SIZE_SMALLER';
				} else if (zoom == 15) {
					size = 'BMAP_POINT_SIZE_SMALL';
				} else if (zoom == 16) {
					size = 'BMAP_POINT_SIZE_NORMAL';
				} else if (zoom == 17) {
					size = 'BMAP_POINT_SIZE_BIG';
				}
				return size;
			},
			//大地图添加覆盖物
			addMarkers(data) {
				let { getMarkerPosition, afterAddMarker, toggleHeatMapFlag } = this;
				let that = this;
				service.getAllData(data).then(data => {
					for (let i = 0; i < data.length; i++) {
						var obj = data[i];
						obj.lng = obj.jd;
						obj.lat = obj.wd;
						let addMarkerObj = getMarkerPosition(obj);//需要添加的覆盖物
						this.addMarkerPointsData.push(addMarkerObj);
					}
				})
			},
			//获取覆盖物经纬度
			getMarkerPosition(obj) {
				let { getMarkerImgAndSize, gisThemeSwitch, toggleHeatMapFlag, deviceChangeText } = this;
				let zoom = this.map.getZoom();
				//经纬度
				let pt;
				pt = {
					lng: obj.lng,
					lat: obj.lat
				}

				//获取图片
				let iconObj = getImg.getImgFromJs.getMarkerImgAndSize(obj, zoom, gisThemeSwitch);

				//点击marker处理数据形式
				let data, title;
				data = obj;
				title = '';

				//文字切换
				let content = {
					display: false
				}
				//一个marker
				let markerObj = {
					position: pt,
					icon: iconObj.icon,
					size: iconObj.size,
					data: data,//数据
					title: title,//鼠标移入的文字
					label: content,//文字切换
				}

				return markerObj;
			},
			menuSelect() {
				this.longTabBox = false
				Toast('功能开发中')
			}
		}
	}
</script>
<style>
	.anchorBL {
		display: none;
	}
</style>
<style lang="scss" scoped="">
	.map-warning {
		width: 100%;
		height: 100%;

		.city-map,
		.map {
			height: 100%;
			width: 100%;
		}

		.info-box {
			padding: .2rem;
			background: rgba(#ededed,.9);
			div {
				text-align: left;
			}

			.info-tit {
				text-align: left;
				font-size: .5rem;
				font-weight: 900;

				span {
					font-size: .4rem;
					font-weight: 400;
					float: right;
					color: red;
				}
			}

			.info-con {
				padding-top: .1rem;
				font-size: .4rem;
			}
		}
	}

	.long-tab-box {
		border-radius: .2rem;
		min-width: 3rem;
		max-height: 5rem;
		overflow-y:scroll;
		position: absolute;
		padding: 0 .2rem;
		font-size: .45rem;
		top: 0;
		left: 0;
		color: white;
		background: rgba(#4c4c4c, .9);
		z-index: 1000000;

		li {
			padding: .3rem 0;
			border-bottom: 1px solid #5d5d5d;
			&:last-child {
				border: none
			}
		}
	}
</style>