<template>
    <div class="rating_page">
        <header-title header-title="客户资料" goback='true'>
        </header-title>
        <section class="shop_status_info">
            <header>{{customer.BizObj.Name}}</header>
            <div v-for="item in customer.BizObj.Phones" :key="item.id">
            <p>联系人：{{item.Contact}}</p>
            <p>电话：{{item.PhoneNum}}</p>
            </div>
            <div v-for="item in customer.BizObj.Addrs" :key="item.id">
            <p>地址：{{item.Addr}}</p>
            </div>
            <p>业务区域：{{customer.BizAreaName}}</p>
            <p>客户等级：{{customer.CustomerLevelName}}</p>
            <p>业务员：{{customer.EmployeeName}}</p>
            <p>备注：{{customer.BizObj.Note}}</p>
            <!--<div v-if="customerCredit.ChargeOffDay>0 &&customerCredit.BalanceDay>0">
            <p>信用模式：信用卡模式</p>
            <p>出账日（首月）：{{customerCredit.ChargeOffDay}}</p>
            <p>结算日（末月）：{{customerCredit.BalanceDay}}</p>
            <p>结算周期（月）：{{customerCredit.GapMonth}}</p>
            </div>
            <div v-else>
            <p>信用模式：账期模式</p>
            <p>账期天数：<span v-if="customerCredit.UnlimitedDeadLine">无限账期</span><span v-else>{{customerCredit.DeadLine}}</span></p>         
            </div>
            <div>
            <p>信用额度：<span v-if="customerCredit.UnlimitedCredit">无限额度</span><span v-else>{{customerCredit.CreditLimit}}</span></p>
            </div>         -->
        </section>
        <section class="activities_container">
            <header>信用信息</header>
            <ul class="actibities_ul" v-if="customerCredit.ChargeOffDay>0 &&customerCredit.BalanceDay>0">              
                <li><span>信用模式：信用卡模式</span></li>
                <li><span>出账日（首月）：{{customerCredit.ChargeOffDay}}</span></li>
                <li><span>结算日（末月）：{{customerCredit.BalanceDay}}</span></li>
                <li><span>结算周期（月）：{{customerCredit.GapMonth}}</span></li>
            </ul>
            <ul class="actibities_ul"  v-else>
                <li><span>信用模式：账期模式</span></li>
                <li><span>账期天数：<span v-if="customerCredit.UnlimitedDeadLine">无限账期</span><span v-else>{{customerCredit.DeadLine}}</span></span></li>         
            </ul>          
            <ul class="actibities_ul">
                <li><span>信用额度：<span v-if="customerCredit.UnlimitedCredit">无限额度</span><span v-else>{{customerCredit.CreditLimit}}</span></span>
                </li>
            </ul>                                           
        </section>
        <section class="shop_status_container">
            <router-link :to="customerWeChatstr" class="shop_status_header">
                <span class="shop_detail_title">微信推广</span>
                <div>                  
                    <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow" >
                        <path d="M0 0 L8 7 L0 14"  stroke="#bbb" stroke-width="1.5" fill="none"/>
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
import { apiGetCustomer,apiGetCustomerCredit } from 'src/service/getData'
export default {
    data(){
            return{                
                customerId:'', // 当前客户id   
                customer:{},     //当前客户信息    
                customerCredit:{},   //当前客户信用设置信息   
                customerWeChatstr:""    //客户微信推广的页面路径    
            }
        },

        mounted(){
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
            this.customerWeChatstr="/customer/detail/"+this.customerId+"/we-chat";
        },

    components: {
        headerTitle
    },
}
</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
	
	.rating_page{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
        padding-top: 1.95rem;
		background-color: #ebebeb;
		z-index: 18;
	}
    .shop_status_info{
        background-color: #fff;
        margin-bottom: .4rem;
        header{
            line-height: 1.8rem;
            padding: 0 .6rem;
            @include sc(.75rem, #333);
            border-bottom: 0.025rem solid #f1f1f1;
        }
        p{
            @include sc(.6rem, #666);
            padding: .7rem .6rem .7rem 0;
            margin-left: .6rem;
            border-bottom: 0.025rem solid #f5f5f5;
        }
        span{
            color: #666;
        }
        p:nth-of-type(4), p:nth-of-type(5){
            display: flex;
            justify-content: space-between;
        }
    }
    .activities_container{
        background-color: #fff;
        margin: .4rem 0;
        padding-bottom: .6rem;
        header{
            @include sc(.75rem, #333);
            line-height: 1.8rem;
            padding-left: .6rem;
            border-bottom: 1px solid #f1f1f1;
            margin-bottom: .3rem;
        }
        .actibities_ul{
            padding: 0 .6rem;
            li{
                margin-bottom: .2rem;
                
                span:nth-of-type(1){
                    @include sc(.55rem, #666);
                }
            }
        }
    }
    .shop_status_container{
        background-color: #fff;
        margin-bottom: .4rem;
        .shop_status_header{
            display: flex;
            justify-content: space-between;
            align-items: center;
            line-height: 1.8rem;
            padding: 0 .6rem;
            border-bottom: 0.025rem solid #f1f1f1;
            .shop_detail_title{
                @include sc(.75rem, #333);
            }
            .identification_detail{
                @include sc(.7rem, #bbb);
                vertical-align: middle;
            }
            svg{
                @include wh(.6rem, .6rem);
                vertical-align: middle;
            }
        }
        .shop_statu_detail{
            display: flex;
            padding: .6rem;
            svg{
                @include wh(2rem, 2rem);
                margin-right: .6rem;
            }
            .check_date{
                span{
                    @include sc(.55rem, #666);
                }
                .shop_status_well{
                    color: rgb(126, 211, 33);
                }
                .shop_status_bad{
                    color: red;
                }
            }
        }
    }
    
    .license_container{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,.5);
        z-index: 101;
        img{
            width: 100%;
            @include center;
        }
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>
