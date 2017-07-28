<template>
    <div class="rating_page">
        <header-title header-title="库存详情" goback='true'>
        </header-title>
        <section class="shop_status_info">
            <header>本公司各仓库可用库存详情:</header>
            <div v-for="stock in allStorageStocks" :key="stock.Id">
            <p>{{stock.StorageName}}：{{stock.Num}}</p>        
            </div>                    
        </section>
        <section class="shop_status_info">
            <header>各公司可用库存详情:</header>
            <div v-for="stock in allCorpsStocks" :key="stock.Id">
            <p>{{stock.CorpName}}：{{stock.StockNum}}</p>        
            </div>                    
        </section>
    </div>
</template>

<script>
import headerTitle from 'src/components/header/header-title'
import { apiGetAllCorpsGoodsStocks,apiGetAllStorageStocks } from 'src/service/getData'

export default {
    data(){
            return{                
                goodsId:'',             // 当前商品id   
                allCorpsStocks:{},     //获取当前商品在所有公司的可用库存 
                allStorageStocks:{},     //获取当前商品在本公司各仓库可用库存                                
            }
        },
        mounted(){           
            this.goodsId = this.$route.params.goodsId;

             //获取当前商品在所有公司的可用库存
            apiGetAllCorpsGoodsStocks(this.goodsId).then(res => {
                this.allCorpsStocks = res.Items;              
            })

             //获取当前商品在本公司各仓库可用库存
            apiGetAllStorageStocks(this.goodsId).then(res => {
                this.allStorageStocks = res;              
            })
        },

    components: {
        headerTitle
    }
    // computed: {
	// 	...mapState([
    //         'propertyList',
	// 		'curGoods'
	// 	]),
	// }
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
</style>