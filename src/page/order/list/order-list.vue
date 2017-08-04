<template>
    <div class="page paddingTop">
        <header id='header_search'>
            <section class="header_title_goback" @click="$router.go(-1)" v-show="false">
                <svg class="icon">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#chevron-left"></use>
                </svg>
            </section>
            <section class="header_search_icon">
                <svg class="icon">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#search"></use>
                </svg>
            </section>
            <section class="search_keyword">
                <input v-model="keyword" type="number" placeholder="请输入单号..." class="search_text" />
            </section>
        </header>
        <section class="m-sort">
            <div class="sort_item" :class="{choose_type:sortBy == 'bizType'}">
                <div class="sort_item_container" @click="chooseType('bizType')">
                    <div class="sort_item_border">
                        <span :class="{category_title: sortBy == 'bizType'}">业务类型</span>
                        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                            <polygon points="0,3 10,3 5,8" />
                        </svg>
                    </div>
                </div>
                <transition name="showlist">
                    <section v-show="sortBy == 'bizType'" class="category_container sort_detail_type">
                        <section class="category_right">
                            <ul>
                                <li class="category_right_li" @click="selectBizType(12012)" :class="{category_right_choosed: hasSelectedBizType(12012)}">
                                    <span>销售订单</span>
                                    <svg v-if="hasSelectedBizType(12012)">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                </li>
                                <li class="category_right_li" @click="selectBizType(-12012)" :class="{category_right_choosed: hasSelectedBizType(-12012)}">
                                    <span>订单退回</span>
                                    <svg v-if="hasSelectedBizType(-12012)">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                </li>
                                <li class="category_right_li" @click="selectBizType(12032)" :class="{category_right_choosed: hasSelectedBizType(12032)}">
                                    <span>销售出库</span>
                                    <svg v-if="hasSelectedBizType(12032)">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                </li>
                                <li class="category_right_li" @click="selectBizType(-12032)" :class="{category_right_choosed: hasSelectedBizType(-12032)}">
                                    <span>出库退回</span>
                                    <svg v-if="hasSelectedBizType(-12032)">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                </li>
                            </ul>
                        </section>
                    </section>
                </transition>
            </div>
            <div class="sort_item" :class="{choose_type:sortBy == 'sort'}">
                <div class="sort_item_container" @click="chooseType('sort')">
                    <div class="sort_item_border">
                        <span :class="{category_title: sortBy == 'sort'}">排序</span>
                        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                            <polygon points="0,3 10,3 5,8" />
                        </svg>
                    </div>
                </div>
                <transition name="showlist">
                    <section v-show="sortBy == 'sort'" class="sort_detail_type">
                        <ul class="sort_list_container">
                            <li class="sort_list_li" @click="selectSort('SubmitTime','desc')">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#default"></use>
                                </svg>
                                <p data="0" :class="{sort_select: sort.sortByFiled == 'SubmitTime'}">
                                    <span>订单时间</span>
                                    <svg v-if="sort.sortByFiled == 'SubmitTime'">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                </p>
                            </li>
                            <li class="sort_list_li" @click="selectSort('TotalMoney','desc')">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hot"></use>
                                </svg>
                                <p data="1" :class="{sort_select: sort.sortByFiled == 'TotalMoney'}">
                                    <span>订单金额</span>
                                    <svg v-if="sort.sortByFiled == 'TotalMoney'">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                </p>
                            </li>
                            <li class="sort_list_li" @click="selectSort('GoodsTotalNum','desc')">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#speed"></use>
                                </svg>
                                <p data="2" :class="{sort_select: sort.sortByFiled == 'GoodsTotalNum'}">
                                    <span>商品数量</span>
                                    <svg v-if="sort.sortByFiled == 'GoodsTotalNum'">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                </p>
                            </li>
                            <li class="sort_list_li" @click="selectSort('CategoryNum','desc')">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#speed"></use>
                                </svg>
                                <p data="3" :class="{sort_select: sort.sortByFiled == 'CategoryNum'}">
                                    <span>品类</span>
                                    <svg v-if="sort.sortByFiled == 'CategoryNum'">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                </p>
                            </li>
                        </ul>
                    </section>
                </transition>
            </div>
            <div class="sort_item" :class="{choose_type:sortBy == 'activity'}">
                <div class="sort_item_container" @click="chooseType('activity')">
                    <span :class="{category_title: sortBy == 'activity'}">筛选</span>
                    <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                        <polygon points="0,3 10,3 5,8" />
                    </svg>
                </div>
                <transition name="showlist">
                    <section v-show="sortBy == 'activity'" class="sort_detail_type filter_container">
                        <section style="width: 100%;">
                            <header class="filter_header_style">状态</header>
                            <ul class="filter_ul">
                                <li class="filter_li" @click="selectFilter('orderState',1)">
                                    <svg v-show="filters.orderState == 1" class="activity_svg">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                    <span :class="{selected_filter: filters.orderState == 1}">草稿</span>
                                </li>
                                <li class="filter_li" @click="selectFilter('orderState',2)">
                                    <svg v-show="filters.orderState == 2" class="activity_svg">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                    <span :class="{selected_filter: filters.orderState == 2}">已确认</span>
                                </li>
                                <li class="filter_li" @click="selectFilter('orderState',5)">
                                    <svg v-show="filters.orderState == 5" class="activity_svg">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                    <span :class="{selected_filter: filters.orderState == 5}">已审核</span>
                                </li>
                                <li class="filter_li" @click="selectFilter('orderState',7)">
                                    <svg v-show="filters.orderState == 7" class="activity_svg">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                    <span :class="{selected_filter: filters.orderState == 7}">已完成</span>
                                </li>
                            </ul>
                        </section>
                        <section style="width: 100%;">
                            <header class="filter_header_style">销售</header>
                            <ul class="filter_ul">
                                <li class="filter_li" @click="selectFilter('OrderTime',1)">
                                    <svg v-show="filters.OrderTime == 1" class="activity_svg">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                    <span :class="{selected_filter: filters.OrderTime == 1}">今天</span>
                                </li>
                                <li class="filter_li" @click="selectFilter('OrderTime',7)">
                                    <svg v-show="filters.OrderTime == 7" class="activity_svg">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                    <span :class="{selected_filter: filters.OrderTime == 7}">一周</span>
                                </li>
                                <li class="filter_li" @click="selectFilter('OrderTime',30)">
                                    <svg v-show="filters.OrderTime == 30" class="activity_svg">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                    <span :class="{selected_filter: filters.OrderTime == 30}">一月</span>
                                </li>
                                <li class="filter_li" @click="selectFilter('OrderTime',365)">
                                    <svg v-show="filters.OrderTime == 365" class="activity_svg">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                    <span :class="{selected_filter: filters.OrderTime == 365}">一年</span>
                                </li>
                            </ul>
                        </section>
                        <section style="width: 100%;">
                            <header class="filter_header_style">物流代收</header>
                            <ul class="filter_ul">
                                <li class="filter_li" @click="selectFilter('OnlyPayedShip')">
                                    <svg v-show="filters.OnlyPayedShip" class="activity_svg">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                    <span :class="{selected_filter: filters.OnlyPayedShip}">仅物流代收</span>
                                </li>
                            </ul>
                        </section>
                        <footer class="confirm_filter">
                            <div class="clear_all filter_button_style" @click="clearSelect">清空</div>
                            <div class="confirm_select filter_button_style" @click="confirmSelectFun">确定
                                <span v-show="filterNum">({{filterNum}})</span>
                            </div>
                        </footer>
                    </section>
                </transition>
            </div>
        </section>
        <transition name="showcover">
            <div class="back_cover" v-show="sortBy"></div>
        </transition>
        <section class="m-list" v-load-more="loaderMore" v-if="orderList.length">
            <div v-for="item in orderList" :key="item.Id" @click="selectOrder(item.Id)">
                <section class="item">
                    <section class="title">
                        <h3 class="name ellipsis">
                            <strong>{{item.CustomerName}}</strong>
                        </h3>
                        <section class="time">
                            {{item.SubmitTime | time}}
                        </section>
                        <section class="content">
                            <span>单号:</span>
                            <span>{{item.BillNo}}</span>
                        </section>
                        <section class="content">
                            <span>状态:</span>
                            <span>{{item.StatusName}}</span>
                        </section>
                        <section class="content">
                            <span>仓库:</span>
                            <span>{{item.SendStorageName}}</span>
                        </section>
                        <section class="content">
                            <span>品类:</span>
                            <span>
                                <b class="count">{{item.CategoryNum}}</b>, 数量:
                                <b class="number">{{item.GoodsTotalNum}}</b>
                                <span class="total">总计:￥<b class="money">{{item.TotalMoney}}</b></span>
                            </span>
                        </section>
                    </section>
                </section>
            </div>
        </section>
    
        <ul v-else class="animation_opactiy">
            <li class="list_back_li" v-for="item in 10" :key="item">
                <img src="../../../images/shop_back_svg.svg" class="list_back_svg">
            </li>
        </ul>
        <p v-if="touchend" class="empty_data">没有更多了</p>
        <aside class="return_top" @click="backTop" v-if="showBackStatus">
            <svg class="back_top_svg">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
            </svg>
        </aside>
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
        <foot-guide></foot-guide>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { loadMore } from 'src/components/common/mixin'
import { showBack, animate } from 'src/config/mUtils'
import loading from 'src/components/common/loading'
import footGuide from 'src/components/footer/foot-guide'

import {
    apiGetForeignSaleOrderList,
    apiGetForeignSaleReturnOrderList,
    apiGetRetailOrderList,
    apiGetRetailReturnOrderList,
} from 'src/service/getData'


export default {
    data() {
        return {
            sortBy: '',                                             // 选项卡控制
            keyword: '',
            bizType: 12012,                                         // 业务类型
            sort: {
                sortByFiled: 'SubmitTime',
                sortByType: 'desc',
            },
            filters: {

            },
            filterNum: 0,                                           // 所选中的所有样式的集合
            confirmStatus: false,                                   // 确认选择
            //  -------- 以下为显示模型
            offset: 0,
            orderList: [], // 订单列表

            preventRepeatReuqest: false,                            //到达底部加载数据，防止重复加载
            showBackStatus: false,                                  //显示返回顶部按钮
            showLoading: true,                                      //显示加载动画
            touchend: false,                                        //没有更多数据
        }
    },

    mounted() {
        this.initData();
    },
    components: {
        loading,
        footGuide,
    },
    mixins: [loadMore,],
    computed: {
        ...mapState([
            'curCustomer',
            'userInfo',
        ]),
    },
    methods: {
        // 点击顶部三个选项，展示不同的列表，选中当前选项进行展示，同时收回其他选项
        async chooseType(type) {
            if (this.sortBy !== type) {
                this.sortBy = type;
            } else {
                // 再次点击相同选项时收回列表
                this.sortBy = '';
            }
        },
        selectBizType(bizType) {
            this.clearSelect();
            this.bizType = bizType;
        },
        hasSelectedBizType(bizType) {
            if (bizType == this.bizType) return true;
            return false;
        },
        // 点击某个排序方式，获取事件对象的data值，并根据获取的值重新获取数据渲染
        selectSort(filed, type) {
            this.sort.sortByFiled = filed;
            this.sort.sortByType = type;
            this.clearSelect();
        },
        selectFilter(name, val) {
            if (val)
                this.filters[name] = val;
            else
                this.filters[name] = !this.filters[name];

            this.countFilterNum();
        },
        countFilterNum() {
            this.filterNum = 0;
            for (var key in this.filters) {
                if (this.filters.hasOwnProperty(key)) {
                    var element = this.filters[key];
                    if (element)
                        this.filterNum++;
                }
            }
        },
        // 只有点击清空按钮才清空数据，否则一直保持原有状态
        clearSelect() {
            this.filters = {};
            this.filterNum = 0;
            this.queryModelChange();
        },
        confirmSelectFun() {
            this.initData();
            this.sortBy = '';
        },
        async initData() {
            //获取数据
            let res = await this.getOrders();
            this.orderList = [...res.Items];
            if (res.length < 20) {
                this.touchend = true;
            }
            this.hideLoading();
            //开始监听scrollTop的值，达到一定程度后显示返回顶部按钮
            showBack(status => {
                this.showBackStatus = status;
            });
        },
        async queryModelChange() {
            this.showLoading = true;
            this.offset = 0;
            let res = await this.getOrders();;
            this.hideLoading();
            // 考虑到本地模拟数据是引用类型，所以返回一个新的数组
            this.orderList = [...res.Items];
        },
        async getOrders() {
            if (this.bizType == 12012) {
                // 销售订单
                return await apiGetForeignSaleOrderList(this.userInfo.UserId, 0, this.keyword, this.sort.sortByFiled, this.sort.sortByType, this.filters, this.offset);
            } else if (this.bizType == (0 - 12012)) {
                // 订单退回
                return await apiGetForeignSaleReturnOrderList(this.userInfo.UserId, 0, this.keyword, this.sort.sortByFiled, this.sort.sortByType, this.filters, this.offset);
            } else if (this.bizType == 12032) {
                // 销售出库
                return await apiGetRetailOrderList(this.userInfo.UserId, 0, this.keyword, this.sort.sortByFiled, this.sort.sortByType, this.filters, this.offset);
            } else if (this.bizType == (0 - 12032)) {
                // 销售出库退回
                return await apiGetRetailReturnOrderList(this.userInfo.UserId, 0, this.keyword, this.sort.sortByFiled, this.sort.sortByType, this.filters, this.offset);
            } else if (this.bizType == 22022) {
                // 预收款
                // 需要补充api
                return [];
            }
            return [];
        },
        // 到达底部加载更多数据
        async loaderMore() {
            if (this.touchend) {
                return
            }
            // 防止重复请求
            if (this.preventRepeatReuqest) {
                return
            }
            this.showLoading = true;
            this.preventRepeatReuqest = true;

            // 数据的定位加20位
            this.offset += 20;
            let res = await this.getOrders();
            this.hideLoading();
            this.orderList = [...this.orderList, ...res.Items];
            // 当获取数据小于20，说明没有更多数据，不需要再次请求数据
            if (res.length < 20) {
                this.touchend = true;
                return
            }
            this.preventRepeatReuqest = false;
        },
        // 选定某订单
        selectOrder(orderId) {
            this.$router.push({ path: '/order/detail/', query: { Id: orderId, bizType: this.bizType } });
        },
        // 返回顶部
        backTop() {
            animate(document.body, { scrollTop: '0' }, 400, 'ease-out');
        },
        // 开发环境与编译环境loading隐藏方式不同
        hideLoading() {
            this.showLoading = false;
        },
    },
    watch: {
        keyword: function (val) {
            this.queryModelChange();
        },
        bizType: function (val) {
            this.queryModelChange();
        },
        sortByFiled: function (val) {
            this.queryModelChange();
        },
        confirmSelect: function (val) {
            this.queryModelChange();
        }
    },
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
@import '../order';

.page {
    margin-top: 1.275rem;
    margin-bottom: 2.2rem;

    #header_search .header_search_icon {
        @include indent05;
        margin-top: .275rem;
    }

    .m-list {
        margin-top: .4rem;
        header {
            background-color: $background-light-color;
            @include indent10;
            @include sc(.65rem, $font-color);
        }
        .item {
            @include indent10;
            .title {
                flex: auto;
                display: block;
               
                .name{
                     width: 9rem;
                }
            }
            .time {
                position: absolute;
                right: 0.55rem;
                top: 0.65rem;
            }

            .total{
                position: absolute;
                right: 0.55rem;
            }
        }
    }
}
</style>