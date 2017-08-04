<template>
    <div class="page rating paddingTop">
        <header-title header-title="商品明细" goback='true'>
        </header-title>
        <section class="m-form-list">
            <div class="item">
                <h2>{{goods.GoodsName}}</h2>
            </div>
            <div v-for="(prop, index) in propertyList" :key="prop.Id">
                <div class="item" :class="{'end':index==propertyList.length-1}">
                    <p class="content">{{prop.PropertyName}}：{{goodsInfo.Properties['p'+prop.PropertyId]}}</p>
                </div>
            </div>
        </section>
        <section class="m-form-list">
            <router-link :to="goods.GoodsId+'/stocks/'+goods.GoodsId" class="item start end">
                <h2>
                    <!--<svg class="icon">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#weixin"></use>
                            </svg>-->
                    可用库存:{{goods.StockNum}}
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
            <router-link :to="goods.GoodsId+'/prices/'+goods.GoodsId" class="item start end">
                <h2>
                    <!--<svg class="icon">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#weixin"></use>
                            </svg>-->
                    等级价格:{{goods.LevelPrice}}
                </h2>
                <div class="content">
                    <p>价格详情</p>
                    <svg class="icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#chevron-right"></use>
                    </svg>
                </div>
            </router-link>
        </section>
    
        <loading v-if="showLoading"></loading>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import headerTitle from 'src/components/header/header-title'
import loading from 'src/components/common/loading'
export default {
    data() {
        return {
            goodsId: '', // 当前商品id   
            goods: {},     //当前商品信息 
            goodsInfo: {},
            showLoading: true, //显示加载动画                             
        }
    },
    mounted() {
        this.goodsId = this.$route.params.goodsId;
        this.goods = this.$store.state.curGoods;

        this.goodsInfo = this.$store.state.curGoods.Goods;
        this.showLoading = false;
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
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';

</style>