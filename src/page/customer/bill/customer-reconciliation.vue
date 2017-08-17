<template>
    <div class="page">
        <header-title header-title="客户对账" goback='true'></header-title>
        <section v-if="!showLoading" class="scroll_container paddingTop">
            <section class="order-list" v-if="custreconciliations.length">
                <div v-for="item in custreconciliations" :key="item.Id" class="item">
                    <section class="title">
                        <h3 class="name ellipsis">
                            <strong>{{item.BillNo}}</strong>
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="50" height="14">
                                <polygon points="0,14 4,0 44,0 40,14" style="fill:none;stroke:#FF6000;stroke-width:1" />
                                <line x1="1.5" y1="12" x2="40" y2="12" style="stroke:#FF6000;stroke-width:1.5" />
                                <text x="3.5" y="9" style="fill:#FF6000;font-size:10;font-weight:bold;">{{item.BizTypeName}}</text>
                            </svg>
                        </h3>
                        <section>
                            {{item.CreateTime | time}}
                        </section>
                    </section>
                    <section class="content">
                        <section>
                            <p>期初:{{item.BegainMoneyItem}}</p>
                            <p>期末:{{item.EndMoney}} </p>
                        </section>
                        <section>
                            <p>实收:
                                <span class="number">{{item.Money}}</span>
                            </p>
                            <p>新增:
                                <span class="money">{{item.OughtRecPayMoney}}</span>
                            </p>
                        </section>
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
import { apiGetCustomerReconciliation } from 'src/service/getData'

export default {
    data() {
        return {
            showLoading: true,
            custreconciliations: []        //客户对账列表
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

            //JS计算当前月
            let _now = new Date();
            let endTime = _now;
            let startTime = new Date(_now.getFullYear(), _now.getMonth(), 1);
            await apiGetCustomerReconciliation(customerId, "", { "startDate": startTime, "endDate": endTime }, 0).then(res => {
                this.custreconciliations = res.Items;
            })

            this.showLoading = false;
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';

.content {
    section {
        @include fj;
    }
}
</style>