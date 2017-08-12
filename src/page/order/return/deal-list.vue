<template>
    <section class="page">
        <header-title header-title="销售退货" goback='true'></header-title>
        <section v-show="!showLoading" class="scroll_container paddingTop">
            <section class="m-list">
                <section v-for="item in dealItems" :key="item.Id" class="item">
                    <section class="title">
                        <h3 class="name ellipsis">
                            <strong>{{item.Goods.Name}}</strong>
                        </h3>
                        <section class="content">
                            <section v-for="prop in globalPropertyList" :key="prop.Id">
                                <span>{{prop.Name}}</span>:
                                <span>{{item.Goods.Properties['p'+prop.Id]}}</span>
                            </section>
                        </section>
                        <return-cart :dealId="item.DealId" :customer="curCustomer" :item="item"></return-cart>
                        <section class="content">
                            单号:{{item.BizBillNo}}
                        </section>
                    </section>
                    <div class="detail">
                        <div>
                            <span>x</span>
                            <span class="number">{{item.CanReturnNum}}</span>
                        </div>
                        <div>
                            <span>¥</span>
                            <span class="money">{{item.Price}}</span>
                        </div>
                    </div>
                </section>
            </section>
        </section>
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
    </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import headerTitle from 'src/components/header/header-title'
import loading from 'src/components/common/loading'
import returnCart from 'src/components/common/return-cart'
import { apiGetSaleDealItem } from 'src/service/getData'

export default {
    data() {
        return {
            keyword: '',
            dealItems: [],
            showLoading: true,                                      //显示加载动画
        }
    },
    created() {
        if (!this.curCustomer || !this.curCustomer.CustomerId) this.$router.push('/customer/search');
    },
    mounted() {
        this.initData();
    },
    methods: {
        ...mapActions([
            'getGlobalProperty'
        ]),
        async initData() {

            await this.getGlobalProperty();

            let startDate = new Date();
            startDate.setHours(0, 0, 0, 0);
            startDate.setFullYear(startDate.getFullYear() - 1);
            let endDate = new Date();
            endDate.setHours(23, 59, 59, 999);

            await apiGetSaleDealItem(this.curCustomer.CustomerId, this.keyword, startDate, endDate)
                .then(res => this.dealItems = res.Items);
            this.showLoading = false;
        },
    },
    computed: {
        ...mapState([
            'globalPropertyList',
            'curCustomer'
        ])
    },
    components: {
        headerTitle,
        loading,
        returnCart
    },
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';
@import '../order';

.m-list {
    header {
        background-color: $background-light-color;
        @include indent10;
        @include sc(.65rem, $font-color);
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
</style>