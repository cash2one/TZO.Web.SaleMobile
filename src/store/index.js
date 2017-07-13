import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
	token: '',
	userInfo: {}, 			//用户信息
	latitude: '', 				// 当前位置纬度
	longitude: '', 				// 当前位置经度

	curCorp:{},					// 当前公司
	curStorage: {}, 			// 当前仓库
	curExpress: {}, 			// 当前物流
	curPrinter: {}, 			// 当前打印机
	curCustomer: {}, 			// 当前客户

	corpList: [],				// 身份公司列表
	storageList:[],				// 有效仓库列表
	expressList:[],				// 可用物流列表
	printerList:[],				// 打印机列表

	cartList: {}, 				// 购物车的商品列表
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})