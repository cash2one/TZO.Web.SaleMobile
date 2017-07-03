<template>
    <div>
        <header-title header-title="出店" go-back='true'>
        </header-title>
        <section class="info-data">
            <ul class="clear">
                <router-link to="/balance" tag="li" class="info-data-link">
                    <span class="info-data-top">
                        <b>11</b>个</span>
                    <span class="info-data-bottom">访客</span>
                </router-link>
                <router-link to="/benefit" tag="li" class="info-data-link">
                    <span class="info-data-top">
                        <b>11</b>单</span>
                    <span class="info-data-bottom">送货</span>
                </router-link>
                <router-link to="/points" tag="li" class="info-data-link">
                    <span class="info-data-top">
                        <b>22</b>单</span>
                    <span class="info-data-bottom">退货</span>
                </router-link>
            </ul>
        </section>
        <section class="tabs" ref="chooseType">
            <div class="item">
                <span :class='{active: changeShowType =="delivery"}' @click="changeShowType='delivery'">送货</span>
            </div>
            <div class="item">
                <span :class='{active: changeShowType =="transfer"}' @click="changeShowType='transfer'">备货</span>
            </div>
        </section>
        <transition name="tab-choose">
            <section v-show="changeShowType =='delivery'" class="container">
                delivery
            </section>
        </transition>
        <transition name="tab-choose">
            <section v-show="changeShowType =='transfer'" class="container">
                transfer
            </section>
        </transition>
    </div>
</template>

<script>
import headerTitle from 'src/components/header/header-title'
export default {
    data() {
        return {
            changeShowType: 'delivery',
        }
    },
    components: {
        headerTitle
    },
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
.info-data {
    padding-top: 1.95rem;
}

.container {
    display: flex;
    flex: 1;
    padding-bottom: 2rem;
    .header{}
    .list{}
}

</style>
