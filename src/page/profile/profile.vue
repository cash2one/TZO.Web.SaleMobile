<template>
    <div class="profile_page">
        <header-title header-title="我的"></header-title>
        <section>
            <section class="profile-number">
                <router-link to="/profile/info" class="profile-link">
                    <!--<img :src="imgBaseUrl + userInfo.avatar" class="privateImage" v-if="userInfo&&userInfo.user_id" />-->
                    <span class="privateImage">
                        <svg class="privateImage-svg">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
                        </svg>
                    </span>
                    <div class="user-info">
                        <p>张三</p>
                        <p>
                            <span class="user-icon">
                                <svg class="icon-mobile" fill="#fff">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use>
                                </svg>
                            </span>
                            <span class="icon-mobile-number">{{mobile}}</span>
                        </p>
                    </div>
                    <span class="arrow">
                        <svg class="arrow-svg" fill="#fff">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#chevron-right"></use>
                        </svg>
                    </span>
                </router-link>
            </section>
            <section class="info-data">
                <ul class="clear">
                    <router-link to="/balance" tag="li" class="info-data-link">
                        <span class="info-data-top"><b>11.00</b>元</span>
                        <span class="info-data-bottom">销售</span>
                    </router-link>
                    <router-link to="/benefit" tag="li" class="info-data-link">
                        <span class="info-data-top"><b>111.00</b>元</span>
                        <span class="info-data-bottom">退货</span>
                    </router-link>
                    <router-link to="/points" tag="li" class="info-data-link">
                        <span class="info-data-top"><b>222.00</b>元</span>
                        <span class="info-data-bottom">收款</span>
                    </router-link>
                </ul>
            </section>
            <section class="profile-1reTe">
                <router-link to='/profile/settings' class="myorder">
                    <aside>
                        <svg fill="#4aa5f0">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#settings"></use>
                        </svg>
                    </aside>
                    <div class="myorder-div">
                        <span>设置</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#chevron-right"></use>
                            </svg>
                        </span>
                    </div>
                </router-link>
            </section>
        </section>
        <foot-guide></foot-guide>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import headerTitle from 'src/components/header/header-title'
import footGuide from 'src/components/footer/foot-guide'
import { imgBaseUrl } from 'src/config/env'
import { getImgPath } from 'src/components/common/mixin'

export default {
    data() {
        return {
            profiletitle: '我的',
            mobile: '暂无绑定手机号',             //电话号码
            balance: 0,            //我的余额
            count: 0,             //优惠券个数
            pointNumber: 0,       //积分数
            avatar: '',             //头像地址
            imgBaseUrl,
        }
    },
    mixins: [getImgPath],
    components: {
        headerTitle,
        footGuide
    },

    computed: {
        ...mapState([
            'userInfo',
        ]),
        //后台会返回两种头像地址格式，分别处理
        imgpath: function () {
            let path;
            if (this.avatar.indexOf('/') !== -1) {
                path = imgBaseUrl + this.avatar;
            } else {
                path = this.getImgPath(this.avatar)
            }
            this.SAVE_AVANDER(path);
            return path;
        }
    },
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';

.profile_page {
    p,
    span {
        font-family: Helvetica Neue, Tahoma, Arial;
    }
}

.profile-number {
    padding-top: 1.95rem;
    .profile-link {
        display: block;
        display: flex;
        box-align: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        background: $blue;
        padding: .666667rem .6rem;
        .privateImage {
            display: inline-block;
            @include wh(2.5rem, 2.5rem);
            border-radius: 50%;
            vertical-align: middle;
            .privateImage-svg {
                background: $fc;
                border-radius: 50%;
                @include wh(2.5rem, 2.5rem);
            }
        }
        .user-info {
            margin-left: .48rem;
            -webkit-box-flex: 1;
            -ms-flex-positive: 1;
            flex-grow: 1;
            p {
                font-weight: 700;
                @include sc(.8rem, $fc);
                .user-icon {
                    @include wh(0.5rem, 0.75rem);
                    display: inline-block;
                    vertical-align: middle;
                    line-height: 0.75rem;
                    .icon-mobile {
                        @include wh(100%, 100%);
                    }
                }
                .icon-mobile-number {
                    display: inline-block;
                    @include sc(.57333rem, $fc);
                }
            }
        }
        .arrow {
            @include wh(1rem, 1rem);
            display: inline-block;
            svg {
                @include wh(100%, 100%);
            }
        }
    }
}

.info-data {
    width: 100%;
    background: $fc;
    box-sizing: border-box;
    ul {
        .info-data-link {
            float: left;
            width: 33.33%;
            display: inline-block;
            border-right: 1px solid #f1f1f1;
            span {
                display: block;
                width: 100%;
                text-align: center;
            }
            .info-data-top {
                @include sc(.55rem, #333);
                padding: .853333rem 0 .453333rem;
                b {
                    display: inline-block;
                    @include sc(.8rem, #f90);
                    font-weight: 700;
                    line-height: 1rem;
                    font-family: Helvetica Neue, Tahoma;
                }
            }
            .info-data-bottom {
                @include sc(.57333rem, #666);
                font-weight: 400;
                padding-bottom: .453333rem;
            }
        }
        .info-data-link:nth-of-type(2) {
            .info-data-top {
                b {
                    color: #ff5f3e;
                }
            }
        }
        .info-data-link:nth-of-type(3) {
            border: 0;
            .info-data-top {
                b {
                    color: #6ac20b;
                }
            }
        }
    }
}

.profile-1reTe {
    margin-top: .4rem;
    background: $fc;
    .myorder {
        padding-left: 1.6rem;
        display: flex;
        align-items: center;
        aside {
            @include wh(.7rem, .7rem);
            margin-left: -.866667rem;
            margin-right: .266667rem;
            display: flex;
            align-items: center;
            svg {
                @include wh(100%, 100%);
            }
        }
        .myorder-div {
            width: 100%;
            border-bottom: 1px solid #f1f1f1;
            padding: .433333rem .266667rem .433333rem 0;
            @include sc(.7rem, #333);
            display: flex;
            justify-content: space-between;
            span {
                display: block;
            }
            .myorder-divsvg {
                @include wh(1rem, 1rem);
                svg {
                    @include wh(100%, 100%);
                }
            }
        }
    }
    .myorder:nth-of-type(3) .myorder-div {
        border: 0;
    }
}

.router-slid-enter-active,
.router-slid-leave-active {
    transition: all .4s;
}

.router-slid-enter,
.router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
}
</style>