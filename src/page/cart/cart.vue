<template>
    <div class="page">
        <header-title header-title="购物车"></header-title>
        <section class="cart_container">
            <section v-for="(cart,index) in cartList" :key="index" class="m-list">
                <header>
                    <span>{{cart.customerInfo.BizObj.Name}}</span>
                    <a>下单</a>
                </header>
                <section v-for="(item,index) in cart.Items" :key="index" class="item">
                    <section class="title ellipsis">
                        <strong class="name">{{item.info.GoodsName}}</strong>
                    </section>
                    <section class="content">
                        <section v-for="prop in propertyList" :key="prop.Id">
                            <span>{{prop.PropertyName}}</span>:
                            <span>{{item.info.Goods.Properties['p'+prop.PropertyId]}}</span>
                        </section>
                    </section>
                    <div class="number">
                        <span>价格:</span>
                        <input v-model="item.price" type="number" />
                        <span>¥</span>
                    </div>
                    <buy-cart :goods="item.info"></buy-cart>
                    <ul class="content">
                        <li>
                            <span>库存:</span>
                            <span>
                                {{item.info.StockNum}}
                            </span>
                            <span>{{item.info.Goods.Units}}</span>
                        </li>
                    </ul>
                </section>
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
    mounted() {
        console.log(this.cartList);
    },
    computed: {
        ...mapState([
            'propertyList',
            'orderStorage',
            'cartList'
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
.cart_container {
    overflow-y: auto;
    .m-list {
        header {
            @include sc(.8rem, $font-color);
            position: relative;
            a {
                @include sc(.6rem, $blue);
                position: absolute;
                top: .4rem;
                right: .4rem;
            }
        }
        .item {
            .number {
                position: absolute;
                top: 4rem;
                right: .8rem;
                input {
                    @include sc(.8rem, $blue);
                    width: 1.5rem;
                    text-align: right;
                }
            }
        }
    }
}
</style>

