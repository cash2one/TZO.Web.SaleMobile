<template>
	<div>
		<header-customer customerId="1"></header-customer>
		<section class="shop_status_container">
			<router-link to="/shop/shopDetail/shopSafe" class="shop_status_header">
				<span class="shop_detail_title">路线</span>
				<svg style="width:24px;height:24px" viewBox="0 0 24 24">
					<path fill="#000000" d="M16,2V8H17.08L14.95,13H14.26L12,9.97V5H6V11H6.91L4.88,16H2V22H8V16H7.04L9.07,11H10.27L12,13.32V19H18V13H17.12L19.25,8H22V2M18,4H20V6H18M8,7H10V9H8M14,15H16V17H14M4,18H6V20H4" />
				</svg>
				<div>
					<span class="identification_detail">定位</span>
					<svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow">
						<path d="M0 0 L8 7 L0 14" stroke="#bbb" stroke-width="1.5" fill="none" />
					</svg>
				</div>
			</router-link>
		</section>
		<section class="shop_status_container">
			<router-link to="/shop/shopDetail/shopSafe" class="shop_status_header">
				<span class="shop_detail_title">业务情况</span>
				<div>
					<span class="identification_detail">详情</span>
					<svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow">
						<path d="M0 0 L8 7 L0 14" stroke="#bbb" stroke-width="1.5" fill="none" />
					</svg>
				</div>
			</router-link>
			<section class="info-data">
				<ul class="clear">
					<router-link to="/balance" tag="li" class="info-data-link">
						<span class="info-data-top">
							<b>22</b>元</span>
						<span class="info-data-bottom">我的余额</span>
					</router-link>
					<router-link to="/benefit" tag="li" class="info-data-link">
						<span class="info-data-top">
							<b>11</b>个</span>
						<span class="info-data-bottom">我的优惠</span>
					</router-link>
					<router-link to="/points" tag="li" class="info-data-link">
						<span class="info-data-top">
							<b>111</b>分</span>
						<span class="info-data-bottom">我的积分</span>
					</router-link>
				</ul>
			</section>
		</section>
		<nav class="msite_nav">
			<div class="swiper-container" v-if="foodTypes.length">
				<div class="swiper-wrapper">
					<div class="swiper-slide food_types_container" v-for="(item, index) in foodTypes" :key="index">
						<router-link :to="{path: '/food', query: {geohash:'',title: foodItem.title, restaurant_category_id: getCategoryId(foodItem.link)}}" v-for="foodItem in item" :key="foodItem.id" class="link_to_food">
							<figure>
								<img :src="imgBaseUrl + foodItem.image_url">
								<figcaption>{{foodItem.title}}</figcaption>
							</figure>
						</router-link>
					</div>
				</div>
				<div class="swiper-pagination"></div>
			</div>
			<img src="../../images/fl.svg" class="fl_back animation_opactiy" v-else>
		</nav>
		<foot-guide></foot-guide>
	</div>
</template>

<script>
import { mapMutations } from 'vuex'
import headerCustomer from 'src/components/header/header-customer'
import footGuide from 'src/components/footer/foot-guide'
import { msiteAdress, msiteFoodTypes, cityGuess } from 'src/service/getData'
import 'src/plugins/swiper.min.js'
import 'src/style/swiper.min.css'

export default {
	data() {
		return {
			foodTypes: [], // 食品分类列表
			imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
		}
	},
	mounted() {
		//获取导航食品类型列表
		msiteFoodTypes('').then(res => {
			let resLength = res.length;
			let resArr = [...res]; // 返回一个新的数组
			let foodArr = [];
			for (let i = 0, j = 0; i < resLength; i += 8, j++) {
				foodArr[j] = resArr.splice(0, 8);
			}
			this.foodTypes = foodArr;
		}).then(() => {
			//初始化swiper
			new Swiper('.swiper-container', {
				pagination: '.swiper-pagination',
				loop: true
			});
		})
	},
	components: {
		headerCustomer,
		footGuide,
	},
	methods: {
		// 解码url地址，求去restaurant_category_id值
		getCategoryId(url) {
			let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name', ''));
			if (/restaurant_category_id/gi.test(urlData)) {
				return JSON.parse(urlData).restaurant_category_id.id
			} else {
				return ''
			}
		}
	},
	watch: {

	}
}

</script>

<style lang="scss" scoped>
@import 'src/style/mixin';

.shop_status_container {
	background-color: #fff;
	margin-bottom: .4rem;
	.shop_status_header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		line-height: 1.8rem;
		padding: 0 .6rem;
		border-bottom: 0.025rem solid #f1f1f1;
		.shop_detail_title {
			@include sc(.75rem, #333);
		}
		.identification_detail {
			@include sc(.7rem, #bbb);
			vertical-align: middle;
		}
		svg {
			@include wh(.6rem, .6rem);
			vertical-align: middle;
		}
	}
	.info-data {
		width: 100%;
		background: $fc;
		box-sizing: border-box;
		ul {
			.info-data-link {
				float: left;
				width: 33.33%;
				display: inline-block;
				border-right: 1px solid #f1f1f1;
				span {
					display: block;
					width: 100%;
					text-align: center;
				}
				.info-data-top {
					@include sc(.55rem, #333);
					padding: .853333rem 0 .453333rem;
					b {
						display: inline-block;
						@include sc(1.2rem, #f90);
						font-weight: 700;
						line-height: 1rem;
						font-family: Helvetica Neue, Tahoma;
					}
				}
				.info-data-bottom {
					@include sc(.57333rem, #666);
					font-weight: 400;
					padding-bottom: .453333rem;
				}
			}
			.info-data-link:nth-of-type(2) {
				.info-data-top {
					b {
						color: #ff5f3e;
					}
				}
			}
			.info-data-link:nth-of-type(3) {
				border: 0;
				.info-data-top {
					b {
						color: #6ac20b;
					}
				}
			}
		}
	}
}

.msite_nav {
	padding-top: .5rem;
	background-color: #fff;
	border-bottom: 0.025rem solid $bc;
	height: 9.4rem;
	.swiper-container {
		@include wh(100%, auto);
		padding-bottom: 1.2rem;
		.swiper-pagination {
			bottom: 0.2rem;
		}
	}
	.fl_back {
		@include wh(100%, 100%);
	}
}

.food_types_container {
	display: flex;
	flex-wrap: wrap;
	.link_to_food {
		width: 25%;
		padding: 0.3rem 0rem;
		@include fj(center);
		figure {
			img {
				margin-bottom: 0.3rem;
				@include wh(1.8rem, 1.8rem);
			}
			figcaption {
				text-align: center;
				@include sc(0.55rem, #666);
			}
		}
	}
}
</style>