import {
	REFRESH_TOKEN,
	GET_USERINFO,
	GET_CORPLIST,
	SAVE_CUR_CORP,
	INIT_DATA,
	INIT_CORP_DATA,
	GET_STORAGE_LIST,
	GET_EXPRESS_LIST,
	GET_PRINTER_LIST,
	SAVE_CUR_STORAGE,
	SAVE_CUR_EXPRESS,
	SAVE_CUR_PRINTER,
	SAVE_CUR_CUSTOMER,
	GET_POSITION,
	POSITION_INTERVAL
} from './mutation-types.js'

import { setStore, getStore } from 'src/config/mUtils'
import { setToken } from 'src/config/env'

// 事件处理程序

export default {

	// 刷新 token
	[REFRESH_TOKEN](state, val) {
		setToken('bearer ' + val);
	},

	// 获取用户信息存入vuex
	[GET_USERINFO](state, info) {
		state.userInfo = { ...info };
	},

	// 获取员工绑定的公司列表
	[GET_CORPLIST](state, list) {
		state.corpList = [...list];
	},

	[SAVE_CUR_CORP](state, corp) {
		state.curCorp = corp;
		setStore('curCorp', corp);
	},
	// 
	[INIT_DATA](state) {
		let initCorp = getStore('curCorp');
		if (initCorp)
			state.curCorp = JSON.parse(initCorp);

		let initPrinter = getStore('curPrinter');
		if (initPrinter) {
			state.curPrinter = JSON.parse(initPrinter);
		}
	},

	// 网页初始化时从本地缓存默认选项
	[INIT_CORP_DATA](state, corpId) {
		let initStorage = getStore(corpId + '_curStorage');
		if (initStorage) {
			state.curStorage = JSON.parse(initStorage);
		}

		let initExpress = getStore(corpId + '_curExpress');
		if (initExpress) {
			state.curExpress = JSON.parse(initExpress);
		}
	},

	[GET_STORAGE_LIST](state, list) {
		state.storageList = list;
	},
	[GET_EXPRESS_LIST](state, list) {
		state.exprpessList = list;
	},
	[GET_PRINTER_LIST](state, list) {
		state.printerList = list;
	},

	// 选择默认仓库
	[SAVE_CUR_STORAGE](state, storage) {
		state.curStorage = storage;
		setStore(state.curCorp.CorpId + '_curStorage', storage);
	},

	// 选择默认物流
	[SAVE_CUR_EXPRESS](state, express) {
		state.curExpress = express;
		setStore(state.curCorp.CorpId + '_curExpress', express);
	},

	// 选择默认打印机
	[SAVE_CUR_PRINTER](state, printer) {
		state.curPrinter = printer;
		setStore('curPrinter', printer);
	},

	// 选择当前客户
	[SAVE_CUR_CUSTOMER](state, customer) {
		state.curCustomer = customer;
	},

	[GET_POSITION](state, position) {
		console.log(position);
		state.latitude = position.latitude;
		state.longitude = position.longitude;
		state.lastPositionTime = new Date();
	},
	[POSITION_INTERVAL](state, id) {
		state.intervalId = id;
	},
	
	// 记录当前经度纬度
	// [RECORD_ADDRESS](state, {
	// 	latitude,
	// 	longitude
	// }) {
	// 	state.latitude = latitude;
	// 	state.longitude = longitude;
	// },

	// 加入购物车
	// [ADD_CART](state, {
	// 	shopid,
	// 	category_id,
	// 	item_id,
	// 	food_id,
	// 	name,
	// 	price,
	// 	specs,
	// 	packing_fee,
	// 	sku_id,
	// 	stock
	// }) {
	// 	let cart = state.cartList;
	// 	let shop = cart[shopid] = (cart[shopid] || {});
	// 	let category = shop[category_id] = (shop[category_id] || {});
	// 	let item = category[item_id] = (category[item_id] || {});
	// 	if (item[food_id]) {
	// 		item[food_id]['num']++;
	// 	} else {
	// 		item[food_id] = {
	// 			"num": 1,
	// 			"id": food_id,
	// 			"name": name,
	// 			"price": price,
	// 			"specs": specs,
	// 			"packing_fee": packing_fee,
	// 			"sku_id": sku_id,
	// 			"stock": stock
	// 		};
	// 	}
	// 	state.cartList = { ...cart };
	// 	//存入localStorage
	// 	setStore('buyCart', state.cartList);
	// },
	// 移出购物车
	// [REDUCE_CART](state, {
	// 	shopid,
	// 	category_id,
	// 	item_id,
	// 	food_id,
	// 	name,
	// 	price,
	// 	specs,
	// }) {
	// 	let cart = state.cartList;
	// 	let shop = (cart[shopid] || {});
	// 	let category = (shop[category_id] || {});
	// 	let item = (category[item_id] || {});
	// 	if (item && item[food_id]) {
	// 		if (item[food_id]['num'] > 0) {
	// 			item[food_id]['num']--;
	// 			state.cartList = { ...cart };
	// 			//存入localStorage
	// 			setStore('buyCart', state.cartList);
	// 		} else {
	// 			//商品数量为0，则清空当前商品的信息
	// 			item[food_id] = null;
	// 		}
	// 	}
	// },
	//网页初始化时从本地缓存获取购物车数据
	// [INIT_BUYCART](state) {
	// 	let initCart = getStore('buyCart');
	// 	if (initCart) {
	// 		state.cartList = JSON.parse(initCart);
	// 	}
	// },
	//清空当前商品的购物车信息
	// [CLEAR_CART](state, shopid) {
	// 	state.cartList[shopid] = null;
	// 	state.cartList = { ...state.cartList };
	// 	setStore('buyCart', state.cartList);
	// },
	//保存geohash
	// [SAVE_GEOHASH](state, geohash) {
	// 	state.geohash = geohash;

	// },
}
