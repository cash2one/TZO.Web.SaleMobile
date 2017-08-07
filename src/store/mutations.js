import {
  REFRESH_TOKEN,
  INIT_DATA,
  INIT_CORP_DATA,
  GET_USERINFO,
  GET_CORP_LIST,
  GET_STORAGE_LIST,
  GET_MY_STORAGE_LIST,
  GET_EXPRESS_LIST,
  GET_PRINTER_LIST,
  GET_BIZAREA_LIST,
  GET_GLOBAL_PROPERTY,
  GET_PROPERTY_LIST,
  GET_CATEGORY_LIST,
  GET_POSITION,
  GET_CHARGE_TYPE,
  GET_SHIP_TYPE,
  SAVE_CUR_CORP,
  SAVE_CUR_STORAGE,
  SAVE_CUR_EXPRESS,
  SAVE_CUR_PRINTER,
  SAVE_CUR_CUSTOMER,
  SAVE_ORDER_STORAGE,
  ADD_CART,
  REDUCE_CART,
  CLEAR_CART,
  SAVE_ADDR,
  SAVE_PHONE,
  SAVE_CHARGE_TYPE,
  SAVE_SHIP_TYPE,
  SAVE_EXPRESS,
  SAVE_STORAGE,
  SAVE_PRICE,
  CONFIRM_REMARK,
  POSITION_INTERVAL,
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
    state.userInfo = {
      ...info
    };
  },

  // 获取员工绑定的公司列表
  [GET_CORP_LIST](state, list) {
    state.corpList = [...list];
  },

  [SAVE_CUR_CORP](state, corp) {
    state.curCorp = corp;
    setStore('curCorp', corp);
  },

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
    let initOrderStorage = getStore(corpId + '_curOrderStorage');
    if (initOrderStorage) {
      state.orderStorage = JSON.parse(initOrderStorage);
    }

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

  [GET_MY_STORAGE_LIST](state, list) {
    state.myStorageList = list;
  },

  [GET_EXPRESS_LIST](state, list) {
    state.exprpessList = list;
  },

  [GET_PRINTER_LIST](state, list) {
    state.printerList = list;
  },

  [GET_BIZAREA_LIST](state, list) {
    state.bizAreaList = list;
  },

  [GET_GLOBAL_PROPERTY](state, list) {
    state.globalPropertyList = list;
  },

  [GET_PROPERTY_LIST](state, list) {
    state.propertyList = list;
  },

  [GET_CATEGORY_LIST](state, list) {
    list.forEach(function (i) {
      if (i.ParentId == 1) {
        state.categoryList.push(i);
        let detailItem = {
          Id: i.Id,
          Children: []
        };
        list.forEach(function (j) {
          if (j.ParentId == detailItem.Id)
            detailItem.Children.push(j);
        });
        state.categoryDetailList.push(detailItem);
      }
    });
  },

  [GET_CHARGE_TYPE](state, list) {
    state.chargeTypeList = list;
  },

  [GET_SHIP_TYPE](state, list) {
    state.shipTypeList = list;
  },

  // 订单仓库
  [SAVE_ORDER_STORAGE](state, storage) {
    state.orderStorage = storage;
    setStore(state.curCorp.CorpId + '_curOrderStorage', storage);
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
  [ADD_CART](state, { customer, goods, price }) {
    let cart = state.cartList;
    let customerCart = cart[customer.CustomerId] = (cart[customer.CustomerId] || {});
    customerCart.customer = customer;
    let items = customerCart.items = (customerCart.items || {});
    if (items[goods.GoodsId]) {
      items[goods.GoodsId]['num']++;
    } else {
      items[goods.GoodsId] = {
        "num": 1,
        "id": goods.GoodsId,
        "info": goods,
        "price": price
      };
    }
    state.cartList = {
      ...cart
    };
    //存入localStorage
    setStore('buyCart', state.cartList);
  },

  // 移出购物车
  [REDUCE_CART](state, { customerId, goodsId }) {
    let cart = state.cartList;
    let customerCart = cart[customerId] = (cart[customerId] || {});
    let items = customerCart.items = (customerCart.items || {});
    if (items[goodsId]) {
      if (items[goodsId]['num'] > 0) {
        items[goodsId]['num']--;
        state.cartList = {
          ...cart
        };
        //存入localStorage
        setStore('buyCart', state.cartList);
      } else {
        //商品数量为0，则清空当前商品的信息
        delete items[goodsId];
      }
    }
  },

  // 清空当前商品的购物车信息
  [CLEAR_CART](state, customerId) {
    state.cartList[customerId] = null;
    state.cartList = {
      ...state.cartList
    };
    setStore('buyCart', state.cartList);
  },

  [SAVE_PRICE](state, { customerId, goodsId, price }) {
    let cart = state.cartList;
    let customerCart = cart[customerId] = (cart[customerId] || {});
    let items = customerCart.items = (customerCart.items || {});

    console.log(items);
    console.log(goodsId);
    console.log(price);

    if (items[goodsId]) {
      items[goodsId]['price'] = price;
    }

    state.cartList = {
      ...cart
    };
    //存入localStorage
    setStore('buyCart', state.cartList);
  },

  [SAVE_ADDR](state, { customerId, addr }) {
    let cart = state.cartList;
    let customerCart = cart[customerId] = (cart[customerId] || {});

    customerCart.addr = addr;

    state.cartList = {
      ...cart
    };
  },

  [SAVE_PHONE](state, { customerId, phone }) {
    let cart = state.cartList;
    let customerCart = cart[customerId] = (cart[customerId] || {});

    customerCart.phone = phone;

    state.cartList = {
      ...cart
    };
  },

  [SAVE_CHARGE_TYPE](state, { customerId, charge }) {
    let cart = state.cartList;
    let customerCart = cart[customerId] = (cart[customerId] || {});

    customerCart.charge = charge;
    state.cartList = {
      ...cart
    };
  },

  [SAVE_SHIP_TYPE](state, { customerId, ship }) {
    let cart = state.cartList;
    let customerCart = cart[customerId] = (cart[customerId] || {});

    customerCart.ship = ship;
    state.cartList = {
      ...cart
    };
  },

  [SAVE_EXPRESS](state, { customerId, express }) {
    let cart = state.cartList;
    let customerCart = cart[customerId] = (cart[customerId] || {});

    customerCart.express = express;

    state.cartList = {
      ...cart
    };
  },

  [SAVE_STORAGE](state, { customerId, storage }) {
    let cart = state.cartList;
    let customerCart = cart[customerId] = (cart[customerId] || {});

    customerCart.storage = storage;

    state.cartList = {
      ...cart
    };
  },

  [CONFIRM_REMARK](state, { customerId, remark }) {
    let cart = state.cartList;
    let customerCart = cart[customerId] = (cart[customerId] || {});

    customerCart.remark = remark;

    state.cartList = {
      ...cart
    };
  },
  //网页初始化时从本地缓存获取购物车数据
  // [INIT_BUYCART](state) {
  // 	let initCart = getStore('buyCart');
  // 	if (initCart) {
  // 		state.cartList = JSON.parse(initCart);
  // 	}
  // },

  //保存geohash
  // [SAVE_GEOHASH](state, geohash) {
  // 	state.geohash = geohash;

  // },
}
