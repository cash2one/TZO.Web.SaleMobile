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

// 获取订单列表

// 提交订单

// 修改订单

//获取某商品在本公司各仓库的可用库存
export const apiGetAllStorageStocks = goodsId => fetch('/api/Storage/SubStock/GetAllStorageByGoodsId?SubStockType=2&GoodsIds=' + goodsId);

//获取某商品在所有公司的可用库存
export const apiGetAllCorpsGoodsStocks = goodsId => fetch('/api/Storage/Report/AllCorpsGoodsStock?GoodsId=' + goodsId);

//获取某商品的等级价格、销售价格
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
		QuickResult:quickResult
	};

	return fetch('/api/Finance/OughtRec/', data)
};