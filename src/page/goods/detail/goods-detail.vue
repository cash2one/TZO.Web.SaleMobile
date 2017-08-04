<template>
    <div class="rating_page">
        <header-title header-title="商品明细" goback='true'>
        </header-title>
        <section class="shop_status_info">
            <header>{{goods.GoodsName}}</header>
            <div v-for="prop in propertyList" :key="prop.Id">
            <p>{{prop.PropertyName}}：{{goodsInfo.Properties['p'+prop.PropertyId]}}</p>        
            </div>          
            <!--<p>业务区域：aaa</p>
            <p>客户等级：ddd</p>
            <p>业务员：sss</p>
            <p>备注：vvv</p>-->
            
        </section>
         <section class="shop_status_container">
            <router-link :to="goods.GoodsId+'/stocks/'+goods.GoodsId" class="shop_status_header">
                <span class="shop_detail_title">可用库存:{{goods.StockNum}}</span>
                <div>
                    <span class="identification_detail">库存详情</span>
                    <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow" >
                        <path d="M0 0 L8 7 L0 14"  stroke="#bbb" stroke-width="1.5" fill="none"/>
                    </svg>
                </div>
            </router-link>
        
        </section>
        <section class="shop_status_container">
            <router-link :to="goods.GoodsId+'/prices/'+goods.GoodsId" class="shop_status_header">
                <span class="shop_detail_title">等级价格:{{goods.LevelPrice}}</span>
                <div>
                    <span class="identification_detail">价格详情</span>
                    <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow" >
                        <path d="M0 0 L8 7 L0 14"  stroke="#bbb" stroke-width="1.5" fill="none"/>
                    </svg>
                </div>
            </router-link>
        
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
    data(){
            return{                
                goodsId:'', // 当前商品id   
                goods:{},     //当前商品信息 
                goodsInfo:{},                               
            }
        },
        mounted(){
            this.goodsId = this.$route.params.goodsId;
            this.goods = this.$store.state.curGoods;     
            
            this.goodsInfo=this.$store.state.curGoods.Goods;
        },

    components: {
        headerTitle
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
   .rating_page{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
        padding-top: 1.95rem;
		background-color: #ebebeb;
		z-index: 18;
	}
    .shop_status_info{
        background-color: #fff;
        margin-bottom: .4rem;
        header{
            line-height: 1.8rem;
            padding: 0 .6rem;
            @include sc(.75rem, #333);
            border-bottom: 0.025rem solid #f1f1f1;
        }
        p{
            @include sc(.6rem, #666);
            padding: .7rem .6rem .7rem 0;
            margin-left: .6rem;
            border-bottom: 0.025rem solid #f5f5f5;
        }
        span{
            color: #666;
        }
        p:nth-of-type(4), p:nth-of-type(5){
            display: flex;
            justify-content: space-between;
        }
    }
    .shop_status_container{
        background-color: #fff;
        margin-bottom: .4rem;
        .shop_status_header{
            display: flex;
            justify-content: space-between;
            align-items: center;
            line-height: 1.8rem;
            padding: 0 .6rem;
            border-bottom: 0.025rem solid #f1f1f1;
            .shop_detail_title{
                @include sc(.75rem, #333);
            }
            .identification_detail{
                @include sc(.7rem, #bbb);
                vertical-align: middle;
            }
            svg{
                @include wh(.6rem, .6rem);
                vertical-align: middle;
            }
        }       
    }
</style>