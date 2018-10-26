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
}