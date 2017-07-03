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
                        <p>{{userInfo.UserName}}</p>
                        <p>
                            <span class="user-icon">
                                <svg class="icon-mobile" fill="#fff">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use>
                                </svg>
                            </span>
                            <span class="icon-mobile-number">{{userInfo.Telephone}}</span>
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
                        <span class="info-data-top">
                            <b>11.00</b>元</span>
                        <span class="info-data-bottom">销售</span>
                    </router-link>
                    <router-link to="/benefit" tag="li" class="info-data-link">
                        <span class="info-data-top">
                            <b>111.00</b>元</span>
                        <span class="info-data-bottom">退货</span>
                    </router-link>
                    <router-link to="/points" tag="li" class="info-data-link">
                        <span class="info-data-top">
                            <b>222.00</b>元</span>
                        <span class="info-data-bottom">收款</span>
                    </router-link>
                </ul>
            </section>
            <section class="m-form-list">
                <router-link to='/profile/settings' class="item start end">
                    <h2>
                        <svg class="icon">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#settings"></use>
                        </svg>
                        设置
                    </h2>
                    <div class="content">
                        <p></p>
                        <svg class="icon">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#chevron-right"></use>
                        </svg>
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
        ])
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
</style>