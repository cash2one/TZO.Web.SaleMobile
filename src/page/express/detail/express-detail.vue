<template>
    <section class="page rating">
        <header-title header-title="发货明细" goback="true"></header-title>
        <section v-if="!showLoading" class="scroll_container paddingTop">
            <section class="m-form-list">
                <div class="h3">
                    {{bill.CustomerName}}
                    <span :class="{red:express.LogisticsStatus==2,green:express.LogisticsStatus==3}">{{express.LogisticsStatusName}}</span>
                </div>
                <section class="item">
                    <h3>单号</h3>
                    <div class="content">
                        <p>{{bill.BillNo}}</p>
                    </div>
                </section>
                <section class="item">
                    <h3>联系人</h3>
                    <div class="content">
                        <p>{{express.Contacts}}</p>
                    </div>
                </section>
                <section class="item">
                    <h3>电话</h3>
                    <div class="content">
                        <p>{{express.Phone}}</p>
                    </div>
                </section>
                <section class="item">
                    <h3>地址</h3>
                    <div class="content">
                        <p>{{express.RecAddress}}</p>
                    </div>
                </section>
                <section class="item end">
                    <h3>备注</h3>
                    <br />
                    <div class="content">
                        <p>{{express.Note}}</p>
                    </div>
                </section>
            </section>
            <section class="delivery_model container_style" @click="showExprerssPage">
                <h2>
                    <strong>{{express.StorageName}}</strong>
                </h2>
                <section class="deliver_time">
                    <p>配送方式 | {{express.ShipTypeName}} </p>
                    <p v-if="express.ShipType==1 && express.LogisticsCorpName">{{express.LogisticsCorpName}}</p>
                </section>
            </section>
            <section class="shippers_model container_style" @click="showShippersPage">
                <div class="title">
                    <h2>
                        <strong>发货人</strong>
                    </h2>
                </div>
                <div class="content">
                    <div v-if="item.checked" class="user" v-for="(item,index) in shipperList" :key="index">{{item.Name}}
                        <b v-if="item.workload">[{{item.workload}}]</b>
                    </div>
                </div>
            </section>
            <section class="m-form-list">
                <section class="item start">
                    <h3>物流单号</h3>
                    <input type="text" v-model="express.ExpressNo" class="input-text" placeholder="请输入物流单号" />
                </section>
                <section class="item">
                    <h3>物流费用</h3>
                    <input type="text" v-model="express.ExpressCost" class="input-text" placeholder="请输入物流费用" />
                </section>
                <section class="item end">
                    <h3>物流佣金</h3>
                    <input type="text" v-model="express.CollectCost" class="input-text" placeholder="请输入物流佣金" />
                </section>
            </section>
            <section class="item-list">
                <header>商品信息</header>
                <section v-for="goods in bill.Items" :key="goods.Id" class="item">
                    <section class="item-left">
                        <section class="title">
                            <h3 class="name ellipsis">
                                <strong>{{goods.GoodsName}}</strong>
                            </h3>
                        </section>
                        <section class="content">
                            <section v-for="prop in globalPropertyList" :key="prop.Id">
                                <span>{{prop.Name}}</span>:
                                <span>{{goods.Goods.Properties['p'+prop.Id]}}</span>
                            </section>
                        </section>
                    </section>
                    <div class="detail">
                        <div>
                            <span>x</span>
                            <span class="number">{{goods.GoodsNum}}</span>
                            <span>{{goods.Units}}</span>
                        </div>
                    </div>
                </section>
            </section>
            <br />
            <br />
            <br />
            <br />
            <section v-if="express.LogisticsStatus==2" class="confrim" @click="confrim">
                <p>确认发货</p>
            </section>
        </section>
        <transition name="fade">
            <section class="confrim_details" v-if="showError">
                <section>
                    <h2 class="title">错误</h2>
                    <p>{{message}}{{exceptionMessage}}</p>
                </section>
                <svg width="60" height="60" class="close_activities" @click.stop="showErrorFun">
                    <circle cx="30" cy="30" r="25" stroke="#555" stroke-width="1" fill="none" />
                    <line x1="22" y1="38" x2="38" y2="22" style="stroke:#999;stroke-width:2" />
                    <line x1="22" y1="22" x2="38" y2="38" style="stroke:#999;stroke-width:2" />
                </svg>
            </section>
        </transition>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
    </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import headerTitle from 'src/components/header/header-title'
import loading from 'src/components/common/loading'
import {
    apiGetExpressCorps,
    apiGetExpress,
    apiGetDeal,
    apiSaveExpress,
    apiSendOutExpress
} from 'src/service/getData'

export default {
    data() {
        return {
            showLoading: true,
            showError: false,
            bill: null,
            express: null,
            shipperList: [],
            message: '',
            exceptionMessage: ''
        }
    },
    mounted() {
        this.initData();
    },
    computed: {
        ...mapState([
            'globalPropertyList',
            'employeeList',
            'curCorp',
            'userInfo'
        ]),
    },
    components: {
        headerTitle,
        loading
    },
    methods: {
        ...mapActions([
            'getGlobalProperty',
            'getEmployees'
        ]),
        async initData() {
            await this.getGlobalProperty();
            await this.getEmployees();

            let id = this.$route.params.Id;
            let billId = this.$route.params.BillId;

            this.bill = await apiGetDeal(billId);
            this.express = await apiGetExpress(id);

            this.shipperList = [...this.employeeList];

            let shipper = this.shipperList.find((val) => {
                return val.Id == this.userInfo.UserId;
            });
            shipper.checked = true;
            shipper.workload = this.bill.GoodsTotalNum;

            this.showLoading = false;
        },

        showExprerssPage() {
            if (this.express.ShipType == 1)
                this.$router.push({ name: 'express-corp' });
        },
        showShippersPage() {
            this.$router.push({ name: 'express-shipper' });
        },
        async confrim() {
            this.showLoading = true;

            let shippers = this.shipperList.filter((val) => { return val.checked });
            shippers = shippers.map((val) => {
                return { Shipper: val.Id, Workload: val.workload };
            });

            this.express.Shippers = shippers;

            let res = await apiSaveExpress(this.express);
            if (res.Id)
                await apiSendOutExpress(res.Id);
                
            this.showLoading = false;

            if (res.Message) {
                this.showError = true;
                this.message = res.Message;
                this.exceptionMessage = res.ExceptionMessage;
            }
            else
                this.$router.replace('/express');
        },
        // 控制活动详情页的显示隐藏
        showErrorFun() {
            this.showError = !this.showError;
        },
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';

.item-list {
    margin-top: .4rem;
}

.input-text {
    text-align: right;
    font-size: .65rem;
}

.shippers_model {
    @include indent10;
    @include fj;
    border-left: .2rem solid $orange;
    min-height: 4rem;
    align-items: center;
    .title {
        flex: auto;
        width: 8rem;
    }
    .content {
        .user {
            @include indent05;
            @include sc(.65rem, #fff);
            display: inline-block;
            background-color: $orange;
            margin-top: .275rem;
            margin-left: .275rem;
            text-align: center;
            border-radius: 0.12rem;
            b {
                @include sc(.55rem, #fff);
            }
        }
    }
}

.confrim_details {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #262626;
    z-index: 200;
    padding: 1.25rem;
    .title {
        text-align: center;
        @include sc(.8rem, #fff);
    }
    .close_activities {
        position: absolute;
        bottom: 1rem;
        @include cl;
    }
    p {
        margin-top: 2rem;
        line-height: .7rem;
        @include sc(.65rem, #fff);
    }
}

.confrim {
    position: fixed;
    bottom: 0;
    width: 100%;
    p {
        line-height: 2rem;
        @include sc(.75rem, #fff);
        background-color: #56d176;
        text-align: center;
    }
}
</style>