<template>
    <div class="page rating paddingTop">
        <header-title header-title="客户欠款" goback='true'>
        </header-title>
        <section class="m-sort">
            <div class="sort_item">
                <span style="color:red"> 欠款金额:{{curCustomer.OughtRecMoney}}</span>
            </div>
            <div class="sort_item">
                出账金额:{{curCustomer.ChargeOffMoney}}
            </div>
            <div class="sort_item">
                结算金额:暂无
            </div>
        </section>
        <section class="m-list" style="margin-top:1.8rem" v-if="oughtrecs.length">
            <div v-for="item in oughtrecs" :key="item.Id" class="item">
                <div>
                    <p class="content">{{item.BillNo}}
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="50" height="14" style="margin-bottom: -0.08rem;">
                            <polygon points="0,14 4,0 44,0 40,14" style="fill:none;stroke:#FF6000;stroke-width:1" />
                            <line x1="1.5" y1="12" x2="40" y2="12" style="stroke:#FF6000;stroke-width:1.5" />
                            <text x="3.5" y="9" style="fill:#FF6000;font-size:10;font-weight:bold;">{{item.SettlementStateName}}</text>
                        </svg>
                    </p>
                    <p class="content">余额:
                        <span style="color:#FF7F00">{{item.Balance}}</span>
                    </p>
                    <p class="content">{{item.BizTypeName}}</p>
                </div>
                <div>
                    <p class="content ">业务: {{item.CreateTime | time}}</p>
                    <br>
                    <p class="content">到期: {{item.FirstExpireTime | time}}</p>
                </div>
    
            </div>
        </section>
    
    </div>
</template>

<script>
import { mapState } from 'vuex'
import headerTitle from 'src/components/header/header-title'
import { apiGetOughtRecs } from 'src/service/getData'

export default {
    data() {
        return {
            oughtrecs: []        //客户应收款列表
        }
    },
    mounted() {
        var customerId = this.curCustomer.CustomerId;
        apiGetOughtRecs(customerId, "", "FirstExpireTime", "asc", { "Status": [1, 2] }, 0).then(res => {
            this.oughtrecs = res.Items;
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