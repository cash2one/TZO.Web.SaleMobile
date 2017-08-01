 <template>
	<div class="rating_page">
        <header-title header-title="订单详情" goback='true'>
        </header-title>
         <section class="shop_status_info">
            <header>基本信息</header>
            <p>客户:{{orderDetail.CustomerName}}</p>
            <p>单号:{{orderDetail.BillNo}}</p>
            <p>时间:{{orderDetail.SubmitTime | time}}</p>
            <p>品类:{{orderDetail.CategoryNum}}</p>
            <p>数量:{{orderDetail.GoodsTotalNum}}</p>
            <p>仓库:{{orderDetail.SendStorageName}}</p>
            <p>结算:{{orderDetail.ChargeTypeName}}</p>
            <p>配送:{{orderDetail.ShipTypeName}}</p>
            <p>备注:{{orderDetail.Note}}</p>
            <!-- <p @click="showLicenseImg(shopDetail.license.catering_service_license_image)">
                <span>餐饮服务许可证</span>
                <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow" >
                    <path d="M0 0 L8 7 L0 14"  stroke="#bbb" stroke-width="1.5" fill="none"/>
                </svg>
            </p> -->
        </section>
        <section class="shop_status_info">
            <header>商品列表(品类:{{orderDetail.CategoryNum}},数量:{{orderDetail.GoodsTotalNum}},总计:￥{{orderDetail.TotalMoney}})</header>
            <section class="content" v-for="item in orderDetail.Items" :key="item.id">
                <p class="shop_statu_detail">
                    <span class="gt">{{item.Goods.Name}}</span>
                    <br/><br/>
                    <span v-for="prop in globalPropertyList" :key="prop.Id">
                        <span>{{prop.Name}}</span>:
                        <span>{{item.Goods.Properties['p'+prop.Id]}}</span>
                        <br/>
                    </span>
                    <br/>
                    <span class="gp">
                        <span>价格:￥<span class="price">{{item.Price}}</span></span>
                        <span>数量:<span class="price">{{item.GoodsNum}}</span></span>
                        <span>小计:￥<span class="money">{{item.Price * item.GoodsNum}}</span></span>
                    </span>
                    <!-- <br/>
                    <span>已执行:{{item.ExecNum}}</span> -->
                </p>
            </section>
        </section>
        <section  class="shop_status_info">
            <header>历史记录</header>
            <div v-for="item in orderDetail.Histories" :key="item.id">
                <p>
                    <span>{{item.StatusName}}</span>
                    <span>{{item.OperatorName}}</span>
                    <span>{{item.OperateTime | time}}</span>
                </p>      
            </div>
        </section> 
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import headerTitle from 'src/components/header/header-title'
import { apiGetForeignSaleOrderDetail,
         apiGetForeignSaleReturnOrderDetail,
         apiGetRetailOrderDetail,
         apiGetRetailReturnOrderDetail
} from 'src/service/getData'

export default {
    data(){
            return{
                orderDetail:{},
            }
        },
        mounted(){
        	this.initData();
        },
        methods: {
             ...mapActions([
                'getGlobalProperty',
                'getPorpertyList',
            ]),
            async initData(){

                await this.getGlobalProperty();
                await this.getPorpertyList();
                
                if(this.$route.query.bizType==12012){
                    apiGetForeignSaleOrderDetail(this.$route.query.Id).then( val =>{
                        this.orderDetail=val;
                    });
                }else if(this.$route.query.bizType==(0-12012)){
                    apiGetForeignSaleReturnOrderDetail(this.$route.query.Id).then( val =>{
                        this.orderDetail=val;
                    });
                }else if(this.$route.query.bizType==12032){
                    apiGetRetailOrderDetail(this.$route.query.Id).then( val =>{
                        this.orderDetail=val;
                    });
                }else if(this.$route.query.bizType==(0-12032)){
                    apiGetRetailReturnOrderDetail(this.$route.query.Id).then( val =>{
                        this.orderDetail=val;
                    });
                }
            },
        },
        computed: {
            ...mapState([
                'globalPropertyList',
                'propertyList',
            ])
        },
        components: {
            headerTitle
        },
    }
</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
	
    .gt{
        font-size:1.2em;
        color:#f90 !important;
    }

    .gp{
        font-size:1em;
    }

    .gp .price,.num{
        font-size:1.5em;
        color:#6ac20b !important;
    }

    .gp .money{
        font-size:1.5em;
        color:red  !important;
    }

    #head_top{
        background-color: #3190e8;
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        width: 100%;
        height: 1.95rem;
    }
    .title_head{
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        width: 50%;
        color: #fff;
        text-align: center;
    }

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
    .activities_container{
        background-color: #fff;
        margin: .4rem 0;
        padding-bottom: .6rem;
        header{
            @include sc(.75rem, #333);
            line-height: 1.8rem;
            padding-left: .6rem;
            border-bottom: 1px solid #f1f1f1;
            margin-bottom: .3rem;
        }
        .actibities_ul{
            padding: 0 .6rem;
            li{
                margin-bottom: .2rem;
                span:nth-of-type(1){
                    @include sc(.45rem, #fff);
                    padding: .1rem;
                    border: 1px;
                    border-radius: 0.1rem;
                    margin-right: .2rem;
                }
                span:nth-of-type(2){
                    @include sc(.55rem, #666);
                }
            }
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
        .shop_statu_detail{
            display: flex;
            padding: .6rem;
            svg{
                @include wh(2rem, 2rem);
                margin-right: .6rem;
            }
            .check_date{
                span{
                    @include sc(.55rem, #666);
                }
                .shop_status_well{
                    color: rgb(126, 211, 33);
                }
                .shop_status_bad{
                    color: red;
                }
            }
        }
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
    .license_container{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,.5);
        z-index: 101;
        img{
            width: 100%;
            @include center;
        }
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>
