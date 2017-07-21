 <template>
    <section class="cart_module">
        <section class="cart_button">
            <transition name="showReduce">
                <span @click="removeOutCart(goods.Id, price)" v-if="goodsNum">
                    <svg>
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
                    </svg>
                </span>
            </transition>
            <transition name="fade">
                <span class="cart_num" v-if="goodsNum">{{goodsNum}}</span>
            </transition>
            <span>
                <svg class="add_icon" @touchstart="addToCart(goods.Id, price, $event)">
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
            'cartList',
            'curCustomer'
        ]),
        /**
         * 监听cartList变化，更新当前商铺的购物车信息customerCart，同时返回一个新的对象
         */
        customerCart: function () {
            return Object.assign({}, this.cartList[this.curCustomer.Id]);
        },
        // shopCart变化的时候重新计算当前商品的数量
        goodsNum: function () {
            if (this.customerCart && this.customerCart.Items && this.customerCart.Items[this.goods.Id]) {
                return this.customerCart.Items[this.goods.Id].num;
            } else {
                return 0;
            }
        },
    },
    props: ['goods', 'price'],
    methods: {
        ...mapMutations([
            'ADD_CART',
            'REDUCE_CART',
        ]),
        // 移出购物车
        removeOutCart(goodsId) {
            if (this.goodsNum > 0) {
                this.REDUCE_CART({ customerId: this.curCustomer.Id, goodsId });
            }
        },
        // 加入购物车，计算按钮位置。
        addToCart(goodsId, price, event) {
            this.ADD_CART({ customerId: this.curCustomer.Id, goodsId, info: this.goods, price });
            let elLeft = event.target.getBoundingClientRect().left;
            let elBottom = event.target.getBoundingClientRect().bottom;
            this.showMoveDot.push(true);
            this.$emit('showMoveDot', this.showMoveDot, elLeft, elBottom);

        },
        // 显示规格列表
        showChooseList(foodScroll) {
            this.$emit('showChooseList', foodScroll)
        },
        // 点击多规格商品的减按钮，弹出提示
        showReduceTip() {
            this.$emit('showReduceTip')
        },

    },
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';
.cart_module {
    display: inline-block;
    position: absolute;
    top: 1rem;
    right: .5rem;

    .add_icon {
        position: relative;
    }
    .cart_button {
        display: flex;
        align-items: center;
    }
    svg {
        @include wh(.9rem, .9rem);
        fill: #3190e8;
    }
    .specs_reduce_icon {
        fill: #999;
    }
    .cart_num {
        @include sc(.7rem, #666);
        min-width: 1rem;
        text-align: center;
        font-family: Helvetica Neue, Tahoma;
        padding-bottom: .3rem;
    }
    .choose_specification {
        .choose_icon_container {
            display: flex;
            align-items: center;
            .show_chooselist {
                display: block;
                @include sc(.55rem, #fff);
                padding: .1rem .2rem;
                background-color: $blue;
                border-radius: 0.2rem;
                border: 1px solid $blue;
            }
        }
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

