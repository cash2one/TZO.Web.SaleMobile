<template>
    <div>
        <header-search></header-search>
        <section class="m-sort">
            <div class="sort_item" :class="{choose_type:sortBy == 'bizArea'}">
                <div class="sort_item_container" @click="chooseType('bizArea')">
                    <div class="sort_item_border">
                        <span :class="{category_title: sortBy == 'bizArea'}">{{bizAreaTitle}}</span>
                        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                            <polygon points="0,3 10,3 5,8" />
                        </svg>
                    </div>
                </div>
                <transition name="showlist">
                    <section v-show="sortBy == 'bizArea'" class="category_container sort_detail_type">
                        <section class="category_right">
                            <ul>
                                <li v-for="(item, index) in bizAreas" :key="item.id" class="category_right_li" @click="selectBizArea(item.Id, item.Name)" :class="{category_right_choosed: bizAreaId == item.Id}">
                                    <span>{{item.Name}}</span>
                                    <span>{{item.count}}</span>
                                    <svg v-if="bizAreaId == item.Id">
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
                            <li class="sort_list_li" @click="sortList(1)">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#default"></use>
                                </svg>
                                <p :class="{sort_select: sortByType == ''}">
                                    <span>智能排序</span>
                                    <svg v-if="sortByType == 0">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                </p>
                            </li>
                            <li class="sort_list_li" @click="sortList(2)">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#distance"></use>
                                </svg>
                                <p :class="{sort_select: sortByType == 'j'}">
                                    <span>距离最近</span>
                                    <svg v-if="sortByType == 5">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                </p>
                            </li>
                            <li class="sort_list_li" @click="sortList(3)">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hot"></use>
                                </svg>
                                <p :class="{sort_select: sortByType == 'sale'}">
                                    <span>销量最高</span>
                                    <svg v-if="sortByType == 6">
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
                            <header class="filter_header_style">客户属性（可以多选）</header>
                            <ul class="filter_ul" style="paddingBottom: .5rem;">
                                <li class="filter_li" @click="selectFilter('dingwei')">
                                    <svg v-show="filters.dingwei" class="activity_svg">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                    <span :class="{selected_filter: filters.dingwei}">已定位</span>
                                </li>
                                <li class="filter_li" @click="selectFilter('duizhang')">
                                    <svg class="activity_svg" v-show="filters.duizhang">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                    <span :class="{selected_filter: filters.duizhang}">开通对账</span>
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
        <customer-list :sortByType='sortByType'></customer-list>
        <foot-guide></foot-guide>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import headerSearch from 'src/components/header/header-search'
import customerList from 'src/components/common/customer-list'
import footGuide from 'src/components/footer/foot-guide'
import { apiGetBizAreas } from 'src/service/getData'

export default {
    data() {
        return {
            headerTitle: '',     // 页面标题
            sortBy: '',          // 筛选的条件
            bizAreaTitle: '业务区域',    // 业务区域标题
            bizAreas: [],        // 业务区域选项
            bizAreaId: 0,        //当前选中业务区域
            sortByType: '',      // 根据何种方式排序
            filters: {
                dingwei: false,
                duizhang: false,
            },
            filterNum: 0,        // 所选中的所有样式的集合
        }
    },
    mounted() {
        this.initData();
    },
    components: {
        headerSearch,
        customerList,
        footGuide
    },
    methods: {
        // 点击顶部三个选项，展示不同的列表，选中当前选项进行展示，同时收回其他选项
        async chooseType(type) {
            if (this.sortBy !== type) {
                this.sortBy = type;
                //food选项中头部标题发生改变，需要特殊处理
                if (type == 'bizArea') {
                    this.bizAreaTitle = '业务区域';
                } else {
                    //将foodTitle 和 headTitle 进行同步
                    //this.bizAreaTitle = this.headTitle;
                }
            } else {
                //再次点击相同选项时收回列表
                this.sortBy = '';
                if (type == 'bizArea') {
                    //将foodTitle 和 headTitle 进行同步
                    //this.bizAreaTitle = this.headTitle;
                }
            }
        },
        selectBizArea(id, name) {
            this.bizAreaId = id;
            this.bizAreaTitle = name;
        },
        //点击某个排序方式，获取事件对象的data值，并根据获取的值重新获取数据渲染
        sortList(val) {
            console.log(val)
            this.sortByType = val;
            this.sortBy = '';
        },
        selectFilter(name) {
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
            this.filters.dingwei = false;
            this.filters.duizhang = false;
        },
        //点击确认时，将需要筛选的id值传递给子组件，并且收回列表
        confirmSelectFun() {
            //状态改变时，因为子组件进行了监听，会重新获取数据进行筛选
            //this.confirmStatus = !this.confirmStatus;
            this.sortBy = '';
        },
        initData() {
            apiGetBizAreas().then(res => { this.bizAreas = res.Items; });
        }
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
