import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./import')
import main from '@/views/main/main.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path:'/',
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
  }
]
})
