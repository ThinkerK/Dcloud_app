import chart from './highcharts/chart/chart.vue'
import echart from './echarts/chart/echart.vue'
import progress from './echarts/chart/progressbar.vue'
import BaiduMap from './vue-baidu-map/map/Map.vue'
import BmView from './vue-baidu-map/map/MapView.vue'
import BmScale from './vue-baidu-map/controls/Scale.vue'
import BmNavigation from './vue-baidu-map/controls/Navigation.vue'
import BmMapType from './vue-baidu-map/controls/MapType.vue'
import BmOverviewMap from './vue-baidu-map/controls/OverviewMap.vue'
import BmCityList from './vue-baidu-map/controls/CityList.vue'
import BmControl from './vue-baidu-map/controls/Control.vue'
import BmMarker from './vue-baidu-map/overlays/Marker.vue'
import BmPointCollection from './vue-baidu-map/overlays/PointCollection.vue'
import BmPolyline from './vue-baidu-map/overlays/Polyline.vue'
import BmPolygon from './vue-baidu-map/overlays/Polygon.vue'
import BmCircle from './vue-baidu-map/overlays/Circle.vue'
import BmLabel from './vue-baidu-map/overlays/Label.vue'
import BmInfoWindow from './vue-baidu-map/overlays/InfoWindow.vue'
import BmOverlay from './vue-baidu-map/overlays/Overlay.vue'
import BmContextMenu from './vue-baidu-map/context-menu/Menu.vue'
import BmContextMenuItem from './vue-baidu-map/context-menu/Item.vue'
import BmLocalSearch from './vue-baidu-map/search/LocalSearch.vue'
import BmBoundary from './vue-baidu-map/others/Boundary.vue'
import BmAutoComplete from './vue-baidu-map/others/AutoComplete.vue'

import BmlMarkerClusterer from './vue-baidu-map/extra/MarkerClusterer.vue'
import BmlHeatmap from './vue-baidu-map/extra/Heatmap.vue'

 
const comments = [
    chart,
    echart,
    progress,
    BaiduMap,			//百度地图
	BmView,
	BmScale,			//比例尺
	BmNavigation,		//缩放控件
	BmMapType,			//地图类型
	BmOverviewMap,		//缩略图
	BmCityList,			//城市列表
	BmControl,			//自定义控件
	BmMarker,			//点
	BmPointCollection,	//海量点
	BmPolyline,			//折线
	BmPolygon,			//多边形
	BmCircle,			//圆形
	BmLabel,			//标签
	BmInfoWindow,		//信息窗体
	BmOverlay,			//自定义覆盖物
	BmContextMenu,		//菜单项
	BmContextMenuItem,	//菜单
	BmLocalSearch,		//地区检索
//	BmBoundary,			//行政区划
	BmAutoComplete,		//自动填充(模糊查询)
	BmlMarkerClusterer,	//聚合物
	BmlHeatmap,			//热力图
]

export default comments;