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
export const apiGetCustomers = (areaid, keyword, offset, gps, statements) => {
	let data = {
		pageIndex: parseInt(offset / 20),
		pageSize: 20,
		quickResult: {
			"IsValids": [true]
		}
	};
	if (areaid) data.BizAreaId = areaid;
	if (keyword) data.keyWord = keyword;
	if (gps) data.quickResult.HasGps = gps;
	if (statements) data.quickResult.OpenOpenStatements = statements;

	return fetch('/api/CRM/Customer', data);
};

// 获取客户详细信息
export const apiGetCustomer = customerId => fetch('/api/CRM/Customer/' + customerId);

// 获取负责的业务区域
export const apiGetBizAreas = () => fetch('/api/Core/BizArea');

// 获取商品类目
export const apiGetCategories = () => fetch('/api/Goods/Category');

// 获取商品属性
export const apiGetProperties = () => fetch('/api/Goods/Category/GetProperties/1');

// 获取商品列表
export const apiGetGoods = (keyword, offset) => {
	let data = {
		PageIndex: parseInt(offset / 20),
		PageSize: 20,
		GoodsTypes: [1, 3],
		Keyword: keyword
	};

	return fetch('/api/Storage/SubStock/GoodsSource', data, 'POST')
};

// 获取客户信用。。。可以考虑和客户信息合并
export const apiGetCustomerCredit = customerId => fetch('/api/Finance/CustCredit/' + customerId);

// 获取订单列表

// 提交订单

// 修改订单