<template>
	<transition name="router-fade" mode="out-in">
		<router-view></router-view>
	</transition>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
	mounted() {
		this.INIT_DATA();
	},
	methods: {
		...mapMutations([
			'INIT_DATA'
		])
	}
}

</script>

<style lang="scss">
@import 'src/style/common';
</style>
