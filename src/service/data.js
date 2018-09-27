//数据请求
import api from '@/config/axios.js'
export default {
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
    }
}