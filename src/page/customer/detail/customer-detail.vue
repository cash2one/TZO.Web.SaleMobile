<template>
    <div class="page rating">
        <header-title header-title="客户资料" goback='true'></header-title>
        <section class="scroll_container paddingTop">
            <section class="m-form-list">
                <header>{{customer.BizObj.Name}}</header>
                <div v-for="(item,index) in customer.BizObj.Phones" :key="item.id" class="item" :class="{end:index==(customer.BizObj.Phones.length-1)}">
                    <h2>
                        {{item.Contact}}
                    </h2>
                    <div class="content">
                        <p>{{item.PhoneNum}}</p>
                        <svg class="icon" @click="bindWxOpenId(index)">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#weixin"></use>
                        </svg>
                    </div>
                </div>
                <div v-for="item in customer.BizObj.Addrs" :key="item.id" class="item start end">
                    <p>
                        地址:{{item.Addr}}
                    </p>
                </div>
                <div class="item start">
                    <h2>业务区域</h2>
                    <p>{{customer.BizAreaName}}</p>
                </div>
                <div class="item">
                    <h2>客户等级:</h2>
                    <p>{{customer.CustomerLevelName}}</p>
                </div>
                <div class="item">
                    <h2>业务员:</h2>
                    <p>{{customer.EmployeeName}}</p>
                </div>
                <div class="item end">
                    <h2>备注:</h2>
                    <p>{{customer.BizObj.Note}}</p>
                </div>
            </section>
            <section class="m-form-list">
                <div class="item start">
                    <h2>信用信息</h2>
                </div>
                <div v-if="customerCredit.ChargeOffDay>0 &&customerCredit.BalanceDay>0" class="item">
                    <div>
                        <p>
                            <span>信用模式:</span>
                            <span>信用卡模式</span>
                        </p>
                        <p>
                            <span>出账日（首月）:</span>
                            <span>{{customerCredit.ChargeOffDay}}</span>
                        </p>
                        <p>
                            <span>结算日（末月）:</span>
                            <span>{{customerCredit.BalanceDay}}</span>
                        </p>
                        <p>
                            <span>结算周期（月）:</span>
                            <span>{{customerCredit.GapMonth}}</span>
                        </p>
                    </div>
                </div>
                <div v-else class="item">
                    <div>
                        <p>
                            <span>信用模式:</span>
                            <span>账期模式</span>
                        </p>
                        <p>
                            <span>账期天数:</span>
                            <span>
                                <span v-if="customerCredit.UnlimitedDeadLine">无限账期</span>
                                <span v-else>{{customerCredit.DeadLine}}</span>
                            </span>
                        </p>
                    </div>
                </div>
                <div class="item end">
                    <h2>
                        信用额度
                    </h2>
                    <div class="content">
                        <p class="money" v-if="customerCredit.UnlimitedCredit">无限额度</p>
                        <p v-else>
                            <span class="money">{{customerCredit.CreditLimit}}</span>
                        </p>
                    </div>
                </div>
            </section>
            <br>
            <br>
            <br>
            <br>
        </section>
        <section class="confirm_order" @click="getGpsCoordinates()">
            <p>重定位</p>
        </section>
        <alert-tip v-if="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
        <transition name="fade">
            <section class="confirm_details" v-if="showConfirm">
                <section class="m-form-list">
                    <section class="item">
                        <img :src="qrcodeImg.Url" />
                    </section>
                    <section class="item">
                        <h3>请使用微信扫一扫绑定。</h3>
                        <div class="content">
                            {{qrcodeImg.Time}}前有效。
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
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import headerTitle from 'src/components/header/header-title'
import alertTip from 'src/components/common/alert-tip'
import {
    apiGetCustomer,
    apiGetCustomerCredit,
    apiEditCustomer,
    apiGetWeChatSubscriptionQrCode,
    apiUpdateGPSLaction,
} from 'src/service/getData'

export default {
    data() {
        return {
            customerId: '', // 当前客户id   
            customer: {},     //当前客户信息    
            customerCredit: {},   //当前客户信用设置信息   
            customerWeChatstr: "",    //客户微信推广的页面路径   

            showConfirm: false,
            qrcodeImg: {},           // 微信二维码 图片 和过期时间

            showAlert: false,
            alertText: null,
        }
    },

    mounted() {
        this.customerId = this.$route.params.customerId;

        //获取当前客户信息
        apiGetCustomer(this.customerId).then(res => {
            this.customer = res;
        })
        //获取当前客户信用设置信息
        apiGetCustomerCredit(this.customerId).then(res => {
            this.customerCredit = res;
        })

        //赋值客户微信推广的页面路径 
        this.customerWeChatstr = "/customer/detail/" + this.customerId + "/we-chat";
    },
    methods: {
        async bindWxOpenId(index) {
            for (var i = 0; i < this.customer.BizObj.Phones.length; i++) {
                var item = this.customer.BizObj.Phones[i];
                item.WeixinOpenId = '';
                if (i == index) {
                    item.WeixinOpenId = 'ingatek';
                }
            }
            await apiEditCustomer(this.customer);

            this.qrcodeImg = await apiGetWeChatSubscriptionQrCode(this.customerId);

            this.toggleConfirm();
        },
        toggleConfirm() {
            this.showConfirm = !this.showConfirm;
        },
        async getGpsCoordinates() {

            // 未获取到地理位置信息
            if (this.latitude == 0 || this.longitude == 0) {
                this.alertText = '重定位失败:未获取到您所在的地理位置，请重试!';
                this.showAlert = true;
                return;
            }

            let rel = await apiUpdateGPSLaction(this.curCustomer.CustomerId, this.latitude, this.longitude);
            console.log(rel);
            if (rel) {
                this.alertText = '重定位成功!';
            } else {
                this.alertText = '重定位失败:提交数据失败，请重试!';
            }
            this.showAlert = true;
        },
        closeTip() {
            this.showAlert = false;
        },
    },
    components: {
        headerTitle,
        alertTip,
    },
    computed: {
        ...mapState([
            'curCustomer',
            'latitude', 				// 当前位置纬度
            'longitude', 				// 当前位置经度
        ]),
    }
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

    img {
        width: 100%;
    }
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
</style>
