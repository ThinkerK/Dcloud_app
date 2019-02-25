import api from '@/service/data.js'
import { getToken, setToken, removeToken } from '@/utils/common'

const user = {
    state: {
        token: '',
        name: '',
        avatar: '',
        roles: [],
        introduction: '',
        userInfo: ''
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_USERINFO: (state, userInfo) => {
            state.userInfo = userInfo
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_USERINFO: (state, userInfo) => {
            state.userInfo = userInfo
        }
    },
    actions: {
        login({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                setMaxDigits(130);
                var key = new RSAKeyPair("10001", "", "866cafa116451ce58386c8286a75e21a534e1ca0fdb79ea6991d660911592f062097b8ac559711b6718407712334c12d383e5d9b40d0abcdbd3dbc54d2ff52cb");
                let password = encryptedString(key, encodeURIComponent(userInfo.password));
                let data = {
                    loginId: userInfo.name,
                    password: password,
                    LoginType: '2'
                }

                api.login(data).then(data => {
                    if (data && data.mxToken) {
                        setToken(data.mxToken)
                        sessionStorage.setItem('userInfo', JSON.stringify(data));
                        commit('SET_TOKEN', data.mxToken)
                        commit('SET_USERINFO', data.data)
                        resolve(true)
                    }
                    resolve(false)
                }).catch(error => {
                    console.info(error);
                    reject(error)
                })
            })
        },

        wechatLogin({ commit }, wechatId) {
            return new Promise((resolve, reject) => {
                let data = {
                    wechatId: wechatId,
                    loginClient: "web",
                    loginType: 4
                }
                api.weixinLogin(data).then(data => {
                    if (data && data.mxToken) {
                        commit('SET_TOKEN', data.mxToken)
                        commit('SET_USERINFO', data.data)
                        resolve(true)
                    }
                    resolve(false)
                }).catch(error => {
                    console.info(error);
                    reject(error)
                })
            })
        },
        FedLogOut({ commit }) {
			return new Promise(resolve => {
				sessionStorage.clear();
				removeToken();
				resolve();
			})
		}
    }
}

export default user