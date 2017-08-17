<template>
    <div class="page">
        <header-title header-title="客户欠款" goback='true'></header-title>
        <section v-if="!showLoading" class="scroll_container paddingTop">
            <section class="info-data">
                <ul class="clear">
                    <router-link to="/balance" tag="li" class="info-data-link">
                        <span class="info-data-top">
                            <strong class="money">{{curCustomer.OughtRecMoney}}</strong>元</span>
                        <span class="info-data-bottom">欠款金额</span>
                    </router-link>
                    <router-link to="/benefit" tag="li" class="info-data-link">
                        <span class="info-data-top">
                            <strong class="count">{{curCustomer.ChargeOffMoney}}</strong>元</span>
                        <span class="info-data-bottom">出账金额</span>
                    </router-link>
                    <router-link to="/points" tag="li" class="info-data-link">
                        <span class="info-data-top">
                            <strong class="number">**</strong>元</span>
                        <span class="info-data-bottom">结算金额</span>
                    </router-link>
                </ul>
            </section>
            <section class="order-list" v-if="oughtrecs.length">
                <div v-for="item in oughtrecs" :key="item.Id" class="item">
                    <section class="title">
                        <h3 class="name ellipsis">
                            <strong>{{item.BillNo}}</strong>
                        </h3>
                        <section>
                            {{item.CreateTime | time}}
                        </section>
                    </section>
                    <section class="content">
                        <section>
                            <span>余额:</span>
                            <span>{{item.Balance}}</span>
                        </section>
                        <section>
                            <span>业务类别:</span>
                            <span>{{item.BizTypeName}}</span>
                        </section>
                        <section>
                            <span>到期:</span>
                            <span>{{item.FirstExpireTime | time}}</span>
                        </section>
                        <svg class="right" xmlns="http://www.w3.org/2000/svg" version="1.1" width="50" height="14">
                            <polygon points="0,14 4,0 44,0 40,14" style="fill:none;stroke:#FF6000;stroke-width:1" />
                            <line x1="1.5" y1="12" x2="40" y2="12" style="stroke:#FF6000;stroke-width:1.5" />
                            <text x="3.5" y="9" style="fill:#FF6000;font-size:10;font-weight:bold;">{{item.SettlementStateName}}</text>
                        </svg>
                    </section>
                </div>
            </section>
        </section>
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import headerTitle from 'src/components/header/header-title'
import loading from 'src/components/common/loading'
import { apiGetOughtRecs } from 'src/service/getData'

export default {
    data() {
        return {
            showLoading: true,
            oughtrecs: []        //客户应收款列表
        }
    },
    mounted() {
        this.initData();
    },
    components: {
        headerTitle,
        loading
    },
    computed: {
        ...mapState([
            'curCustomer'
        ]),
    },
    methods: {
        async initData() {
            var customerId = this.curCustomer.CustomerId;
            await apiGetOughtRecs(customerId, "", "FirstExpireTime", "asc", { "Status": [1, 2] }, 0).then(res => {
                this.oughtrecs = res.Items;
            });

            this.showLoading = false;
        }
    }

}
</script>

<style lang="scss" scoped>
.right {
    position: absolute;
    right: .55rem;
    bottom: .55rem;
}
</style>