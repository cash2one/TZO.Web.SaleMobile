<template>
    <div class="page">
        <header-title header-title="订单确认" go-back='true'></header-title>
        <section v-if="!showLoading">
            <router-link :to="{name:'order-confirm-address'}" class="address_container">
                <div class="address_empty_left">
                    <svg class="location_icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#location"></use>
                    </svg>
                    <div class="add_address" v-if="!cart.addr">请添加一个收获地址</div>
                    <div v-else class="address_detail_container">
                        <header>
                            <span>{{cart.phone.Contact}}</span>
                            <span>{{cart.phone.PhoneNum}}</span>
                        </header>
                        <div class="address_detail">
                            <span v-if="cart.phone.IsPrimaryPhone">主</span>
                            <p>{{cart.addr.Addr}}</p>
                        </div>
                    </div>
                </div>
                <svg class="icon">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#chevron-right"></use>
                </svg>
            </router-link>
            <select-slid-up title="支付方式" :model="charge" :selected="chooseChargeType" :items="chargeTypeList"></select-slid-up>
            <router-link :to="{name:'order-confirm-ship-express'}" class="delivery_model container_style">
                <h2>
                    <strong>{{cart.storage.Name}}</strong>
                </h2>
                <section class="deliver_time">
                    <p>配送方式 | {{cart.ship.Name}} </p>
                    <p v-if="cart.ship.TypeCode==1 && cart.express.Name">{{cart.express.Name}}</p>
                </section>
            </router-link>
            <section class="m-list">
                <header>{{bizObj.Name}}</header>
                <section v-for="(item,index) in cart.items" :key="index" class="item" @click="showEditItem(item)">
                    <section class="title">
                        <h3 class="name ellipsis">
                            <strong>{{item.info.GoodsName}}</strong>
                        </h3>
                        <section class="content">
                            <section v-for="prop in propertyList" :key="prop.Id">
                                <span>{{prop.PropertyName}}</span>:
                                <span>{{item.info.Goods.Properties['p'+prop.PropertyId]}}</span>
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
                <router-link :to="{name:'order-confirm-remark'}" class="item start end">
                    <h2>订单备注</h2>
                    <div class="content">
                        <p class="ellipsis">{{cart.remark}}</p>
                        <svg class="icon">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#chevron-right"></use>
                        </svg>
                    </div>
                </router-link>
            </section>
            <section class="confrim_order">
                <p>总金额 ¥{{total}}</p>
                <p @click="confrimOrder">确认下单</p>
            </section>
            <br />
            <br />
            <br />
            <br />
        </section>
        <section>
            <transition name="fade">
                <div class="edit_cover" v-if="showEdit" @click="closeEditItem"></div>
            </transition>
            <transition name="fadeBounce" v-if="showEdit">
                <div class="edit">
                    <header class="header">
                        <h4 class="ellipsis">编辑</h4>
                        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" version="1.1" class="cancel" @click="closeEditItem">
                            <line x1="0" y1="0" x2="16" y2="16" stroke="#666" stroke-width="1.2" />
                            <line x1="0" y1="16" x2="16" y2="0" stroke="#666" stroke-width="1.2" />
                        </svg>
                    </header>
                    <section class="details">
                        <buy-cart :goods="editItem.info"></buy-cart>
                        <span>价格:</span>
                        <input type="number" v-model="editItem.price" />
                        <span> ¥ </span>
                    </section>
                    <footer class="footer">
                        <div>
                            <span>¥ </span>
                            <span class="money">{{editItem.num*editItem.price}}</span>
                        </div>
                        <div class="addto_cart" @click="savePrice">修改</div>
                    </footer>
                </div>
            </transition>
        </section>
        <loading v-if="showLoading"></loading>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import headerTitle from 'src/components/header/header-title'
import selectSlidUp from 'src/components/common/select-slid-up'
import loading from 'src/components/common/loading'
import buyCart from 'src/components/common/buy-cart'
import { apiConfirmOrder } from 'src/service/getData'

export default {
    data() {
        return {
            customerId: '', // 当前客户id
            editItem: null,
            showEdit: false,
            showLoading: true, //显示加载动画
        }
    },
    mounted() {
        this.initData();
    },
    computed: {
        ...mapState([
            'propertyList',
            'shipTypeList',
            'chargeTypeList',
            'orderStorage',
            'cartList',
            'userInfo'
        ]),
        cart: function () {
            return Object.assign({}, this.cartList[this.customerId]);
        },
        bizObj: function () {
            return this.cart.customer.BizObj;
        },
        charge: function () {
            return this.cart.charge;
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
        selectSlidUp,
        loading,
        buyCart
    },
    methods: {
        ...mapActions([
            'getChargeType',
            'getShipType'
        ]),
        ...mapMutations([
            'SAVE_ADDR',
            'SAVE_PHONE',
            'SAVE_CHARGE_TYPE',
            'SAVE_SHIP_TYPE',
            'SAVE_EXPRESS',
            'SAVE_STORAGE',
            'SAVE_PRICE',
            'CLEAR_CART'
        ]),
        async initData() {
            this.customerId = this.$route.params.customerId;

            this.SAVE_ADDR({ customerId: this.customerId, addr: this.getDefAddr(this.bizObj) });
            this.SAVE_PHONE({ customerId: this.customerId, phone: this.getDefPhone(this.bizObj) });

            await this.getShipType();
            this.SAVE_SHIP_TYPE({ customerId: this.customerId, ship: this.shipTypeList[0] });

            await this.getChargeType();
            this.SAVE_CHARGE_TYPE({ customerId: this.customerId, charge: this.chargeTypeList[0] });

            this.SAVE_STORAGE({ customerId: this.customerId, storage: this.orderStorage });

            this.SAVE_EXPRESS({ customerId: this.customerId, express: {} })

            this.showLoading = false;
        },
        getDefPhone(bizObj) {
            if (!bizObj) return {};

            let res;
            if (bizObj.Phones.length > 0)
                res = bizObj.Phones[0];

            bizObj.Phones.forEach((val) => {
                if (val.IsPrimaryAddr)
                    res = val;
            });

            return res;
        },
        getDefAddr(bizObj) {
            if (!bizObj) return {};

            let res;
            if (bizObj.Addrs.length > 0)
                res = bizObj.Addrs[0];

            bizObj.Addrs.forEach((val) => {
                if (val.IsPrimaryAddr)
                    res = val;
            });

            return res;
        },
        // 支付方式
        chooseChargeType(id, name) {
            this.SAVE_CHARGE_TYPE({ customerId: this.customerId, charge: { Id: id, Name: name } });
        },
        showEditItem(item) {
            this.editItem = item;
            this.showEdit = true;
        },
        closeEditItem() {
            this.showEdit = false;
        },
        savePrice() {
            this.SAVE_PRICE({ customerId: this.customerId, goodsId: this.editItem.id, price: this.editItem.price });
            this.showEdit = false;
        },
        async confrimOrder() {
            await apiConfirmOrder(this.userInfo, this.cart);
            this.CLEAR_CART(this.customerId);
            this.$router.push('/home');
        }
    },
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';
@import '../order';

.m-list {
    margin-top: .4rem;
    header {
        background-color: $background-light-color;
        padding: .55rem;
        @include sc(.8rem, $font-color);
    }
    .item {
        @include indent10;
        .title {
            flex: auto;
            display: block;
            width: 8rem;
        }
        .detail {
            flex: 1;
            @include fj();
            line-height: 1.5rem;
        }
    }
}


.address_empty_right {
    @include wh(.6rem, .6rem);
    fill: #999;
}

.confrim_order {
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
        background-color: #56d176;
        text-align: center;
    }
}

.edit_cover {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .4);
    z-index: 17;
}

.edit {
    position: fixed;
    top: 35%;
    left: 15%;
    width: 70%;
    background-color: #fff;
    z-index: 18;
    border: 1px;
    border-radius: 0.2rem;
    .header {
        h4 {
            @include sc(.7rem, #222);
            font-weight: normal;
            text-align: center;
            padding: .5rem;
        }
        .cancel {
            position: absolute;
            right: .5rem;
            top: .5rem;
        }
    }
    .details {
        padding: .75rem;
        position: relative;
        span {
            @include sc(.7rem, $font-color);
        }
        input {
            @include sc(.7rem, $font-color);
            width: 3rem;
            display: inline-block;
            text-align: right;
        }
    }
    .footer {
        @include fj;
        align-items: center;
        background-color: #f9f9f9;
        padding: 0.5rem;
        border: 1px;
        border-bottom-left-radius: .2rem;
        border-bottom-right-radius: .2rem;
        .addto_cart {
            @include wh(4rem, 1.3rem);
            background-color: $blue;
            border-radius: 0.15rem;
            @include sc(.6rem, $blue-font-color);
            text-align: center;
            line-height: 1.3rem;
        }
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}

.router-slid-enter-active,
.router-slid-leave-active {
    transition: all .4s;
}

.router-slid-enter,
.router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
}
</style>