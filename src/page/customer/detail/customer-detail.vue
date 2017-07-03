<template>
    <div>
        <header-title header-title="客户资料" go-back='true'>
        </header-title>
        <section class="shop_status_info">
            <header>商家信息</header>
            <p>ddd</p>
            <p>地址：ssss</p>
            <p>营业时间：sdsd</p>
            <p @click="showLicenseImg(mmm)">
                <span>营业执照</span>
                <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow" >
                    <path d="M0 0 L8 7 L0 14"  stroke="#bbb" stroke-width="1.5" fill="none"/>
                </svg></p>
            <p @click="showLicenseImg(nnn)">
                <span>餐饮服务许可证</span>
                <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow" >
                    <path d="M0 0 L8 7 L0 14"  stroke="#bbb" stroke-width="1.5" fill="none"/>
                </svg>
            </p>
        </section>
    </div>
</template>

<script>
import headerTitle from 'src/components/header/header-title'
import { getCustomer } from 'src/service/getData'
export default {
    data(){
            return{                
                customerId:'', // 当前客户id   
                customer:{}     //当前客户信息           
            }
        },

        mounted(){
            this.customerId = this.$route.params.customerId;
            //获取当前客户信息
            getCustomer(this.customerId).then(res => {
                this.customer = res;
            })
            //this.initData();
        },

    components: {
        headerTitle
    },
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
