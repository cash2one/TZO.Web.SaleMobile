<template>
	<div class="customer_container">
		<div v-load-more="loaderMore" v-if="customerList.length" class="m-list">
			<section v-for="item in customerList" :key="item.Id" class="item">
				<section class="item-left" :to="'customer/detail/' + item.Id">
					<!-- <img :src="imgBaseUrl + item.image_path" class="customer_img"> -->
					<svg class="icon">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#customer"></use>
					</svg>
					<div class="distance">
						<span v-if="item.Distance">{{item.Distance > 1000? (item.Distance/1000).toFixed(2) + 'km': item.Distance + 'm'}}
						</span>
					</div>
				</section>
				<section class="item-right" @click="chooseCustomer(item)">
					<section class="title">
						<div class="name ellipsis">
							<strong>{{item.BizObj.Name}}</strong>
						</div>
						<div class="level">
							{{item.CustomerLevelName}}
						</div>
					</section>
					<section class="content">
						<div>最后下单时间：{{item.LastSaleTime | time}}</div>
						<div>近期销售次数：{{item.SaleCount}} 单</div>
						<div v-if="item.OughtRecMinTime != '0001-01-01T00:00:00+00:00'">
							账龄 {{item.OughtRecAge}} 天
						</div>
					</section>
					<div class="number">
						<span>出账金额：{{item.ChargeOffMoney}}</span>
						<span>¥</span>
					</div>
					<div class="number">
						<span>应收款: {{item.OughtRecMoney}}</span>
						<span>¥</span>
					</div>
					<ul class="detail">
						<li v-for="phone in item.BizObj.Phones" :key="phone.Id">
							<span>{{phone.Contact}}</span>
							<span>
								: {{phone.PhoneNum}}
							</span>
						</li>
						<li v-for="addr in item.BizObj.Addrs" :key="addr.Id">
							地址：
							<span>{{addr.Addr}}</span>
						</li>
					</ul>
				</section>
			</section>
		</div>
		<section v-else class="m-list">
			<section class="list_back_li" v-for="item in 10" :key="item">
				<img src="../../images/shopback.svg" class="list_back_svg">
			</section>
		</section>
		<p v-if="touchend" class="empty_data">没有更多了</p>
		<aside class="return_top" @click="backTop" v-if="showBackStatus">
			<svg class="back_top_svg">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
			</svg>
		</aside>
		<transition name="loading">
			<loading v-show="showLoading"></loading>
		</transition>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { loadMore, getImgPath } from './mixin'
import { showBack, animate } from 'src/config/mUtils'
import loading from './loading'
import { apiGetCustomers } from 'src/service/getData'

export default {
	data() {
		return {
			offset: 0, 			// 批次加载店铺列表，每次加载20个 limit = 20
			customerList: [],	// 客户列表

			curLatitude: 0,
			curLongitude: 0,

			preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
			showBackStatus: false, //显示返回顶部按钮
			showLoading: true, //显示加载动画
			touchend: false, //没有更多数据
		}
	},
	mounted() {
		this.initData();
	},
	components: {
		loading,
	},
	props: ['keyword', 'bizAreaId', 'sortByFiled', 'sortByType', 'filters', 'confirmSelect'],
	mixins: [loadMore, getImgPath],
	computed: {
		...mapState([
			'latitude',
			'longitude',
			'lastPositionTime',
			'curCustomer',
		]),
	},
	methods: {
		...mapMutations([
			'SAVE_CUR_CUSTOMER'
		]),
		chooseCustomer(val) {
			this.SAVE_CUR_CUSTOMER(val);
			this.$router.push('/home');
		},
		async getCustomers() {
			console.log(this.curLatitude + ':' + this.curLongitude);
			return await apiGetCustomers(this.curLongitude, this.curLatitude, this.bizAreaId, this.keyword, this.sortByFiled, this.sortByType, this.filters, this.offset);
		},
		async initData() {
			//获取数据
			// let res = await this.getCustomers();
			// this.customerList = [...res];
			// if (res.length < 20) {
			// 	this.touchend = true;
			// }
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
			let res = await this.getCustomers();
			this.hideLoading();
			this.customerList = [...this.customerList, ...res.Items];
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
			let res = await this.getCustomers();
			this.hideLoading();
			//考虑到本地模拟数据是引用类型，所以返回一个新的数组
			this.customerList = [...res.Items];
		},
		//开发环境与编译环境loading隐藏方式不同
		hideLoading() {
			this.showLoading = false;
		},
	},
	watch: {
		keyword: function (val) {
			this.listenPropChange();
		},
		bizAreaId: function (val) {
			this.listenPropChange();
		},
		//监听父级传来的排序方式
		sortByFiled: function (val) {
			this.listenPropChange();
		},
		//监听父级的确认按钮是否被点击，并且返回一个自定义事件通知父级，已经接收到数据，此时父级才可以清除已选状态
		confirmSelect: function (val) {
			this.listenPropChange();
			// this.$emit('DidConfrim');
		},
		lastPositionTime: function (val, oldVal) {
			if (!oldVal) {
				this.curLongitude = this.longitude;
				this.curlatitude = this.latitude;
				this.listenPropChange();
			}
		},
	}
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';
.customer_container {
	margin-top: 3.5rem;
	.m-list {
		.item {
			@include fj();
			.item-left {
				margin-right: .2rem;
				.icon {
					@include wh(2.7rem, 2.7rem);
					display: block;
				}
			}
			.item-right {
				flex: auto;
				.title {
					.level {
						@include sc(.6rem, $font-light-color);
					}
				}
				.detail {
					padding-top: 0.25rem;
					border-top: 0.025rem solid #f1f1f1;
					li {
						font-size: 0;
						span {
							font-size: .5rem;
							vertical-align: middle;
							display: inline-block;
							margin-bottom: 0.2rem;
						}
					}
				}
			}

			.distance {
				margin-top: 1rem;
				text-align: center;
				@include sc(.6rem, $font-light-color);
			}
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
