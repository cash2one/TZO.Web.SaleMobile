<template>
    <div class="page">
        <header-title header-title="购物车"></header-title>
        <section v-if="cart" v-for="(cart,index) in cartList" :key="index" class="m-list">
            <header>
                <span>{{cart.customer.BizObj.Name}}</span>
                <router-link :to="'/order/confirm/'+orderStorage.Id+'/'+cart.customer.CustomerId" tag="a" class="right">
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
                    <section v-for="prop in propertyList" :key="prop.Id">
                        <span>{{prop.PropertyName}}</span>:
                        <span>{{item.info.Goods.Properties['p'+prop.PropertyId]}}</span>
                    </section>
                </section>
                <div class="price">
                    <span>价格:</span>
                    <input class="money" v-model="item.price" type="number" />
                    <span>¥</span>
                </div>
                <buy-cart :goods="item.info"></buy-cart>
                <ul class="detail">
                    <li>
                        <span>库存:</span>
                        <b class="number">{{item.info.StockNum}}</b>
                        <span>{{item.info.Goods.Units}}</span>
                    </li>
                </ul>
            </section>
        </section>
        <foot-guide></foot-guide>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import headerTitle from 'src/components/header/header-title'
import buyCart from 'src/components/common/buy-cart'
import footGuide from 'src/components/footer/foot-guide'

export default {
    computed: {
        ...mapState([
            'propertyList',
            'cartList',
            'orderStorage'
        ]),
    },
    components: {
        headerTitle,
        buyCart,
        footGuide
    },
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';

.page {
    margin-top: 1.95rem;
    margin-bottom: 2rem;
}

.m-list {
    header {
        @include fj();
        .right {
            color: $blue;
        }
    }
    .item {
        .price {
            position: absolute;
            top: 4rem;
            right: .8rem;
            input {
                @include sc(.8rem, $red);
                width: 1.5rem;
                text-align: right;
            }
        }
    }
}
</style>

