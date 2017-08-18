<template>
    <div class="page">
        <header-title header-title="商品明细" goback='true'></header-title>
        <section v-if="!showLoading" class="scroll_container paddingTop">
            <section class="m-form-list">
                <div class="item">
                    <h2>{{curGoods.GoodsName}}</h2>
                </div>
                <div v-for="(prop, index) in propertyList" :key="prop.Id">
                    <div class="item" :class="{'end':index==propertyList.length-1}">
                        <p class="content">{{prop.PropertyName}}:{{curGoods.Goods.Properties['p'+prop.PropertyId]}}</p>
                    </div>
                </div>
            </section>
            <section class="m-form-list">
                <router-link :to="{name:'goods-stocks'}" class="item start end">
                    <h2>
                        <!--<svg class="icon">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#weixin"></use>
                                </svg>-->
                        可用库存:{{curGoods.StockNum}}
                    </h2>
                    <div class="content">
                        <p>库存详情</p>
                        <svg class="icon">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#chevron-right"></use>
                        </svg>
                    </div>
                </router-link>
            </section>
            <section class="m-form-list">
                <router-link :to="{name:'goods-prices'}" class="item start end">
                    <h2>
                        <!--<svg class="icon">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#weixin"></use>
                                </svg>-->
                        等级价格:{{curGoods.LevelPrice}}
                    </h2>
                    <div class="content">
                        <p>价格详情</p>
                        <svg class="icon">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#chevron-right"></use>
                        </svg>
                    </div>
                </router-link>
            </section>
        </section>
    
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import headerTitle from 'src/components/header/header-title'
import loading from 'src/components/common/loading'

export default {
    data() {
        return {
            showLoading: true, //显示加载动画                             
        }
    },
    mounted() {
        this.initData();
    },
    components: {
        headerTitle,
        loading
    },
    computed: {
        ...mapState([
            'propertyList',
            'curGoods'
        ]),
    },
    methods: {
        ...mapActions([
            'getPorpertyList'
        ]),
        async initData() {
            await this.getPorpertyList();
            this.showLoading = false;
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';
</style>