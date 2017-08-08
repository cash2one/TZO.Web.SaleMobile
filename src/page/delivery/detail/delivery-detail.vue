<template>
    <div class="page rating">
        <header-title header-title="送货明细" goback="true"></header-title>
        <section v-if="!showLoading" class="scroll_container paddingTop">
    
            <section class="m-list">
                <header>{{bill.CustomerName}}[{{bill.BillNo}}]</header>
                <section v-for="goods in bill.Items" :key="goods.Id" class="item">
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
            <section class="m-form-list">
                <section class="item start">
                    <h2>联系人</h2>
                    <div class="content">
                        <p>{{express.Contacts}}</p>
                    </div>
                </section>
                <section class="item">
                    <h2>电话</h2>
                    <div class="content">
                        <p>{{express.Phone}}</p>
                    </div>
                </section>
                <section class="item end">
                    <h2>地址</h2>
                    <div class="content">
                        <p>{{express.RecAddress}}</p>
                    </div>
                </section>
            </section>
            <section class="confrim">
                <p>确认送货</p>
            </section>
        </section>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
        <loading v-if="showLoading"></loading>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import headerTitle from 'src/components/header/header-title'
import loading from 'src/components/common/loading'
import { apiGetExpress, apiGetDeal } from 'src/service/getData'

export default {
    data() {
        return {
            showLoading: true,
            bill: null,
            express: null
        }
    },
    mounted() {
        this.initData();
    },
    computed: {
        ...mapState([
            'globalPropertyList'
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

            let id = this.$route.params.Id;
            let billId = this.$route.params.BillId;

            this.bill = await apiGetDeal(billId);
            this.express = await apiGetExpress(id);

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

.confrim {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 2rem;
    p {
        line-height: 2rem;
        @include sc(.75rem, #fff);
        background-color: #56d176;
        text-align: center;
    }
}
</style>