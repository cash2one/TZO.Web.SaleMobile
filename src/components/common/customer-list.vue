<template>
	<div class="customer_container">
		<div v-load-more="loaderMore" v-if="shopListArr.length" class="m-list">
			<router-link :to="'customer/detail/' + item.Id" v-for="item in shopListArr" tag='section' :key="item.Id" class="item customer_li">
				<section>
					<img :src="imgBaseUrl + item.image_path" class="customer_img">
				</section>
				<section class="ellipsis">
					<strong class="name">{{item.BizObj.Name}}</strong>
					<div class="content">
						<section v-for="phone in item.BizObj.Phones" :key="phone.Id">
							<span>{{phone.Contact}}</span>
							<span>
								: {{phone.PhoneNum}}
							</span>
						</section>
						<p>
							<div v-for="addr in item.BizObj.Addrs" :key="addr.Id">
								<span v-if="Number(item.Distance)">{{item.Distance > 1000? (item.distance/1000).toFixed(2) + 'km': item.distance + 'm'}}
									<span>/</span>
								</span>
								<span v-else>{{addr.Addr}}</span>
							</div>
						</p>
					</div>
				</section>
			</router-link>
		</div>
		<section v-else class="m-list">
			<section class="list_back_li" v-for="item in 10" :key="item">
				<img src="../../images/shopback.svg" class="list_back_svg">
			</section>
		</section>
		<!--<p v-if="touchend" class="empty_data">没有更多了</p>-->
		<!--<aside class="return_top" @click="backTop" v-if="showBackStatus">
											<svg class="back_top_svg">
												<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
											</svg>
										</aside>-->
		<div ref="abc" style="background-color: red;"></div>
		<transition name="loading">
			<loading v-show="showLoading"></loading>
		</transition>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { imgBaseUrl } from 'src/config/env'
import { loadMore, getImgPath } from './mixin'
import { showBack, animate } from 'src/config/mUtils'
import loading from './loading'
import { getCustomers } from 'src/service/getData'

export default {
	data() {
		return {
			offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
			shopListArr: [], // 店铺列表数据
			preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
			showBackStatus: false, //显示返回顶部按钮
			showLoading: true, //显示加载动画
			touchend: false, //没有更多数据
			imgBaseUrl,
			areaId: null,
			keyword: null,
			gps: null,
			statements: null
		}
	},
	mounted() {
		this.initData();
	},
	components: {
		loading,
	},
	props: ['sortByType'],
	mixins: [loadMore, getImgPath],
	computed: {
		...mapState([
			'latitude', 'longitude'
		]),
	},
	methods: {
		async initData() {
			//获取数据
			let res = await getCustomers(this.areaId, this.keyword, this.offset, this.gps, this.statements);
			this.shopListArr = [...res.Items];
			if (res.length < 20) {
				this.touchend = true;
			}
			this.hideLoading();
			//开始监听scrollTop的值，达到一定程度后显示返回顶部按钮
			showBack(status => {
				this.showBackStatus = status;
			});
		},
		//到达底部加载更多数据
		async loaderMore() {
			if (this.touchend) {
				return
			}
			//防止重复请求
			if (this.preventRepeatReuqest) {
				return
			}
			this.showLoading = true;
			this.preventRepeatReuqest = true;

			//数据的定位加20位
			this.offset += 20;
			let res = await getCustomers(this.areaId, this.keyword, this.offset, this.gps, this.statements);
			this.hideLoading();
			this.shopListArr = [...this.shopListArr, ...res.Items];
			//当获取数据小于20，说明没有更多数据，不需要再次请求数据
			if (res.length < 20) {
				this.touchend = true;
				return
			}
			this.preventRepeatReuqest = false;
		},
		//返回顶部
		backTop() {
			animate(document.body, { scrollTop: '0' }, 400, 'ease-out');
		},
		//监听父级传来的数据发生变化时，触发此函数重新根据属性值获取数据
		async listenPropChange() {
			this.showLoading = true;
			this.offset = 0;
			let res = await getCustomers(this.areaId, this.keyword, this.offset, this.gps, this.statements);
			this.hideLoading();
			//考虑到本地模拟数据是引用类型，所以返回一个新的数组
			this.shopListArr = [...res.Items];
		},
		//开发环境与编译环境loading隐藏方式不同
		hideLoading() {
			this.showLoading = false;
		},
	},
	watch: {
		//监听父级传来的restaurantCategoryIds，当值发生变化的时候重新获取餐馆数据，作用于排序和筛选
		restaurantCategoryIds: function (value) {
			this.listenPropChange();
		},
		//监听父级传来的排序方式
		sortByType: function (value) {
			this.listenPropChange();
		},
		//监听父级的确认按钮是否被点击，并且返回一个自定义事件通知父级，已经接收到数据，此时父级才可以清除已选状态
		confirmSelect: function (value) {
			this.listenPropChange();
			this.$emit('DidConfrim');
		}
	}
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';
.customer_container {
	margin-top: 3.5rem;
	.m-list section {
		width: inherit;
	}
	
	.customer_li {
		display: flex;
		.customer_img {
			@include wh(2.7rem, 2.7rem);
			display: block;
			margin-right: 0.4rem;
		}
	}
}

.list_back_li {
	height: 4.85rem;
	.list_back_svg {
		@include wh(100%, 100%)
	}
}

.loader_more {
	@include font(0.6rem, 3);
	text-align: center;
	color: #999;
}

.empty_data {
	@include sc(0.5rem, #666);
	text-align: center;
	line-height: 2rem;
}

.return_top {
	position: fixed;
	bottom: 3rem;
	right: 1rem;
	.back_top_svg {
		@include wh(2rem, 2rem);
	}
}

.loading-enter-active,
.loading-leave-active {
	transition: opacity 1s
}

.loading-enter,
.loading-leave-active {
	opacity: 0
}
</style>
