<template>
    <header v-if="curCustomer.CustomerId" id='header_customer' class="customer_detail_header" ref="customerheader">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position:absolute;width:0;height:0">
            <defs>
                <symbol viewBox="0 0 24 24" id="header_signIn">
                    <path fill="#fff" d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" />
                </symbol>
                <symbol viewBox="0 0 24 24" id="header_signInActive">
                    <path fill="#45C144" d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                </symbol>
                <symbol viewBox="0 0 24 24" id="header_path">
                    <path d="M16,2V8H17.08L14.95,13H14.26L12,9.97V5H6V11H6.91L4.88,16H2V22H8V16H7.04L9.07,11H10.27L12,13.32V19H18V13H17.12L19.25,8H22V2M18,4H20V6H18M8,7H10V9H8M14,15H16V17H14M4,18H6V20H4" />
                </symbol>
                <symbol viewBox="0 0 14 14" id="header_arrow">
                    <path d="M0 0 L8 7 L0 14" stroke="#bbb" stroke-width="1.5" fill="none" />
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
                <router-link to="/customer/search" class="search">
                    <strong>搜索</strong>
                </router-link>
                <!-- <router-link to="/customer/sgin-in">
                                                                                <svg class="sign_in">
                                                                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#header_signIn"></use>
                                                                                </svg>
                                                                            </router-link> -->
                <section @click="signIn">
                    <svg class="sign_in" v-if="!signInActive">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#header_signIn"></use>
                    </svg>
                    <svg class="sign_in" v-if="signInActive">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#header_signInActive"></use>
                    </svg>
                </section>
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
        <section class="status_container">
            <div class="header">
                <router-link to="/location" tag="h3">
                    定位
                </router-link>
                <svg class="icon">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#header_path"></use>
                </svg>
                <router-link to="/path" tag="div" class="detail">
                    <span>路线</span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#header_arrow"></use>
                        </svg>
                    </span>
                </router-link>
            </div>
        </section>
        <section class="status_container">
            <router-link to="/shop/shopDetail/shopSafe" tag="div" class="header">
                <h3>业务情况</h3>
                <div class="detail">
                    <span>详情</span>
                    <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#header_arrow"></use>
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
    
        <alert-tip v-if="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
    
    </header>
    <router-link v-else to="/customer/search" tag="section" class="customer_header">
        <header-title header-title="请选择客户"></header-title>
    </router-link>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import headerTitle from 'src/components/header/header-title'
import alertTip from 'src/components/common/alert-tip'
import { imgBaseUrl } from 'src/config/env'
import { apiSetSignIn } from 'src/service/getData'

export default {
    data() {
        return {
            imgBaseUrl,
            signInActive: false,

            showAlert: false,
            alertText: null,
            goNext: false,

            EARTH_RADIUS: 6378137.0,    //单位M
            PI: Math.PI,
        }
    },
    methods: {
        ...mapActions([
            'autoGetPosition'
        ]),
        getRad(d) {
            return d * this.PI / 180.0;
        },
        getFlatternDistance(lat1, lng1, lat2, lng2) {
            var f = this.getRad((lat1 + lat2) / 2);
            var g = this.getRad((lat1 - lat2) / 2);
            var l = this.getRad((lng1 - lng2) / 2);

            var sg = Math.sin(g);
            var sl = Math.sin(l);
            var sf = Math.sin(f);

            var s, c, w, r, d, h1, h2;
            var a = this.EARTH_RADIUS;
            var fl = 1 / 298.257;

            sg = sg * sg;
            sl = sl * sl;
            sf = sf * sf;

            s = sg * (1 - sl) + (1 - sf) * sl;
            c = (1 - sg) * (1 - sl) + sf * sl;

            w = Math.atan(Math.sqrt(s / c));
            r = Math.sqrt(s * c) / w;
            d = 2 * w * a;
            h1 = (3 * r - 1) / 2 / c;
            h2 = (3 * r + 1) / 2 / s;

            return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
        },
        async signIn() {
            // 未获取到地理位置信息
            if (this.latitude == 0 || this.longitude == 0) {
                this.alertText = '签到失败:未获取到您所在的地理位置，请重试!';
                this.showAlert = true;
                return;
            }

            // 客户未定位
            if (this.curCustomer.BizObj.Latitude == 0 || this.curCustomer.BizObj.Longitude == 0) {
                // 跳转到定位
                this.alertText = '签到失败:当前客户未采集地理位置，请先采集!';
                this.showAlert = true;
                this.goNext = true;
                return;
            }

            // 距离大于300M
            let distance = this.getFlatternDistance(this.latitude, this.longitude, this.curCustomer.BizObj.Latitude, this.curCustomer.BizObj.Longitude);
            //let distance = this.getFlatternDistance(116.384374, 39.914668, 116.382967, 39.913285);
            if (distance > 300) {
                this.alertText = '签到失败:当前位置距离客户所在位置大于300米!';
                this.showAlert = true;
                return;
            }

            await apiSetSignIn(this.curCustomer.CustomerId, this.latitude, this.longitude);
            this.signInActive = true;
        },
        closeTip() {
            if (this.goNext) {
                this.$router.push('/customer/detail/' + this.curCustomer.CustomerId);
            }
            else
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
                    width: 9rem;
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
        @include fj;
        padding: .275rem;
        align-items: center;
        border-bottom: 1px solid $border-color;
        h3 {
            color: $font-color1;
        }
        .detail {
            color: $font-color2;
            line-height: 1rem;
            span {
                color: $font-color2;
            }
            svg {
                @include wh(.45rem, .45rem);
            }
        }
        .icon {
            @include wh(.45rem, .45rem);
        }
    }
}

.search {
    @include indent05;
    text-align: center;
    @include sc(0.7rem, $blue-font-color);
}
</style>