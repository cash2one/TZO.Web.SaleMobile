<template>
    <div class="rating_page">
        <header-title header-title="价格详情" goback='true'>
        </header-title>
        <section class="shop_status_info">
            <header>客户等级价格:</header>
            <div v-for="levelPrice in custLevelPriceSys" :key="levelPrice.Id">
                <p>{{levelPrice.CustomerLevelName}}：{{levelPrice.Price}}</p>
            </div>
        </section>
        <section class="shop_status_info">
            <header>客户最近价格:</header>
            <p>最高价格：{{customerPriceView.MaxPrice}}</p>
            <p>最低价格：{{customerPriceView.MinPrice}}</p>
            <p>上次价格：{{customerPriceView.LastPrice}}</p>
        </section>
        <section class="shop_status_info">
            <header>商品最近价格:</header>
            <p>最高价格：{{refPriceView.MaxPrice}}</p>
            <p>最低价格：{{refPriceView.MinPrice}}</p>
            <p>上次价格：{{refPriceView.LastPrice}}</p>
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
.rating_page {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding-top: 1.95rem;
    background-color: #ebebeb;
    z-index: 18;
}

.shop_status_info {
    background-color: #fff;
    margin-bottom: .4rem;
    header {
        line-height: 1.8rem;
        padding: 0 .6rem;
        @include sc(.75rem, #333);
        border-bottom: 0.025rem solid #f1f1f1;
    }
    p {
        @include sc(.6rem, #666);
        padding: .7rem .6rem .7rem 0;
        margin-left: .6rem;
        border-bottom: 0.025rem solid #f5f5f5;
    }
    span {
        color: #666;
    }
    p:nth-of-type(4),
    p:nth-of-type(5) {
        display: flex;
        justify-content: space-between;
    }
}
</style>