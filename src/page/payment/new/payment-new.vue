<template>
    <div class="page">
        <header-title header-title="收款" goback='true'></header-title>
        <section class="scroll_container paddingTop">
            <section class="m-form-list">
                <div class="h3">收款账户</div>
                <router-link :to="{ name: 'payment-account' }" class="item end">
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
                </router-link>
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
                <section>
                    <h2 class="title">错误</h2>
                    <p>{{message}}{{exceptionMessage}}</p>
                </section>
                <svg width="60" height="60" class="close_activities" @click.stop="showConfirmFun">
                    <circle cx="30" cy="30" r="25" stroke="#555" stroke-width="1" fill="none" />
                    <line x1="22" y1="38" x2="38" y2="22" style="stroke:#999;stroke-width:2" />
                    <line x1="22" y1="22" x2="38" y2="38" style="stroke:#999;stroke-width:2" />
                </svg>
            </section>
        </transition>
        <alert-tip v-if="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import headerTitle from 'src/components/header/header-title'
import loading from 'src/components/common/loading'
import alertTip from 'src/components/common/alert-tip'
import { apiCreateRecSettlement, } from 'src/service/getData'

export default {
    data() {
        return {
            recAccount: {},                         // 实际使用的账户模型
            recSettlement: null,
            money: 0,

            message: '',
            exceptionMessage: '',
            showConfirm: false,

            showAlert: false,
            alertText: null,
        }
    },
    created() {
        if (!this.curCustomer || !this.curCustomer.CustomerId) this.$router.push('/customer/search');
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
        async confirmRec() {
            if (this.money == 0) {
                return;
            }
            // 创建预收款单
            this.recSettlement = await apiCreateRecSettlement(
                this.userInfo.UserId,
                this.curCustomer.CustomerId,
                this.recAccount.Id,
                this.money,
                22020);

            // 预收款创建失败
            if (this.recSettlement.Message) {
                this.message = this.recSettlement.Message;
                this.exceptionMessage = this.recSettlement.ExceptionMessage;
                this.showConfirm = true;
                return;
            }

            // 非当面付银行账户，直接创建预收款单后退出
            if (!this.recAccount.IsFacePay) {
                this.showAlert = true;
                this.alertText = '收款成功!';
                return;
            }

            this.$router.push({ name: 'payment-online' });
        },
        closeTip() {
            this.$router.replace('/home');
        },
    }
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
</style>