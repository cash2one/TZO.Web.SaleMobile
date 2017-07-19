import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from 'src/router/router'
import store from 'src/store/'
import 'src/config/rem'
import { routerMode, setToken, debug } from 'src/config/env'
import FastClick from 'fastclick'
import { apiGetToken } from 'src/service/getData'

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

Vue.use(VueRouter)
Vue.filter('time', function (value) {//value为13位的时间戳
    function add0(m) {
        return m < 10 ? '0' + m : m
    }
    var time = new Date(parseInt(value));
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();

    return y + '.' + add0(m) + '.' + add0(d);
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

	new Vue({
		router,
		store,
	}).$mount('#app')
});



