<template>
    <div class="page">
        <header-title header-title="收款" goback='true'></header-title>
        <section v-if="!showLoading" class="scroll_container paddingTop">
            <section class="m-form-list" v-if="!showSelectRecAccountDiv">
                <header>收款账户</header>
                <section class="item" @click="toggleAccountList">
                    <h2>
                        {{recAccount.Name}}
                    </h2>
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
                <header>收款金额</header>
                <section class="item">
                    <section class="item-left">￥</section>
                    <section class="item-right">
                        <section class="title">
                            <input type="number" class="money" v-model="money" min="0" />
                        </section>
                    </section>
                </section>
            </section>
            <section class="confirm_order">
                <p @click="confirmRec">确认收款</p>
            </section>
        </section>
        <transition name="fade">
            <section class="confirm_details" v-if="showConfirm">
                <section class="m-form-list">
                    <section class="item" @click="openCamera">
                        <!-- 微信-收款码 -->
                        <img :src="qrcodeImg" v-if="facePayModel.PayData && facePayModel.PayData.qrcode_url_pem" />
                        <img src="../../../images/camera.png" v-if="!facePayModel.PayData || !facePayModel.PayData.qrcode_url_pem" />
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
                            <span class="error">{{Message}}</span>
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
            <div class="page" v-if="showSelectRecAccountDiv">
                <section class="scroll_container paddingTop">
                    <section class="m-list">
                        <header>现金账户</header>
                        <section class="item" v-for="item in cash" :key="item.Id" @click="tempRecAccount = item">
                            <section v-if="tempRecAccount.Id==item.Id" class="item-left">
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
                                </section>
                            </section>
                        </section>
                        <header>银行账户</header>
                        <section class="item" v-for="item in bank" :key="item.Id" @click="tempRecAccount = item">
                            <section v-if="tempRecAccount.Id==item.Id" class="item-left">
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
                                </section>
                            </section>
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

            // 服务器500错误
            if (rel.Message) {
                this.Message = rel.Message;
                return;
            }

            // 服务器返回200,但实际支付未成功之前
            if (rel.status == 500 && rel.data.ExceptionMessage == 'Repeat authcode submit') {
                setTimeout(() => this.queryPaymentsJournalDetail(), 1000 * 5);
                return;
            } else {
                this.Message = '';
                this.showAlert = true;
                this.alertText = '支付成功!';
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
                this.queryPaymentsJournalDetail();
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
                } else {
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
            // 非扫码收款直接返回
            if (this.recAccount.PaymentsProvider == 'Payments-Heepay-WechatQrCodePay' ||
                this.recAccount.PaymentsProvider == 'Payments-Heepay-AliQrCodePay')
                return;

            // // 调用相机
            // var scan = () => wx.scanQRCode({
            //     desc: 'scanQRCode desc',
            //     needResult: 1,
            //     scanType: ['qrCode', 'barCode'],
            // }).then(data => {
            //     if (data.errMsg.indexOf('function_not_exist')) {
            //         this.showAlert = true;
            //         this.alertText = '微信版本过低，请升级微信版本!';
            //         return;
            //     }

            //     this.facePayModel.PayData.auth_code = res.resultStr;
            //     this.pay();
            // });

            // scan();

            // // 以下2句为调试代码
            // this.facePayModel.PayData.auth_code = '130840797904361222';
            // this.pay();
        },
    }
}
</script>
<style lang="scss" scoped>
@import '../../order/order';

.page {
    .m-form-list {
        header {
            padding: .1375rem .275rem;
            font-size: 0.65rem;
            color: #666;
        }
    }

    .item {
        .item-left {
            margin-top: .55rem;
            font-size: .8rem;
        }
        .item-right {
            .title {
                .money {
                    font-size: 1.3rem;
                }
                p {
                    margin-top: .275rem;
                }
            }
        }
    }

    .confirm_order {
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

        .m-form-list {
            .item {
                img {
                    width: 100%;
                    height: 10rem;
                }
                .error {
                    color: $red;
                }
            }
        }
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0;
    }
}
</style>