<template>
    <div class="page">
        <header-title header-title="购物车"></header-title>
        <section v-if="cart" v-for="(cart,index) in cartList" :key="index" class="cart-list">
            <header>
                <span>{{cart.customer.BizObj.Name}}</span>
                <router-link :to="'/cart/order/'+orderStorage.Id+'/'+cart.customer.CustomerId" tag="a" class="right">
                    下单
                </router-link>
            </header>
            <section v-for="(item,index) in cart.items" :key="index" class="item">
                <section class="title">
                    <h3 class="name ellipsis">
                        <strong>{{item.info.GoodsName}}</strong>
                    </h3>
                </section>
                <section class="content">
                    <section v-for="prop in globalPropertyList" :key="prop.Id">
                        <span>{{prop.Name}}</span>:
                        <span>{{item.info.Goods.Properties['p'+prop.Id]}}</span>
                    </section>
    
                </section>
                <section class="detail">
                    <div>
                        <span>库存:</span>
                        <b class="number">{{item.info.StockNum}}</b>
                        <span>{{item.info.Goods.Units}}</span>
                    </div>
                    <div class="price">
                        <span>价格:</span>
                        <input class="money" v-model="item.price" type="number" />
                        <span>¥</span>
                    </div>
                </section>
                <buy-cart :goods="item.info"></buy-cart>
            </section>
        </section>
        <section v-if="cart" v-for="(cart,index) in returnCartList" :key="index" class="cart-list">
            <header>
                <span>{{cart.customer.BizObj.Name}}</span>
                <router-link :to="'/cart/return/'+orderStorage.Id+'/'+cart.customer.CustomerId" tag="a" class="right red">
                    退货
                </router-link>
            </header>
            <section v-for="(item,index) in cart.items" :key="index" class="item">
                <section class="title">
                    <h3 class="name ellipsis">
                        <strong>{{item.info.Name}}</strong>
                    </h3>
                </section>
                <section class="content">
                    <section v-for="prop in globalPropertyList" :key="prop.Id">
                        <span>{{prop.Name}}</span>:
                        <span>{{item.info.Properties['p'+prop.Id]}}</span>
                    </section>
                </section>
                <section class="detail">
                    <div>
                        <span>可退数量:</span>
                        <b class="number">{{item.item.CanReturnNum}}</b>
                        <span>{{item.info.Units}}</span>
                    </div>
                    <div class="price">
                        <span>价格:</span>
                        <span class="money">{{item.price}}</span>
                        <span>¥</span>
                    </div>
                </section>
                <return-cart :customer="cart.customer" :item="item.item"></return-cart>
            </section>
        </section>
        <foot-guide></foot-guide>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import headerTitle from 'src/components/header/header-title'
import buyCart from 'src/components/common/buy-cart'
import returnCart from 'src/components/common/return-cart'
import footGuide from 'src/components/footer/foot-guide'

export default {
    computed: {
        ...mapState([
            'globalPropertyList',
            'cartList',
            'returnCartList',
            'orderStorage',
            'curStorage'
        ]),
    },
    mounted() {
        this.initData();
    },
    components: {
        headerTitle,
        buyCart,
        returnCart,
        footGuide
    },
    methods: {
        ...mapActions([
            'getGlobalProperty'
        ]),
        async initData() {
            await this.getGlobalProperty();
        },
    }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';

.page {
    margin-top: 1.95rem;
    margin-bottom: 2rem;
}

.cart_module {
    top: .55rem;
    bottom: initial;
}
</style>

