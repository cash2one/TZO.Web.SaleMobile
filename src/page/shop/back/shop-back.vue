<template>
    <div class="page">
        <header-title header-title="回店" go-back='true'>
        </header-title>
        <section class="info-data">
            <ul class="clear">
                <router-link to="/balance" tag="li" class="info-data-link">
                    <span class="info-data-top">
                        <b>11.00</b>元</span>
                    <span class="info-data-bottom">现金</span>
                </router-link>
                <router-link to="/benefit" tag="li" class="info-data-link">
                    <span class="info-data-top">
                        <b>111</b>单</span>
                    <span class="info-data-bottom">挂帐</span>
                </router-link>
                <router-link to="/points" tag="li" class="info-data-link">
                    <span class="info-data-top">
                        <b>22</b>单</span>
                    <span class="info-data-bottom">退货</span>
                </router-link>
            </ul>
        </section>
        <section class="m-tabs" ref="chooseType">
            <div class="item">
                <span :class='{active: changeShowType =="return"}' @click="changeShowType='return'">客户退货</span>
            </div>
            <div class="item">
                <span :class='{active: changeShowType =="transfer"}' @click="changeShowType='transfer'">备货退回</span>
            </div>
        </section>
        <transition name="m-tab-choose">
            <section v-show="changeShowType =='return'" class="m-tab-container m-list">
                <header>济南舜泰广场</header>
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
                <header>济南舜泰广场</header>
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
        <transition name="tab-choose">
            <section v-show="changeShowType =='transfer'" class="tab-container m-list">
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
    </div>
</template>

<script>
import headerTitle from 'src/components/header/header-title'
export default {
    data() {
        return {
            changeShowType: 'return',
        }
    },
    components: {
        headerTitle
    },
}
</script>
