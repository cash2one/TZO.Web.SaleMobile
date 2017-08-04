<template>
    <div class="page rating paddingTop">
        <header-title header-title="价格详情" goback='true'>
        </header-title>
        <section class="m-form-list">
            <div class="item">
                <h2>客户等级价格:</h2>
            </div>
            <div v-for="(levelPrice, index) in custLevelPriceSys" :key="levelPrice.Id">
                <div class="item" :class="{'end':index==custLevelPriceSys.length-1}">
                    <p class="content">{{levelPrice.CustomerLevelName}}：{{levelPrice.Price}}</p>
                </div>
            </div>
        </section>
        <section class="m-form-list" style="margin-top:.4rem">
            <div class="item">
                <h2>客户最近价格:</h2>
            </div>
            <div class="item">
                <p class="content">最高价格：{{customerPriceView.MaxPrice}}</p>
            </div>
            <div class="item">
                <p class="content">最低价格：{{customerPriceView.MinPrice}}</p>
            </div>
            <div class="item end">
                <p class="content">上次价格：{{customerPriceView.LastPrice}}</p>
            </div>
        </section>
        <section class="m-form-list" style="margin-top:.4rem">
            <div class="item">
                <h2>商品最近价格:</h2>
            </div>
            <div class="item">
                <p class="content">最高价格：{{refPriceView.MaxPrice}}</p>
            </div>
            <div class="item">
                <p class="content">最低价格：{{refPriceView.MinPrice}}</p>
            </div>
            <div class="item end">
                <p class="content">上次价格：{{refPriceView.LastPrice}}</p>
            </div>
        </section>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import headerTitle from 'src/components/header/header-title'
import { apiGoodsSaleRefPrice } from 'src/service/getData'

export default {
    data() {
        return {
            goodsId: '',                // 当前商品id
            saleRefPrice: {},           //获取当前商品等级价格、销售价格                  
            custLevelPriceSys: [],      //客户等级价格 
            customerPriceView: {},      //客户最近价格
            refPriceView: {},           //商品最近价格                            
        }
    },
    mounted() {
        this.goodsId = this.$route.params.goodsId;
        let customerId = this.curCustomer.CustomerId;

        //获取当前商品等级价格、销售价格
        apiGoodsSaleRefPrice(this.goodsId, customerId).then(res => {
            this.saleRefPrice = res;
            this.custLevelPriceSys = res.CustLevelPriceSys;
            this.customerPriceView = res.CustomerPriceView;
            this.refPriceView = res.RefPriceView;
        })
    },

    components: {
        headerTitle
    },
    computed: {
        ...mapState([
            'curCustomer'
        ]),
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';
</style>