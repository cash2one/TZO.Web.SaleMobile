<template>
    <div class="page rating paddingTop">
        <header-title header-title="配送方式" goback="true"></header-title>
        <section v-if="!showLoading" class="scroll_container paddingTop">
            <section class="m-list">
                <header>配送方式</header>
                <section class="item" v-for="item in shipTypeList" :key="item.Id" @click="chooseShipType(item)">
                    <section v-if="cart.ship.Id==item.Id" class="item-left">
                        <svg class="icon">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
                        </svg>
                    </section>
                    <section v-else class="item-left"></section>
                    <section class="item-right">
                        <section class="title">
                            <h3 class="name">
                                <strong>{{item.Name}}</strong>
                            </h3>
                        </section>
                    </section>
                </section>
                <section v-if="cart.ship.TypeCode">
                    <header>物流
                        <span class="right" @click="clearExpress()">清空</span>
                    </header>
                    <section class="item" v-for="item in expressCorpsList" :key="item.Id" @click="chooseExpress(item)">
                        <section v-if="cart.express.Id==item.Id" class="item-left">
                            <svg class="icon">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
                            </svg>
                        </section>
                        <section v-else class="item-left"></section>
                        <section class="item-right">
                            <section class="title">
                                <h3 class="name">
                                    <strong>{{item.Name}}</strong>
                                </h3>
                                <span v-if="item.IsCollect" class="number">
                                    可代收
                                </span>
                            </section>
                        </section>
                    </section>
                </section>
            </section>
        </section>
        <loading v-if="showLoading"></loading>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import headerTitle from 'src/components/header/header-title'
import loading from 'src/components/common/loading'
import { apiGetExpressCorps } from 'src/service/getData'

export default {
    data() {
        return {
            customerId: '', // 当前客户id
            expressCorpsList: [],
            showLoading: true, //显示加载动画
        }
    },
    mounted() {
        this.initData();
    },
    computed: {
        ...mapState([
            'cartList',
            'shipTypeList'
        ]),
        cart: function () {
            return Object.assign({}, this.cartList[this.customerId]);
        },
    },
    components: {
        headerTitle,
        loading
    },
    methods: {
        ...mapMutations([
            'SAVE_SHIP_TYPE',
            'SAVE_EXPRESS'
        ]),
        async initData() {
            this.customerId = this.$route.params.customerId;

            let res;

            if (this.cart.charge.Id == 1)
                res = await apiGetExpressCorps(true);
            else
                res = await apiGetExpressCorps();

            this.expressCorpsList = res.Items;

            this.showLoading = false;
        },
        chooseShipType(ship) {
            if (ship.TypeCode == 0)
                this.SAVE_EXPRESS({ customerId: this.customerId, express: {} });
            this.SAVE_SHIP_TYPE({ customerId: this.customerId, ship });
        },
        chooseExpress(express) {
            this.SAVE_EXPRESS({ customerId: this.customerId, express });
        },
        clearExpress() {
            this.SAVE_EXPRESS({ customerId: this.customerId, express: {} });
        }
    }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
@import 'src/style/order';

.m-list {
    header {
        @include fj();
        .right {
            color: $blue;
        }
    }
    .item-right {
        .number {
            font-size: .55rem;
        }
    }
}
</style>

