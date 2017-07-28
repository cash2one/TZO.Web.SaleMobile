import fetch from 'src/config/fetch'

// 通过微信一次代码换取认证令牌
export const apiGetToken = code => fetch('/api/WxQy/Auth/getToken/' + code);

// 令牌过期后刷新令牌
export const apiRefreshToken = token => fetch('');

// 设置公司身份
export const apiSetCorpId = corpId => fetch('/api/WxQy/Auth/setCorpId/' + corpId);

// 获取用户信息
export const apiGetUserInfo = () => fetch('/api/Account/UserInfo');

// 获取有效的仓库信息
export const apiGetStorages = () => fetch('/api/Storage/Storage/IsValid');

// 获取物流公司信息
export const apiGetExpressCorps = () => fetch('/api/Logistics/LogisticsCorp');

// 获取客户列表
export const apiGetCustomers = (longitude, latitude, areaId, keyword, sortByFiled, sortByType, filters, offset) => {
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
export const apiSetVisitingAndSigningIn = (customerId,latitude,longitude) => {
	let data={
		BizObjId:customerId,
		Latitude:latitude,
		Longitude:longitude
	};
	return fetch('/api/CRM/SignLog/', data,'POST','fetch');
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
export const apiCreateCustomer =(userId,bizObjInfo,customerInfo,contactArr,addrArr) =>{
	let data= {
			CustomerLevelId:customerInfo.CustomerLevelId,
			BizAreaId:customerInfo.BizAreaId,
			SendStorageId:customerInfo.SendStorageId,
			EmployeeId:userId
	};
	data.BizObj = bizObjInfo;
	data.BizObj.IsValid = true;
	data.BizObj.Type = 2;
	data.BizObj.Addrs=[];
	addrArr.forEach(item=>{
		data.BizObj.Addrs.push(item);
	});
	data.BizObj.Phones=[];
	contactArr.forEach(item=>{
		data.BizObj.Phones.push(item);
	});

	return fetch('/api/CRM/Customer/', data,'POST','fetch');
}

// 获取客户详细信息
export const apiGetCustomer = customerId => fetch('/api/CRM/Customer/' + customerId);

// 获取负责的业务区域
export const apiGetBizAreas = () => fetch('/api/Core/BizArea/getMyResponsibleArea');

// 获取商品类目
export const apiGetCategories = () => fetch('/api/Goods/Category');

// 获取商品全局属性
export const apiGetGlobalProperty = () => fetch('/api/Goods/Goods/ListView');

// 获取商品属性
export const apiGetProperties = () => fetch('/api/Goods/Category/GetProperties/1');

// 获取商品列表
export const apiGetGoods = (customerId, storageId, categoryId, keyword, sortByFiled, sortByType, filters, offset) => {
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

// 获取客户信用。。。可以考虑和客户信息合并
export const apiGetCustomerCredit = customerId => fetch('/api/Finance/CustCredit/' + customerId);

var _createQueryModel=(salerId,customerId, keyword, sortByFiled, sortByType, filters, offset)=>{
	let data = {
		CustomerId: customerId,
		SalerId:salerId,
		PageIndex: parseInt(offset / 20),
		PageSize: 20,
		SortParam: {
			FiledName: sortByFiled,
			SortType: sortByType ? sortByType : 'asc'
		},
		AdvancedResult: {"Properties":{}}
	};

	if (keyword) data.KeyWord = keyword;
	if (filters.OnlyPayedShip) data.OnlyPayedShip = filters.OnlyPayedShip;
	if (filters.orderState) {
		data.quickResult={};
		data.quickResult.Status=[];
		data.quickResult.Status.push(filters.orderState);
	};
	
	// 以下参数需要接口支持
	if (filters.OrderTime) data.OrderTime = filters.OrderTime;

	return data;
}

// 外销订单
export const apiGetForeignSaleOrderList = (salerId,customerId, keyword, sortByFiled, sortByType, filters, offset)=>{
	let data = _createQueryModel(salerId,customerId, keyword, sortByFiled, sortByType, filters, offset);
	return fetch('/api/Sale/ForeignSale/', data);
}

// 外销订单详情
export const apiGetForeignSaleOrderDetail = orderId => { return fetch('/api/Sale/ForeignSale/', orderId); }

// 外销退回
export const apiGetForeignReturnOrderList = (salerId,customerId, keyword, sortByFiled, sortByType, filters, offset)=>{
	let data = _createQueryModel(salerId,customerId, keyword, sortByFiled, sortByType, filters, offset);
	return fetch('/api/Sale/ForeignSaleReturn/', data);
}

// 外销退回详情
export const apiGetForeignSaleReturnOrderDetail = orderId => {	return fetch('/api/Sale/ForeignSaleReturn/', orderId); }

// 销售出库
export const apiGetRetailOrderList = (salerId,customerId, keyword, sortByFiled, sortByType, filters, offset)=>{
	let data = _createQueryModel(salerId,customerId, keyword, sortByFiled, sortByType, filters, offset);
	return fetch('/api/Sale/Retail/', data);
}

// 销售出库详情
export const apiGetRetailOrderDetail = orderId => {	return fetch('/api/Sale/Retail/', orderId); }

// 销售出库退回
export const apiGetRetailReturnOrderList = (salerId,customerId, keyword, sortByFiled, sortByType, filters, offset)=>{
	let data = _createQueryModel(salerId,customerId, keyword, sortByFiled, sortByType, filters, offset);
	return fetch('/api/Sale/RetailReturn/', data);
}

// 销售出库详情
export const apiGetRetailReturnOrderDetail = orderId => {	return fetch('/api/Sale/RetailReturn/', orderId); }

// 提交订单

// 修改订单

//获取某商品在本公司各仓库的可用库存
export const apiGetAllStorageStocks = goodsId => fetch('/api/Storage/SubStock/GetAllStorageByGoodsId?SubStockType=2&GoodsIds=' + goodsId);

//获取某商品在所有公司的可用库存
export const apiGetAllCorpsGoodsStocks = goodsId => fetch('/api/Storage/Report/AllCorpsGoodsStock?GoodsId=' + goodsId);

//获取某商品的等级价格、销售价格
export const apiGoodsSaleRefPrice = (goodsId, customerId) => fetch('/api/Sale/SaleRefPrice/' + goodsId + "/" + customerId);