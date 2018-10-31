//ajax 请求
import axios from 'axios'
import Qs from 'qs'
import stores from '../store/index'
import { Indicator,Toast } from 'mint-ui'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; 
const service = axios.create({
    // baseURL: process.env.API_HOST,  
    baseURL:'http://47.94.243.47:8102', //正式库
    // baseURL: 'http://122.113.5.204:9023',  //测试库
    // baseURL: 'http://122.113.5.31:8080',  //本地库
    timeout: 5000,
    transformRequest: [function (data) {  
        return Qs.stringify(data)
    }],
    // withCredentials: true,    //跨域
})


service.interceptors.request.use(function(config){
    stores.dispatch('showLoading')
    Indicator.open('Loading...');
    return config
},function(err){
    return Promise.reject(err)
});
service.interceptors.response.use(function(response){
  Indicator.close();
    stores.dispatch('hideLoading')
    return response
},function(err){
  Indicator.close();
  stores.dispatch('hideLoading')
    return Promise.reject(err)
});
  
  
const ajaxMethod = ['get', 'post']
const api = {}
ajaxMethod.forEach((method) => {
    api[method] = function (url, data) {
      return new Promise(function (resolve, reject) {
        service[method](url, data).then((response) => {
          // if (response.data.errCode == 200) {
            resolve(response.data)
          // } else {
          //   console.log(response.data.errCode)
          // }
        }).catch(function (error) {
          console.log(error)
        })
      })
    }
  })

export default api
