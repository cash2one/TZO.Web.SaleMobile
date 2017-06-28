<template>
    <div>
        <header-search></header-search>
        <!--<section class="sort_container">
            <div class="sort_item" :class="{choose_type:sortBy == 'food'}">
                <div class="sort_item_container" @click="chooseType('food')">
                    <div class="sort_item_border">
                        <span :class="{category_title: sortBy == 'food'}">{{foodTitle}}</span>
                        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                            <polygon points="0,3 10,3 5,8" />
                        </svg>
                    </div>
                </div>
                <transition name="showlist" v-show="category">
                    <section v-show="sortBy == 'food'" class="category_container sort_detail_type">
                        <section class="category_left">
                            <ul>
                                <li v-for="(item, index) in category" :key="index" class="category_left_li" :class="{category_active:restaurant_category_id == item.id}" @click="selectCategoryName(item.id, index)">
                                    <section>
                                        <img :src="getImgPath(item.image_url)" v-if="index" class="category_icon">
                                        <span>{{item.name}}</span>
                                    </section>
                                    <section>
                                        <span class="category_count">{{item.count}}</span>
                                        <svg v-if="index" width="8" height="8" xmlns="http://www.w3.org/2000/svg" version="1.1" class="category_arrow">
                                            <path d="M0 0 L6 4 L0 8" stroke="#bbb" stroke-width="1" fill="none" />
                                        </svg>
                                    </section>
                                </li>
                            </ul>
                        </section>
                        <section class="category_right">
                            <ul>
                                <li v-for="(item, index) in categoryDetail" v-if="index" :key="item.id" class="category_right_li" @click="getCategoryIds(item.id, item.name)" :class="{category_right_choosed: restaurant_category_ids == item.id || (!restaurant_category_ids)&&index == 0}">
                                    <span>{{item.name}}</span>
                                    <span>{{item.count}}</span>
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
                        <ul class="sort_list_container" @click="sortList($event)">
                            <li class="sort_list_li">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#default"></use>
                                </svg>
                                <p data="0" :class="{sort_select: sortByType == 0}">
                                    <span>智能排序</span>
                                    <svg v-if="sortByType == 0">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                </p>
                            </li>
                            <li class="sort_list_li">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#distance"></use>
                                </svg>
                                <p data="5" :class="{sort_select: sortByType == 5}">
                                    <span>距离最近</span>
                                    <svg v-if="sortByType == 5">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                </p>
                            </li>
                            <li class="sort_list_li">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hot"></use>
                                </svg>
                                <p data="6" :class="{sort_select: sortByType == 6}">
                                    <span>销量最高</span>
                                    <svg v-if="sortByType == 6">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                </p>
                            </li>
                            <li class="sort_list_li">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#price"></use>
                                </svg>
                                <p data="1" :class="{sort_select: sortByType == 1}">
                                    <span>起送价最低</span>
                                    <svg v-if="sortByType == 1">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                </p>
                            </li>
                            <li class="sort_list_li">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#speed"></use>
                                </svg>
                                <p data="2" :class="{sort_select: sortByType == 2}">
                                    <span>配送速度最快</span>
                                    <svg v-if="sortByType == 2">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                </p>
                            </li>
                            <li class="sort_list_li">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rating"></use>
                                </svg>
                                <p data="3" :class="{sort_select: sortByType == 3}">
                                    <span>评分最高</span>
                                    <svg v-if="sortByType == 3">
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
                            <header class="filter_header_style">配送方式</header>
                            <ul class="filter_ul">
                                <li v-for="item in Delivery" :key="item.id" class="filter_li" @click="selectDeliveryMode(item.id)">
                                    <svg :style="{opacity: (item.id == 0)&&(delivery_mode !== 0)? 0: 1}">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="delivery_mode == item.id? '#selected':'#fengniao'"></use>
                                    </svg>
                                    <span :class="{selected_filter: delivery_mode == item.id}">{{item.text}}</span>
                                </li>
                            </ul>
                        </section>
                        <section style="width: 100%;">
                            <header class="filter_header_style">商家属性（可以多选）</header>
                            <ul class="filter_ul" style="paddingBottom: .5rem;">
                                <li v-for="(item,index) in Activity" :key="item.id" class="filter_li" @click="selectSupportIds(index, item.id)">
                                    <svg v-show="support_ids[index].status" class="activity_svg">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                    <span class="filter_icon" :style="{color: '#' + item.icon_color, borderColor: '#' + item.icon_color}" v-show="!support_ids[index].status">{{item.icon_name}}</span>
                                    <span :class="{selected_filter: support_ids[index].status}">{{item.name}}</span>
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
        </section>-->
        <customer-list></customer-list>
        <foot-guide></foot-guide>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import headerSearch from 'src/components/header/header-search'
import customerList from 'src/components/common/customer-list'
import footGuide from 'src/components/footer/foot-guide'
import { getImgPath } from 'src/components/common/mixin'
export default {
    data() {
        return {
            foodTitle: '', // 排序左侧头部标题
            sortBy: '', // 筛选的条件
            category: null, // category分类左侧数据
            categoryDetail: null, // category分类右侧的详细数据
            sortByType: null, // 根据何种方式排序
            Delivery: null, // 配送方式数据
            Activity: null, // 商家支持活动数据
            filterNum: 0, // 所选中的所有样式的集合
        }
    },
    mixins: [getImgPath],
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
                if (type == 'food') {
                    this.foodTitle = '分类';
                } else {
                    //将foodTitle 和 headTitle 进行同步
                    this.foodTitle = this.headTitle;
                }
            } else {
                //再次点击相同选项时收回列表
                this.sortBy = '';
                if (type == 'food') {
                    //将foodTitle 和 headTitle 进行同步
                    this.foodTitle = this.headTitle;
                }
            }
        },
        //只有点击清空按钮才清空数据，否则一直保持原有状态
        clearSelect() {
            this.support_ids.map(item => item.status = false);
            this.filterNum = 0;
        },
        //点击确认时，将需要筛选的id值传递给子组件，并且收回列表
        confirmSelectFun() {
            //状态改变时，因为子组件进行了监听，会重新获取数据进行筛选
            this.confirmStatus = !this.confirmStatus;
            this.sortBy = '';
        }
    },
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';

.sort_container {
    background-color: #fff;
    border-bottom: 0.025rem solid #f1f1f1;
    position: fixed;
    top: 1.95rem;
    right: 0;
    width: 100%;
    display: flex;
    z-index: 13;
    box-sizing: border-box;
    .sort_item {
        @include sc(0.55rem, #444);
        @include wh(33.3%, 1.6rem);
        text-align: center;
        line-height: 1rem;
        .sort_item_container {
            @include wh(100%, 100%);
            position: relative;
            z-index: 14;
            background-color: #fff;
            box-sizing: border-box;
            padding-top: .3rem;
            .sort_item_border {
                height: 1rem;
                border-right: 0.025rem solid $bc;
            }
        }
        .sort_icon {
            vertical-align: middle;
            transition: all .3s;
            fill: #666;
        }
    }
    .choose_type {
        .sort_item_container {

            .category_title {
                color: $blue;
            }
            .sort_icon {
                transform: rotate(180deg);
                fill: $blue;
            }
        }
    }
    .showlist-enter-active,
    .showlist-leave-active {
        transition: all .3s;
        transform: translateY(0);
    }
    .showlist-enter,
    .showlist-leave-active {
        opacity: 0;
        transform: translateY(-100%);
    }
    .sort_detail_type {
        width: 100%;
        position: absolute;
        display: flex;
        top: 1.6rem;
        left: 0;
        border-top: 0.025rem solid $bc;
        background-color: #fff;
    }
    .category_container {
        .category_left {
            flex: 1;
            background-color: #f1f1f1;
            height: 16rem;
            overflow-y: auto;
            span {
                @include sc(0.5rem, #666);
                line-height: 1.8rem;
            }
            .category_left_li {
                @include fj;
                padding: 0 0.5rem;
                .category_icon {
                    @include wh(.8rem, .8rem);
                    vertical-align: middle;
                    margin-right: .2rem;
                }
                .category_count {
                    background-color: #ccc;
                    @include sc(.4rem, #fff);
                    padding: 0 .1rem;
                    border: 0.025rem solid #ccc;
                    border-radius: 0.8rem;
                    vertical-align: middle;
                    margin-right: 0.25rem;
                }
                .category_arrow {
                    vertical-align: middle;
                }
            }
            .category_active {
                background-color: #fff;
            }
        }
        .category_right {
            flex: 1;
            background-color: #fff;
            padding-left: 0.5rem;
            height: 16rem;
            overflow-y: auto;
            .category_right_li {
                @include fj;
                height: 1.8rem;
                line-height: 1.8rem;
                padding-right: 0.5rem;
                border-bottom: 0.025rem solid $bc;
                span {
                    color: #666;
                }
            }
            .category_right_choosed {
                span {
                    color: $blue;
                }
            }
        }
    }
    .sort_list_container {
        width: 100%;
        .sort_list_li {
            height: 2.5rem;
            display: flex;
            align-items: center;
            svg {
                @include wh(0.7rem, 0.7rem);
                margin: 0 .3rem 0 .8rem;
            }
            p {
                line-height: 2.5rem;
                flex: auto;
                text-align: left;
                text-indent: 0.25rem;
                border-bottom: 0.025rem solid $bc;
                @include fj;
                align-items: center;
                span {
                    color: #666;
                }
            }
            .sort_select {
                span {
                    color: $blue;
                }
            }
        }
    }
    .filter_container {
        flex-direction: column;
        align-items: flex-start;
        min-height: 10.6rem;
        background-color: #f1f1f1;
        .filter_header_style {
            @include sc(0.4rem, #333);
            line-height: 1.5rem;
            height: 1.5rem;
            text-align: left;
            padding-left: .5rem;
            background-color: #fff;
        }
        .filter_ul {
            display: flex;
            flex-wrap: wrap;
            padding: 0 0.5rem;
            background-color: #fff;
            .filter_li {
                display: flex;
                align-items: center;
                border: 0.025rem solid #eee;
                @include wh(4.7rem, 1.4rem);
                margin-right: 0.25rem;
                border-radius: 0.125rem;
                padding: 0 0.25rem;
                margin-bottom: 0.25rem;
                svg {
                    @include wh(.8rem, .8rem);
                    margin-right: 0.125rem;
                }
                span {
                    @include sc(0.4rem, #333);
                }
                .filter_icon {
                    @include wh(.8rem, .8rem);
                    font-size: 0.5rem;
                    border: 0.025rem solid $bc;
                    border-radius: 0.15rem;
                    margin-right: 0.25rem;
                    line-height: .8rem;
                    text-align: center;
                }
                .activity_svg {
                    margin-right: .25rem;
                }
                .selected_filter {
                    color: $blue;
                }
            }
        }
        .confirm_filter {
            display: flex;
            background-color: #f1f1f1;
            width: 100%;
            padding: .3rem .2rem;
            .filter_button_style {
                @include wh(50%, 1.8rem);
                font-size: 0.8rem;
                line-height: 1.8rem;
                border-radius: 0.2rem;
            }
            .clear_all {
                background-color: #fff;
                margin-right: .5rem;
                border: 0.025rem solid #fff;
            }
            .confirm_select {
                background-color: #56d176;
                color: #fff;
                border: 0.025rem solid #56d176;
                span {
                    color: #fff;
                }
            }
        }
    }
}
</style>
