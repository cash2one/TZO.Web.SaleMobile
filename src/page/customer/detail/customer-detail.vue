<template>
    <div class="page rating paddingTop">
        <header-title header-title="客户资料" goback='true'>
        </header-title>
        <section class="m-form-list">
            <div class="item start">
                <h2>{{customer.BizObj.Name}}</h2>
            </div>
            <div v-for="item in customer.BizObj.Phones" :key="item.id">
                <div class="item">
                    <p class="content">联系人：{{item.Contact}}</p>
                </div>
                <div class="item">
                    <p class="content">电话：{{item.PhoneNum}}</p>
                </div>
    
            </div>
            <div v-for="item in customer.BizObj.Addrs" :key="item.id">
                <div class="item">
                    <p class="content">地址：{{item.Addr}}</p>
                </div>
            </div>
            <div class="item">
                <p class="content">业务区域：{{customer.BizAreaName}}</p>
            </div>
            <div class="item">
                <p class="content">客户等级：{{customer.CustomerLevelName}}</p>
            </div>
            <div class="item">
                <p class="content">业务员：{{customer.EmployeeName}}</p>
            </div>
            <div class="item end">
                <p class="content">备注：{{customer.BizObj.Note}}</p>
            </div>
        </section>
        <section class="m-list" style="margin-top:.4rem">
            <div class="item start">
                <h2>信用信息</h2>
            </div>
            <div class="item" v-if="customerCredit.ChargeOffDay>0 &&customerCredit.BalanceDay>0">
                <p class="content">信用模式：信用卡模式</p>
                <p class="content">出账日（首月）：{{customerCredit.ChargeOffDay}}</p>
                <p class="content">结算日（末月）：{{customerCredit.BalanceDay}}</p>
                <p class="content">结算周期（月）：{{customerCredit.GapMonth}}</p>
            </div>
            <div class="item" v-else>
                <p class="content">信用模式：账期模式</p>
                <p class="content">账期天数：
                    <span v-if="customerCredit.UnlimitedDeadLine">无限账期</span>
                    <span v-else>{{customerCredit.DeadLine}}</span>
                </p>
            </div>
            <div class="item">
                <p class="content">信用额度：
                    <span v-if="customerCredit.UnlimitedCredit">无限额度</span>
                    <span v-else>{{customerCredit.CreditLimit}}</span>
                </p>   
            </div>
        </section>
        <section class="m-form-list">
            <router-link :to="customerWeChatstr" class="item start end">
                <h2>
                    <svg class="icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#weixin"></use>
                    </svg>
                    微信推广
                </h2>
                <div class="content">
                    <p></p>
                    <svg class="icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#chevron-right"></use>
                    </svg>
                </div>
            </router-link>
        </section>
    
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import headerTitle from 'src/components/header/header-title'
import { apiGetCustomer, apiGetCustomerCredit } from 'src/service/getData'
export default {
    data() {
        return {
            customerId: '', // 当前客户id   
            customer: {},     //当前客户信息    
            customerCredit: {},   //当前客户信用设置信息   
            customerWeChatstr: ""    //客户微信推广的页面路径    
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

    components: {
        headerTitle
    },
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';

</style>
