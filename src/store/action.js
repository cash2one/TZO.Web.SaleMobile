import {
	apiSetCorpId,
	apiGetUserInfo,
	apiGetStorages,
	apiGetExpressCorps,
	apiGetBizAreas,
	apiGetCategories,
	apiGetGlobalProperty,
	apiGetProperties
} from 'src/service/getData'
import {
	REFRESH_TOKEN,
	INIT_CORP_DATA,
	GET_USERINFO,
	GET_STORAGE_LIST,
	GET_EXPRESS_LIST,
	GET_POSITION,
	GET_BIZAREA_LIST,
	GET_GLOBAL_PROPERTY,
	GET_PROPERTY_LIST,
	GET_CATEGORY_LIST,
	GET_CATEGORY_DETAIL_LIST,
	SAVE_CUR_CORP,
	POSITION_INTERVAL,
	SAVE_ADDRESS,
} from './mutation-types.js'
// 提交事件而不是直接改变state

export default {

	async refreshToken({ commit }, code) {
		commit(REFRESH_TOKEN, code);
	},

	async setCurCorp({ commit }, corp) {
		let res = await apiSetCorpId(corp.CorpId);

		commit(REFRESH_TOKEN, res.Token);
		commit(SAVE_CUR_CORP, corp);
		commit(INIT_CORP_DATA, corp.CorpId);
	},

	async getUserInfo({ commit, state }) {
		if (!state.userInfo.UserId) {
			let res = await apiGetUserInfo();
			commit(GET_USERINFO, res);
		}
	},

	async getStorageList({ commit, state }) {
		if (!state.storageList.length > 0) {
			let res = await apiGetStorages();
			commit(GET_STORAGE_LIST, res.Items);
		}

	},

	async getExpressList({ commit, state }) {
		if (!state.expressList.length > 0) {
			let res = await apiGetExpressCorps();
			commit(GET_EXPRESS_LIST, res.Items);
		}
	},
	async getPrinterList({ commit, state }) { },

	async getBizAreaList({ commit, state }) {
		if (!state.bizAreaList.length > 0) {
			let res = await apiGetBizAreas();
			commit(GET_BIZAREA_LIST, res.Items);
		}
	},

	async getGlobalProperty({ commit, state }) {
		if (!state.globalPropertyList.length > 0) {
			let res = await apiGetGlobalProperty();
			commit(GET_GLOBAL_PROPERTY, res.GlobalProperties);
		}
	},

	async getPorpertyList({ commit, state }) {
		if (!state.propertyList.length > 0) {
			let res = await apiGetProperties();
			commit(GET_PROPERTY_LIST, res);
		}
	},
	async getCategoryList({ commit, state }) {
		if (!state.categoryList.length > 0) {
			let res = await apiGetCategories();

			commit(GET_CATEGORY_LIST, res.Items);
		}
	},

	async autoGetPosition({ commit, state }) {
		let getPositionCallback = function (position) {
			console.log('position callback')
			commit(GET_POSITION, position.coords)
		};
		navigator.geolocation.getCurrentPosition(getPositionCallback);
		console.log('position get')
		let interval = setInterval(() => {
			console.log(state.lastPositionTime);
			navigator.geolocation.getCurrentPosition(getPositionCallback);
		}, 1000000);
		commit(POSITION_INTERVAL, interval);
	},

	async saveAddress({
		commit,
		state
	}) {

		if (state.removeAddress.length > 0) return;

		let addres = await getAddressList(state.userInfo.user_id);
		commit(SAVE_ADDRESS, addres);
	},
}