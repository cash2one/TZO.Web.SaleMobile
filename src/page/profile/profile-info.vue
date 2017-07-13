 <template>
    <div class="page rating">
        <header-title header-title="我的资料" goback="true"></header-title>
        <section class="m-form-list">
            <section class="item start">
                <input type="file" class="profileinfopanel-upload">
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
            <section class="item">
                <h2>用户名</h2>
                <div class="content">
                    <p>{{userInfo.UserName}}</p>
                </div>
            </section>
            <section class="item end">
                <h2>当前公司</h2>
                <div class="content">
                    <p>{{userInfo.CorpName}}</p>
                </div>
            </section>
            <section class="title">
                微信绑定
            </section>
            <section class="item end">
                <h2>
                    <svg class="icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use>
                    </svg>
                    <!--<img src="../../images/bindphone.png" style="display:inline-block;margin-right:.4rem;" alt="">-->
                    手机
                </h2>
                <div class="content">
                    <p>{{userInfo.Telephone}}</p>
                    <svg class="icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#chevron-right"></use>
                    </svg>
                </div>
            </section>
        </section>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import headerTitle from 'src/components/header/header-title'

export default {
    data() {
        return {
            
        }
    },
    components: {
        headerTitle,
    },
    computed: {
        ...mapState([
            'userInfo'
        ]),
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin.scss';

.m-form-list {
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
