 <template>
    <div class="rating_page">
        <header-title header-title="我的资料"></header-title>
        <section class="m-list">
            <section class="m-list-item start">
                <input type="file" class="profileinfopanel-upload" @change="uploadAvatar">
                <h2>头像</h2>
                <div class="content">
                    <!--<img  v-if="userInfo" :src="imgBaseUrl + userInfo.avatar" class="headportrait-div-top">-->
                    <svg class="icon-big">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
                    </svg>
                    <svg class="icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#chevron-right"></use>
                    </svg>
                </div>
            </section>
            <section class="m-list-item end">
                <h2>用户名</h2>
                <div class="content">
                    <p>{{username}}2222222</p>
                </div>
            </section>
            <section class="title">
                微信绑定
            </section>
            <section>
                <section class="m-list-item end">
                    <h2>
                        <svg class="icon">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use>
                        </svg>
                        <!--<img src="../../images/bindphone.png" style="display:inline-block;margin-right:.4rem;" alt="">-->
                        手机
                    </h2>
                    <div class="content">
                        <p>{{infotel}}1111111111</p>
                        <svg class="icon">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#chevron-right"></use>
                        </svg>
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

.m-list {
    .profileinfopanel-upload {
        display: block;
        position: absolute;
        opacity: 0;
        top: 2.35rem;
        left: 0;
        @include wh(100%, 3.1rem);
    }
}
</style>
