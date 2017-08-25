<template>
    <div class="page">
        <header-title header-title="退货确认" goback='true'></header-title>
        <section v-if="!showLoading" class="scroll_container paddingTop">
            <div class="delivery_model container_style">
                <h2>
                    <strong>{{curStorage.Name}}</strong>
                </h2>
            </div>
            <section class="item-list">
                <header>{{bizObj.Name}}</header>
                <section v-for="(item,index) in cart.items" :key="index" class="item">
                    <section class="item-left">
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
                    </section>
                    <div class="detail">
                        <div>
                            <span>x</span>
                            <span class="number">{{item.num}}</span>
                        </div>
                        <div>
                            <span>¥</span>
                            <span class="money">{{item.price}}</span>
                        </div>
                    </div>
                </section>
            </section>
            <section class="m-form-list">
                <router-link :to="{name:'return-remark'}" class="item start end">
                    <h2>订单备注</h2>
                    <div class="content">
                        <p class="ellipsis">{{remark}}</p>
                        <svg class="icon">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#chevron-right"></use>
                        </svg>
                    </div>
                </router-link>
            </section>
            <section class="confirm_order">
                <p>总金额 ¥{{total}}</p>
                <p @click="confirm">确认退货</p>
            </section>
            <br />
            <br />
            <br />
            <br />
        </section>
        <loading v-if="showLoading"></loading>
        <transition name="fade">
            <section class="confirm_details" v-if="showConfirm">
                <section>
                    <h2 class="title">错误</h2>
                    <p>{{message}}{{exceptionMessage}}</p>
                </section>
                <svg width="60" height="60" class="close_activities" @click.stop="showConfirmFun">
                    <circle cx="30" cy="30" r="25" stroke="#555" stroke-width="1" fill="none" />
                    <line x1="22" y1="38" x2="38" y2="22" style="stroke:#999;stroke-width:2" />
                    <line x1="22" y1="22" x2="38" y2="38" style="stroke:#999;stroke-width:2" />
                </svg>
            </section>
        </transition>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import headerTitle from 'src/components/header/header-title'
import loading from 'src/components/common/loading'
import returnCart from 'src/components/common/return-cart'
import { apiCreateReturn, apiVerifyReturn } from 'src/service/getData'

export default {
    data() {
        return {
            customerId: '', // 当前客户id
            remark: '',
            showLoading: true, //显示加载动画
            showConfirm: false, //是否显示活动详情
            message: '',
            exceptionMessage: ''
        }
    },
    mounted() {
        this.initData();
    },
    computed: {
        ...mapState([
            'globalPropertyList',
            'curStorage',
            'returnCartList',
            'userInfo'
        ]),
        cart: function () {
            return Object.assign({}, this.returnCartList[this.customerId]);
        },
        bizObj: function () {
            return this.cart.customer.BizObj;
        },
        total: function () {
            let money = 0;
            for (var key in this.cart.items) {
                if (this.cart.items.hasOwnProperty(key)) {
                    var ele = this.cart.items[key];
                    money += ele.num * ele.price
                }
            }
            return money;
        }
    },
    components: {
        headerTitle,
        loading,
        returnCart
    },
    methods: {
        ...mapActions([
            'getGlobalProperty',
        ]),
        ...mapMutations([
            'CLEAR_RETURN_CART'
        ]),
        async initData() {
            this.customerId = this.$route.params.customerId;

            await this.getGlobalProperty();

            this.showLoading = false;
        },
        async confirm() {
            this.showLoading = true;
            this.cart.storage = this.curStorage;

            let res = await apiCreateReturn(this.userInfo, this.cart);
            let id;

            if (res.Id) {
                id = res.Id;
                res = await apiVerifyReturn(res.Id);
            }

            if (res.Message) {
                this.showLoading = false;
                this.showConfirm = true;
                this.message = res.Message;
                this.exceptionMessage = res.ExceptionMessage;
            }
            else {
                this.CLEAR_RETURN_CART(this.customerId);
                this.$router.replace({ path: '/order/detail/', query: { Id: id, bizType: -12012 } });
            }
        },
        showConfirmFun() {
            this.showConfirm = !this.showConfirm;
        },
    }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';

.item-list {
    margin-top: .4rem;
}

.confirm_order {
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 2rem;
    p {
        line-height: 2rem;
        @include sc(.75rem, #fff);
    }
    p:nth-of-type(1) {
        background-color: #3c3c3c;
        flex: 5;
        padding-left: .7rem;
    }
    p:nth-of-type(2) {
        flex: 2;
        background-color: $green;
        text-align: center;
    }
}

.confirm_details {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #262626;
    z-index: 200;
    padding: 1.25rem;
    .title {
        text-align: center;
        @include sc(.8rem, #fff);
    }
    .title_style {
        text-align: center;
        margin-top: 7rem;
        span {
            @include sc(1.5rem, #fff);
            border: 3px solid #555;
            padding: 2rem 1.4rem;
            border-radius: 3rem;
        }
    }
    .close_activities {
        position: absolute;
        bottom: 1rem;
        @include cl;
    }
    p {
        margin-top: 2rem;
        line-height: .7rem;
        @include sc(.65rem, #fff);
    }
}
</style>