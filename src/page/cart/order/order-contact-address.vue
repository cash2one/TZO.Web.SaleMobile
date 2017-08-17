<template>
    <section class="page rating">
        <header-title header-title="选择地址" goback="true"></header-title>
        <section v-if="!showLoading" class="scroll_container paddingTop">
            <router-link v-if="false" to="/confirmOrder/chooseAddress/addAddress" class="add_icon_footer">
                <img src="../../../images/add_address.png" height="24" width="24">
                <span>新增收货地址</span>
            </router-link>
            <section class="m-form-list">
                <header>联系人</header>
                <section class="item" v-for="item in bizObj.Phones" :key="item.Id" @click="choosePhone(item)">
                    <h2>
                        <svg v-if="cart.phone.Id==item.Id" class="icon">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
                        </svg>
                        <section v-else class="icon"></section>
                        <div>
                            <strong class="name">{{item.Contact}}</strong>
                        </div>
                    </h2>
                    <section class="content">
                        <p>
                            <span class="red" v-if="item.IsPrimaryPhone">主</span>
                        </p>
                        <p>{{item.PhoneNum}}</p>
                    </section>
                </section>
                <br />
                <header>地址</header>
                <section class="item" v-for="item in bizObj.Addrs" :key="item.CorpId" @click="chooseAddr(item)">
                    <h2>
                        <svg v-if="cart.addr.Id==item.Id" class="icon">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
                        </svg>
                        <section v-else class="icon"></section>
                        <div>
                            <p>{{item.Addr}}</p>
                        </div>
                    </h2>
                    <section class="content">
                        <p>
                            <span class="red" v-if="!item.IsPrimaryAddr">主</span>
                        </p>
                        <p>{{item.PostCode}}</p>
                    </section>
                </section>
            </section>
        </section>
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
    </section>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import headerTitle from 'src/components/header/header-title'
import loading from 'src/components/common/loading'

export default {
    data() {
        return {
            customerId: '', // 当前客户id
            bizObj: null,
            showLoading: true, //显示加载动画
        }
    },
    mounted() {
        this.initData();
    },
    computed: {
        ...mapState([
            'cartList'
        ]),
        cart: function () {
            return Object.assign({}, this.cartList[this.customerId]);
        },
    },
    components: {
        headerTitle,
        loading
    },
    methods: {
        ...mapMutations([
            'SAVE_ADDR',
            'SAVE_PHONE'
        ]),
        async initData() {
            this.customerId = this.$route.params.customerId;

            this.bizObj = Object.assign({}, this.cart.customer.BizObj);

            this.showLoading = false;
        },
        choosePhone(phone) {
            this.SAVE_PHONE({ customerId: this.customerId, phone });
        },
        chooseAddr(addr) {
            this.SAVE_ADDR({ customerId: this.customerId, addr });
        }
    }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';

.add_icon_footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2.5rem;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 204;
    span {
        @include sc(.7rem, $blue);
        margin-left: .275rem;
    }
}
</style>

