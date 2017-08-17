<template>
    <div class="page">
        <header-title header-title="收款" goback='true'></header-title>
        <section v-if="!showLoading" class="scroll_container paddingTop">
            <section class="m-form-list" v-if="!showSelectRecAccountDiv">
                <div class="h3">收款账户</div>
                <section class="item end" @click="toggleAccountList">
                    <h2>{{recAccount.Name}}</h2>
                    <div class="content">
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="50" height="14" style="margin-bottom: -0.08rem;" v-if="recAccount.IsFacePay">
                                <polygon points="0,14 4,0 44,0 40,14" style="fill:none;stroke:#FF6000;stroke-width:1" />
                                <line x1="1.5" y1="12" x2="40" y2="12" style="stroke:#FF6000;stroke-width:1.5" />
                                <text x="3.5" y="9" style="fill:#FF6000;font-size:10;font-weight:bold;">当面付</text>
                            </svg>
                        </p>
                        <svg class="icon">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#chevron-right"></use>
                        </svg>
                    </div>
                </section>
                <div class="h3">收款金额</div>
                <section class="input_remark quick_remark">
                    <h2>￥</h2>
                    <input type="number" class="input_text money" v-model="money" min="0" />
                </section>
            </section>
            <div class="determine" @click="confirmRec">确认收款</div>
        </section>
        <transition name="fade">
            <section class="confirm_details" v-if="showConfirm">
                <section class="m-form-list">
                    <section class="item">
                        <!-- 微信-收款码 -->
                        <img :src="qrcodeImg" v-if="facePayModel.PayData && facePayModel.PayData.qrcode_url_pem" />
                        <img src="../../../images/camera.png" v-if="!facePayModel.PayData || !facePayModel.PayData.qrcode_url_pem" @click="openCamera" />
                    </section>
                    <section class="item">
                        <h3>{{userInfo.CorpFullName}}</h3>
                        <div class="content">
                            <p v-if="recAccount.PaymentsProvider=='Payments-Heepay-WechatQrCodePay' || recAccount.PaymentsProvider=='Payments-Heepay-AliQrCodePay'">{{facePayModel.PayData.expire_time}}前有效</p>
                            <p v-if="recAccount.PaymentsProvider=='Payments-Heepay-WechatFacePay' || recAccount.PaymentsProvider=='Payments-Heepay-AliFacePay'">{{facePayModel.PayData.auth_code}}</p>
                        </div>
                    </section>
                    <section class="item">
                        <h3> {{facePayModel.Order.BillNo}}</h3>
                        <div class="content">
                            <p>
                                <span v-if="recAccount.PaymentsProvider=='Payments-Heepay-WechatQrCodePay'">
                                    微信
                                </span>
                                <span v-if="recAccount.PaymentsProvider=='Payments-Heepay-AliQrCodePay'">
                                    支付宝
                                </span>
                                <span v-if="recAccount.PaymentsProvider=='Payments-Heepay-WechatFacePay'">
                                    微信
                                </span>
                                <span v-if="recAccount.PaymentsProvider=='Payments-Heepay-AliFacePay'">
                                    支付宝
                                </span>
                                <span class="money">
                                    ￥{{facePayModel.Order.Money}}
                                </span>
                            </p>
                        </div>
                    </section>
                    <section class="item" v-if="Message">
                        <h3>
                            <span class="red">{{Message}}</span>
                        </h3>
                        <div class="content" @click="queryPaymentsDetail">
                            <p>
                                查询
                            </p>
                        </div>
                    </section>
                </section>
                <svg width="60" height="60" class="close_activities" @click.stop="toggleConfirm">
                    <circle cx="30" cy="30" r="25" stroke="#555" stroke-width="1" fill="none" />
                    <line x1="22" y1="38" x2="38" y2="22" style="stroke:#999;stroke-width:2" />
                    <line x1="22" y1="22" x2="38" y2="38" style="stroke:#999;stroke-width:2" />
                </svg>
            </section>
        </transition>
        <loading v-if="showLoading"></loading>
        <alert-tip v-if="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
        <transition name="router-slid" mode="out-in">
            <div class="page rating" v-if="showSelectRecAccountDiv">
                <header class="header_title">
                    <section class="header_title_goback" @click="toggleAccountList()">
                        <svg class="icon">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#chevron-left"></use>
                        </svg>
                    </section>
                    <section class="title_head ellipsis">
                        <h2>
                            <strong>选择账户</strong>
                        </h2>
                    </section>
                </header>
                <section class="scroll_container paddingTop">
                    <section class="m-form-list">
                        <div class="h3">现金账户</div>
                        <section class="item" v-for="item in cash" :key="item.Id" @click="tempRecAccount = item">
                            <h2>
                                <svg v-if="tempRecAccount.Id==item.Id" class="icon">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
                                </svg>
                                <section v-else class="icon"></section>
                                <p>{{item.Name}}</p>
                            </h2>
                        </section>
                        <div class="h3">银行账户</div>
                        <section class="item" v-for="item in bank" :key="item.Id" @click="tempRecAccount = item">
                            <h2>
                                <svg v-if="tempRecAccount.Id==item.Id" class="icon">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
                                </svg>
                                <section v-else class="icon"></section>
                                <p>{{item.Name}}</p>
                            </h2>
                        </section>
                    </section>
                    <br>
                    <br>
                    <br>
                    <br>
                    <section class="confirm_order">
                        <p @click="confirmRecAccount">确认</p>
                    </section>
                </section>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import headerTitle from 'src/components/header/header-title'
import loading from 'src/components/common/loading'
import alertTip from 'src/components/common/alert-tip'
import wx from 'weixin-js-sdk'

import {
    apiGetRecPayAccountList,
    apiCreateRecSettlement,
    apiProcessPay,
    apiGetPaymentsDetail,
    apiGetPaymentsJournalDetail,
    apiPay,
    apiDeleteRecSettlement,
} from 'src/service/getData'

export default {
    data() {
        return {
            recAccount: {},                         // 实际使用的账户模型
            tempRecAccount: {},                     // 收款账户列表选择的
            billId: 0,
            billNo: '',
            bizType: 0,
            money: 0,

            qrcodeImg: '',
            facePayModel: {},                        // 当面付支付模型

            auth_code: '',

            cash: [],
            bank: [],

            showLoading: true,               // 显示加载动画
            showSelectRecAccountDiv: false,   // 是否显示收款

            showConfirm: false,
            Message: '订单未支付!',
            ExceptionMessage: '',

            showAlert: false,
            alertText: null,
        }
    },
    created() {
        if (!this.curCustomer || !this.curCustomer.CustomerId) this.$router.push('/customer/search');
    },
    mounted() {
        this.initData();
    },
    computed: {
        ...mapState([
            'userInfo',
            'curCustomer'
        ]),
    },
    components: {
        headerTitle,
        loading,
        alertTip,
    },
    methods: {
        async initData() {
            // 收款账户
            let res = await apiGetRecPayAccountList();
            res.Items.forEach(item => {
                if (item.AccountType == 1) {
                    this.cash.push(item);
                    // 默认现金，后期可以记录上次使用的
                    if (item.IsDefault == true) {
                        this.recAccount = item;
                    }
                } else {
                    this.bank.push(item);
                }
            });

            this.showLoading = false;
        },
        // 创建预收款单
        async createPreRecSettlement() {
            return await apiCreateRecSettlement(this.userInfo.UserId, this.curCustomer.CustomerId, this.recAccount.Id, this.money, 22020);
        },
        // 创建收款单
        async createRecSettlement() {
            return await apiCreateRecSettlement(this.userInfo.UserId, this.curCustomer.CustomerId, this.recAccount.Id, this.money, 12010);
        },
        // 创建支付数据依赖的数据
        async creatProcessPayModel() {
            return await apiProcessPay(this.recAccount.PaymentsProvider, this.recAccount.Id, this.billId, this.billNo, this.bizType, this.money, this.curCustomer.CustomerId);
        },
        // 扫码付发起支付
        async pay() {

            let rel = await apiPay(this.facePayModel);

            try {
                // 服务器返回错误
                if (rel.ExceptionMessage == 'Repeat authcode submit') {
                    this.queryPaymentsJournalDetail();
                    return;
                } else {
                    this.Message = rel.Message;
                }
            } catch (error) {
                throw new Error(error);
            }
        },
        // 查询支付流水情况
        async queryPaymentsJournalDetail() {
            let rel = await apiGetPaymentsJournalDetail(this.facePayModel.Order.PayJournalId);
            if (rel.Status == 1) {
                this.queryPaymentsJournalDetail = null;
                this.Message = '';
                this.showAlert = true;
                this.alertText = '支付成功!';
            } else if (rel.Status == 0) {
                this.Message = '支付失败，错误信息：支付超时!';
            } else {
                // 继续轮询
                setTimeout(() => this.queryPaymentsJournalDetail(), 1000 * 10);
            }
        },
        // 查询支付状态
        async queryPaymentsDetail() {
            let rel = await apiGetPaymentsDetail(this.facePayModel.Order.PayJournalId);
            if (rel.Status == 1) {
                this.Message = '';
                this.showAlert = true;
                this.alertText = '支付成功!';
            } else {
                this.Message = '订单未支付!';
            }
        },
        async confirmRec() {
            if (this.money == 0) {
                return;
            }
            // 创建预收款单
            let recSettlementOrder = await this.createPreRecSettlement();
            if (recSettlementOrder.Message) {
                this.Message = recSettlementOrder.Message;
                this.ExceptionMessage = recSettlementOrder.ExceptionMessage;
                this.showConfirm = true;
                return;
            } else {
                this.Message = '订单未支付!',
                this.billId = recSettlementOrder.Id;
                this.billNo = recSettlementOrder.BillNo;
                this.bizType = 22020;
            }

            // 非当面付银行账户，直接创建预收款单后退出
            if (!this.recAccount.IsFacePay) {
                this.showAlert = true;
                this.alertText = '收款成功!';
                return;
            } else {
                // 创建支付流水
                this.facePayModel = await this.creatProcessPayModel();

                if (this.facePayModel.PayData && this.facePayModel.PayData.qrcode_url_pem) {
                    this.qrcodeImg = "data:image/png;base64," + this.facePayModel.PayData.qrcode_url_pem;
                    this.queryPaymentsJournalDetail();
                } else {
                    this.facePayModel.PayData = {};
                    this.openCamera();
                }

                this.showConfirm = true;
            }
        },
        toggleAccountList() {
            this.tempRecAccount = this.recAccount;
            this.showSelectRecAccountDiv = !this.showSelectRecAccountDiv;
        },
        confirmRecAccount() {
            this.recAccount = this.tempRecAccount;
            this.toggleAccountList();
        },
        async toggleConfirm() {
            this.showConfirm = !this.showConfirm;

            if (!this.showConfirm) {
                let rel = await apiGetPaymentsDetail(this.facePayModel.Order.PayJournalId);
                if (rel.Status != 1)
                    apiDeleteRecSettlement(this.billId);
            }
        },
        closeTip() {
            this.$router.push('/home');
        },
        openCamera() {
            let self = this;
            // 调用相机
            wx.scanQRCode({
                desc: 'scanQRCode desc',
                needResult: 1,
                scanType: ['qrCode', 'barCode'],
                success: function (res) {
                    self.auth_code = res.resultStr;
                },
                error: function (err) {
                    if (data.errMsg.indexOf('function_not_exist')) {
                        this.showAlert = true;
                        this.alertText = '微信版本过低，请升级微信版本!';
                    }
                }
            });
        },
    },
    watch: {
        auth_code: function (val) {
            this.facePayModel.PayData.auth_code = val;
            this.pay();
        },
    },
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';

.input_remark {
    background-color: $background-light-color;
    .input_text {
        width: 100%;
        background-color: $background-color;
        border: 1px solid $border-color;
        resize: none;
        min-height: 4.5rem;
        border-radius: .2rem;
        @include sc(2rem, $red);
        @include indent10;
        text-align: right;
    }
}

.quick_remark {
    background-color: #fff;
    padding: 0 .55rem 1rem;
}

.determine {
    background-color: #4cd964;
    @include sc(.7rem, #fff);
    text-align: center;
    margin: 0.5rem .7rem;
    line-height: 1.8rem;
    border-radius: 0.2rem;
}

.confirm_order {
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

.confirm_details {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #262626;
    z-index: 200;
    padding: 1.25rem;

    .close_activities {
        position: absolute;
        bottom: 1rem;
        @include cl;
    }

    img {
        width: 100%;
    }
}
</style>