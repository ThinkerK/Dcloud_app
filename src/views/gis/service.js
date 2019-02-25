import api from '@/config/axios';
import Vue from 'vue';
var Bus = new Vue();
//地图数据接口
let getData = (data) =>api.post('portal/gisController/queryVisualByPoint',data);
//市容环境接口
let srhjGetData = (data) =>api.post('portal/gisController/cityEnvironment',data);
//照明灯杆数据
let getAllData = (data) =>api.post('api/gisController/queryFilterDdyxzt',data);
 
export default{
	getData,
	srhjGetData,
	getAllData,
	Bus,
}