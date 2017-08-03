<template>
    <header v-if="curCustomer.CustomerId" id='header_customer' class="customer_detail_header" ref="customerheader">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position:absolute;width:0;height:0">
            <defs>
                <symbol viewBox="0 0 24 24" id="header_signIn">
                    <path fill="#fff" d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" />
                </symbol>
                <symbol viewBox="0 0 24 24" id="header_signInActive">
                    <path fill="#000000" d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                </symbol>
            </defs>
        </svg>
        <!-- <img :src="imgBaseUrl+'/images/customer/'+ curCustomer.CoustomerId +'.jpg'" class="header_cover_img"> -->
        <section class="description_header">
            <section class="description_top">
                <section class="description_left">
                    <!-- <img :src="imgBaseUrl+'/images/customer/'+ curCustomer.CoustomerId +'.jpg'" onerror="this.onerror=null;this.src='/images/account-card-details.svg'"> -->
                    <svg class="icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#customerAvatar"></use>
                    </svg>
                </section>
                <router-link :to="'/customer/detail/'+curCustomer.CustomerId" class="description_right">
                    <h2 class="description_title ellipsis">
                        <strong>{{curCustomer.BizObj.Name}}</strong>
                    </h2>
                    <p>{{curCustomer.CustomerLevelName}}</p>
                    <p v-for="item in curCustomer.BizObj.Phones" :key="item.Id">{{item.Contact}}:{{item.PhoneNum}}</p>
                </router-link>
                <router-link to="/customer/sgin-in">
                    <svg class="sign_in">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#header_signIn"></use>
                    </svg>
                </router-link>
            </section>
            <footer class="description_footer">
                <p v-for="item in curCustomer.BizObj.Addrs" :key="item.Id" class="ellipsis">
                    地址：
                    <span v-if="item.Distance">{{item.Distance > 1000? (item.Distance/1000).toFixed(2) + 'km': item.Distance + 'm'}} / </span>
                    {{item.Addr}}
                </p>
                <p>{{curCustomer.BizAreaName}}</p>
            </footer>
        </section>
        <!-- <section class="shop_status_container">
        					<div class="shop_status_header">
        						<router-link to="/path">
        							<span class="shop_detail_title">路线</span>
        						</router-link>
        						<svg style="width:24px;height:24px">
        							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#home_path"></use>
        						</svg>
        						<router-link to="location">
        							<span class="identification_detail">定位</span>
        							<svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow">
        								<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#home_arrow"></use>
        							</svg>
        						</router-link>
        					</div>
        				</section> -->
        <section class="status_container">
            <router-link to="/shop/shopDetail/shopSafe" class="header">
                <h3>业务情况</h3>
                <div>
                    <span class="detail">详情</span>
                    <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#home_arrow"></use>
                    </svg>
                </div>
            </router-link>
            <section class="info-data">
                <ul class="clear">
                    <router-link :to="'/customer/oughtrec/'+curCustomer.CustomerId" tag="li" class="info-data-link">
                        <span class="info-data-top">
                            <strong class="count">{{curCustomer.OughtRecMoney}}</strong> 元</span>
                        <span class="info-data-bottom">欠款金额</span>
                    </router-link>
                    <router-link :to="'/customer/reconciliation/'+curCustomer.CustomerId" tag="li" class="info-data-link">
                        <span class="info-data-top">
                            <strong class="money">{{curCustomer.ChargeOffMoney}}</strong> 元</span>
                        <span class="info-data-bottom">出账金额</span>
                    </router-link>
                    <router-link to="/order/detail" tag="li" class="info-data-link">
                        <span class="info-data-top">
                            <strong class="number">{{curCustomer.SaleCount}}</strong> 个</span>
                        <span class="info-data-bottom">订单数量</span>
                    </router-link>
                </ul>
            </section>
        </section>
    </header>
    <router-link v-else to="/customer/search" tag="section" class="customer_header">
        <header-title header-title="请选择客户"></header-title>
    </router-link>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import headerTitle from 'src/components/header/header-title'
import { imgBaseUrl } from 'src/config/env'

export default {
    data() {
        return {
            imgBaseUrl,
        }
    },
    components: {
        headerTitle
    },
    computed: {
        ...mapState([
            'curCustomer'
        ]),
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';
.customer_header {
    height: 1.95rem;
}

.customer_detail_header {
    overflow: hidden;
    position: relative;
    .header_cover_img {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9;
        filter: blur(10px);
    }
    .description_header {
        position: relative;
        z-index: 10;
        background-color: rgba(119, 103, 137, .43);
        @include indent10;
        .description_top {
            margin-top: .275rem;
            display: flex;
            .description_left {
                margin-right: 0.275rem;
                .icon,
                img {
                    @include wh(2.9rem, 2.9rem);
                    display: block;
                    border-radius: 0.15rem;
                }
            }
            .description_right {
                flex: 1;
                .description_title {
                    margin-bottom: 0.275rem;
                    color: $blue-font-color;
                }
                p {
                    color: $blue-font-color;
                }
            }
            .sign_in {
                position: absolute;
                top: 2rem;
                right: .8rem;
                z-index: 11;
                width: 2rem;
                height: 2rem;
            }
        }
        .description_footer {
            @include fj;
            margin-top: 0.275rem;
            p {
                color: $blue-font-color;
            }
            .ellipsis {
                width: 84%;
            }
        }
    }
}

.status_container {
    background-color: $background-light-color;
    margin-bottom: .275rem;
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 1.5rem;
        padding: 0 .55rem;
        border-bottom: 1px solid $border-color;
        h3 {
            color: $font-color1;
        }
        .detail {
            color: $font-color2;
            vertical-align: middle;
            padding-right: .275rem;
        }
        svg {
            @include wh(.45rem, .45rem);
            vertical-align: middle;
        }
    }
}
</style>