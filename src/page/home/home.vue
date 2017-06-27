<template>
	<div>
		<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position:absolute;width:0;height:0">
			<defs>
				<symbol viewBox="0 0 1024 1024" id="home_order">
					<path fill="#FF9800" d="M654.222222 1024a312.888889 312.888889 0 1 1 312.888889-312.888889 312.888889 312.888889 0 0 1-312.888889 312.888889z m134.257778-276.423111a27.306667 27.306667 0 0 0-38.456889 0L682.666667 814.478222V540.444444a28.444444 28.444444 0 0 0-56.888889 0v274.204445l-68.266667-67.982222a27.591111 27.591111 0 0 0-38.855111 0 27.192889 27.192889 0 0 0 0 38.627555l112.014222 111.331556A27.989333 27.989333 0 0 0 654.222222 910.222222a26.851556 26.851556 0 0 0 18.887111-8.704s0.625778 0 0.853334-0.341333 0-0.853333 0.512-1.194667a28.444444 28.444444 0 0 0 5.290666-6.144l108.657778-108.088889a26.908444 26.908444 0 0 0 0.056889-38.172444z m-176.981333-401.92A27.648 27.648 0 0 0 597.333333 341.333333h-341.333333a28.444444 28.444444 0 0 0 0 56.888889h203.036444A374.101333 374.101333 0 0 0 341.333333 516.152889V512H256a28.444444 28.444444 0 0 0 0 56.888889h57.230222A364.657778 364.657778 0 0 0 284.444444 711.111111 368.526222 368.526222 0 0 0 459.036444 1024H170.666667a113.777778 113.777778 0 0 1-113.777778-113.777778V113.777778a113.777778 113.777778 0 0 1 113.777778-113.777778h568.888889a113.777778 113.777778 0 0 1 113.777777 113.777778v286.549333A367.160889 367.160889 0 0 0 654.222222 341.333333a364.088889 364.088889 0 0 0-42.723555 4.323556zM682.666667 199.111111a28.444444 28.444444 0 0 0-28.444445-28.444444h-398.222222a28.444444 28.444444 0 0 0 0 56.888889h398.222222a28.444444 28.444444 0 0 0 28.444445-28.444445z"></path>
				</symbol>
				<symbol viewBox="0 0 1024 1024" id="home_retail">
					<path fill="#FF9800" d="M910.222222 398.222222v512a56.888889 56.888889 0 0 1-56.888889 56.888889H170.666667a56.888889 56.888889 0 0 1-56.888889-56.888889V398.222222H56.888889V56.888889h910.222222v341.333333h-56.888889z m-512 227.555556h227.555556a56.888889 56.888889 0 0 0 0-113.777778H398.222222a56.888889 56.888889 0 0 0 0 113.777778z m455.111111-455.111111H170.666667v113.777777h682.666666V170.666667z"></path>
				</symbol>
				<symbol viewBox="0 0 1024 1024" id="home_return">
					<path fill="#FF9800" d="M910.222222 398.222222v512a56.888889 56.888889 0 0 1-56.888889 56.888889H170.666667a56.888889 56.888889 0 0 1-56.888889-56.888889V398.222222H56.888889V56.888889h910.222222v341.333333h-56.888889zM290.929778 558.876444l115.825778 115.598223a27.306667 27.306667 0 1 0 38.627555-38.570667L378.197333 568.888889H597.333333a85.333333 85.333333 0 0 1 0 170.666667H341.333333v56.888888h256a142.222222 142.222222 0 0 0 0-284.444444H376.490667l68.892444-68.778667a27.306667 27.306667 0 1 0-38.627555-38.513777L290.929778 520.305778a27.192889 27.192889 0 0 0 0 38.570666zM853.333333 170.666667H170.666667v113.777777h682.666666V170.666667z"></path>
				</symbol>
				<symbol viewBox="0 0 1024 1024" id="home_payment">
					<path fill="#FF9800" d="M853.333333 967.111111H170.666667l-113.777778-398.222222 56.888889-398.222222h113.777778l-56.888889 398.222222h170.666666l56.888889 113.777778h227.555556l56.888889-113.777778h170.666666l-56.888889-398.222222h113.777778l56.888889 398.222222zM637.155556 263.793778l-66.616889 61.155555V111.445333a59.676444 59.676444 0 0 0-118.897778 0v213.504L384.967111 263.793778a63.260444 63.260444 0 0 0-84.081778 0 51.2 51.2 0 0 0 0 77.141333L469.048889 494.933333a63.260444 63.260444 0 0 0 84.081778 0l168.106666-154.282666a51.2 51.2 0 0 0 0-77.141334 63.260444 63.260444 0 0 0-84.081777 0.284445z"></path>
				</symbol>
				<symbol viewBox="0 0 1024 1024" id="home_delivery">
					<path fill="#FF9800" d="M853.333333 967.111111H170.666667a113.777778 113.777778 0 0 1-113.777778-113.777778V284.444444l455.111111-227.555555 56.888889 56.888889-455.111111 227.555555h796.444444l-341.333333-113.777777 56.888889-56.888889 341.333333 113.777777v568.888889a113.777778 113.777778 0 0 1-113.777778 113.777778z m-28.444444-284.444444h-227.555556a28.444444 28.444444 0 0 0 0 56.888889h227.555556a28.444444 28.444444 0 0 0 0-56.888889z m0 113.777777h-398.222222a28.444444 28.444444 0 0 0 0 56.888889h398.222222a28.444444 28.444444 0 0 0 0-56.888889z"></path>
				</symbol>
				<symbol viewBox="0 0 1024 1024" id="home_express">
					<path fill="#FF9800" d="M0.000332 227.865164L512.6543 0 1025.308268 227.865164 512.6543 455.730327zM455.787526 1024l-454.934193-227.467096-0.853001-454.934192L455.787526 569.065808v454.934192z m568.66774-227.467096l-454.934192 227.467096v-454.934192l455.787194-227.467096z"></path>
				</symbol>
				<symbol viewBox="0 0 1024 1024" id="home_knowledge">
					<path fill="#FF9800" d="M768 1024a256 256 0 1 1 256-256 256 256 0 0 1-256 256z m0-341.333333a85.333333 85.333333 0 1 0 85.333333 85.333333 85.333333 85.333333 0 0 0-85.333333-85.333333z m-512 341.333333A256 256 0 1 1 512 768 256 256 0 0 1 256 1024z m0-341.333333A85.333333 85.333333 0 1 0 341.333333 768 85.333333 85.333333 0 0 0 256 682.666667zM512 568.888889a284.444444 284.444444 0 1 1 284.444444-284.444445 284.444444 284.444444 0 0 1-284.444444 284.444445z m0-398.222222a113.777778 113.777778 0 1 0 113.777778 113.777777 113.777778 113.777778 0 0 0-113.777778-113.777777z"></path>
				</symbol>
				<symbol viewBox="0 0 1024 1024" id="home_customer">
					<path fill="#FF9800" d="M113.777778 1024c0-170.666667 34.133333-384.227556 209.180444-471.552A282.282667 282.282667 0 0 0 512 625.777778l-113.777778 227.555555 113.777778 103.992889L625.777778 853.333333l-113.777778-227.555555a282.282667 282.282667 0 0 0 189.041778-73.329778C876.088889 639.772444 910.222222 853.333333 910.222222 1024H113.777778z m398.222222-455.111111a284.444444 284.444444 0 1 1 284.444444-284.444445 284.444444 284.444444 0 0 1-284.444444 284.444445z"></path>
				</symbol>
				<symbol viewBox="0 0 1024 1024" id="home_shop_go">
					<path fill="#FF9800" d="M796.444444 1024H227.555556a113.777778 113.777778 0 0 1-113.777778-113.777778V170.666667a113.777778 113.777778 0 0 1 113.777778-113.777778h113.777777v170.666667h341.333334V56.888889h113.777777a113.777778 113.777778 0 0 1 113.777778 113.777778v739.555555a113.777778 113.777778 0 0 1-113.777778 113.777778zM312.888889 398.222222A85.333333 85.333333 0 1 0 398.222222 483.555556 85.333333 85.333333 0 0 0 312.888889 398.222222z m0 284.444445A85.333333 85.333333 0 1 0 398.222222 768 85.333333 85.333333 0 0 0 312.888889 682.666667z m455.111111-284.444445h-284.444444a28.444444 28.444444 0 0 0 0 56.888889h284.444444a28.444444 28.444444 0 0 0 0-56.888889z m0 113.777778h-284.444444a28.444444 28.444444 0 0 0 0 56.888889h284.444444a28.444444 28.444444 0 0 0 0-56.888889z m0 170.666667h-284.444444a28.444444 28.444444 0 0 0 0 56.888889h284.444444a28.444444 28.444444 0 0 0 0-56.888889z m0 113.777777h-284.444444a28.444444 28.444444 0 0 0 0 56.888889h284.444444a28.444444 28.444444 0 0 0 0-56.888889zM568.888889 170.666667H455.111111a56.888889 56.888889 0 0 1-56.888889-56.888889V56.888889a56.888889 56.888889 0 0 1 56.888889-56.888889h113.777778a56.888889 56.888889 0 0 1 56.888889 56.888889v56.888889a56.888889 56.888889 0 0 1-56.888889 56.888889z"></path>
				</symbol>
				<symbol viewBox="0 0 1024 1024" id="home_shop_back">
					<path fill="#FF9800" d="M796.444444 1024H227.555556a113.777778 113.777778 0 0 1-113.777778-113.777778V170.666667a113.777778 113.777778 0 0 1 113.777778-113.777778h113.777777v170.666667h341.333334V56.888889h113.777777a113.777778 113.777778 0 0 1 113.777778 113.777778v739.555555a113.777778 113.777778 0 0 1-113.777778 113.777778z m-170.666666-512H334.449778l112.355555-112.355556a28.444444 28.444444 0 1 0-40.220444-40.220444L245.646222 520.305778a28.444444 28.444444 0 0 0 0 40.220444l160.881778 160.881778a28.444444 28.444444 0 0 0 40.220444-40.220444L334.449778 568.888889H625.777778a113.777778 113.777778 0 0 1 0 227.555555H284.444444v56.888889h341.333334a170.666667 170.666667 0 0 0 0-341.333333z m-56.888889-341.333333H455.111111a56.888889 56.888889 0 0 1-56.888889-56.888889V56.888889a56.888889 56.888889 0 0 1 56.888889-56.888889h113.777778a56.888889 56.888889 0 0 1 56.888889 56.888889v56.888889a56.888889 56.888889 0 0 1-56.888889 56.888889z"></path>
				</symbol>
	
				<symbol viewBox="0 0 24 24" id="home_path">
					<path fill="#000000" d="M16,2V8H17.08L14.95,13H14.26L12,9.97V5H6V11H6.91L4.88,16H2V22H8V16H7.04L9.07,11H10.27L12,13.32V19H18V13H17.12L19.25,8H22V2M18,4H20V6H18M8,7H10V9H8M14,15H16V17H14M4,18H6V20H4" />
				</symbol>
				<symbol viewBox="0 0 14 14" id="home_arrow">
					<path d="M0 0 L8 7 L0 14" stroke="#bbb" stroke-width="1.5" fill="none" />
				</symbol>
			</defs>
		</svg>
		<header-customer customerId="1"></header-customer>
		<section class="shop_status_container">
			<div class="shop_status_header">
				<router-link to="/path">
					<span class="shop_detail_title">路线</span>
				</router-link>
				<svg style="width:24px;height:24px">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#home_path"></use>
				</svg>
				<router-link to="location">
					<span class="identification_detail">定位</span>
					<svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#home_arrow"></use>
					</svg>
				</router-link>
			</div>
		</section>
		<section class="shop_status_container">
			<router-link to="/shop/shopDetail/shopSafe" class="shop_status_header">
				<span class="shop_detail_title">业务情况</span>
				<div>
					<span class="identification_detail">详情</span>
					<svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#home_arrow"></use>
					</svg>
				</div>
			</router-link>
			<section class="info-data">
				<ul class="clear">
					<router-link to="/customer/bill/1" tag="li" class="info-data-link">
						<span class="info-data-top">
							<b>22</b>元</span>
						<span class="info-data-bottom">欠款金额</span>
					</router-link>
					<router-link to="/order/list" tag="li" class="info-data-link">
						<span class="info-data-top">
							<b>11</b>个</span>
						<span class="info-data-bottom">订单数量</span>
					</router-link>
					<router-link to="/order/detail" tag="li" class="info-data-link">
						<span class="info-data-top">
							<b>111</b>个</span>
						<span class="info-data-bottom">商品数量</span>
					</router-link>
				</ul>
			</section>
		</section>
		<nav class="msite_nav">
			<div class="swiper-container" v-if="shortcuts.length">
				<div class="swiper-wrapper">
					<div class="swiper-slide food_types_container" v-for="(group, index) in shortcuts" :key="index">
						<router-link :to="{path: item.path}" v-for="item in group" :key="item.id" class="link_to_food">
							<figure>
								<svg class="icon_style">
									<use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="item.image_url"></use>
								</svg>
								<!--<img :src="imgBaseUrl + item.image_url">-->
								<figcaption>{{item.title}}</figcaption>
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
			shortcuts: [
				[
					{
						id: 1,
						path: '/goods/search',
						image_url: '#home_order',
						title: '订单'
					},
					{
						id: 2,
						path: '/goods/stock',
						image_url: '#home_retail',
						title: '销售出库'
					},
					{
						id: 3,
						path: '/order/list',
						image_url: '#home_return',
						title: '退货'
					},
					{
						id: 4,
						path: '/payment/new',
						image_url: '#home_payment',
						title: '收款'
					},
					{
						id: 5,
						path: '/delivery',
						image_url: '#home_delivery',
						title: '送货'
					},
					{
						id: 6,
						path: '/express',
						image_url: '#home_express',
						title: '发货'
					},
					{
						id: 7,
						path: '/knowledge',
						image_url: '#home_knowledge',
						title: '知识库'
					},
					{
						id: 8,
						path: '/customer/new',
						image_url: '#home_customer',
						title: '新客户'
					},
				],
				[
					{
						id: 9,
						path: '/shop-go',
						image_url: '#home_shop_go',
						title: '出店'
					},
					{
						id: 10,
						path: '/shop-back',
						image_url: '#home_shop_back',
						title: '回店'
					},
				]

			],
			foodTypes: [], // 食品分类列表
			imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
		}
	},
	mounted() {
		//初始化swiper
		new Swiper('.swiper-container', {
			pagination: '.swiper-pagination',
			loop: true
		});
	},
	components: {
		headerCustomer,
		footGuide,
	},
	methods: {

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
			text-align: center;
			svg {
				margin-bottom: 0.3rem;
				@include wh(1.5rem, 1.5rem);
			}
			figcaption {
				text-align: center;
				@include sc(0.55rem, #666);
			}
		}
	}
}
</style>