 <template>
    <div class="page rating">
        <section class="scroll_container paddingTop">
            <header-title header-title="收款详情" goback='true'>
            </header-title>
            <div v-if="!showLoading">
                <section class="m-form-list">
                    <div class="item start">
                        <h2>
                            <strong>{{orderDetail.CustomerName}}</strong>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="40" height="14">
                                    <polygon points="0,10 4,0 40,0 36,10" style="fill:none;stroke:#FF6000;stroke-width:1" />
                                    <line x1="1.5" y1="11" x2="36" y2="11" style="stroke:#FF6000;stroke-width:1.5" />
                                    <text x="3.5" y="9" style="fill:#FF6000;font-size:10;font-weight:bold;">{{orderDetail.StatusName}}</text>
                            </svg>
                        </h2>
                        <div class="content">
                            <p></p>
                        </div>
                    </div>
                    <div class="item">
                        <h2>
                            金额
                        </h2>
                        <div class="content">
                            ￥<span class="money">{{orderDetail.Money}}</span>
                        </div>
                    </div>
                    <div class="item">
                        <h2>
                            单号
                        </h2>
                        <div class="content">
                            <p>{{orderDetail.BillNo}}</p>
                        </div>
                    </div>
                    <div class="item">
                        <h2>
                            下单时间
                        </h2>
                        <div class="content">
                            <p>{{orderDetail.CreateTime | time}}</p>
                        </div>
                    </div>
                    <div class="item">
                        <h2>
                            收款账户
                        </h2>
                        <div class="content">
                            <p>{{orderDetail.SupAccountName}}</p>
                        </div>
                    </div>
                    <div class="item end">
                        <h2>
                            备注
                        </h2>
                        <div class="content">
                            <p>{{orderDetail.Note}}</p>
                        </div>
                    </div>
                </section>
    
                <section class="m-form-list">
                    <header class="item start">历史记录</header>
                    <div class="item" v-for="(item,index) in orderDetail.Histories" :key="index" :class="{end:index==(orderDetail.Histories.length-1)}">
                        <h2>
                            {{item.StatusName}}
                        </h2>
                        <div class="content">
                            <p>{{item.OperatorName}}&nbsp;&nbsp;{{item.OperateTime | time}}</p>
                        </div>
                    </div>
                </section>
            </div>
        </section>
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
    </div>
</template>

<script>

import headerTitle from 'src/components/header/header-title'
import loading from 'src/components/common/loading'
import { apiGetRecSettlementDetail } from 'src/service/getData'

export default {
    data() {
        return {
            orderDetail: {},
            showLoading: true,                                      //显示加载动画
        }
    },
    mounted() {
        this.initData();
    },
    methods: {
        async initData() {
            await apiGetRecSettlementDetail(this.$route.query.Id).then(val => {
                this.orderDetail = val;
            });
            this.showLoading = false;
        },
    },
    components: {
        headerTitle,
        loading,
    },
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';
@import 'src/style/order';

.m-form-list {
    header {
        background-color: $background-light-color;
        @include indent10;
        @include sc(.65rem, $font-color);
    }
}
</style>