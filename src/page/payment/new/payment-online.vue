<template>
    <section class="page rating">
        <section v-if="!showLoading" class="confirm_details">
            <section class="m-form-list">
                <section class="item">
                    <!-- 微信-收款码 -->
                    <img :src="qrcodeImg" v-if="facePayModel.PayData && facePayModel.PayData.qrcode_url_pem" />
                    <svg v-if="!facePayModel.PayData || !facePayModel.PayData.qrcode_url_pem" @click="openCamera" class="scan" style="" viewBox="0 0 1304 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <path d="M1272.242424 558.545455 31.030303 558.545455C21.612606 558.545455 0 536.932848 0 527.515152L0 496.484848C0 487.051636 21.612606 465.454545 31.030303 465.454545L1272.242424 465.454545C1281.660121 465.454545 1303.272727 487.051636 1303.272727 496.484848L1303.272727 527.515152C1303.272727 537.196606 1281.675636 560.003879 1272.242424 558.545455ZM1086.060606 140.132848C1086.060606 108.544 1055.588848 77.575758 1023.534545 77.575758 969.293576 77.575758 884.875636 77.575758 791.272727 77.575758L791.272727 0 992.969697 0C1093.833697 0.093091 1164.132848 56.909576 1163.636364 155.151515L1163.636364 372.363636 1086.060606 372.363636C1086.060606 278.450424 1086.060606 194.249697 1086.060606 140.132848ZM217.212121 139.636364C217.212121 190.324364 217.212121 275.688727 217.212121 372.363636L139.636364 372.363636 139.636364 155.151515C139.636364 56.894061 196.499394 0 294.787879 0L512 0 512 77.575758C412.889212 77.575758 326.531879 77.575758 279.272727 77.575758 247.77697 77.575758 217.212121 108.931879 217.212121 139.636364ZM217.212121 884.658424C217.212121 914.556121 247.637333 946.424242 280.777697 946.424242 334.925576 946.424242 418.676364 946.424242 512 946.424242L512 1024 279.272727 1024C180.999758 1024 139.636364 967.121455 139.636364 868.848485L139.636364 651.636364 217.212121 651.636364C217.212121 745.813333 217.212121 830.49503 217.212121 884.658424ZM1086.060606 883.913697C1086.060606 829.812364 1086.060606 745.580606 1086.060606 651.636364L1163.636364 651.636364 1163.636364 868.848485C1163.729455 967.121455 1107.192242 1023.937939 1008.484848 1024L791.272727 1024 791.272727 946.424242C884.984242 946.424242 969.045333 946.424242 1023.162182 946.424242 1055.666424 946.424242 1086.060606 915.269818 1086.060606 883.913697Z" fill="#3f81c1" />
                    </svg>
                </section>
                <section class="item">
                    <h3>{{userInfo.CorpFullName}}</h3>
                    <div class="content">
                        <p v-if="QrCodePay">{{facePayModel.PayData.expire_time}}前有效</p>
                        <p v-if="FacePay">{{facePayModel.PayData.auth_code}}</p>
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
                <section class="item" v-if="message">
                    <h3>
                        <span class="red">{{message}}</span>
                    </h3>
                </section>
            </section>
            <svg width="60" height="60" class="close_activities" @click.stop="closePayment">
                <circle cx="30" cy="30" r="25" stroke="#555" stroke-width="1" fill="none" />
                <line x1="22" y1="38" x2="38" y2="22" style="stroke:#999;stroke-width:2" />
                <line x1="22" y1="22" x2="38" y2="38" style="stroke:#999;stroke-width:2" />
            </svg>

        </section>
        <alert-tip v-if="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
    </section>
</template>
<script>
import { mapState } from 'vuex'
import loading from 'src/components/common/loading'
import alertTip from 'src/components/common/alert-tip'
import wx from 'weixin-js-sdk'
import {
    apiProcessPay,
    apiGetPaymentsDetail,
    apiPay,
    apiDeleteRecSettlement,
} from 'src/service/getData'

export default {
    data() {
        return {
            recAccount: null,
            recSettlement: null,

            qrcodeImg: '',
            auth_code: '',
            facePayModel: {},                        // 当面付支付模型
            message: '',

            timer: null,
            showLoading: true,

            showAlert: false,
            alertText: null,
        }
    },
    mounted() {
        this.initData();
    },
    destroyed() {
        if (this.facePayModel.Order.PayJournalId)
            apiGetPaymentsDetail(this.facePayModel.Order.PayJournalId).then(res => {
                if (res.Status != 1)
                    apiDeleteRecSettlement(this.recSettlement.Id);
            });
        clearTimeout(this.timer);
    },
    components: {
        loading,
        alertTip,
    },
    computed: {
        ...mapState([
            'userInfo',
            'curCustomer'
        ]),
        QrCodePay: function() {
            let provider = this.recAccount.PaymentsProvider;
            if (provider == 'Payments-Heepay-WechatQrCodePay') return true;
            if (provider == 'Payments-Heepay-AliQrCodePay') return true;
            return false;
        },
        FacePay: function() {
            let provider = this.recAccount.PaymentsProvider;
            if (provider == 'Payments-Heepay-WechatFacePay') return true;
            if (provider == 'Payments-Heepay-AliFacePay') return true;
            return false;
        },
    },
    methods: {
        async initData() {
            this.recAccount = this.$parent.recAccount;
            this.recSettlement = this.$parent.recSettlement;

            // 创建支付流水
            this.facePayModel = await apiProcessPay(
                this.recAccount.PaymentsProvider,
                this.recAccount.Id,
                this.recSettlement.Id,
                this.recSettlement.BillNo,
                22020,
                this.recSettlement.Money,
                this.curCustomer.CustomerId);

            this.autoQueryPaymentsStatus(this.facePayModel.Order.PayJournalId);

            if (this.facePayModel.PayData.qrcode_url_pem)
                this.qrcodeImg = "data:image/png;base64," + this.facePayModel.PayData.qrcode_url_pem;
            else
                this.openCamera();

            this.showLoading = false;
        },
        async closePayment() {
            this.$router.go(-1);
        },
        openCamera() {
            let self = this;
            // 调用相机
            wx.scanQRCode({
                desc: 'scanQRCode desc',
                needResult: 1,
                scanType: ['qrCode', 'barCode'],
                success: function(res) {
                    self.auth_code = res.resultStr;
                },
                error: function(err) {
                    if (data.errMsg.indexOf('function_not_exist'))
                        this.alert('微信版本过低，请升级微信版本!')
                }
            });
        },
        // 轮询支付流水状态
        async autoQueryPaymentsStatus(journalId) {
            let res = await this.queryPaymentsStatus(journalId);
            if (!res)
                this.timer = setTimeout(() => this.autoQueryPaymentsStatus(journalId), 1000 * 10);
            else
                {
                     this.alert('支付成功!');
                }
        },
        // 查询支付流水状态
        async queryPaymentsStatus(journalId) {
            let rel = await apiGetPaymentsDetail(journalId);
            if (rel.Status == 0) this.message = '未支付!';
            if (rel.Status == 1) {
                this.alert('支付成功!');
                return true;
            }
            return false;
        },
        alert(msg) {
            this.showAlert = true;
            this.alertText = msg;
        },
        closeTip() {
            this.$router.replace('/home');
        },
    },
    watch: {
        auth_code: function(val) {
            this.facePayModel.PayData.auth_code = val;

            apiPay(this.facePayModel).then(res => {
                // 服务器返回错误
                if (res.ExceptionMessage == 'Repeat authcode submit') {
                    this.queryPaymentsStatus(this.facePayModel.Order.PayJournalId);
                } else {
                    this.message = res.Message;
                }
            });
        },
    },
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';

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

    .scan {
        width: 100%;
        height: 5rem;
        padding: .55rem;
    }
    img {
        width: 100%;
    }
}
</style>


