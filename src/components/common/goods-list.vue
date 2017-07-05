<template>
    <section class="food_container">
        <section class="menu_container">
            <section class="menu_right" ref="menuFoodList">
                <ul v-load-more="loaderMore" v-if="goodsList.length">
                    <li v-for="item in goodsList" :key="item.Id" class="menu_detail_list">
                        <router-link :to="'goods/detail/' + item.Id" class="menu_detail_link">
                            <section class="menu_food_img">
                                <img :src="imgBaseUrl + item.image_path">
                            </section>
                            <section class="menu_food_description">
                                <h3 class="food_description_head">
                                    <strong class="description_foodname">{{item.Name}}</strong>
                                </h3>
                                <p class="food_description_content">详细属性</p>
                                <p v-if="item.activity" class="food_activity">
                                    <span :style="{color: '#' + item.activity.image_text_color,borderColor:'#' +item.activity.icon_color}">{{item.activity.image_text}}</span>
                                </p>
                            </section>
                        </router-link>
                        <footer class="menu_detail_footer">
                            <section class="food_price">
                                <span>¥</span>
                                <span>1</span>
                                <span>起</span>
                            </section>
                            <buy-cart></buy-cart>
                            <!--<buy-cart :shopId='shopId' :foods='foods' @moveInCart="listenInCart" @showChooseList="showChooseList" @showReduceTip="showReduceTip" @showMoveDot="showMoveDotFun"></buy-cart>-->
                        </footer>
                    </li>
                </ul>
                <ul v-else class="animation_opactiy">
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
                <div ref="abc" style="background-color: red;"></div>
    
            </section>
        </section>
        <section class="buy_cart_container">
            <section @click="toggleCartList" class="cart_icon_num">
                <div class="cart_icon_container" :class="{cart_icon_activity: totalPrice > 0, move_in_cart:receiveInCart}" ref="cartContainer">
                    <span v-if="totalNum" class="cart_list_length">
                        1111
                    </span>
                    <svg class="cart_icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-icon"></use>
                    </svg>
                </div>
                <div class="cart_num">
                    <div>¥ {{totalPrice}}</div>
                    <div>配送费¥{{deliveryFee}}</div>
                </div>
            </section>
            <section class="gotopay" :class="{gotopay_acitvity: minimumOrderAmount <= 0}">
                <span class="gotopay_button_style" v-if="minimumOrderAmount > 0">还差¥{{minimumOrderAmount}}起送</span>
                <router-link :to="{path:'/confirmOrder', query:{}}" class="gotopay_button_style" v-else>去结算</router-link>
            </section>
        </section>
        <!--<transition name="toggle-cart">
            <section class="cart_food_list" v-show="showCartList&&cartFoodList.length">
                <header>
                    <h4>购物车</h4>
                    <div @click="clearCart">
                        <svg>
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-remove"></use>
                        </svg>
                        <span class="clear_cart">清空</span>
                    </div>
                </header>
                <section class="cart_food_details" id="cartFood">
                    <ul>
                        <li v-for="(item, index) in cartFoodList" :key="index" class="cart_food_li">
                            <div class="cart_list_num">
                                <p class="ellipsis">{{item.name}}</p>
                                <p class="ellipsis">{{item.specs}}</p>
                            </div>
                            <div class="cart_list_price">
                                <span>¥</span>
                                <span>{{item.price}}</span>
                            </div>
                            <section class="cart_list_control">
                                <span @click="removeOutCart(item.category_id, item.item_id, item.food_id, item.name, item.price, item.specs)">
                                    <svg>
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
                                    </svg>
                                </span>
                                <span class="cart_num">{{item.num}}</span>
                                <svg class="cart_add" @click="addToCart(item.category_id, item.item_id, item.food_id, item.name, item.price, item.specs)">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
                                </svg>
                            </section>
                        </li>
                    </ul>
                </section>
            </section>
        </transition>-->
        <transition name="fade">
            <div class="screen_cover" v-show="showCartList&&cartFoodList.length" @click="toggleCartList"></div>
        </transition>
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
    </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import loading from 'src/components/common/loading'
import buyCart from 'src/components/common/buy-cart'
import { loadMore, getImgPath } from 'src/components/common/mixin'
import { imgBaseUrl } from 'src/config/env'
import BScroll from 'better-scroll'
import { showBack, animate } from 'src/config/mUtils'
import { getGoods } from 'src/service/getData'

export default {
    data() {
        return {
            keyword: '',
            offset: 0, // 批次加载商品列表，每次加载20个 limit = 20
            goodsList: [], // 商品列表

            preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
            showBackStatus: false, //显示返回顶部按钮
            showLoading: true, //显示加载动画
            touchend: false, //没有更多数据

            showLoading: true, //显示加载动画

            imgBaseUrl,
            menuList: [], //食品列表
            menuIndex: 0, //已选菜单索引值，默认为0
            menuIndexChange: true,//解决选中index时，scroll监听事件重复判断设置index的bug
            totalPrice: 0, //总共价格
            receiveInCart: false, //购物车组件下落的圆点是否到达目标位置
            cartFoodList: [], //购物车商品列表
            showCartList: false,//显示购物车列表
        }
    },
    mounted() {
        this.initData();
    },
    components: {
        loading,
        buyCart
    },
    mixins: [loadMore, getImgPath],
    computed: {
        //配送费
        deliveryFee: function () {
            if (this.shopDetailData) {
                return this.shopDetailData.float_delivery_fee;
            } else {
                return null;
            }
        },
        //还差多少元起送，为负数时显示去结算按钮
        minimumOrderAmount: function () {
            if (this.shopDetailData) {
                return this.shopDetailData.float_minimum_order_amount - this.totalPrice;
            } else {
                return null;
            }
        },
        //购物车中总共商品的数量
        totalNum: function () {
            let num = 0;
            this.cartFoodList.forEach(item => {
                num += item.num
            })
            return num
        },
    },
    methods: {
        async initData() {
            //获取数据
            let res = await getGoods(this.keyword, this.offset, );
            this.goodsList = [...res.Items];
            if (res.length < 20) {
                this.touchend = true;
            }
            this.hideLoading();
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
            let res = await getGoods(this.keyword, this.offset, );
            this.hideLoading();
            this.goodsList = [...this.goodsList, ...res.Items];
            //当获取数据小于20，说明没有更多数据，不需要再次请求数据
            if (res.length < 20) {
                this.touchend = true;
                return
            }
            this.preventRepeatReuqest = false;
        },
        //返回顶部
        backTop() {
            animate(document.body, { scrollTop: '0' }, 400, 'ease-out');
        },
        //监听父级传来的数据发生变化时，触发此函数重新根据属性值获取数据
        async listenPropChange() {
            this.showLoading = true;
            this.offset = 0;
            let res = await getGoods(this.keyword, this.offset, );
            this.hideLoading();
            //考虑到本地模拟数据是引用类型，所以返回一个新的数组
            this.goodsList = [...res.Items];
        },
        //开发环境与编译环境loading隐藏方式不同
        hideLoading() {
            this.showLoading = false;
        },
        //控制购物列表是否显示
        toggleCartList() {
            this.cartFoodList.length ? this.showCartList = !this.showCartList : true;
        },
        //清除购物车
        clearCart() {
            this.toggleCartList();
            this.CLEAR_CART(this.shopId);
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

.food_container {
    display: flex;
    flex: 1;
    padding-bottom: 2rem;
    margin-top: 3.5rem;
}

.menu_container {
    display: flex;
    flex: 1;
    overflow-y: hidden;
    position: relative;
    .menu_left {
        width: 3.8rem;
        .menu_left_li {
            padding: .7rem .3rem;
            border-bottom: 0.025rem solid #ededed;
            box-sizing: border-box;
            border-left: 0.15rem solid #f8f8f8;
            position: relative;
            img {
                @include wh(.5rem, .6rem);
            }
            span {
                @include sc(.6rem, #666);
            }
            .category_num {
                position: absolute;
                top: .1rem;
                right: .1rem;
                background-color: #ff461d;
                line-height: .6rem;
                text-align: center;
                border-radius: 50%;
                border: 0.025rem solid #ff461d;
                min-width: .6rem;
                height: .6rem;
                @include sc(.5rem, #fff);
                font-family: Helvetica Neue, Tahoma, Arial;
            }
        }
        .activity_menu {
            border-left: 0.15rem solid #3190e8;
            background-color: #fff;
            span:nth-of-type(1) {
                font-weight: bold;
            }
        }
    }
    .menu_right {
        flex: 4;
        overflow-y: auto;
        .menu_detail_header {
            width: 100%;
            padding: .4rem;
            position: relative;
            @include fj;
            align-items: center;
            .menu_detail_header_left {
                width: 11rem;
                white-space: nowrap;
                overflow: hidden;
                .menu_item_title {
                    @include sc(.7rem, #666);
                    font-weight: bold;
                }
                .menu_item_description {
                    @include sc(.5rem, #999);
                    width: 30%;
                    overflow: hidden;
                }
            }
            .menu_detail_header_right {
                @include wh(.5rem, 1rem);
                display: block;
                @include bis('../../images/icon_point.png');
                background-size: 100% .4rem;
                background-position: left center;
            }
            .description_tip {
                background-color: #39373a;
                opacity: 0.95;
                @include sc(.5rem, #fff);
                position: absolute;
                top: 1.5rem;
                z-index: 14;
                width: 8rem;
                right: .2rem;
                padding: .5rem .4rem;
                border: 1px;
                border-radius: .2rem;
                span {
                    color: #fff;
                    line-height: .6rem;
                    font-size: .55rem;
                }
            }
            .description_tip::after {
                content: '';
                position: absolute;
                @include wh(.4rem, .4rem);
                background-color: #39373a;
                top: -.5rem;
                right: .7rem;
                transform: rotate(-45deg) translateY(.41rem);
            }
        }
        .menu_detail_list {
            background-color: #fff;
            padding: .6rem .4rem;
            border-bottom: 1px solid #f8f8f8;
            position: relative;
            overflow: hidden;
            .menu_detail_link {
                display: flex;
                .menu_food_img {
                    margin-right: .4rem;
                    img {
                        @include wh(2rem, 2rem);
                        display: block;
                    }
                }
                .menu_food_description {
                    width: 100%;
                    .food_description_head {
                        @include fj;
                        margin-bottom: .2rem;
                        .description_foodname {
                            @include sc(.7rem, #333);
                        }
                        .attributes_ul {
                            display: flex;
                            li {
                                font-size: .3rem;
                                height: .6rem;
                                line-height: .35rem;
                                padding: .1rem;
                                border: 1px solid #666;
                                border-radius: 0.3rem;
                                margin-right: .1rem;
                                transform: scale(.8);
                                p {
                                    white-space: nowrap;
                                }
                            }
                            .attribute_new {
                                position: absolute;
                                top: 0;
                                left: 0;
                                background-color: #4cd964;
                                @include wh(2rem, 2rem);
                                display: flex;
                                align-items: flex-end;
                                transform: rotate(-45deg) translate(-.1rem, -1.5rem);
                                border: none;
                                border-radius: 0;
                                p {
                                    @include sc(.4rem, #fff);
                                    text-align: center;
                                    flex: 1;
                                }
                            }
                        }
                    }
                    .food_description_content {
                        @include sc(.5rem, #999);
                        line-height: .6rem;
                    }
                    .food_description_sale_rating {
                        line-height: .8rem;
                        span {
                            @include sc(.5rem, #333);
                        }
                    }
                    .food_activity {
                        line-height: .4rem;
                        span {
                            font-size: .3rem;
                            border: 1px solid currentColor;
                            border-radius: 0.3rem;
                            padding: .08rem;
                            display: inline-block;
                            transform: scale(.8);
                            margin-left: -0.35rem;
                        }
                    }
                }
            }
            .menu_detail_footer {
                margin-left: 2.4rem;
                font-size: 0;
                margin-top: .3rem;
                @include fj;
                .food_price {
                    span {
                        font-family: 'Helvetica Neue', Tahoma, Arial;
                    }
                    span:nth-of-type(1) {
                        @include sc(.5rem, #f60);
                        margin-right: .05rem;
                    }
                    span:nth-of-type(2) {
                        @include sc(.7rem, #f60);
                        font-weight: bold;
                        margin-right: .3rem;
                    }
                    span:nth-of-type(3) {
                        @include sc(.5rem, #666);
                    }
                }
            }
        }
    }
}

.buy_cart_container {
    position: absolute;
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
            left: .5rem;
            top: -.7rem;
            .cart_icon {
                @include wh(1.2rem, 1.2rem);
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
                font-size: .8rem;
                font-weight: bold;
                margin-bottom: .1rem;
            }
            div:nth-of-type(2) {
                font-size: .4rem;
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
            @include sc(.7rem, #fff);
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
    background-color: #fff;
    header {
        @include fj;
        align-items: center;
        padding: .3rem .6rem;
        background-color: #eceff1;
        svg {
            @include wh(.6rem, .6rem);
            vertical-align: middle;
        }
        h4 {
            @include sc(.7rem, #666);
        }
        .clear_cart {
            @include sc(.6rem, #666);
        }
    }
    .cart_food_details {
        background-color: #fff;
        max-height: 20rem;
        overflow-y: auto;
        .cart_food_li {
            @include fj;
            padding: .6rem .5rem;
            .cart_list_num {
                width: 55%;
                p:nth-of-type(1) {
                    @include sc(.7rem, #666);
                    font-weight: bold;
                }
                p:nth-of-type(2) {
                    @include sc(.4rem, #666);
                }
            }
            .cart_list_price {
                font-size: 0;
                span:nth-of-type(1) {
                    @include sc(.6rem, #f60);
                    font-family: Helvetica Neue, Tahoma;
                }
                span:nth-of-type(2) {
                    @include sc(.7rem, #f60);
                    font-family: Helvetica Neue, Tahoma;
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
</style>
