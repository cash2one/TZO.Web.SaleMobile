<template>
	<div>
		<transition name="router-fade" mode="out-in">
			<keep-alive>
				<router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
		</transition>
		<transition name="router-fade" mode="out-in">
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</transition>
	</div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import { apiGetToken } from 'src/service/getData'

export default {
	mounted() {
		this.initData();
	},
	methods: {
		...mapActions([
			'refreshToken',
			'setCurCorp'
		]),
		...mapMutations([
			'GET_CORPLIST',
			'INIT_DATA'
		]),
		async initData() {
			let res = await apiGetToken(this.$route.query.code);

			this.refreshToken(res.Token);

			this.GET_CORPLIST(res.EmployeeCorpRel);
			this.INIT_DATA();

			if (res.EmployeeCorpRel.length == 1) {
				this.setCurCorp(res.EmployeeCorpRel[0]);
			}
			else
				this.$router.push('/corp-list');
		}
	}
}

</script>

<style lang="scss">
@import 'src/style/common';
</style>
