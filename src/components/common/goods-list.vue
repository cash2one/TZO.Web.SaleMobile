<template>
    <section class="goods_container">
        <div v-load-more="loaderMore" v-if="goodsList.length" class="goods-list">
            <section v-for="item in goodsList" :key="item.Id" class="item">
                <div @click="selectGoods(item)" class="item-left">
                    <!-- <img :src="imgBaseUrl + item.image_path"> -->
                    <svg class="icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#goods"></use>
                    </svg>
                </div>
                <section class="item-right">
                    <section class="title">
                        <h3 class="name ellipsis">
                            <strong>{{item.GoodsName}}</strong>
                        </h3>
                    </section>
                    <section class="content">
                        <section v-for="prop in propertyList" :key="prop.Id">
                            <span>{{prop.PropertyName}}</span>:
                            <span>{{item.Goods.Properties['p'+prop.PropertyId]}}</span>
                        </section>
                    </section>
                    <section>
                        <span>{{curCustomer.CustomerLevelName}}价格:</span>
                        <span>¥</span>
                        <span class="money">{{item.LevelPrice}}</span>
                    </section>
                    <buy-cart :goods="item" @showMoveDot="showMoveDotFun"></buy-cart>
                    <ul class="detail">
                        <li>
                            <span>库存:</span>
                            <b class="number">{{item.StockNum}}</b>
                            <span>{{item.Goods.Units}}</span>
                        </li>
                        <li>
                            <span v-if="item.LastPrice">
                                <span>上次:</span>
                                <span>¥</span>
                                <b class="money">{{item.LastPrice}}</b>
                            </span>
                            <span v-if="item.LastSaleNum">
                                <span>x</span>
                                <b class="count">{{item.LastSaleNum}}</b>
                                <span>{{item.Goods.Units}}</span>
                            </span>
                        </li>
                        <li v-if="item.RangeSaleNum">
                            <span>近{{filters.LastSaleTime}}天:</span>
                            <b class="count">{{item.RangeSaleNum}}</b>
                            <span>{{item.Goods.Units}}</span>
                        </li>
                    </ul>
                </section>
            </section>
        </div>
        <ul v-if="!touchend && !goodsList.length" class="animation_opactiy">
            <li class="list_back_li" v-for="item in 10" :key="item">
                <img src="../../images/shopback.svg" class="list_back_svg">
            </li>
        </ul>
        <p v-if="touchend" class="empty_data">没有更多了</p>
        <aside class="return_top" @click="backTop" v-if="showBackStatus">
            <svg class="back_top_svg">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
            </svg>
        </aside>
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
        <section class="buy_cart_container">
            <section @click="toggleCartList" class="cart_icon_num">
                <div class="cart_icon_container" :class="{cart_icon_activity: totalPrice > 0, move_in_cart:receiveInCart}" ref="cartContainer">
                    <span v-if="totalNum" class="cart_list_length">
                        {{totalNum}}
                    </span>
                    <svg class="cart_icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-icon"></use>
                    </svg>
                </div>
                <div class="cart_num">
                    <div>¥ {{totalPrice}}</div>
                    <div>可用额度:¥100</div>
                </div>
            </section>
            <section class="gotopay" :class="{gotopay_acitvity: minimumOrderAmount <= 0}">
                <span class="gotopay_button_style" v-if="minimumOrderAmount > 0">还差¥{{minimumOrderAmount}}起送</span>
                <router-link :to="'/cart/order/'+storage.Id+'/'+curCustomer.CustomerId" class="gotopay_button_style" v-else>{{linkText}}</router-link>
            </section>
        </section>
        <transition name="toggle-cart">
            <section class="cart_food_list" v-show="showCartList&&customerCartCount">
                <header>
                    <h3>购物车</h3>
                    <div @click="clearCart">
                        <svg>
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-remove"></use>
                        </svg>
                        <span class="clear_cart">清空</span>
                    </div>
                </header>
                <section class="cart_food_details" id="cartFood">
                    <ul>
                        <li v-for="(item, index) in customerCart.items" :key="index" class="cart_food_li">
                            <div class="cart_list_num">
                                <p class="ellipsis">{{item.info.GoodsName}}</p>
                            </div>
                            <div>
                                <span>¥</span>
                                <span class="money">{{item.price}}</span>
                            </div>
                            <section class="cart_list_control">
                                <span @click="removeOutCart(index)">
                                    <svg>
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
                                    </svg>
                                </span>
                                <span class="cart_num">{{item.num}}</span>
                                <svg class="cart_add" @click="addToCart(item.info)">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
                                </svg>
                            </section>
                        </li>
                    </ul>
                </section>
            </section>
        </transition>
        <transition name="fade">
            <div class="screen_cover" v-show="showCartList&&customerCartCount" @click="toggleCartList"></div>
        </transition>
        <transition appear @after-appear='afterEnter' @before-appear="beforeEnter" v-for="(item,index) in showMoveDot" :key="index">
            <span class="move_dot" v-if="item">
                <svg class="move_liner">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
                </svg>
            </span>
        </transition>
    </section>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { loadMore, getImgPath } from './mixin'
import { showBack, animate } from 'src/config/mUtils'
import { imgBaseUrl } from 'src/config/env'
import loading from './loading'
import buyCart from './buy-cart'
import { apiGetGoodsList } from 'src/service/getData'

export default {
    data() {
        return {

            offset: 0,
            goodsList: [], // 商品列表

            preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
            showBackStatus: false, //显示返回顶部按钮
            showLoading: true, //显示加载动画
            touchend: false, //没有更多数据

            receiveInCart: false,           // 购物车组件下落的圆点是否到达目标位置
            showCartList: false,            // 显示购物车列表

            showMoveDot: [], //控制下落的小圆点显示隐藏
            windowHeight: null, //屏幕的高度
            elLeft: 0, //当前点击加按钮在网页中的绝对top值
            elBottom: 0, //当前点击加按钮在网页中的绝对left值
        }
    },
    mounted() {
        this.initData();
        this.windowHeight = window.innerHeight;
    },
    components: {
        loading,
        buyCart
    },
    props: [
        'keyword',
        'storage',
        'categoryId',
        'sortByFiled',
        'sortByType',
        'filters',
        'confirmSelect',
        'linkText'
    ],
    mixins: [loadMore, getImgPath],
    computed: {
        ...mapState([
            'propertyList',
            'curCustomer',
            'cartList',
            'curGoods'
        ]),
        customerCart: function() {
            return Object.assign({}, this.cartList[this.curCustomer.CustomerId]);
        },
        customerCartCount: function() {
            var count = 0;
            for (var i in this.customerCart.items)
                if (this.customerCart.items.hasOwnProperty(i)) {
                    count++;
                }
            return count;
        },
        // 检查额度 TODO:
        minimumOrderAmount: function() {
            if (this.shopDetailData) {
                return this.shopDetailData.float_minimum_order_amount - this.totalPrice;
            } else {
                return null;
            }
        },
        // 总共价格
        totalPrice: function() {
            let num = 0;
            for (var key in this.customerCart.items) {
                if (this.customerCart.items.hasOwnProperty(key)) {
                    var element = this.customerCart.items[key];
                    num += element.num * element.price;
                }
            }
            return num;
        },
        // 购物车中总共商品的数量
        totalNum: function() {
            let num = 0;
            for (var key in this.customerCart.items) {
                if (this.customerCart.items.hasOwnProperty(key)) {
                    var element = this.customerCart.items[key];
                    num += element.num
                }
            }
            return num;
        },

    },
    methods: {
        ...mapActions([
            'setCurGoods'
        ]),
        ...mapMutations([
            'ADD_CART',
            'REDUCE_CART',
            'CLEAR_CART',
            'SAVE_CUR_GOODS'
        ]),
        async getGoods() {
            return await apiGetGoodsList(this.curCustomer.CustomerId, this.storage.Id, this.categoryId, this.keyword, this.sortByFiled, this.sortByType, this.filters, this.offset);
        },
        async initData() {
            //获取数据
            let res = await this.getGoods();
            this.goodsList = [...res.Items];

            this.hideLoading();

            // 当获取数据小于20，说明没有更多数据，不需要再次请求数据
            if (res.Items.length < 20) {
                this.touchend = true;
                return;
            }

            //开始监听scrollTop的值，达到一定程度后显示返回顶部按钮
            showBack(status => {
                this.showBackStatus = status;
            });
        },
        //到达底部加载更多数据
        async loaderMore() {
            if (this.touchend) {
                return
            }
            //防止重复请求
            if (this.preventRepeatReuqest) {
                return
            }
            this.showLoading = true;
            this.preventRepeatReuqest = true;

            //数据的定位加20位
            this.offset += 20;
            let res = await this.getGoods();
            this.hideLoading();
            this.goodsList = [...this.goodsList, ...res.Items];
            //当获取数据小于20，说明没有更多数据，不需要再次请求数据
            if (res.Items.length < 20) {
                this.touchend = true;
                return
            }
            this.preventRepeatReuqest = false;
        },
        // 返回顶部
        backTop() {
            animate(document.body, { scrollTop: '0' }, 400, 'ease-out');
        },
        // 监听父级传来的数据发生变化时，触发此函数重新根据属性值获取数据
        async listenPropChange() {
            this.showLoading = true;
            this.offset = 0;
            let res = await this.getGoods();;
            this.hideLoading();
            //当获取数据小于20，说明没有更多数据，不需要再次请求数据
            if (res.Items.length < 20) {
                this.touchend = true;
            }
            // 考虑到本地模拟数据是引用类型，所以返回一个新的数组
            this.goodsList = [...res.Items];
        },
        // 开发环境与编译环境loading隐藏方式不同
        hideLoading() {
            this.showLoading = false;
        },
        // 控制购物列表是否显示
        toggleCartList() {
            this.customerCartCount ? this.showCartList = !this.showCartList : true;
        },
        // 清除购物车
        clearCart() {
            this.toggleCartList();
            this.CLEAR_CART(this.curCustomer.CustomerId);
        },
        // 监听圆点是否进入购物车
        listenInCart() {
            if (!this.receiveInCart) {
                this.receiveInCart = true;
                this.$refs.cartContainer.addEventListener('animationend', () => {
                    this.receiveInCart = false;
                })
                this.$refs.cartContainer.addEventListener('webkitAnimationEnd', () => {
                    this.receiveInCart = false;
                })
            }
        },
        // 显示下落圆球
        showMoveDotFun(showMoveDot, elLeft, elBottom) {
            this.showMoveDot = [...this.showMoveDot, ...showMoveDot];
            this.elLeft = elLeft;
            this.elBottom = elBottom;
        },
        beforeEnter(el) {
            el.style.transform = `translate3d(0,${37 + this.elBottom - this.windowHeight}px,0)`;
            el.children[0].style.transform = `translate3d(${this.elLeft - 30}px,0,0)`;
            el.children[0].style.opacity = 0;
        },
        afterEnter(el) {
            el.style.transform = `translate3d(0,0,0)`;
            el.children[0].style.transform = `translate3d(0,0,0)`;
            el.style.transition = 'transform .55s cubic-bezier(0.3, -0.25, 0.7, -0.15)';
            el.children[0].style.transition = 'transform .55s linear';
            this.showMoveDot = this.showMoveDot.map(item => false);
            el.children[0].style.opacity = 1;
            el.children[0].addEventListener('transitionend', () => {
                this.listenInCart();
            })
            el.children[0].addEventListener('webkitAnimationEnd', () => {
                this.listenInCart();
            })
        },
        // 移出购物车
        removeOutCart(goodsId) {
            this.REDUCE_CART({ customerId: this.curCustomer.CustomerId, goodsId });
        },
        // 加入购物车，计算按钮位置。
        addToCart(goods) {
            this.ADD_CART({ customer: this.curCustomer, goods, price: goods.LevelPrice });
        },
        //选中商品查看明细
        async selectGoods(val) {
            await this.setCurGoods(val);
            this.$router.push('detail/' + val.GoodsId);
        }
    },
    watch: {
        keyword: function(val) {
            this.listenPropChange();
        },
        categoryId: function(val) {
            this.listenPropChange();
        },
        //监听父级传来的排序方式
        sortByFiled: function(val) {
            this.listenPropChange();
        },
        sortByType: function(val) {
            if (this.sortByFiled == 'Property')
                this.listenPropChange();
        },
        confirmSelect: function(val) {
            this.listenPropChange();
        },
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';

@keyframes mymove {
    0% {
        transform: scale(1)
    }
    25% {
        transform: scale(.8)
    }
    50% {
        transform: scale(1.1)
    }
    75% {
        transform: scale(.9)
    }
    100% {
        transform: scale(1)
    }
}

@-moz-keyframes mymove {
    0% {
        transform: scale(1)
    }
    25% {
        transform: scale(.8)
    }
    50% {
        transform: scale(1.1)
    }
    75% {
        transform: scale(.9)
    }
    100% {
        transform: scale(1)
    }
}

@-webkit-keyframes mymove {
    0% {
        transform: scale(1)
    }
    25% {
        transform: scale(.8)
    }
    50% {
        transform: scale(1.1)
    }
    75% {
        transform: scale(.9)
    }
    100% {
        transform: scale(1)
    }
}

@-o-keyframes mymove {
    0% {
        transform: scale(1)
    }
    25% {
        transform: scale(.8)
    }
    50% {
        transform: scale(1.1)
    }
    75% {
        transform: scale(.9)
    }
    100% {
        transform: scale(1)
    }
}

.goods_container {
    padding-bottom: 2rem;
    margin-top: 3.7rem;
}

.buy_cart_container {
    position: fixed;
    background-color: #3d3d3f;
    bottom: 0;
    left: 0;
    z-index: 13;
    display: flex;
    @include wh(100%, 2rem);
    .cart_icon_num {
        flex: 1;
        .cart_icon_container {
            display: flex;
            background-color: #3d3d3f;
            position: absolute;
            padding: .4rem;
            border: 0.18rem solid #444;
            border-radius: 50%;
            left: .55rem;
            top: -.7rem;
            .cart_icon {
                @include wh(1.3rem, 1.3rem);
            }
            .cart_list_length {
                position: absolute;
                top: -.25rem;
                right: -.25rem;
                background-color: #ff461d;
                line-height: .7rem;
                text-align: center;
                border-radius: 50%;
                border: 0.025rem solid #ff461d;
                min-width: .7rem;
                height: .7rem;
                @include sc(.5rem, #fff);
                font-family: Helvetica Neue, Tahoma, Arial;
            }
        }
        .move_in_cart {
            animation: mymove .5s ease-in-out;
        }
        .cart_icon_activity {
            background-color: #3190e8;
        }
        .cart_num {
            @include ct;
            left: 3.5rem;
            div {
                color: #fff;
            }
            div:nth-of-type(1) {
                font-family: 'Helvetica Neue', Tahoma, Arial;
                font-size: .8rem;
                font-weight: bold;
            }
            div:nth-of-type(2) {
                font-size: .45rem;
            }
        }
    }
    .gotopay {
        position: absolute;
        right: 0;
        background-color: #535356;
        @include wh(5rem, 100%);
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        .gotopay_button_style {
            @include sc(.8rem, #fff);
            font-weight: bold;
        }
    }
    .gotopay_acitvity {
        background-color: #4cd964;
    }
}

.cart_food_list {
    position: fixed;
    width: 100%;
    padding-bottom: 2rem;
    z-index: 12;
    bottom: 0;
    left: 0;
    background-color: $background-light-color;
    header {
        @include fj;
        align-items: center;
        @include indent10;
        background-color: #eceff1;
        svg {
            @include wh(.55rem, .55rem);
            vertical-align: middle;
        }
        h3 {
            color: $font-color1;
        }
        .clear_cart {
            color: $font-color1;
        }
    }
    .cart_food_details {
        background-color: $background-light-color;
        max-height: 20rem;
        overflow-y: auto;
        .cart_food_li {
            @include fj;
            padding: .55rem .55rem;
            .cart_list_num {
                width: 55%;
                p:nth-of-type(1) {
                    @include sc(.65rem, $font-color1);
                    font-weight: bold;
                }
            }
            .cart_list_control {
                display: flex;
                align-items: center;
                span {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                svg {
                    @include wh(.9rem, .9rem);
                    fill: #3190e8;
                }
                .specs_reduce_icon {
                    fill: #999;
                }
                .cart_num {
                    @include sc(.65rem, #666);
                    min-width: 1rem;
                    text-align: center;
                    font-family: Helvetica Neue, Tahoma;
                }
            }
        }
    }
}

.move_dot {
    position: fixed;
    bottom: 30px;
    left: 30px;
    z-index: 200;
    svg {
        @include wh(.9rem, .9rem);
        fill: $blue;
    }
}

.toggle-cart-enter-active,
.toggle-cart-leave-active {
    transition: all .3s ease-out;
}

.toggle-cart-enter,
.toggle-cart-leave-active {
    transform: translateY(100%);
}
</style>
