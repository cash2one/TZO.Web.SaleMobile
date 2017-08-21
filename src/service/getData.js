import fetch from 'src/config/fetch'

// 通过微信一次代码换取认证令牌
export const apiGetToken = code => fetch('/api/WxQy/Auth/getToken/' + code);

// 令牌过期后刷新令牌
export const apiRefreshToken = token => fetch('');

// 设置公司身份
export const apiSetCorpId = corpId => fetch('/api/WxQy/Auth/setCorpId/' + corpId);

// 获取用户信息
export const apiGetUserInfo = () => fetch('/api/Account/UserInfo');

// 获取员工列表 
export const apiGetEmployees = corpid => {
	let data = {
		CorpId: corpid,
		QuickResult: {
			IsValids: [true]
		}
	};
	return fetch('/api/Core/Employee', data);
};

// 获取有效的仓库信息
export const apiGetStorages = () => fetch('/api/Storage/Storage/IsValid');

// 获取支付方式
export const apiGetChargeType = () => fetch('/api/Finance/ChargeType', { QuickResult: { "IsEnabled": [true] } });

// 获取配送方式
export const apiGetShipType = () => fetch('/api/Logistics/ShipType', { QuickResult: { "IsEnabled": [true] } });

// 获取我的仓库
export const apiGetMyStorages = (corpId, userId) => {
	let data = {
		CorpId: corpId,
		EmployeeId: userId
	};
	return fetch('/api/Storage/EmployeeStorageRel', data);
};

// 获取物流公司信息
export const apiGetExpressCorps = (isCollects) => {
	let data = {
		QuickResult: { "IsEnableds": [true] }
	};
	if (isCollects) data.QuickResult.IsCollects = [true];
	return fetch('/api/Logistics/LogisticsCorp', data);
};

// 获取客户列表
export const apiGetCustomerList = (longitude, latitude, areaId, keyword, sortByFiled, sortByType, filters, offset) => {
	let data = {
		PageIndex: parseInt(offset / 20),
		PageSize: 20,
		Longitude: longitude,
		Latitude: latitude,
		SortParam: {
			FiledName: sortByFiled,
			SortType: sortByType ? sortByType : 'asc'
		},
		quickResult: {
			"IsValids": [true],
			HasGps: [true, false],
			OpenOpenStatements: [true, false]
		}
	};
	if (areaId) data.BizAreaIds = areaId;
	if (keyword) data.KeyWord = keyword;
	if (filters.HasGps) data.quickResult.HasGps = [true];
	if (filters.OpenStatements) data.quickResult.OpenOpenStatements = [true];
	if (filters.LastOrderTime) data.LastOrderTime = filters.LastOrderTime;
	if (filters.HasExpire) data.HasExpire = filters.HasExpire;

	return fetch('/api/CRM/Customer/GetCustomers4Mobile', data);
};

// 客户拜访
// 参数: 
//		customerId:				客户标识			long,必填非0
//		latitude:				纬度				  long,默认0
//		longitude:				经度				  long,默认0
// 	返回值:{
//			"Address":null,
//			"BizObjId":100,
//			"BizObjName":"新泰市桑迪汽车修理厂",
//			"CorpId":2,
//			"EmployeeId":1,
//			"EmployeeName":"薛丽丽丽",
//			"Id":9,
//			"Latitude":200.11111,
//			"Longitude":100.001,
//			"Time":"2017-07-27T14:57:41.9233324+08:00"
//			}
export const apiSetSignIn = (customerId, latitude, longitude) => {
	let data = {
		BizObjId: customerId,
		Latitude: latitude,
		Longitude: longitude
	};
	return fetch('/api/CRM/SignLog/', data, 'POST', 'fetch');
}

export const apiUpdateGPSLaction = (customerId, latitude, longitude) => {
	let data = {
		BizObjId: customerId,
		Latitude: latitude,
		Longitude: longitude
	};
	return fetch('/api/Core/BizObj/updateGpsLocation', data, 'POST');
}

// 新增客户
// 参数：
//		userId:								当前用户标识		long,必填非0
//		bizObjInfo:{						
//			Code:							编码				string,
//			DistrictId:						行政区划标识		 long，默认0
//			Name:							名称				string，必填
//			Note:							备注				string，默认空
//			Spell:							助记符			   string，默认空
//			Longitude:						经度				decimal，默认0
//			Latitude						纬度				decimal，默认0
//		}
//		customerInfo:{						客户
//			CustomerLevelId:				客户等级标识		 long，必填非0
//			BizAreaId:						业务区域标识		 long，必填非0
//			SendStorageId:					发货仓库标识		 long，必填非0			
//		}
//		contactArr：						   联系人			   Array,
//			contactArr元素属性:
//				Contact:					联系人			    string，默认空
//				IsPrimaryPhone:				是否主电话		   boolean,默认false
//				PhoneNum：				   电话号码			  string，默认空
//				WeixinOpenId:				微信号				string,默认空
//		addrArr：						   联系地址		  	   Array，
//			addrArr元素属性:
//				Addr:						地址				string，默认空
//				IsPrimaryAddr:				是否主地址		  boolean,默认false
//				IsInvoiceAddr:				是否开票地址		 boolean,默认false
//				PostCode:					邮编				string,默认空
// 返回值:
//	
export const apiCreateCustomer = (userId, bizObjInfo, customerInfo, contactArr, addrArr) => {
	let data = {
		CustomerLevelId: customerInfo.CustomerLevelId,
		BizAreaId: customerInfo.BizAreaId,
		SendStorageId: customerInfo.SendStorageId,
		EmployeeId: userId
	};
	data.BizObj = bizObjInfo;
	data.BizObj.IsValid = true;
	data.BizObj.Type = 2;
	data.BizObj.Addrs = [];
	addrArr.forEach(item => {
		data.BizObj.Addrs.push(item);
	});
	data.BizObj.Phones = [];
	contactArr.forEach(item => {
		data.BizObj.Phones.push(item);
	});

	return fetch('/api/CRM/Customer/', data, 'POST');
}

// 编辑
export const apiEditCustomer = customerObj => fetch('/api/CRM/Customer/', customerObj, 'POST');

// 获取客户详细信息
export const apiGetCustomer = customerId => fetch('/api/CRM/Customer/' + customerId);

// 获取客户信用。。。可以考虑和客户信息合并
export const apiGetCustomerCredit = customerId => fetch('/api/Finance/CustCredit/' + customerId);

// 获取负责的业务区域
export const apiGetBizAreas = () => fetch('/api/Core/BizArea/getMyResponsibleArea');

// 获取本公司可用的客户等级
export const apiGetCustomerLevels = () => fetch('/api/CRM/CustomerLevel');

// 获取商品类目
export const apiGetCategories = () => fetch('/api/Goods/Category');

// 获取商品全局属性
export const apiGetGlobalProperty = () => fetch('/api/Goods/Goods/ListView');

// 获取商品属性
export const apiGetProperties = () => fetch('/api/Goods/Category/GetProperties/1');

// 获取商品列表
export const apiGetGoodsList = (customerId, storageId, categoryId, keyword, sortByFiled, sortByType, filters, offset) => {
	let data = {
		PageIndex: parseInt(offset / 20),
		PageSize: 20,
		GoodsTypes: [1, 3],
		Keyword: keyword,
		CustomerId: customerId,
		StorageId: storageId,
		CategoryId: categoryId,
		SortParam: {
			FiledName: sortByFiled,
			SortType: sortByType ? sortByType : 'asc'
		},
		AdvancedResult: {}
	};

	if (filters.LastSaleTime) data.LastSaleTime = filters.LastSaleTime;
	if (filters.ZeroStock) data.UnContainsZeroStockNum = true;
	if (filters.properties) data.AdvancedResult.Properties = filters.properties;

	return fetch('/api/Goods/Goods/GetGoods4Mobile', data)
};

// 订单查询参数组织
var _createQueryModel = (salerId, customerId, keyword, sortByFiled, sortByType, filters, offset) => {
	let data = {
		CustomerId: customerId,
		SalerId: salerId,
		PageIndex: parseInt(offset / 20),
		PageSize: 20,
		SortParam: {
			FiledName: sortByFiled,
			SortType: sortByType ? sortByType : 'asc'
		},
		AdvancedResult: { "Properties": {} }
	};

	if (keyword) data.KeyWord = keyword;
	if (filters.OnlyPayedShip) data.OnlyPayedShip = filters.OnlyPayedShip;
	if (filters.orderState) {
		data.quickResult = {};
		data.quickResult.Status = [];
		data.quickResult.Status.push(filters.orderState);
	};

	// 以下参数需要接口支持
	if (filters.OrderTime) data.TimeInterval = filters.OrderTime;

	return data;
}

// 外销订单,需要另加参数：CreateUserId:传入当前员工ID，TimeSpan,QuickResult.Status:状态参数（4、已审核；5、已完成），ChargeType:支付方式（0、挂账）
export const apiGetForeignSaleOrderList = (salerId, customerId, keyword, sortByFiled, sortByType, filters, offset) => {
	let data = _createQueryModel(salerId, customerId, keyword, sortByFiled, sortByType, filters, offset);
	return fetch('/api/Sale/ForeignSale/', data);
}

export const apiGetSaleOrderByUserId = (userId, status, chargeType, startDate, endDate) => {
	let data = {
		CreateUserId: userId,
		QuickResult: {
			Status: status,
			ChargeType: chargeType
		},
	};
	if (startDate && endDate) {
		data.TimeSpan = {
			startDate: startDate,
			endDate: endDate
		};
	}
	return fetch('/api/Sale/ForeignSale/', data);
};

// 外销订单详情
export const apiGetForeignSaleOrderDetail = orderId => fetch('/api/Sale/ForeignSale/' + orderId);

// 外销退回
export const apiGetForeignSaleReturnOrderList = (salerId, customerId, keyword, sortByFiled, sortByType, filters, offset) => {
	let data = _createQueryModel(salerId, customerId, keyword, sortByFiled, sortByType, filters, offset);
	return fetch('/api/Sale/ForeignSaleReturn/', data);
}

// 获取退货
export const apiGetSaleReturnByStorageId = (storageId, status, startDate, endDate) => {
	let data = {
		StorageId: storageId,
		QuickResult: {
			Status: status
		},
		advancedResult: { "Properties": {} },
	};
	if (startDate && endDate) {
		data.TimeSpan = {
			startDate: startDate,
			endDate: endDate
		};
	}
	return fetch('/api/Sale/ForeignSaleReturn', data);
};

// 外销退回详情
export const apiGetForeignSaleReturnOrderDetail = orderId => fetch('/api/Sale/ForeignSaleReturn/' + orderId);

// 销售出库
export const apiGetRetailOrderList = (salerId, customerId, keyword, sortByFiled, sortByType, filters, offset) => {
	let data = _createQueryModel(salerId, customerId, keyword, sortByFiled, sortByType, filters, offset);
	return fetch('/api/Sale/Retail/', data);
}

// 销售出库详情
export const apiGetRetailOrderDetail = orderId => fetch('/api/Sale/Retail/' + orderId);

// 销售出库退回
export const apiGetRetailReturnOrderList = (salerId, customerId, keyword, sortByFiled, sortByType, filters, offset) => {
	let data = _createQueryModel(salerId, customerId, keyword, sortByFiled, sortByType, filters, offset);
	return fetch('/api/Sale/RetailReturn/', data);
}

// 销售出库详情
export const apiGetRetailReturnOrderDetail = orderId => fetch('/api/Sale/RetailReturn/' + orderId);

// 创建退货单 
export const apiCreateReturn = (userInfo, returnCart) => {
	let data = {
		Address: { RecAddress: "", Contacts: "", Phone: "" },
		CustomerId: returnCart.customer.CustomerId,
		HanderId: userInfo.UserId,
		Items: [],
		SalerId: userInfo.UserId,
		SendStorageId: returnCart.storage.Id,
	};
	for (var key in returnCart.items) {
		if (returnCart.items.hasOwnProperty(key)) {
			var ele = returnCart.items[key];
			data.Items.push({
				GoodsId: ele.id,
				GoodsNum: ele.num,
				Price: ele.price,
				Units: ele.info.Units,
				IsVirtual: ele.info.GoodsType != 1
			});
		}
	}
	return fetch('/api/Sale/ForeignSaleReturn', data, 'POST');
};

// 审核退货单
export const apiVerifyReturn = (id) => fetch('/api/Sale/ForeignSaleReturn/Verify/' + id);

// 创建订单
export const apiCreateOrder = (userInfo, cart) => {
	let data = {
		Address: {
			RecAddress: cart.addr.Addr,
			Contacts: cart.phone.Contact,
			Phone: cart.phone.PhoneNum
		},											// 地址
		SendStorageId: cart.storage.Id,				// 发货仓库
		CustomerId: cart.customer.CustomerId,		// 客户Id
		HanderId: userInfo.UserId,					// 经办人
		Note: cart.remark,							// 备注
		Items: [],									// 明细
		OperatorId: userInfo.UserId,				// 操作人
		SupplierId: userInfo.CorpId,				// 供应商
		SalerId: userInfo.UserId,					// 业务员
		ChargeType: cart.charge.Id,					// 应收应付类别
		ShipType: cart.ship.TypeCode,				// 配送方式
		LogisticsCorpId: cart.express.Id,			// 物流公司Id
		CreateUserId: userInfo.UserId,				// 创建人

	};

	for (var key in cart.items) {
		if (cart.items.hasOwnProperty(key)) {
			var ele = cart.items[key];
			data.Items.push({
				GoodsId: ele.id,
				GoodsNum: ele.num,
				Price: ele.price,
				Units: ele.info.Goods.Units,
				IsVirtual: ele.info.Goods.GoodsType != 1
			});
		}
	}

	return fetch('/api/Sale/ForeignSale', data, 'POST')
};

// 提交订单
export const apiConfirmOrder = (id) => fetch('/api/Sale/ForeignSale/Confirm/' + id);

// 审核订单
export const apiVerifyOrder = (id) => fetch('/api/Sale/ForeignSale/Verify/' + id);

// 可退清单
export const apiGetSaleDealItem = (customerId, keyword, startDate, endDate, offset) => {
	let data = {
		PageIndex: parseInt(offset / 20),
		PageSize: 20,
		CustomerId: customerId,
		QuickResult: { "Status": [2] },
		AdvancedResult: { Properties: { "1": keyword } }
	};

	if (startDate && endDate) {
		data.TimeSpan = {
			startDate: startDate,
			endDate: endDate
		};
	}
	return fetch('api/Sale/SaleDeal/Get4Transfer', data);
};

// 获取库存
export const apiGetGoodsStock = storageId => {
	let data = {
		StorageId: storageId,
		QuickResult: {
			IsValid: [1],
			IsHaveStockNum: [1]
		}
	};
	return fetch('/api/Storage/SubStock/GetGoodsStocks', data);
};

// 获取某商品在本公司各仓库的可用库存
export const apiGetAllStorageStocks = goodsId => fetch('/api/Storage/SubStock/GetAllStorageByGoodsId?SubStockType=2&GoodsIds=' + goodsId);

// 获取某商品在所有公司的可用库存
export const apiGetAllCorpsGoodsStocks = goodsId => fetch('/api/Storage/Report/AllCorpsGoodsStock?GoodsId=' + goodsId);

// 获取某商品的等级价格、销售价格
export const apiGoodsSaleRefPrice = (goodsId, customerId) => fetch('/api/Sale/SaleRefPrice/' + goodsId + "/" + customerId);

// 获取客户应收款列表
export const apiGetOughtRecs = (customerId, keyword, sortByFiled, sortByType, quickResult, offset) => {
	let data = {
		// PageIndex: parseInt(offset / 20),
		// PageSize: 20,
		PageIndex: 0,
		PageSize: 0,
		Keyword: keyword,
		CustomerId: customerId,
		SortParam: {
			FiledName: sortByFiled,
			SortType: sortByType ? sortByType : 'asc'
		},
		AdvancedResult: {},
		QuickResult: quickResult
	};

	return fetch('/api/Finance/OughtRec/', data)
};

// 获取客户对账列表（S弯）
export const apiGetCustomerReconciliation = (customerId, keyword, timeSpan, offset) => {
	let data = {
		// PageIndex: parseInt(offset / 20),
		// PageSize: 20,
		PageIndex: 0,
		PageSize: 0,
		Keyword: keyword,
		CustomerId: customerId,
		timeSpan: timeSpan,
		AdvancedResult: {},
	};

	return fetch('/api/Finance/Query/CustReconciliation', data)
};

// 获取发货列表
// export const apiExpresses = (customerId, storageId, logisticsCorpId, keyword, sortByFiled, sortByType, timeSpan, logisticsStates, settleStates, offset) => {
// 	let data = {
// 		PageIndex: parseInt(offset / 20),
// 		PageSize: 20,
// 		Keyword: keyword,
// 		CustomerId: customerId,
// 		StorageId: storageId,
// 		LogisticsCorpId: logisticsCorpId,
// 		SortParam: {
// 			FiledName: sortByFiled,
// 			SortType: sortByType ? sortByType : 'asc'
// 		},
// 		TimeSpan: timeSpan,
// 		QuickResult: {
// 			LogisticsStates: logisticsStates,		//接收数组，物流状态1、未出库；2、已出库；3、已发货；4、已收货
// 			SettleStates: settleStates				//接收数组，结销状态8、未结销；16、部分结销；24、已结销
// 		}
// 	};

// 	return fetch('/api/Logistics/Express/', data)
// };

// 获取发货列表简化
export const apiGetExpresses = (status, startDate, endDate, logisticsId) => {
	let data = {
		QuickResult: {
			LogisticsStates: status,		//接收数组，物流状态1、未出库；2、已出库；3、已发货；4、已收货
		}
	};

	if (logisticsId)
		data.LogisticsCorpId = logisticsId;

	if (startDate && endDate) {
		data.TimeSpan = {
			startDate: startDate,
			endDate: endDate
		};
	}
	return fetch('/api/Logistics/Express/', data);
};

// 获取发货单
export const apiGetExpress = id => fetch('/api/Logistics/Express/' + id);

// 保存发货单
export const apiSaveExpress = express => fetch('/api/Logistics/Express/' + express.Id, express, 'POST');

// 发货
export const apiSendOutExpress = id => fetch('/api/Logistics/Express/SendOut', { id }, 'POST');

// 获取执行单
export const apiGetDeal = id => fetch('/api/Sale/SaleDeal/' + id);

// 获取某业务员某时间段内收现金情况,返回对象为{m_Item1:金额}
export const apiGetEmployeeSettlementMoney = (startDate, endDate, customerId) => {
	let data = {
		PageIndex: 0,
		PageSize: 1,
	};

	if (customerId)
		data.CustomerId = customerId;

	if (startDate && endDate) {
		data.TimeSpan = {
			startDate: startDate,
			endDate: endDate
		};
	}
	return fetch('/api/Finance/RecSettlement/GetEmployeeSettlementMoney', data);
};


// 微信jsConfig
export const apiGetWxJsConfig = () => {
	let url = encodeURIComponent(window.location.href.split('#')[0]);
	return fetch('/WxQyJS/GetConfig?url=' + url);
}

// 微信获取公众号二维码（带客户id标识）
export const apiGetWeChatSubscriptionQrCode = customerId => {
	return fetch('/WxMpAuxiliary/GetQrCodeUrl?userId=' + customerId);
}

// *********************************
// 收付款相关服务
// 收款账户列表
export const apiGetRecPayAccountList = () => fetch('/api/Finance/RecPayAccount/GetRecPayAccount4Select');

// 创建收款单
// 预收款 和 收款结算 唯一的区别是业务类型 12010:收款单  22020:预收款单
export const apiCreateRecSettlement = (userId, customerId, recAccountId, money, bizType) => {
	let data = {
		BizType: bizType,
		CustomerId: customerId,
		HanderId: userId,
		Money: money,
		SupAccountId: recAccountId,
		BizDateTime: new Date(),
		CreateTime: new Date(),
	};

	return fetch('/api/Finance/RecSettlement', data, 'POST');
}

// 收款/预收款单据列表
export const apiGetRecSettlementList = (createUserId, bizType, keyword, startDate, endDate, sortByFiled, sortByType, filters, offset) => {
	let data = {
		PageIndex: parseInt(offset / 20),
		PageSize: 20,
		BizType: bizType,
		Keyword: keyword,
		UserId: createUserId,
		SortParam: {
			FiledName: sortByFiled,
			SortType: sortByType ? sortByType : 'asc'
		},
		TimeSpan: {
			startDate: startDate,
			endDate: endDate
		},
		AdvancedResult: { "Properties": {} }
	};

	if (filters.orderState) {
		data.quickResult = {};
		data.quickResult.Status = [];
		data.quickResult.Status.push(filters.orderState);
	}

	return fetch('/api/Finance/RecSettlement', data);
}

// 获取收款/预收款单详情
export const apiGetRecSettlementDetail = id => fetch('/api/Finance/RecSettlement/' + id);

// 删除预收款单
export const apiDeleteRecSettlement = id => fetch('/api/Finance/RecSettlement/' + id, null, "DELETE");

// 创建支付流水
export const apiProcessPay = (providerName, recAccountId, billId, billNo, bizType, money, customerId) => {
	let data = {
		ProviderName: providerName,
		RecAccountId: recAccountId,
		PayOrder: {
			BillId: billId,
			BillNo: billNo,
			BizType: bizType,
			Money: money,
			CustomerId: customerId
		}
	};

	return fetch('/api/Finance/Payments/ProcessPay', data, 'POST');
};

// 当面扫码付发起支付
export const apiPay = payModel => fetch('/api/Finance/Payments/Pay', payModel, 'POST');

// 支付详情
export const apiGetPaymentsDetail = id => fetch('/api/Finance/Payments/Query/' + id);

// 在线支付流水详情
export const apiGetPaymentsJournalDetail = id => fetch('/api/Finance/PaymentsJournal/' + id);

// end 收付款相关服务
// **********************************

// 获取车系
export const apiGetCarTypes = keyword => {
	let data = {
		KeyWord: keyword
	};
	return fetch('/api/Knowledge/KnowledgeSearch/GetCarTypeViewForKnowledge', data)
};

// 获取车系年款
export const apiGetCarTypeYears = ids => {
	let data = {
		CarTypeIds: ids
	};
	return fetch('/api/Knowledge/KnowledgeSearch/GetModelYearForKnowledge', data);
};

// 获取知识库
export const apiGetKnowledgeList = (keyword, typeIds, years, offset) => {
	let data = {
		PageIndex: parseInt(offset / 20),
		PageSize: 20,
		KeyWord: keyword,
	};

	if (typeIds)
		data.CarTypeIds = typeIds;
	if (years)
		data.ModelYears = years;

	return fetch('/api/Knowledge/KnowledgeSearch/GetKnowledgeSearchListForCar', data);
};

// 获取车型信息
export const apiGetCar = id => fetch('/api/Knowledge/Car/' + id);
// 获取文章
export const apiGetKnowledgeText = id => fetch('/api/Knowledge/Text/' + id);

// 获取适用配件信息
export const apiGetMatchParts = id => fetch('/api/Knowledge/MatchPart/' + id)

// 获取通用件信息
export const apiGetGlobalParts = id => fetch('/api/Knowledge/PartsType/Global');

// 关键字获取文章
export const apiGetTextList = keyword => fetch('/api/Knowledge/Text', { Keyword: keyword });