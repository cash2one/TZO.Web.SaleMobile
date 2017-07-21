import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
	userInfo: {}, 				// 用户信息
	latitude: 0, 				// 当前位置纬度
	longitude: 0, 				// 当前位置经度
	lastPositionTime: null,		// 位置更新时间
	intervalId: '',				// 自动获取位置的定时句柄

	orderStorage:{},			// 订单仓库
	curCorp: {},				// 当前公司
	curStorage: {}, 			// 当前仓库
	curExpress: {}, 			// 当前物流
	curPrinter: {}, 			// 当前打印机
	curCustomer: {}, 			// 当前客户

	corpList: [],				// 身份公司列表
	storageList: [],			// 有效仓库列表
	expressList: [],			// 可用物流列表
	printerList: [],			// 打印机列表
	bizAreaList: [],			// 业务区域
	globalPropertyList: [],		// 全局属性
	propertyList: [],			// 商品属性
	categoryList: [],			// 商品类目
	categoryDetailList: [],		// 二级类目

	cartList: {}, 				// 购物车的商品列表
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})