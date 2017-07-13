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

	RECORD_ADDRESS,
	ADD_CART,
	REDUCE_CART,
	INIT_BUYCART,
	CLEAR_CART,
	RECORD_SHOPDETAIL,
	RECORD_USERINFO,

	CONFIRM_REMARK,
	CONFIRM_INVOICE,
	CHOOSE_SEARCH_ADDRESS,
	SAVE_GEOHASH,
	CONFIRM_ADDRESS,
	CHOOSE_ADDRESS,
	NEED_VALIDATION,
	SAVE_CART_ID_SIG,
	SAVE_ORDER_PARAM,
	CHANGE_ORDER_PARAM,
	ORDER_SUCCESS,
	SAVE_SHOPID,
	SAVE_ORDER,
	OUT_LOGIN,
	RETSET_NAME,
	SAVE_AVANDER,
	SAVE_ADDRESS,
	SAVE_ADDDETAIL,
	SAVE_QUESTION,
	ADD_ADDRESS,
	BUY_CART,
} from './mutation-types.js'

import { setStore, getStore } from 'src/config/mUtils'
import { token } from 'src/config/env'

// 事件处理程序

export default {

	// 刷新 token
	[REFRESH_TOKEN](state, token) {
		token = 'bearer ' + token;
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

	// 记录当前经度纬度
	[RECORD_ADDRESS](state, {
		latitude,
		longitude
	}) {
		state.latitude = latitude;
		state.longitude = longitude;
	},

	[RECORD_SHOPDETAIL](state, detail) {
		state.shopDetail = detail;
	},
	// 加入购物车
	[ADD_CART](state, {
		shopid,
		category_id,
		item_id,
		food_id,
		name,
		price,
		specs,
		packing_fee,
		sku_id,
		stock
	}) {
		let cart = state.cartList;
		let shop = cart[shopid] = (cart[shopid] || {});
		let category = shop[category_id] = (shop[category_id] || {});
		let item = category[item_id] = (category[item_id] || {});
		if (item[food_id]) {
			item[food_id]['num']++;
		} else {
			item[food_id] = {
				"num": 1,
				"id": food_id,
				"name": name,
				"price": price,
				"specs": specs,
				"packing_fee": packing_fee,
				"sku_id": sku_id,
				"stock": stock
			};
		}
		state.cartList = { ...cart };
		//存入localStorage
		setStore('buyCart', state.cartList);
	},
	// 移出购物车
	[REDUCE_CART](state, {
		shopid,
		category_id,
		item_id,
		food_id,
		name,
		price,
		specs,
	}) {
		let cart = state.cartList;
		let shop = (cart[shopid] || {});
		let category = (shop[category_id] || {});
		let item = (category[item_id] || {});
		if (item && item[food_id]) {
			if (item[food_id]['num'] > 0) {
				item[food_id]['num']--;
				state.cartList = { ...cart };
				//存入localStorage
				setStore('buyCart', state.cartList);
			} else {
				//商品数量为0，则清空当前商品的信息
				item[food_id] = null;
			}
		}
	},
	//网页初始化时从本地缓存获取购物车数据
	[INIT_BUYCART](state) {
		let initCart = getStore('buyCart');
		if (initCart) {
			state.cartList = JSON.parse(initCart);
		}
	},
	//清空当前商品的购物车信息
	[CLEAR_CART](state, shopid) {
		state.cartList[shopid] = null;
		state.cartList = { ...state.cartList };
		setStore('buyCart', state.cartList);
	},
	// 记录用户信息
	[RECORD_USERINFO](state, info) {
		state.userInfo = info;
		state.login = true;
		setStore('user_id', info.user_id);
	},

	//修改用户名
	[RETSET_NAME](state, username) {
		state.userInfo = Object.assign({}, state.userInfo, { username })
	},
	//保存商铺id
	[SAVE_SHOPID](state, shopid) {
		state.shopid = shopid;
	},
	//记录订单页面用户选择的备注, 传递给订单确认页面
	[CONFIRM_REMARK](state, {
		remarkText,
		inputText
	}) {
		state.remarkText = remarkText;
		state.inputText = inputText;
	},
	//是否开发票
	[CONFIRM_INVOICE](state, invoice) {
		state.invoice = invoice;
	},
	//选择搜索的地址
	[CHOOSE_SEARCH_ADDRESS](state, place) {
		state.searchAddress = place;
	},
	//保存geohash
	[SAVE_GEOHASH](state, geohash) {
		state.geohash = geohash;

	},
	//确认订单页添加新的的地址
	[CONFIRM_ADDRESS](state, newAddress) {
		state.newAddress.push(newAddress);
	},
	//选择的地址
	[CHOOSE_ADDRESS](state, {
		address,
		index
	}) {
		state.choosedAddress = address;
		state.addressIndex = index;
	},
	//保存下单需要验证的返回值
	[NEED_VALIDATION](state, needValidation) {
		state.needValidation = needValidation;
	},
	//保存下单后购物id 和 sig
	[SAVE_CART_ID_SIG](state, {
		cart_id,
		sig
	}) {
		state.cart_id = cart_id;
		state.sig = sig;
	},
	//保存下单参数，用户验证页面调用
	[SAVE_ORDER_PARAM](state, orderParam) {
		state.orderParam = orderParam;
	},
	//修改下单参数
	[CHANGE_ORDER_PARAM](state, newParam) {
		state.orderParam = Object.assign({}, state.orderParam, newParam);
	},
	//下单成功，保存订单返回信息
	[ORDER_SUCCESS](state, order) {
		state.cartPrice = null;
		state.orderMessage = order;
	},
	//进入订单详情页前保存该订单信息
	[SAVE_ORDER](state, orderDetail) {
		state.orderDetail = orderDetail;
	},
	//退出登录
	[OUT_LOGIN](state) {
		state.userInfo = {};
		state.login = false;
	},
	//保存图片
	[SAVE_AVANDER](state, imgPath) {
		state.imgPath = imgPath;
	},
	//删除地址列表
	[SAVE_ADDRESS](state, newAdress) {
		state.removeAddress = newAdress
	},
	//添加地址name
	[SAVE_ADDDETAIL](state, addAddress) {
		state.addAddress = addAddress;
	},
	//保存所选问题标题和详情
	[SAVE_QUESTION](state, question) {
		state.question = { ...question };
	},
	//增加地址
	[ADD_ADDRESS](state, obj) {
		state.removeAddress = [obj, ...state.removeAddress];
	},
	//会员卡价格纪录
	[BUY_CART](state, price) {
		state.cartPrice = price;
	},

}
