<template>
    <div class="rating_page">
        <header-title header-title="设置"></header-title>
        <section class="pay_way container_style">
            <header class="header_style">
                <span>默认仓库</span>
                <div class="more_type" @click="showPayWayFun">
                    <span>在线支付</span>
                    <svg class="address_empty_right">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                    </svg>
                </div>
            </header>
        </section>
        <section class="pay_way container_style">
            <header class="header_style">
                <span>默认物流</span>
                <div class="more_type" @click="showPayWayFun">
                    <span>在线支付</span>
                    <svg class="address_empty_right">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                    </svg>
                </div>
            </header>
        </section>
        <section class="pay_way container_style">
            <header class="header_style">
                <span>默认区域</span>
                <div class="more_type" @click="showPayWayFun">
                    <span>在线支付</span>
                    <svg class="address_empty_right">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                    </svg>
                </div>
            </header>
        </section>
        <section class="pay_way container_style">
            <header class="header_style">
                <span>默认打印机</span>
                <div class="more_type" @click="showPayWayFun">
                    <span>在线支付</span>
                    <svg class="address_empty_right">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                    </svg>
                </div>
            </header>
        </section>
        <transition name="fade">
            <div class="cover" v-if="showPayWay" @click="showPayWayFun"></div>
        </transition>
        <transition name="slid_up">
            <div class="choose_type_Container" v-if="showPayWay">
                <header>支付方式</header>
                <ul>
                    <li v-for="item in checkoutData.payments" :key="item.id" :class="{choose: payWayId == item.id}">
                        <span>{{item.name}}
                            <span v-if="!item.is_online_payment">{{item.description}}</span>
                        </span>
                        <svg class="address_empty_right" @click="choosePayWay(item.is_online_payment, item.id)">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
                        </svg>
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import headerTitle from 'src/components/header/header-title'
export default {
    data() {
        return {
            checkoutData: {
                payments: [{
                    name: 'aaa',
                    description: 'abcd'
                }]
            },//数据返回值
            showPayWay: false,//显示付款方式
            payWayId: 1, //付款方式
        }
    },
    components: {
        headerTitle
    },
    methods: {
        //显示付款方式
        showPayWayFun() {
            this.showPayWay = !this.showPayWay;
        },
        //选择付款方式
        choosePayWay(is_online_payment, id) {
            // if (is_online_payment) {
            //     this.showPayWay = !this.showPayWay;
            //     this.payWayId = id;
            // }
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';

.container_style {
    background-color: #fff;
    margin-top: .4rem;
    padding: 0 .7rem;
}

.pay_way {
    .header_style {
        @include fj;
        line-height: 2rem;
        span:nth-of-type(1) {
            @include sc(.7rem, #666);
        }
        .more_type {
            span:nth-of-type(1) {
                @include sc(.6rem, #aaa);
                width: 10rem;
                display: inline-block;
                text-align: right;
                vertical-align: middle;
            }
            svg {
                @include wh(.5rem, .5rem);
                fill: #ccc;
            }
        }
    }
    .support_is_available {
        span {
            color: #666;
        }
    }
}

.cover{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0,0,0,.3);
        z-index: 203;
    }
    .choose_type_Container{
        min-height: 10rem;
        background-color: #fff;
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 204;
        header{
            background-color: #fafafa;
            @include sc(.7rem, #333);
            text-align: center;
            line-height: 2rem;
        }
        ul{
            li{
                @include fj;
                padding: 0 .7rem;
                line-height: 2.5rem;
                align-items: center;
                span{
                    @include sc(.7rem, #ccc);
                }
                svg{
                    @include wh(.8rem, .8rem);
                    fill: #eee;
                }
            }
            .choose{
                span{
                    color: #333;
                }
                svg{
                    fill: #4cd964;
                }
            }
        }
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
    .slid_up-enter-active, .slid_up-leave-active {
        transition: all .3s;
    }
    .slid_up-enter, .slid_up-leave-active {
        transform: translate3d(0,10rem,0)
    }
</style>