import router from '../router'
import store from '../store'
import {
	getToken,
} from '@/utils/common' // getToken from cookie

const whiteList = ['/login'] //白名单

router.beforeEach((to, from, next) => {
	if(getToken()) {
		if(to.path == '/login') {
			next({
				path: '/'
			})
		} else{
			if(sessionStorage.getItem('userInfo') == null) {
				store.dispatch('FedLogOut').then(() => {
					location.reload();
				});
			}
			next()
		}
	} else {
		/* token不存在*/
		if(whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
			next()
		} else {
			next('/login') // 否则全部重定向到登录页
		}
	}
})
