<template>
    <div>
        <header-title header-title="回店" go-back='true'>
        </header-title>
        <section class="info-data">
            <ul class="clear">
                <router-link to="/balance" tag="li" class="info-data-link">
                    <span class="info-data-top">
                        <b>11.00</b>元</span>
                    <span class="info-data-bottom">现金</span>
                </router-link>
                <router-link to="/benefit" tag="li" class="info-data-link">
                    <span class="info-data-top">
                        <b>111</b>单</span>
                    <span class="info-data-bottom">挂帐</span>
                </router-link>
                <router-link to="/points" tag="li" class="info-data-link">
                    <span class="info-data-top">
                        <b>22</b>单</span>
                    <span class="info-data-bottom">退货</span>
                </router-link>
            </ul>
        </section>
        <section class="tabs" ref="chooseType">
            <div class="item" >
                <span :class='{active: changeShowType =="return"}' @click="changeShowType='return'">退货</span>
            </div>
            <div class="item">
                <span :class='{active: changeShowType =="transfer"}' @click="changeShowType='transfer'">备货</span>
            </div>
        </section>
        <transition name="tab-choose">
            <section v-show="changeShowType =='return'" class="container">
                return
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
            changeShowType: 'return',
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
