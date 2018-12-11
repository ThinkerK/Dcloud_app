//数据请求
import api from '@/config/axios.js'
export default {
    login(data){  //登陆
        return api.post('/api/mxmxController/login',data)
    },
    getAddressList(data){  //获取 街道列表
        return api.post('/api/appRcglController/queryXzqh',data)
    },
    getLdbList(data){   //获取 台区列表
        return api.post('/api/appRcglController/queryLdb',data)
    },
    getJzqDdxq(data){   //获取集中区/单灯详情
        return api.post('/api/appRcglController/queryjzqddxq',data)
    },
    getJjxList(data){   //获取交接箱文档
        return api.post('/api/appRcglController/queryJjx',data)
    },
    callTest(data){   //单灯巡测
        return api.post('/api/appRcglController/queryddkzqxc',data)
    },
    sendMessage(data){  //发送信息
        return api.post('/api/appCommonController/sendMessage',data)
    },
    showCallTestMsg(data){   //单灯巡测结果展示
        return api.post('/api/appRcglController/queryXcxxcx',data)
    },
    lightSwitch(data){  //  单灯开关灯
        return api.post('/api/appRcglController/queryddkzqkgd',data)
    },
    showLightSwitch(data){  // 单灯开关灯结果展示
        return api.post('/api/appRcglController/queryddkgdjgxq',data)
    },
    checkTime(data){  //单灯对视
        return api.post('/api/appRcglController/queryddkzqds',data)
    },
    showCheckTime(data){  //单灯对时信息展示
        return api.post('/api/appRcglController/querydddsxq',data)
    },
    jzqCallTest(data){   //集中器巡测
        return api.post('/api/appRcglController/queryjzkq',data)
    },
    // jzqShowCallTestMsg(data){   //集中器巡测结果展示
    //     return api.post('/api/appRcglController/queryjzkzqxcjgxq',data)
    // },
    jzqShowCallTestMsg(data){   //集中器巡测结果展示
        return api.post('/api/appCommonController/getMessage',data)
    },

    jzqShowLightSwitch(data){  // 集中器开关灯结果展示
        return api.post('/api/appRcglController/queryjzkzqkgdjgxq',data)
    },
    jzqShowCheckTime(data){  //集中器对时信息展示
        return api.post('/api/appRcglController/queryjzkzqdsjgxq',data)
    },
    updateZcbh(data){   //修改灯杆管理器和修改单灯控制器编号
        return api.post('/api/appRcglController/updateZcbh',data)
    },
    updatedJzqZcbh(data) {//修改集中器资产编号
        return api.post('/api/appRcglController/updateZcbhJzq',data)
    },
    dnbSendMessage(data) {//发送消息-电能表
        return api.post('/api/appCommonController/sendMessageDnb',data)
    },
    queryAbnormalMsg(data) {  //查询异常信息
        return api.post('/api/eventManagerController/queryDYcsj',data)
    },
    abnormalMsgDetail(data) { //查询异常信息详情
        return api.post('/api/eventManagerController/queryDYcsjDetail',data)
    },
    repairMsg(data){  //修复信息查询
        return api.post('/api/eventManagerController/queryDYcsjXfxx',data)
    },
    queryAbnormalPie(data){  //全区异常总数/台区异常总数占比图
        return api.post('/api/eventManagerController/queryDYcsjPie',data)
    },
    queryRepairPie(data){  //台区修复占比
        return api.post('/api/eventManagerController/queryDYcsjPieYesAndNo',data)
    },
    queryAbnormalLine(data){  //台区异常总数折线
        return api.post('/api/eventManagerController/queryDYcsjLine',data)
    },
    barAbnormal(data){  //台区异常总数 柱图
        return api.post('/api/eventManagerController/queryDYcsjBar',data)
    }, 
    pieRepair(data){  //台区 修复数据 饼图
        return api.post('/api/eventManagerController/queryDYcsjPieYesAndNo',data)
    },
    repairRatio(data){  //台区 修复数据 占比柱状图
        return api.post('/api/eventManagerController/queryDYcsjBarContrast',data)
    },
    repairRecord(data){  //修改异常报表
        return api.post('/api/eventManagerController/insertRepair',data)
    },
    abnormalType(){  //查询异常类型
        return api.post('/api/eventManagerController/queryXflx')
    },
    weixinLogin(data){  //微信登陆
        return api.post('/api/mxmxController/login',data)
    }

}