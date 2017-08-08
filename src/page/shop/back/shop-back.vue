<template>
    <div class="page">
        <header-title header-title="回店" goback='true'></header-title>
        <section v-if="!showLoading" class="scroll_container paddingTop">
            <section class="info-data">
                <ul class="clear">
                    <router-link to="/balance" tag="li" class="info-data-link">
                        <span class="info-data-top">
                            <strong class="money">**</strong>元</span>
                        <span class="info-data-bottom">现金</span>
                    </router-link>
                    <router-link to="/benefit" tag="li" class="info-data-link">
                        <span class="info-data-top">
                            <strong class="count">**</strong>元</span>
                        <span class="info-data-bottom">挂帐</span>
                    </router-link>
                    <router-link to="/points" tag="li" class="info-data-link">
                        <span class="info-data-top">
                            <strong class="number">{{saleReturnList.length}}</strong>单</span>
                        <span class="info-data-bottom">退货</span>
                    </router-link>
                </ul>
            </section>
            <section class="m-tabs" ref="chooseType">
                <div class="item">
                    <span :class='{active: changeShowType =="return"}' @click="changeShowType='return'">客户退货</span>
                </div>
                <div class="item">
                    <span :class='{active: changeShowType =="transfer"}' @click="changeShowType='transfer'">备货退回</span>
                </div>
            </section>
            <transition name="m-tab-choose">
                <section v-show="changeShowType =='return'" class="m-tab-container m-list">
                    <section v-for="item in saleReturnList" :key="item.Id">
                        <header>{{item.CustomerName}}[{{item.BillNo}}]</header>
                        <section v-for="goods in item.Items" :key="goods.Id" class="item">
                            <section class="title">
                                <h3 class="name ellipsis">
                                    <strong>{{goods.Goods.Name}}</strong>
                                </h3>
                                <section class="content">
                                    <section v-for="prop in globalPropertyList" :key="prop.Id">
                                        <span>{{prop.Name}}</span>:
                                        <span>{{goods.Goods.Properties['p'+prop.Id]}}</span>
                                    </section>
                                </section>
                            </section>
                            <div class="detail">
                                <span>x</span>
                                <span class="number">{{goods.GoodsNum}}</span>
                                <span>{{goods.Units}}</span>
                            </div>
                        </section>
                    </section>
                </section>
            </transition>
            <transition name="tab-choose">
                <section v-show="changeShowType =='transfer'" class="tab-container m-list">
                    <section v-for="goods in stockList" :key="goods.GoodsId" class="item">
                        <section class="title">
                            <h3 class="name ellipsis">
                                <strong>{{goods.Goods.Name}}</strong>
                            </h3>
                            <section class="content">
                                <section v-for="prop in globalPropertyList" :key="prop.Id">
                                    <span>{{prop.Name}}</span>:
                                    <span>{{goods.Goods.Properties['p'+prop.Id]}}</span>
                                </section>
                            </section>
                        </section>
                        <div class="detail">
                            <span>x</span>
                            <span class="number">{{goods.StockNum}}</span>
                            <span>{{goods.Goods.Units}}</span>
                        </div>
                    </section>
                </section>
            </transition>
        </section>
        <loading v-if="showLoading"></loading>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import headerTitle from 'src/components/header/header-title'
import loading from 'src/components/common/loading'
import { apiMyExpresses, apiGetDeal, apiGetGoodsStock, apiGetSaleReturn, apiGetSaleReturnDetail } from 'src/service/getData'

export default {
    data() {
        return {
            showLoading: true,
            changeShowType: 'return',
            stockList: [],
            saleReturnList: []
        }
    },
    mounted() {
        this.initData();
    },
    computed: {
        ...mapState([
            'globalPropertyList',
            'curStorage'
        ]),
    },
    components: {
        headerTitle,
        loading
    },
    methods: {
        ...mapActions([
            'getGlobalProperty'
        ]),
        async initData() {
            await this.getGlobalProperty();

            let startDate = new Date();
            startDate.setHours(0, 0, 0, 0);
            let endDate = new Date();
            endDate.setHours(23, 59, 59, 999);

            await apiGetSaleReturn(this.curStorage.Id, [4, 5, 7], startDate, endDate)
                .then(res => this.saleReturnList = res.Items);

            // await apiMyExpresses(this.curExpress.Id).then(res => this.expressList = res.Items);
            for (var i = 0; i < this.saleReturnList.length; i++) {
                var val = this.saleReturnList[i];
                await apiGetSaleReturnDetail(val.Id).then(res => val.Items = res.Items);
            }

            await apiGetGoodsStock(this.curStorage.Id).then(res => this.stockList = res.Items);

            this.showLoading = false;
        }
    }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';

.m-list {
    .item {
        @include fj();
        @include indent10;
        .title {
            flex: auto;
            display: block;
            width: 8rem;
        }
        .detail {
            line-height: 1.5rem;
            text-align: right;
        }
    }
}
</style>