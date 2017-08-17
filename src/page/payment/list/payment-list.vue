<template>
    <div class="page">
        <section v-show="!showLoading" class="scroll_container">
            <header class="header_search">
                <section class="header_title_goback" @click="$router.go(-1)">
                    <svg class="icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#chevron-left"></use>
                    </svg>
                </section>
                <section class="search_keyword">
                    <section class="header_search_icon">
                        <svg class="icon">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#search"></use>
                        </svg>
                    </section>
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
                                    <li class="category_right_li" @click="selectBizType(22020)" :class="{category_right_choosed: hasSelectedBizType(22020)}">
                                        <span>预收</span>
                                        <svg v-if="hasSelectedBizType(22020)">
                                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                        </svg>
                                    </li>
                                    <li class="category_right_li" @click="selectBizType(22010)" :class="{category_right_choosed: hasSelectedBizType(22010)}">
                                        <span>收款</span>
                                        <svg v-if="hasSelectedBizType(22010)">
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
                                <li class="sort_list_li" @click="selectSort('Money','desc')">
                                    <svg>
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hot"></use>
                                    </svg>
                                    <p data="1" :class="{sort_select: sort.sortByFiled == 'TotalMoney'}">
                                        <span>收款金额</span>
                                        <svg v-if="sort.sortByFiled == 'TotalMoney'">
                                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                        </svg>
                                    </p>
                                </li>
                                <li class="sort_list_li" @click="selectSort('CreateTime','desc')">
                                    <svg>
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#default"></use>
                                    </svg>
                                    <p data="0" :class="{sort_select: sort.sortByFiled == 'CreateTime'}">
                                        <span>收款时间</span>
                                        <svg v-if="sort.sortByFiled == 'CreateTime'">
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
                                    <li class="filter_li" @click="selectFilter('orderState',2)">
                                        <svg v-show="filters.orderState == 2" class="activity_svg">
                                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                        </svg>
                                        <span :class="{selected_filter: filters.orderState == 2}">已确认</span>
                                    </li>
                                    <li class="filter_li" @click="selectFilter('orderState',4)">
                                        <svg v-show="filters.orderState == 4" class="activity_svg">
                                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                        </svg>
                                        <span :class="{selected_filter: filters.orderState == 4}">已审核</span>
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
            <section class="order-list" v-load-more="loaderMore" v-if="orderList.length">
                <div v-for="item in orderList" :key="item.Id" @click="selectOrder(item.Id)">
                    <section class="item">
                        <section class="title">
                            <h3 class="name ellipsis">
                                <strong>{{item.CustomerName}}</strong>
                            </h3>
                            <section>
                                {{item.CreateTime | time}}
                            </section>
    
                            <section class="status">
    
                            </section>
                        </section>
                        <section class="content">
                            <section>
                                <span>单号:</span>
                                <span>{{item.BillNo}}</span>
                            </section>
                            <section>
                                <span>账户:</span>
                                <span>{{item.RecAccountName}}</span>
                            </section>
                        </section>
                        <section class="detail">
                            <section>
                                <span>金额:￥
                                    <b class="money">{{item.Money}}</b>
                                </span>
                            </section>
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="40" height="14">
                                <polygon points="0,10 4,0 40,0 36,10" style="fill:none;stroke:#FF6000;stroke-width:1" />
                                <line x1="1.5" y1="11" x2="36" y2="11" style="stroke:#FF6000;stroke-width:1.5" />
                                <text x="3.5" y="9" style="fill:#FF6000;font-size:10;font-weight:bold;">{{item.StatusName}}</text>
                            </svg>
                        </section>
                    </section>
                </div>
            </section>
            <section v-else class="order-list">
                <section class="list_back_li" v-for="item in 10" :key="item">
                    <img src="../../../images/shopback.svg" class="list_back_svg">
                </section>
            </section>
            <p v-if="touchend" class="empty_data">没有更多了</p>
            <aside class="return_top" @click="backTop" v-if="showBackStatus">
                <svg class="back_top_svg">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
                </svg>
            </aside>
        </section>
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { loadMore } from 'src/components/common/mixin'
import { showBack, animate } from 'src/config/mUtils'
import loading from 'src/components/common/loading'
import { apiGetRecSettlementList } from 'src/service/getData'

export default {
    data() {
        return {
            sortBy: '',                                             // 选项卡控制
            keyword: '',
            bizType: 22010,                                         // 业务类型
            sort: {
                sortByFiled: 'Money',
                sortByType: 'desc',
            },
            filters: {
                orderState: 2,
                RecAccountType: 0,
            },
            filterNum: 0,                                           // 所选中的所有样式的集合
            confirmStatus: false,                                   // 确认选择
            //  -------- 以下为显示模型
            offset: 0,
            orderList: [],                                          // 单据列表

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
            if (res.Items.length < 20) {
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

            let startDate = new Date();
            startDate.setHours(0, 0, 0, 0);
            let endDate = new Date();
            endDate.setHours(23, 59, 59, 999);

            return await apiGetRecSettlementList(this.userInfo.UserId, this.bizType, this.keyword, startDate, endDate,
                this.sort.sortByFiled, this.sort.sortByType, this.filters, this.offset);
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
            if (res.Items.length < 20) {
                this.touchend = true;
                return
            }
            this.preventRepeatReuqest = false;
        },
        // 选定收款单
        selectOrder(orderId) {
            this.$router.push({ path: '/payment/list/detail/', query: { Id: orderId } });
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

.page {
    .scroll_container {
        padding-top: 3.7rem;
        .m-sort {
            .sort_item {
                .category_container {
                    .category_right {
                        height: initial;
                    }
                }
            }
        }
    }
}
</style>