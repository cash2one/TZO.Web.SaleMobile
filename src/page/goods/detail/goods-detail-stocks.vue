<template>
    <div class="page rating">
        <header-title header-title="库存详情" goback='true'></header-title>
        <section class="scroll_container paddingTop">
            <section class="m-form-list">
                <div class="item">
                    <h2>本公司各仓库可用库存详情:</h2>
                </div>
                <div v-for="(stock, index) in allStorageStocks" :key="stock.Id">
                    <div class="item" :class="{'end':index==allStorageStocks.length-1}">
                        <p class="content">{{stock.StorageName}}：{{stock.Num}}</p>
                    </div>
                </div>
            </section>
            <section class="m-form-list" style="margin-top:.4rem">
                <div class="item">
                    <h2>各公司可用库存详情:</h2>
                </div>
                <div v-for="(stock, index) in allCorpsStocks" :key="stock.Id">
                    <div class="item" :class="{'end':index==allCorpsStocks.length-1}">
                        <p class="content">{{stock.CorpName}}：{{stock.StockNum}}</p>
                    </div>
                </div>
            </section>
        </section>
    </div>
</template>

<script>
import headerTitle from 'src/components/header/header-title'
import { apiGetAllCorpsGoodsStocks, apiGetAllStorageStocks } from 'src/service/getData'

export default {
    data() {
        return {
            goodsId: '',             // 当前商品id   
            allCorpsStocks: {},     //获取当前商品在所有公司的可用库存 
            allStorageStocks: {},     //获取当前商品在本公司各仓库可用库存                                
        }
    },
    mounted() {
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
</style>