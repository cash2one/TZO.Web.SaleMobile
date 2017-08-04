<template>
    <div class="rating_page">
        <header-title header-title="客户对账" goback='true'>
        </header-title>
        <!--<section class="m-sort">
            <div class="sort_item">
                <span style="color:red"> 时间区间</span>
            </div>
        </section>-->
        <section class="ougthrec_container" v-if="custreconciliations.length">
            <ul class="list_container">
                <router-link to="" tag="li" v-for="item in custreconciliations" :key="item.Id" class="list_li">
                    <section class="item_right">
                        <div class="item_right_text">
                            <p class="item-flex">
                                <span>{{item.BillNo}}
                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="50" height="14" class="pay_icon">
                                        <polygon points="0,14 4,0 44,0 40,14" style="fill:none;stroke:#FF6000;stroke-width:1" />
                                        <line x1="1.5" y1="12" x2="40" y2="12" style="stroke:#FF6000;stroke-width:1.5" />
                                        <text x="3.5" y="9" style="fill:#FF6000;font-size:10;font-weight:bold;">{{item.BizTypeName}}</text>
                                    </svg>
                                </span>
                                <span>{{item.CreateTime | time}}</span>
                            </p>
                            <p class="item-flex">
                                <span>期初:{{item.BegainMoneyItem}} </span>
                                <span>新增:{{item.OughtRecPayMoney}} </span>
                            </p>
                            <p class="item-flex">
                                <span>实收:{{item.Money}} </span>
                                <span>期末:{{item.EndMoney}} </span>
                            </p>
                        </div>
                    </section>
                </router-link>
            </ul>
        </section>
        <!--<ul v-else class="animation_opactiy">
                <li class="list_back_li" v-for="item in 10" :key="item">
                    <img src="../../../images/shopback.svg" class="list_back_svg">
                </li>
            </ul>
            <p v-if="touchend" class="empty_data">没有更多了</p>
            <aside class="return_top" @click="backTop" v-if="showBackStatus">
                <svg class="back_top_svg">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
                </svg>
            </aside>
            <transition name="loading">
                <loading v-show="showLoading"></loading>
            </transition>-->
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
        let _now=new Date();
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
.rating_page {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding-top: 1.95rem;
    background-color: #ebebeb;
    z-index: 18;
}

.ougthrec_container {
    padding-bottom: 2rem;
    //margin-top: 1.7rem;
    .list_container {
        background-color: #fff;
    }

    .list_li {
        display: flex;
        justify-content: 'center';
        padding: 0.5rem;
        border-bottom: 0.025rem solid $bc;
        .item_left {
            margin-right: 0.25rem;
            .restaurant_img {
                @include wh(1.7rem, 1.7rem);
            }
        }
        .item_right {
            font-size: 0.55rem;
            flex: 1;
            .item_right_text {
                padding-bottom: 0.25rem;
                border-bottom: 0.025rem $bc;
                .pay_icon {
                    margin-bottom: -0.08rem;
                }
                .item-flex {
                    display: flex;
                    justify-content: space-between;
                }
            }
            
        }
    }
}
</style>