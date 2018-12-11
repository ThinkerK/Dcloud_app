import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./import')
import main from '@/views/main/main.vue'

Vue.use(Router)

export default new Router({
  routes: [
// 		{
//     path:'/test',
//     name:'test',
//     component:_import('test/chart')
//   },
    {
    path:'/',
    name:'login',
    meta:{index:0},
    component:_import('login/login')
  },{
    path:'/main',
    name:'main',
    meta:{index:1},
    component: _import('main/main'),
    children: [{
      path:'child',
      name:'child',
      component: _import('main/children/mainchildren')
    }]
  },{
    path:'/devicemsg',
    name:'devicemsg',
    meta:{
      keepAlive:false,
      isBack:false,
      index:3
    },
    component:_import('deviceMsg/deviceMsg')
  },{
    path:'/devicemsgreset',
    name:'devicemsgreset',
    meta:{index:4},
    component:_import('deviceMsgReset/deviceMsgReset')
  },{
    path:'/paramsmsg',
    name:'paramsmsg',
    meta:{index:4},
    component:_import('paramsMsg/paramsMsg')
  },{
    path:'/singlelightmsg',
    name:'singlelightmsg',
    meta:{
      keepAlive:false,
      isBack:false,
      index:2
    },
    component:_import('singleLightMsg/singleLightMsg')
  },{
    path:'/lightswitch',
    name:'lightswitch',
    meta:{index:2},
    component:_import('lightSwitch/lightSwitch')
  },
  {
    path:'/jzqmsg',
    name:'jzqmsg',
    meta:{index:2},
    component:_import('jzqmsg/jzqmsg')
  },
  {
    path:'/jzqdetails',
    name:'jzqdetails',
    meta:{index:3},
    component:_import('jzqDetails/jzqDetails')
  },
  {
    path:'/paramcalltest',
    name:'paramcalltest',
    meta:{index:4},
    component:_import('paramCallTest/paramCallTest')
  },
  {
    path:'/datacalltest',
    name:'datacalltest',
    meta:{index:4},
    component:_import('dataCallTest/dataCallTest')
  },
  {
    path:'/statesurver',
    name:'statesurver',
    meta:{index:3},
    component:_import('stateSurver/stateSurver')
  },
  {
    path:'/timesurver',
    name:'timesurver',
    meta:{index:3},
    component:_import('timeSurver/timeSurver')
  },
  {
    path:'/devicetimecheck',
    name:'devicetimecheck',
    meta:{index:3},
    component:_import('deviceTimeCheck/deviceTimeCheck')
  },
  {
    path:'/ddkgd',
    name:'ddkgd',
    meta:{index:3},
    component:_import('ddkgd/ddkgd')
  },
  {
    path:'/jzqmsgreset',
    name:'jzqmsgreset',
    meta:{index:4},
    component:_import('jzqMsgReset/jzqMsgReset')
  },
  {
    path:'/jzqdatacalltest',
    name:'jzqdatacalltest',
    meta:{index:3},
    component:_import('jzqDataCallTest/jzqDataCallTest')
  },
  {
    path:'/jzqtimecheck',
    name:'jzqtimecheck',
    meta:{index:3},
    component:_import('jzqTimeCheck/jzqTimeCheck')
  },
  {
    path:'/jzqkgd',
    name:'jzqkgd',
    meta:{index:3},
    component:_import('jzqkgd/jzqkgd')
  },
  {
    path:'/jzqdstatesurver',
    name:'jzqdstatesurver',
    meta:{index:3},
    component:_import('jzqStateSurver/jzqStateSurver')
  },
  {
    path:'/abnormaldata',
    name:'abnormaldata',
    meta:{index:2},
    component:_import('abnormalData/abnormalData')
  },
  {
    path:'/abnormaldetails',
    name:'abnormaldetails',
    meta:{index:3},
    component:_import('abnormalData/abnormalDetails')
  },
  {
    path:'/abnormalrepair',
    name:'abnormalrepair',
    meta:{index:2},
    component:_import('abnormalData/abnormalRepair')
  },
  {
    path:'/repairrecord',
    name:'repairrecord',
    meta:{index:3},
    component:_import('repairRecord/repairRecord')
  },
  {
    path:'/datadisplay',
    name:'datadisplay',
    meta:{index:2},
    component:_import('dataDisplay/dataDisplay')
  },
  {
    path:'/highstock',
    name:'highstock',
    component:_import('test/highstock')
  },
//   {
//     path:'/echart',
//     name:'echart',
//     component:_import('test/echarts')
//   },
  {
    path:'/chartenlarge',
    name:'chartenlarge',
    component:_import('dataDisplay/chartPage')
  },
]
})
