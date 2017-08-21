import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from 'src/router/router'
import store from 'src/store/'
import 'src/config/rem'
import { routerMode, setToken, debug } from 'src/config/env'
import FastClick from 'fastclick'
import {
	apiGetToken,
	apiGetWxJsConfig,
} from 'src/service/getData'

import AMap from 'vue-amap'
import { lazyAMapApiLoaderInstance } from 'vue-amap';
import wx from 'weixin-js-sdk'

if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function () {
		FastClick.attach(document.body);
	}, false);
}

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
}

if (!debug)
	console.log = function () {
		return false;
	}

Vue.use(VueRouter);

Vue.use(AMap);
AMap.initAMapApiLoader({
	//key换成自己的，这个是在网络上找的，不是我们自己申请的
	key: '199462e78d12956cf1e5e4c7e340f2ec',
	plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView',
		'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor',
		'AMap.Transfer', 'AMap.Walking', 'AMap.Driving', 'AMap.Riding', 'Walking', 'AMap.Geocoder']
});

Vue.filter('time', function (value) {//value为13位的时间戳
	if (value == '0001-01-01T00:00:00+00:00') {
		return "无";
	}

	function add0(m) {
		return m < 10 ? '0' + m : m
	}
	var time = new Date(value);
	var y = time.getFullYear();
	var m = time.getMonth() + 1;
	var d = time.getDate();

	var hh = time.getHours();
	var mm = time.getMinutes();
	var ss = time.getSeconds();

	return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(hh) + ':' + add0(mm) + ':' + add0(ss);
});

const router = new VueRouter({
	routes,
	mode: routerMode,
	strict: process.env.NODE_ENV !== 'production',
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			if (from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop;
			}
			return { x: 0, y: to.meta.savedPosition || 0 }
		}
	}
})

router.beforeEach((to, from, next) => {
	if (to.path == '/corp-list') { next(); return; }
	if (store.state.curCorp.CorpId) { next(); return; }

	console.log(to.path + ' next /corp-list');

	next('/corp-list');
})

apiGetToken(GetQueryString('code')).then(rec => {
	setToken('bearer ' + rec.Token);
	store.state.corpList = rec.EmployeeCorpRel;

	apiGetWxJsConfig().then(data => {
		wx.config({
			debug: false,
			appId: data.AppId,
			timestamp: data.TimeStamp,
			nonceStr: data.NonceStr,
			signature: data.Sign,
			jsApiList: [
				'checkJsApi',
				'scanQRCode',
			]
		});
	});

	new Vue({
		router,
		store,
	}).$mount('#app')
});


