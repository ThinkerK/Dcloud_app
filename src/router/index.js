import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./import')
import main from '@/views/main/main.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path:'/main',
    name:'main',
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
    },
    component:_import('deviceMsg/deviceMsg')
  },{
    path:'/devicemsgreset',
    name:'devicemsgreset',
    component:_import('deviceMsgReset/deviceMsgReset')
  },{
    path:'/paramsmsg',
    name:'paramsmsg',
    component:_import('paramsMsg/paramsMsg')
  },{
    path:'/singlelightmsg',
    name:'singlelightmsg',
    meta:{
      keepAlive:false,
      isBack:false,
    },
    component:_import('singleLightMsg/singleLightMsg')
  },{
    path:'/lightswitch',
    name:'lightswitch',
    component:_import('lightSwitch/lightSwitch')
  },
  {
    path:'/jzqmsg',
    name:'jzqmsg',
    component:_import('jzqmsg/jzqmsg')
  },
  {
    path:'/jzqdetails',
    name:'jzqdetails',
    component:_import('jzqDetails/jzqDetails')
  },
  {
    path:'/paramcalltest',
    name:'paramcalltest',
    component:_import('paramCallTest/paramCallTest')
  },
  {
    path:'/datacalltest',
    name:'datacalltest',
    component:_import('dataCallTest/dataCallTest')
  },
  {
    path:'/statesurver',
    name:'statesurver',
    component:_import('stateSurver/stateSurver')
  },
  {
    path:'/timesurver',
    name:'timesurver',
    component:_import('timeSurver/timeSurver')
  },
  {
    path:'/devicetimecheck',
    name:'devicetimecheck',
    component:_import('deviceTimeCheck/deviceTimeCheck')
  },
  {
    path:'/ddkgd',
    name:'ddkgd',
    component:_import('ddkgd/ddkgd')
  },
  {
    path:'/jzqmsgreset',
    name:'jzqmsgreset',
    component:_import('jzqMsgReset/jzqMsgReset')
  },
  {
    path:'/jzqdatacalltest',
    name:'jzqdatacalltest',
    component:_import('jzqDataCallTest/jzqDataCallTest')
  },
  {
    path:'/jzqtimecheck',
    name:'jzqtimecheck',
    component:_import('jzqTimeCheck/jzqTimeCheck')
  },
  {
    path:'/jzqkgd',
    name:'jzqkgd',
    component:_import('jzqkgd/jzqkgd')
  },
  {
    path:'/jzqdstatesurver',
    name:'jzqdstatesurver',
    component:_import('jzqStateSurver/jzqStateSurver')
  },
  {
    path:'/',
    name:'login',
    component:_import('login/login')
  },
]
})
