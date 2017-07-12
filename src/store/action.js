import {
	apiSetCorpId,
	apiGetUserInfo
} from 'src/service/getData'
import {
	REFRESH_TOKEN,
	GET_USERINFO,
	SAVE_CUR_CORP,
	INIT_CORP_DATA,
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
		if (state.userInfo == null) {
			let res = await apiGetUserInfo();
			commit(GET_USERINFO, res)
		}
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