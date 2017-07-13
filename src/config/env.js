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
let routerMode = 'history';
let imgBaseUrl = 'http://oaingatek.eicp.net:27473/';
let token = 'bearer y71aV_vEJPi-U-6I9zCnyN54gczWCHcOry8R9bRRLoedQri7LAZMrYVlH6RED3TcQs57tf5fhcgJRhM0g-U1fZSsbiarEyuuSjTuQDnxsiRvmQFPpXDakQiAiazq6v-XyUBcTRkaOW3xwFIoeOE4vclQ91XOyAKt0Icem-wvMh_NgAglFJ_vPFaH0-907G3MiUHZLID32snuORllP5GOWGmYP44PnrvgLSsmxY6-6wX5ZU05npJkOdgY7izADHADZUUt5AofOJ6gA7jjp1EAwBQ2M97KA4HC8N07BcWDbfs1l9VJwixBsdMW5CmQjkNImUrZ88otKRV60C_XreqimY6hxDqV48E9EZsA-VSHqu54CFwB77eZ4LMJ-O376gx7Kb_WYl7TluhtytTXZvHRDBRTVG5rYNGHhCz_lTbT1z4tzNDgRjBiojgAAx3gGN2y6AzusJuGjJMWrQIzTlHw_YdRUcEQQsVp1fT1MekcvxY';


if (process.env.NODE_ENV == 'development') {

} else if (process.env.NODE_ENV == 'production') {

	// baseUrl = 'http://cangdu.org:8001';
}

export {
	baseUrl,
	routerMode,
	imgBaseUrl,
	token
}