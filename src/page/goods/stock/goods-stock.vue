<template>
    <div>
        <header-title></header-title>
        <goods-list></goods-list>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import headerTitle from 'src/components/header/header-title'
import goodsList from 'src/components/common/goods-list'

export default {
    components: {
        headerTitle,
        goodsList
    },
}
</script>

<style lang="scss" scoped>

</style>
