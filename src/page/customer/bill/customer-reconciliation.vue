<template>
    <div class="page rating paddingTop">
        <header-title header-title="客户对账" goback='true'>
        </header-title>
        <!--<section class="m-sort">
                <div class="sort_item">
                    <span style="color:red"> 时间区间</span>
                </div>
            </section>-->
        <section class="m-list" style="margin-top:.4rem" v-if="custreconciliations.length">
            <div v-for="item in custreconciliations" :key="item.Id" class="item">
                <div>
                    <p class="content">
                        <span>{{item.BillNo}}
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="50" height="14" style="margin-bottom: -0.08rem;">
                                <polygon points="0,14 4,0 44,0 40,14" style="fill:none;stroke:#FF6000;stroke-width:1" />
                                <line x1="1.5" y1="12" x2="40" y2="12" style="stroke:#FF6000;stroke-width:1.5" />
                                <text x="3.5" y="9" style="fill:#FF6000;font-size:10;font-weight:bold;">{{item.BizTypeName}}</text>
                            </svg>
                        </span>
                    </p>
                    <p class="content">
                        <span>期初:{{item.BegainMoneyItem}}</span>
                    </p>
                    <p class="content">
                        <span>实收:{{item.Money}} </span>
                    </p>
                </div>
                <div>
                    <p class="content ">
                        <span>{{item.CreateTime | time}}</span>
                    </p>
                    <p class="content ">
                        <span>新增:{{item.OughtRecPayMoney}} </span>
                    </p>
                    <p class="content">
                        <span>期末:{{item.EndMoney}} </span>
                    </p>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import headerTitle from 'src/components/header/header-title'
import { apiGetCustomerReconciliation } from 'src/service/getData'

export default {
    data() {
        return {
            custreconciliations: []        //客户对账列表
        }
    },
    mounted() {
        var customerId = this.curCustomer.CustomerId;

        //JS计算当前月
        let _now = new Date();
        let endTime = _now;
        let startTime = new Date(_now.getFullYear(), _now.getMonth(), 1);
        apiGetCustomerReconciliation(customerId, "", { "startDate": startTime, "endDate": endTime }, 0).then(res => {
            this.custreconciliations = res.Items;
        })
    },
    components: {
        headerTitle
    },
    computed: {
        ...mapState([
            'curCustomer'
        ]),
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';

.m-list {
    .item {
        @include fj;
    }
}
</style>