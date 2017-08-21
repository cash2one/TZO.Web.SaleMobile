<template>
	<transition name="router-fade" mode="out-in">
		<router-view></router-view>
	</transition>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import headerTitle from 'src/components/header/header-title'
import footGuide from 'src/components/footer/foot-guide'
import loading from 'src/components/common/loading'
import selectSlidUp from 'src/components/common/select-slid-up'

export default {
	created() {
		console.log('app created');
		this.INIT_DATA();
	},
	mounted() {
		this.autoGetPosition();
	},
	methods: {
		...mapActions([
			'autoGetPosition'
		]),
		...mapMutations([
			'INIT_DATA'
		])
	}
}

</script>

<style lang="scss">
@import 'src/style/common';
</style>
