 <template>
    <div class="rating_page">
        <header-title header-title="我的资料"></header-title>
        <section class="profile-info">
            <section class="headportrait">
                <input type="file" class="profileinfopanel-upload" @change="uploadAvatar">
                <h2>头像</h2>
                <div class="headportrait-div">
                    <!--<img  v-if="userInfo" :src="imgBaseUrl + userInfo.avatar" class="headportrait-div-top">-->
                    <span class="headportrait-div-top">
                        <svg>
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
                        </svg>
                    </span>
                    <span class="headportrait-div-bottom">
                        <svg fill="#ddd">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#chevron-right"></use>
                        </svg>
                    </span>
                </div>
            </section>
            <section class="headportrait headportraitwo">
                <h2>用户名</h2>
                <div class="headportrait-div">
                    <p>{{username}}2222222</p>
                </div>
            </section>
            <section class="bind-phone">
                微信绑定
            </section>
            <section class="info-router">
                <section class="headportrait headportraitwo headportraithree">
                    <h2>
                        <img src="../../images/bindphone.png" style="display:inline-block;margin-right:.4rem;" alt="">手机</h2>
                    <div class="headportrait-div">
                        <p>{{infotel}}1111111111</p>
                        <span class="headportrait-div-bottom">
                            <svg fill="#ddd">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#chevron-right"></use>
                            </svg>
                        </span>
                    </div>
                </section>
            </section>
        </section>
    
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import headerTitle from 'src/components/header/header-title'
import alertTip from 'src/components/common/alert-tip'
import { getImgPath } from 'src/components/common/mixin'
import { imgBaseUrl } from 'src/config/env'

export default {
    data() {
        return {
            username: '',    //用户名
            resetname: '', //重置用户名
            infotel: '',     //用户手机
            avatar: '',      //用户头像
            showAlert: false,
            alertText: null,
            imgBaseUrl,
        }
    },
    beforeDestroy() {
        clearTimeout(this.timer)
    },
    components: {
        headerTitle,
        alertTip,
    },
    mixins: [getImgPath],
    computed: {
        ...mapState([
            'userInfo', 'imgPath'
        ]),
    },
    methods: {
        async uploadAvatar() {
            //上传头像
            if (this.userInfo) {
                let input = document.querySelector('.profileinfopanel-upload')
                let data = new FormData();
                data.append('file', input.files[0]);
                try {
                    let response = await fetch('/eus/v1/users/' + this.userInfo.user_id + '/avatar', {
                        method: 'POST',
                        credentials: 'include',
                        body: data
                    })
                    let res = await response.json();
                    if (res.status == 1) {
                        this.userInfo.avatar = res.image_path;
                    }
                } catch (error) {
                    this.showAlert = true;
                    this.alertText = '上传失败';
                    throw new Error(error);
                }
            }
        }
    },
    watch: {
        userInfo: function (value) {
            if (value && value.user_id) {
                this.username = value.username;
                this.infotel = value.mobile;
                this.avatar = value.avatar;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin.scss';

.profile-info {
    @include wh(100%, 3.1rem);
    .profileinfopanel-upload {
        display: block;
        position: absolute;
        opacity: 0;
        top: 2.35rem;
        left: 0;
        @include wh(100%, 3.1rem);
    }
    .headportrait {
        margin-top: .4rem;
        padding: .5rem .4rem;
        @include fj(space-between);
        align-items: center;
        border-top: 1px solid #ddd;
        background: #fff;

        h2 {
            @include sc(.6rem, #333);
            font-weight: 500;
            display: flex;
            align-items: center;
        }
        .headportrait-div {
            span {
                display: inline-block;

                svg {
                    @include wh(100%, 100%);
                }
            }
            .headportrait-div-top {
                @include wh(2rem, 2rem);
                @include borderRadius(50%);
                vertical-align: middle;
            }
            .headportrait-div-bottom {
                @include wh(.66667rem, 1.4rem);
                position: relative;
                top: 0.44rem;
            }
        }
    }
    .headportraitwo {
        margin-top: 0;
        padding: .3rem .4rem;
        .headportrait-div {
            @include fj(left);
            p {
                text-align: left;
                line-height: 1.39rem;
                @include sc(.7rem, #999);
                margin-right: .2rem;
                font-weight: 100;
                font-family: Arial;
            }
            .headportrait-div-bottom {
                top: 0;
            }
        }
    }
    .headportraithree {
        border-bottom: 1px solid #ddd;
    }
    .bind-phone {
        padding: .4rem .4rem;
        @include sc(.5rem, #666);
    }
}

.info-router {
    display: block;
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
