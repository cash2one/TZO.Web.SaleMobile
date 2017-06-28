<template>
    <div>
        <header-search></header-search>
        <goods-list></goods-list>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import headerSearch from 'src/components/header/header-search'
import goodsList from 'src/components/common/goods-list'

export default {
    components: {
        headerSearch,
        goodsList
    },
}
</script>

<style lang="scss" scoped>

</style>
