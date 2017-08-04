 <template>
    <div class="page rating">
        <header-title header-title="订单详情" goback='true'>
        </header-title>
        <div v-if="!showLoading">
            <div class="address_container">
                <div class="address_empty_left">
                    <svg class="location_icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#location"></use>
                    </svg>
                    <div class="address_detail_container">
                        <header>
                            <span>{{orderDetail.Address.Contacts}}</span>
                            <span>{{orderDetail.Address.Phone}}</span>
                        </header>
                        <div class="address_detail">
                            <p>{{orderDetail.Address.RecAddress}}</p>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="delivery_model container_style">
                <p class="deliver_text">{{orderDetail.SendStorageName}}</p>
                <section class="deliver_time">
                    <p>配送方式 | {{orderDetail.ShipTypeName}} </p>
                    <p v-if="orderDetail.ShipType==1 && orderDetail.LogisticsCorpName">{{orderDetail.LogisticsCorpName}}</p>
                </section>
            </div>
    
            <section class="m-form-list">
                <div class="item start">
                    <h2>
                        <strong>{{orderDetail.CustomerName}}</strong>
                    </h2>
                    <div class="content">
                        <p></p>
                    </div>
                </div>
                <div class="item">
                    <h2>
                        支付方式
                    </h2>
                    <div class="content">
                        <p>{{orderDetail.ChargeTypeName}}</p>
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
                        <p>{{orderDetail.SubmitTime | time}}</p>
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
    
            <section class="m-list">
                <header>
                    商品列表(品类:
                    <span class="count">{{orderDetail.CategoryNum}}</span>,数量:
                    <span class="number">{{orderDetail.GoodsTotalNum}}</span>,总计:￥
                    <span class="money">{{orderDetail.TotalMoney}}</span>)
                </header>
                <section v-for="item in orderDetail.Items" :key="item.Id" class="item">
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
                    </section>
                    <div class="detail">
                        <div>
                            <span>x</span>
                            <span class="number">{{item.GoodsNum}}</span>
                        </div>
                        <div>
                            <span>¥</span>
                            <span class="money">{{item.Price}}</span>
                        </div>
                    </div>
                </section>
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
    
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
    
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import headerTitle from 'src/components/header/header-title'
import loading from 'src/components/common/loading'
import {
    apiGetForeignSaleOrderDetail,
    apiGetForeignSaleReturnOrderDetail,
    apiGetRetailOrderDetail,
    apiGetRetailReturnOrderDetail
} from 'src/service/getData'

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
        ...mapActions([
            'getGlobalProperty',
            'getPorpertyList',
        ]),
        async initData() {

            await this.getGlobalProperty();
            await this.getPorpertyList();

            if (this.$route.query.bizType == 12012) {
                await apiGetForeignSaleOrderDetail(this.$route.query.Id).then(val => {
                    this.orderDetail = val;
                });
            } else if (this.$route.query.bizType == (0 - 12012)) {
                await apiGetForeignSaleReturnOrderDetail(this.$route.query.Id).then(val => {
                    this.orderDetail = val;
                });
            } else if (this.$route.query.bizType == 12032) {
                await apiGetRetailOrderDetail(this.$route.query.Id).then(val => {
                    this.orderDetail = val;
                });
            } else if (this.$route.query.bizType == (0 - 12032)) {
                await apiGetRetailReturnOrderDetail(this.$route.query.Id).then(val => {
                    this.orderDetail = val;
                });
            }

            this.showLoading = false;
        },
    },
    computed: {
        ...mapState([
            'globalPropertyList',
            'propertyList',
        ])
    },
    components: {
        headerTitle,
        loading,
    },
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';
@import '../order';

.m-form-list {
    header {
        background-color: $background-light-color;
        @include indent10;
        @include sc(.65rem, $font-color);
    }
}

.m-list {
    margin-top: .4rem;
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
