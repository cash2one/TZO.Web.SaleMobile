import {
	apiSetCorpId,
	apiGetUserInfo,
	apiGetStorages,
	apiGetExpressCorps
} from 'src/service/getData'
import {
	REFRESH_TOKEN,
	GET_USERINFO,
	SAVE_CUR_CORP,
	INIT_CORP_DATA,
	GET_STORAGE_LIST,
	GET_EXPRESS_LIST,
	SAVE_ADDRESS
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

	async saveAddress({
		commit,
		state
	}) {

		if (state.removeAddress.length > 0) return;

		let addres = await getAddressList(state.userInfo.user_id);
		commit(SAVE_ADDRESS, addres);
	},
}