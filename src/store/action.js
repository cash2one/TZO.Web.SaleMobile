import {
	apiSetCorpId,
	apiGetUserInfo,
	apiGetStorages,
	apiGetMyStorages,
	apiGetExpressCorps,
	apiGetBizAreas,
	apiGetCategories,
	apiGetGlobalProperty,
	apiGetProperties,
	apiGetChargeType,
	apiGetShipType,
	apiGetEmployees
} from 'src/service/getData'
import {
	REFRESH_TOKEN,
	INIT_CORP_DATA,
	GET_USERINFO,
	GET_STORAGE_LIST,
	GET_MY_STORAGE_LIST,
	GET_EXPRESS_LIST,
	GET_POSITION,
	GET_BIZAREA_LIST,
	GET_GLOBAL_PROPERTY,
	GET_PROPERTY_LIST,
	GET_CATEGORY_LIST,
	GET_CATEGORY_DETAIL_LIST,
	GET_CHARGE_TYPE,
	GET_SHIP_TYPE,
	GET_EMPLOYEE,
	SAVE_CUR_CORP,
	SAVE_CUR_GOODS,
	POSITION_INTERVAL,
	SAVE_ADDRESS,
} from './mutation-types.js'
// 提交事件而不是直接改变state

export default {

	async refreshToken({ commit }, code) {
		commit(REFRESH_TOKEN, code);
	},

	async setCurGoods({ commit }, goods) {
		commit(SAVE_CUR_GOODS, goods)
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

	async getMyStorageList({ commit, state }) {
		if (!state.myStorageList.length > 0) {
			let res = await apiGetMyStorages(state.userInfo.CorpId, state.userInfo.UserId);
			commit(GET_MY_STORAGE_LIST, res.EmployeeStorages.map((val) => {
				return { Id: val.StorageId, Name: val.StorageName };
			}));
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

	async getChargeType({ commit, state }) {
		if (!state.chargeTypeList.length > 0) {
			let res = await apiGetChargeType();

			commit(GET_CHARGE_TYPE, res.Items.map(item => {
				return { Id: item.TypeCode, Name: item.Name };
			}));
		}
	},

	async getShipType({ commit, state }) {
		if (!state.shipTypeList.length > 0) {
			let res = await apiGetShipType();

			commit(GET_SHIP_TYPE, res.Items)
		}
	},

	async getEmployees({ commit, state }) {
		if (!state.employeeList.length > 0) {
			let res = await apiGetEmployees(state.curCorp.CorpId);

			commit(GET_EMPLOYEE, res.Items);
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