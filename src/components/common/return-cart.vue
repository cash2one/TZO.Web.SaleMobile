 <template>
    <section class="cart_module">
        <section class="cart_button">
            <transition name="showReduce">
                <span @click="removeOutCart(goods.GoodsId)" v-if="goodsNum">
                    <svg>
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
                    </svg>
                </span>
            </transition>
            <transition name="fade">
                <span class="cart_num" v-if="goodsNum">{{goodsNum}}</span>
            </transition>
            <span>
                <svg class="add_icon" @touchstart="addToCart($event)">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
                </svg>
            </span>
        </section>
    </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    data() {
        return {
            showMoveDot: [], // 控制下落的小圆点显示隐藏
        }
    },
    computed: {
        ...mapState([
            'returnCartList',
            'curCustomer'
        ]),
        /**
         * 监听cartList变化，更新当前商铺的购物车信息customerCart，同时返回一个新的对象
         */
        customerCart: function () {
            return Object.assign({}, this.returnCartList[this.curCustomer.CustomerId]);
        },
        // shopCart变化的时候重新计算当前商品的数量
        goodsNum: function () {
            if (this.customerCart.items && this.customerCart.items[this.goods.GoodsId]) {
                return this.customerCart.items[this.goods.GoodsId].num;
            } else {
                return 0;
            }
        },
    },
    props: ['goods', 'price'],
    methods: {
        ...mapMutations([
            'ADD_RETURN_CART',
            'REDUCE_RETURN_CART',
        ]),
        // 移出购物车
        removeOutCart(goodsId) {
            if (this.goodsNum > 0) {
                this.REDUCE_RETURN_CART({ customerId: this.curCustomer.CustomerId, goodsId });
            }
        },
        // 加入购物车，计算按钮位置。
        addToCart(event) {
            this.ADD_RETURN_CART({ customer: this.curCustomer, goods: this.goods, price: this.goods.LevelPrice });
            let elLeft = event.target.getBoundingClientRect().left;
            let elBottom = event.target.getBoundingClientRect().bottom;
            this.showMoveDot.push(true);
            this.$emit('showMoveDot', this.showMoveDot, elLeft, elBottom);
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';
.cart_module {
    display: inline-block;
    position: absolute;
    bottom: .55rem;
    right: .55rem;

    .add_icon {
        position: relative;
    }
    .cart_button {
        display: flex;
        align-items: center;
    }
    svg {
        @include wh(.9rem, .9rem);
        fill: $red;
    }
    .cart_num {
        @include sc(.65rem, #666);
        min-width: 1rem;
        text-align: center;
        font-family: Helvetica Neue, Tahoma;
        padding-bottom: .275rem;
    }
}

.showReduce-enter-active,
.showReduce-leave-active {
    transition: all .3s ease-out;
}

.showReduce-enter,
.showReduce-leave-active {
    opacity: 0;
    transform: translateX(1rem);
}

.fade-enter-active,
.fade-leave-active {
    transition: all .3s;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}
</style>

