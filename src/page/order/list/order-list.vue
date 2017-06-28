<template>
    <div>
        <header-title header-title="订单列表" go-back='true'></header-title>
        <foot-guide></foot-guide>
    </div>
</template>

<script>
import headerTitle from 'src/components/header/header-title'
import footGuide from 'src/components/footer/foot-guide'

export default {
    components: {
        headerTitle,
        footGuide
    },
}
</script>