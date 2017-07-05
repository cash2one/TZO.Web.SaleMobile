<template>
    <div class="rating_page">
        <header-title header-title="送货明细"></header-title>
        <section class="m-form-list">
            <section class="item start">
                <h2>用户名</h2>
                <div class="content">
                    <p></p>
                </div>
            </section>
            <section class="item end">
                <h2>当前公司</h2>
                <div class="content">
                    <p></p>
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
                    <p></p>
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
import headerTitle from 'src/components/header/header-title'
export default {
    components: {
        headerTitle
    },
}
</script>