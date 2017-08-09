<template>
    <div class="page rating">
        <header-title header-title="送货明细" goback="true"></header-title>
        <section v-if="!showLoading" class="scroll_container paddingTop">
            <section class="m-list">
                <header>
                    {{bill.CustomerName}}[{{bill.BillNo}}]
                    <span :class="{money:express.LogisticsStatus==2,number:express.LogisticsStatus==3}">{{express.LogisticsStatusName}}</span>
                </header>
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
            <section v-if="express.LogisticsStatus==2" class="confrim" @click="confrim">
                <p>确认送货</p>
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
        <loading v-if="showLoading"></loading>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import headerTitle from 'src/components/header/header-title'
import loading from 'src/components/common/loading'
import { apiGetExpress, apiGetDeal, apiSaveExpress, apiSendOutExpress } from 'src/service/getData'

export default {
    data() {
        return {
            showLoading: true,
            showError: false,
            bill: null,
            express: null,
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
            'userInfo'
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

            this.express.Shippers.push({ Shipper: this.userInfo.UserId, Workload: this.bill.GoodsTotalNum });

            this.showLoading = false;
        },
        async confrim() {

            let res = await apiSaveExpress(this.express);
            if (res.Id)
                await apiSendOutExpress(res.Id);

            if (res.Message) {
                this.showError = true;
                this.message = res.Message;
                this.exceptionMessage = res.ExceptionMessage;
            }
            else
                this.$router.replace('/delivery');
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
    header {
        @include fj();
        span {
            font-size: .55rem;
        }
    }
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