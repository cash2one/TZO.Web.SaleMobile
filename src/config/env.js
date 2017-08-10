/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * token: 认证令牌
 * 
 */

let baseUrl = '';
let routerMode = 'hash';
let imgBaseUrl = 'http://oaingatek.eicp.net:27473/';
let token = '';
let corpList = [];

export const debug = true;

export const setToken = val => {
	token = val;
}
export const getToken = () => {
	return token;
}
export const setCorpList = list => {
	corpList = list;
}
export const getCorpList = () => {
	return corpList;
}


if (process.env.NODE_ENV == 'development') {

} else if (process.env.NODE_ENV == 'production') {

	// baseUrl = 'http://cangdu.org:8001';
}

export {
	baseUrl,
	routerMode,
	imgBaseUrl
}