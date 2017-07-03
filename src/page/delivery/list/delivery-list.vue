<template>
    <div class="page">
        <header-title header-title="送货" go-back='true'></header-title>
        <section class="m-tabs" ref="chooseType">
            <div class="item">
                <span :class='{active: changeShowType =="undone"}' @click="changeShowType='undone'">待送</span>
            </div>
            <div class="item">
                <span :class='{active: changeShowType =="complete"}' @click="changeShowType='complete'">完成</span>
            </div>
        </section>
        <transition name="m-tab-choose">
            <section v-show="changeShowType =='undone'" class="m-tab-container m-list">
                <router-link to='/delivery/detail'>
                    <section>
                        <strong class="name">刹车片</strong>
                        <div class="number">
                            <span>11</span>
                            <span>个</span>
                        </div>
                        <p class="content">No-a22|12121|111</p>
                    </section>
                </router-link>
            </section>
        </transition>
        <transition name="m-tab-choose">
            <section v-show="changeShowType =='complete'" class="m-tab-container m-list">
                <section>
                    <strong class="name">刹车片</strong>
                    <div class="number">
                        <span>11</span>
                        <span>个</span>
                    </div>
                    <p class="content">No-a22|12121|111</p>
                </section>
                <section>
                    <strong class="name">刹车片</strong>
                    <div class="number">
                        <span>11</span>
                        <span>个</span>
                    </div>
                    <p class="content">No-a22|12121|111</p>
                </section>
                <section>
                    <strong class="name">刹车片</strong>
                    <div class="number">
                        <span>11</span>
                        <span>个</span>
                    </div>
                    <p class="content">No-a22|12121|111</p>
                </section>
                <section>
                    <strong class="name">刹车片</strong>
                    <div class="number">
                        <span>11</span>
                        <span>个</span>
                    </div>
                    <p class="content">No-a22|12121|111</p>
                </section>
                <section>
                    <strong class="name">刹车片</strong>
                    <div class="number">
                        <span>11</span>
                        <span>个</span>
                    </div>
                    <p class="content">No-a22|12121|111</p>
                </section>
                <section>
                    <strong class="name">刹车片</strong>
                    <div class="number">
                        <span>11</span>
                        <span>个</span>
                    </div>
                    <p class="content">No-a22|12121|111</p>
                </section>
                <section>
                    <strong class="name">刹车片</strong>
                    <div class="number">
                        <span>11</span>
                        <span>个</span>
                    </div>
                    <p class="content">No-a22|12121|111</p>
                </section>
                <section>
                    <strong class="name">刹车片</strong>
                    <div class="number">
                        <span>11</span>
                        <span>个</span>
                    </div>
                    <p class="content">No-a22|12121|111</p>
                </section>
            </section>
        </transition>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import headerTitle from 'src/components/header/header-title'
export default {
    data() {
        return {
            changeShowType: 'undone',
        }
    },
    components: {
        headerTitle
    },
}
</script>