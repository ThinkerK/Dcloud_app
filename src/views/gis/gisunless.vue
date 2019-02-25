<template>
	<div class="map-warning">
		<head-top goBack="true" headTitle="GIS实况">
		</head-top>
		<div class="city-map">
			<baidu-map class="map" :center="center" :zoom="zoom" :mapStyle="mapTheme" :dragging=true :scroll-wheel-zoom=true
			 :minZoom=4 :maxZoom=19 @ready="handler">
				<!--海量点-->
				<!-- <bm-point-collection v-for="(item,index) in addMassPointData" :points="item.points" :shape="item.shape" :color="item.color"
				 :size="item.size" :key='index+"b"'></bm-point-collection> -->
				<bm-point-collection v-for="(item,index) in addMassPointData" :points="item.points" :shape="item.shape" :color="item.color"
				 :size="item.size" :key='index+"b"'></bm-point-collection>
				<!--覆盖物-->

				<bm-marker :position="item.position" :key=index v-for="(item,index) in addMarkerPointsData" :title="item.title"
				 :icon="{url: item.icon, size: {width: item.size.width, height: item.size.height}}">
				</bm-marker>
			</baidu-map>
		</div>
	</div>
</template>

<script>
	import themes from './themes'
	import getImg from './getImg'
	import service from './service'
	import headTop from '@/components/header/mainHeader'

	export default {
		name: 'map-warning',
		components: {
			headTop
		},
		data() {
			return {
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
			}
		},
		created() {
			this.mapTheme.styleJson = themes.night_theme;//默认地图主题
		},
		methods: {
			handler({ BMap, map }) {
				this.map = map;
				let { addEventListenerMap } = this;
				addEventListenerMap();//监听地图拖拽缩放	
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
				let { map, clearMapData, parameter, addMarkers, addMassPoint } = this;
				clearMapData();
				let data = parameter(map);
				let zoom = map.getZoom();//获取zoom
				if (zoom >= 17) {
					addMarkers(data);
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
				let data = {
					"cjbs": "01",
					"zhcq": "110109",
					"gnxflx": "001",
					"sjnr": "[{'qyfw':[{'lng1BigDecimal':" + bssw.lng + ",'lat1BigDecimal':" + bssw.lat +
						",'lng2BigDecimal':" + bsne.lng + ",'lat2BigDecimal':" + bsne.lat + "}],'gnxflx':'001'}]"
				};
				data.ywbs = equipmentType;
				return data;
			},
			//获取到数据进行初次转换
			dataformChange(dataarr) {
				let { dataTypeChange } = this;
				let dataform = {};
				// 0 灯杆              
				for (let type in dataarr) {
					if (type == 'total') {
						let totalDate = dataarr['total']
						let totalArr = [];
						for (let points of totalDate) {
							let objs = {};
							for (let point in points) {
								dataTypeChange(objs, point, points)
							}
							totalArr.push(objs);
						}
						dataform.total = totalArr;
					} else {
						dataTypeChange(dataform, type, dataarr)
					}
				}
				return dataform;
			},
			//数据转化类型判断
			dataTypeChange(dataform, type, dataarr) {
				//灯杆light
				if (type == '0') {
					dataform.light = dataarr['0']
				}
				return dataform;
			},
			//处理接受到的数据
			mergeTotal(rst, flag) {
				let { eachDevice, mockData, heatMapFlag, markerFlag } = this;
				let data_all = [];//存放所有的数据   用来渲染聚合物和小地图的海量点的
				for (let type in rst) {
					if (type == 'total' && rst[type].length) {
						for (let $item of rst[type]) {
							let obj = $item;
							for (let item in obj) {
								if (item == 'wifi') {

								} else {
									data_all = data_all.concat(obj[item]);
								}

								if (!flag) {
									let objArr = [];//把单个对象放数组中
									if (Object.prototype.toString.call(obj[item]) === '[object Array]') {
										objArr = objArr.concat(obj[item]);
									} else {
										objArr.push(obj[item]);
									}
									eachDevice(item, objArr);
								}

							}
						}
					} else {
						if (!flag) {
							eachDevice(type, rst[type]);
						}

						//wifi不是设备
						if (type == 'wifi') {

						} else {
							data_all = data_all.concat(rst[type]);//获取所有数据（设备数据）
						}

					}
				}

				//				this.mockData();
				//				data_all = data_all.concat(this.mockjg);

				//分开wifi和ap的数据
				if (markerFlag) {
					this.apData = this.wifiData;
				} else {
					this.apData = [];
				}
				if (!heatMapFlag) {
					this.wifiData = [];
				}

				return data_all;
			},
			//获取每种设备的总数
			eachDevice(type, typeArr) {
				if (type == 'light') {
					this.lightData = this.lightData.concat(typeArr);
				}
			},
			//处理假数据
			mockData() {
				var that = this;
				let { mockstr } = this;
				if (!mockstr || !mockstr.length) {
					return
				}
				let mockarr = mockstr.split(',');
				// 智慧管线：011

				//智慧管线
				if (mockarr.indexOf('011') != -1) {
					that.mockjg = service.jg_false;
					that.mockline = service.line;
				}

			},
			//大地图添加海量点
			addMassPoint(data) {
				let { massPointSize, dataformChange, gisThemeSwitch } = this;
				let that = this;
				service.getData(data).then(res => {
					let rst = JSON.parse(res.data.sjnr);
					let dataform = dataformChange(rst);//数据形式转换
					let pointsArr = that.mergeTotal(dataform);//所有的设备点
					console.log(rst)
					let redPointArr = [];
					let color = gisThemeSwitch ? '#adadad' : "#fff";//颜色
					var size = massPointSize();

					that.addMassPointData = [{ points: pointsArr, shape: 'BMAP_POINT_SHAPE_CIRCLE', color: color, size: size }];
					//					afterAddMarker();
				})
			},
			getAllData() {
				// let { map, equipmentType } = this;
				// let bs = map.getBounds(); // 获取可视区域
				// if (bs.getSouthWest() == null) {
				// 	return
				// }
				// let bssw = bs.getSouthWest(); // 可视区域左下角
				// let bsne = bs.getNorthEast(); // 可视区域右上角
				// let data ={}
				// data.zhcq = "110109"
				// data.ldbId = ''
				// data.norflag = '1,2'
				// data.unusflag = '1,2'
				// data.sbztflag = '1,2'
				// data.lng1BigDecimal = bssw.lng
				// data.lat1BigDecimal = bssw.lat
				// data.lng2BigDecimal = bsne.lng
				// data.lat2BigDecimal = bsne.lat
				// service.getAllData(data).then(res => {
				// 	console.log(res)
				// })
				
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
				let { getMarkerPosition, dataformChange, afterAddMarker, toggleHeatMapFlag } = this;
				let that = this;
				service.getData(data).then(res => {
					let rst = JSON.parse(res.data.sjnr);
					let dataform = dataformChange(rst);//数据形式转换
					let pointsArr = that.mergeTotal(dataform);//所有的点
					for (let item in dataform) {
						let typeArr = dataform[item];
						if (item == 'wifi') {
							that.isShowWifiLabel = toggleHeatMapFlag ? true : false;
						} else {
							if (typeArr && typeArr.length) {
								for (let obj of typeArr) {
									let addMarkerObj = getMarkerPosition(item, obj);//需要添加的覆盖物
									this.addMarkerPointsData.push(addMarkerObj);
								}
							}
						}
					}
				})
			},
			//获取覆盖物经纬度
			getMarkerPosition(type, obj) {
				let { getMarkerImgAndSize, gisThemeSwitch, toggleHeatMapFlag, deviceChangeText } = this;
				let zoom = this.map.getZoom();
				//经纬度
				let pt;
				if (type == 'total') {
					for (var item in obj) {
						if (Object.prototype.toString.call(obj[item]) === '[object Array]') {
							pt = {
								lng: obj[item][0].lng,
								lat: obj[item][0].lat
							}
						} else {
							pt = {
								lng: obj[item].lng,
								lat: obj[item].lat
							}
						}
						break;
					}
				} else {
					pt = {
						lng: obj.lng,
						lat: obj.lat
					}
				}

				//获取图片
				let iconObj = getImg.getImgFromJs.getMarkerImgAndSize(type, obj, zoom, gisThemeSwitch);

				//点击marker处理数据形式
				let data, title;
				if (type != 'total') {
					var maker_data = {};
					maker_data[type] = obj;
					data = maker_data;
					title = obj.sbmc;
				} else {
					data = obj;
					title = '';
				}

				//文字切换
				let content = {
					display: false
				}
				if (toggleHeatMapFlag) {
					content = deviceChangeText(type, obj);
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
			closepop() {
				gisService.Bus.$emit('closePopCommon');
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
	}
</style>