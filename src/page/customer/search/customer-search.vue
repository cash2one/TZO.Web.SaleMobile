<template>
    <div>
        <header id='header_search'>
            <section class="header_title_goback" @click="$router.go(-1)">
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
                <input v-model="keyword" type="text" placeholder="请输关键字或拼音码" class="search_text" />
            </section>
        </header>
        <section class="m-sort">
            <div class="sort_item" :class="{choose_type:sortBy == 'bizArea'}">
                <div class="sort_item_container" @click="chooseType('bizArea')">
                    <div class="sort_item_border">
                        <span :class="{category_title: sortBy == 'bizArea'}">业务区域</span>
                        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                            <polygon points="0,3 10,3 5,8" />
                        </svg>
                    </div>
                </div>
                <transition name="showlist">
                    <section v-show="sortBy == 'bizArea'" class="category_container sort_detail_type">
                        <section class="category_right">
                            <ul>
                                <li class="category_right_li" @click="selectArea(0)" :class="{category_right_choosed: hasSelectedArea(0)}">
                                    <span>全部</span>
                                    <span></span>
                                    <svg v-if="hasSelectedArea(0)">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                </li>
                                <li v-for="(item, index) in bizAreaList" :key="item.Id" class="category_right_li" @click="selectArea(item.Id)" :class="{category_right_choosed: hasSelectedArea(item.Id)}">
                                    <span>{{item.Name}}</span>
                                    <span>{{item.count}}</span>
                                    <svg v-if="hasSelectedArea(item.Id)">
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
                            <li class="sort_list_li" @click="selectSort('Distance','asc')">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#distance"></use>
                                </svg>
                                <p :class="{sort_select: sort.sortByFiled == 'Distance'}">
                                    <span>距离最近</span>
                                    <svg v-if="sort.sortByFiled == 'Distance'">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                </p>
                            </li>
                            <li class="sort_list_li" @click="selectSort('LastSaleTime','asc')">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#speed"></use>
                                </svg>
                                <p :class="{sort_select: sort.sortByFiled == 'LastSaleTime'}">
                                    <span>订货时间最早</span>
                                    <svg v-if="sort.sortByFiled == 'LastSaleTime'">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                </p>
                            </li>
                            <li class="sort_list_li" @click="selectSort('SaleCount','asc')">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#default"></use>
                                </svg>
                                <p :class="{sort_select: sort.sortByFiled == 'SaleCount'}">
                                    <span>订货单最少</span>
                                    <svg v-if="sort.sortByFiled == 'SaleCount'">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                </p>
                            </li>
                            <li class="sort_list_li" @click="selectSort('OughtRecMoney','desc')">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hot"></use>
                                </svg>
                                <p :class="{sort_select: sort.sortByFiled == 'OughtRecMoney'}">
                                    <span>应收款最多</span>
                                    <svg v-if="sort.sortByFiled == 'OughtRecMoney'">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                </p>
                            </li>
                            <li class="sort_list_li" @click="selectSort('ChargeOffMoney','desc')">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#price"></use>
                                </svg>
                                <p :class="{sort_select: sort.sortByFiled == 'ChargeOffMoney'}">
                                    <span>出账金额最多</span>
                                    <svg v-if="sort.sortByFiled == 'ChargeOffMoney'">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                </p>
                            </li>
                            <li class="sort_list_li" @click="selectSort('OughtRecMinTime','asc')">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rating"></use>
                                </svg>
                                <p :class="{sort_select: sort.sortByFiled == 'OughtRecMinTime'}">
                                    <span>账龄最早</span>
                                    <svg v-if="sort.sortByFiled == 'OughtRecMinTime'">
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
                            <header class="filter_header_style">客户（可以多选）</header>
                            <ul class="filter_ul" style="paddingBottom: .5rem;">
                                <li class="filter_li" @click="selectfilter('HasGps')">
                                    <svg v-show="filters.HasGps" class="activity_svg">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                    <span :class="{selected_filter: filters.HasGps}">已定位</span>
                                </li>
                                <li class="filter_li" @click="selectfilter('OpenStatements')">
                                    <svg v-show="filters.OpenStatements" class="activity_svg">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                    <span :class="{selected_filter: filters.OpenStatements}">开通对账</span>
                                </li>
                            </ul>
                        </section>
                        <section v-if="sort.sortByFiled == 'LastSaleTime' || sort.sortByFiled == 'SaleCount' " style="width: 100%;">
                            <header class="filter_header_style">销售</header>
                            <ul class="filter_ul">
                                <li class="filter_li" @click="selectfilter('LastOrderTime',7)">
                                    <svg v-show="filters.LastOrderTime == 7" class="activity_svg">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                    <span :class="{selected_filter: filters.LastOrderTime == 7}">一周</span>
                                </li>
                                <li class="filter_li" @click="selectfilter('LastOrderTime',30)">
                                    <svg v-show="filters.LastOrderTime == 30" class="activity_svg">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                    <span :class="{selected_filter: filters.LastOrderTime == 30}">一月</span>
                                </li>
                                <li class="filter_li" @click="selectfilter('LastOrderTime',365)">
                                    <svg v-show="filters.LastOrderTime == 365" class="activity_svg">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                    <span :class="{selected_filter: filters.LastOrderTime == 365}">一年</span>
                                </li>
                            </ul>
                        </section>
                        <section v-if="sort.sortByFiled == 'OughtRecMoney' || sort.sortByFiled == 'ChargeOffMoney' || sort.sortByFiled == 'OughtRecMinTime' " style="width: 100%;">
                            <header class="filter_header_style">财务</header>
                            <ul class="filter_ul">
                                <li class="filter_li" @click="selectfilter('HasExpire')">
                                    <svg v-show="filters.HasExpire" class="activity_svg">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                    <span :class="{selected_filter: filters.HasExpire}">超期账款</span>
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
        <customer-list :keyword='keyword' :bizAreaId='bizAreaId' :sortByFiled='sort.sortByFiled' :sortByType='sort.sortByType' :filters='filters' :confirmSelect="confirmStatus" @DidConfrim="clearSelect"></customer-list>
        
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import customerList from 'src/components/common/customer-list'
import { apiGetBizAreas } from 'src/service/getData'

export default {
    data() {
        return {
            sortBy: '',                 // 选项卡控制

            keyword: '',
            bizAreaId: [],               // 当前选中业务区域
            allBizAreaIds: [],           // 全部业务区域

            sort: {
                sortByFiled: 'Distance',
                sortByType: 'asc',         // 根据何种方式排序
            },
            filters: {
                HasGps: false,          // 已定位
                OpenStatements: false,  // 已开账
                LastOrderTime: 7,       // 销售区间
                HasExpire: false,       // 超期账款
            },
            filterNum: 0,               // 所选中的所有样式的集合
            confirmStatus: false,       // 确认选择
        }
    },
    mounted() {
        this.initData();
    },
    components: {
        customerList,
    },
    methods: {
        ...mapActions(['getBizAreaList']),

        // 点击顶部三个选项，展示不同的列表，选中当前选项进行展示，同时收回其他选项
        async chooseType(type) {
            if (this.sortBy !== type) {
                this.sortBy = type;
            } else {
                //再次点击相同选项时收回列表
                this.sortBy = '';
            }
        },
        hasSelectedArea(areaId) {
            if (areaId == 0) {
                if (this.bizAreaId == this.allBizAreaIds) return true;
                return false;
            }
            if (this.bizAreaId[0] == areaId && this.bizAreaId != this.allBizAreaIds)
                return true;
            return false;
        },
        selectArea(areaId) {
            this.bizAreaId = [];
            if (areaId == 0)
                this.bizAreaId = this.allBizAreaIds;
            else
                this.bizAreaId.push(areaId);
        },
        selectSort(filed, type) {
            this.sort.sortByFiled = filed;
            this.sort.sortByType = type;
            this.clearSelect();
        },
        selectfilter(name, val) {
            if (val)
                this.filters[name] = val;
            else
                this.filters[name] = !this.filters[name];

            this.filterNum = 0;
            for (var key in this.filters) {
                if (this.filters.hasOwnProperty(key)) {
                    var element = this.filters[key];
                    if (element)
                        this.filterNum++;
                }
            }
        },

        //只有点击清空按钮才清空数据，否则一直保持原有状态
        clearSelect() {
            this.filters.HasGps = false;
            this.filters.OpenStatements = false;
            this.filters.LastOrderTime = 7;
            this.filters.HasExpire = false;
            this.filterNum = 0;
        },
        //点击确认时，将需要筛选的id值传递给子组件，并且收回列表
        confirmSelectFun() {
            //状态改变时，因为子组件进行了监听，会重新获取数据进行筛选
            this.confirmStatus = !this.confirmStatus;
            this.sortBy = '';
        },
        async initData() {
            await this.getBizAreaList();

            this.bizAreaList.forEach(val => this.allBizAreaIds.push(val.Id))
            this.bizAreaId = this.allBizAreaIds;
        }
    },
    computed: {
        ...mapState([
            'latitude',
            'longitude',
            'bizAreaList'
        ]),
    },
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';

.showcover-enter-active,
.showcover-leave-active {
    transition: opacity .3s
}

.showcover-enter,
.showcover-leave-active {
    opacity: 0
}

.back_cover {
    position: fixed;
    @include wh(100%, 100%);
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.3);
}
</style>
