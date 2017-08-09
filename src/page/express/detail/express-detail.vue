<template>
    <section class="page">
        <header-title header-title="发货明细" goback="true"></header-title>
        <section v-if="!showLoading" class="scroll_container paddingTop">
            <section class="m-form-list">
                <header class="item start">
                    {{bill.CustomerName}}
                </header>
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
            <section class="m-list">
                <header>商品信息</header>
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
            <section class="confrim" @click="confrim">
                <p>确认发货</p>
            </section>
            <br />
            <br />
            <br />
            <br />
        </section>
        <transition name="router-slid" mode="out-in">
            <div v-if="showExpress" class="page rating">
                <header class="header_title">
                    <section class="header_title_goback" @click="showExprerssPage">
                        <svg class="icon">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#chevron-left"></use>
                        </svg>
                    </section>
                    <section class="title_head ellipsis">
                        <h2>
                            <strong>选择物流</strong>
                        </h2>
                    </section>
                </header>
                <section class="scroll_container paddingTop">
                    <section class="m-list">
                        <header>物流</header>
                        <section class="item" v-for="item in expressCorpsList" :key="item.Id" @click="chooseExpress(item)">
                            <section v-if="express.LogisticsCorpId==item.Id" class="item-left">
                                <svg class="icon">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
                                </svg>
                            </section>
                            <section v-else class="item-left"></section>
                            <section class="item-right">
                                <section class="title">
                                    <h3 class="name">
                                        <strong>{{item.Name}}</strong>
                                    </h3>
                                    <span v-if="item.IsCollect" class="number">
                                        可代收
                                    </span>
                                </section>
                                <section v-if="item.Phone" class="content">
                                    <p>联系电话：{{item.Phone}}</p>
                                </section>
                            </section>
                        </section>
                    </section>
                </section>
            </div>
            <div v-if="showShippers" class="page rating">
                <header class="header_title">
                    <section class="header_title_goback" @click="showShippersPage">
                        <svg class="icon">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#chevron-left"></use>
                        </svg>
                    </section>
                    <section class="title_head ellipsis">
                        <h2>
                            <strong>添加发货人</strong>
                        </h2>
                    </section>
                </header>
                <section class="scroll_container paddingTop">
                    <section class="m-list">
                        <header>发货人员</header>
                        <section class="item" v-for="item in shipperList" :key="item.Id" @click="chooseShipper(item)">
                            <section v-if="item.checked" class="item-left">
                                <svg class="icon">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
                                </svg>
                            </section>
                            <section v-else class="item-left"></section>
                            <section class="item-right">
                                <section class="title">
                                    <h3 class="name">
                                        {{item.Name}}
                                    </h3>
                                    <input type="text" class="money" v-model="item.workload" />
                                </section>
                            </section>
                        </section>
                    </section>
                </section>
            </div>
        </transition>
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
        <loading v-if="showLoading"></loading>
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
            showExpress: false,
            showShippers: false,
            showError: false,
            bill: null,
            express: null,
            expressCorpsList: [],
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

            this.shipperList = this.employeeList;

            let shipper = this.shipperList.find((val) => {
                return val.Id == this.userInfo.UserId;
            });
            shipper.checked = true;
            shipper.workload = this.bill.GoodsTotalNum;

            this.initExpress();

            this.showLoading = false;
        },
        async initExpress() {
            let res;

            if (this.express.CollectCost == 1)
                res = await apiGetExpressCorps(true);
            else
                res = await apiGetExpressCorps();

            this.expressCorpsList = res.Items;
        },
        showExprerssPage() {
            if (this.express.ShipType == 1)
                this.showExpress = !this.showExpress;
        },
        showShippersPage() {
            this.showShippers = !this.showShippers;
        },
        chooseExpress(express) {
            this.express.LogisticsCorpId = express.Id;
            this.express.LogisticsCorpName = express.Name;
        },
        chooseShipper(item) {
            item.checked = !item.checked;
            this.shipperList = [...this.shipperList];
        },
        async confrim() {

            let shippers = this.shipperList.filter((val) => { return val.checked });
            shippers = shippers.map((val) => {
                return { Shipper: val.Id, Workload: val.workload };
            });

            this.express.Shippers = shippers;

            let res = await apiSaveExpress(this.express);
            if (res.Id)
                await apiSendOutExpress(res.Id);

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

.m-list {
    .item {
        @include fj();

        .detail {
            line-height: 1.5rem;
        }
        .item-left {
            width: .8rem;
            .icon {
                @include wh(.8rem, .8rem);
                fill: #4cd964;
                @include ct;
            }
        }
        .item-right {
            flex: auto;
            padding-left: .275rem;
            .number {
                font-size: .55rem;
            }
            .money {
                width: 2rem;
                text-align: right;
            }
        }
    }
    .item>.title {
        flex: auto;
        display: block;
        width: 8rem;
    }
}

.m-form-list {
    header {
        background-color: $background-light-color;
        padding: .55rem;
        @include sc(.8rem, $font-color);
    }
    .item.end {
        h3 {
            width: 6rem;
        }
    }
    .item {
        .input-text {
            text-align: right;
            font-size: .65rem;
        }
    }
}

.container_style {
    background-color: #fff;
    margin-top: .4rem;
    padding: 0 .7rem;
}

.delivery_model {
    border-left: .2rem solid $blue;
    @include indent10;
    min-height: 4rem;
    @include fj;
    align-items: center;
    .deliver_time {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        p:nth-of-type(1) {
            @include sc(.7rem, $blue);
        }
        p:nth-of-type(2) {
            @include sc(.55rem, #fff);
            background-color: $blue;
            width: 2.4rem;
            margin-top: .5rem;
            text-align: center;
            border-radius: 0.12rem;
            padding: .1rem;
        }
    }
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
    height: 2rem;
    p {
        line-height: 2rem;
        @include sc(.75rem, #fff);
        background-color: #56d176;
        text-align: center;
    }
}
</style>