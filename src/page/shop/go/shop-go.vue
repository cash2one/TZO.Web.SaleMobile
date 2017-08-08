<template>
    <div class="page">
        <header-title header-title="出店" goback='true'></header-title>
        <section v-if="!showLoading" class="scroll_container paddingTop">
            <section class="info-data">
                <ul class="clear">
                    <router-link to="/balance" tag="li" class="info-data-link">
                        <span class="info-data-top">
                            <strong class="number">**</strong>个
                        </span>
                        <span class="info-data-bottom">访客</span>
                    </router-link>
                    <router-link to="/benefit" tag="li" class="info-data-link">
                        <span class="info-data-top">
                            <strong class="count">{{expressList.length}}</strong>单
                        </span>
                        <span class="info-data-bottom">送货</span>
                    </router-link>
                    <router-link to="/points" tag="li" class="info-data-link">
                        <span class="info-data-top">
                            <strong class="money">{{saleReturnNum}}</strong>单
                        </span>
                        <span class="info-data-bottom">退货</span>
                    </router-link>
                </ul>
            </section>
            <section class="m-tabs" ref="chooseType">
                <div class="item">
                    <span :class='{active: changeShowType =="delivery"}' @click="changeShowType='delivery'">送货</span>
                </div>
                <div class="item">
                    <span :class='{active: changeShowType =="transfer"}' @click="changeShowType='transfer'">备货</span>
                </div>
            </section>
            <transition name="m-tab-choose">
                <section v-show="changeShowType =='delivery'" class="m-tab-container m-list">
                    <section v-for="item in expressList" :key="item.Id">
                        <header>{{item.CustomerName}}[{{item.BillNo}}]</header>
                        <section v-for="goods in item.Items" :key="goods.Id" class="item">
                            <section class="title">
                                <h3 class="name ellipsis">
                                    <strong>{{goods.GoodsName}}</strong>
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
                <section v-show="changeShowType =='transfer'" class="m-tab-container m-list">
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
import { apiMyExpresses, apiGetDeal, apiGetGoodsStock, apiGetSaleReturn } from 'src/service/getData'
export default {
    data() {
        return {
            showLoading: true,
            changeShowType: 'delivery',
            expressList: [],
            stockList: [],
            saleReturnNum: 0
        }
    },
    mounted() {
        this.initData();
    },
    computed: {
        ...mapState([
            'globalPropertyList',
            'curStorage',
            'curExpress'
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
            await apiGetSaleReturn(this.curStorage.Id, [2]).then(res => this.saleReturnNum = res.Count);

            await apiMyExpresses(this.curExpress.Id, [2]).then(res => this.expressList = res.Items);
            for (var i = 0; i < this.expressList.length; i++) {
                var val = this.expressList[i];
                await apiGetDeal(val.BillId).then(res => val.Items = res.Items);
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

