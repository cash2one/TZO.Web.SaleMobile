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
import { mapMutations } from 'vuex'

export default {
	mounted() {
		this.initData();
	},
	methods: {
		...mapMutations([
			'INIT_SHOOSE_DATA',
		]),
		 initData() {
			this.INIT_SHOOSE_DATA();
		},
	}
}

</script>

<style lang="scss">
@import './style/common';

</style>
