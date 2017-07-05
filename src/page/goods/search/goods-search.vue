<template>
    <div>
        <header-search></header-search>
        <section class="m-sort">
            <div class="sort_item" :class="{choose_type:sortBy == 'category'}">
                <div class="sort_item_container" @click="chooseType('category')">
                    <div class="sort_item_border">
                        <span :class="{category_title: sortBy == 'category'}">{{categoryTitle}}</span>
                        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                            <polygon points="0,3 10,3 5,8" />
                        </svg>
                    </div>
                </div>
                <transition name="showlist" v-show="categories">
                    <section v-show="sortBy == 'category'" class="category_container sort_detail_type">
                        <section class="category_left">
                            <ul>
                                <li v-for="(first, index) in categories" :key="index" class="category_left_li ellipsis" :class="{category_active:categoryId==first.Id}" @click="selectCategory(first)">
                                    <section>
                                        <!--<img :src="getImgPath(item.image_url)" v-if="index" class="category_icon">-->
                                        <span>{{first.Name}}</span>
                                    </section>
                                    <section>
                                        <span class="category_count">999</span>
                                        <svg class="icon category_arrow">
                                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#chevron-right"></use>
                                        </svg>
                                    </section>
                                </li>
                            </ul>
                        </section>
                        <section class="category_right">
                            <ul v-for="item in categoryDetail" v-if="item.Id==categoryId">
                                <li v-for="second in item.Children" :key="second.Id" class="category_right_li" @click="selectCategoies(second)" :class="{category_right_choosed: secondCategoryId == second.id || (!secondCategoryId)}">
                                    <span>{{second.Name}}</span>
                                    <span>99</span>
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
                                    <span>价格升序</span>
                                    <svg v-if="sortByType == 5">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                </p>
                            </li>
                            <li class="sort_list_li">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#price"></use>
                                </svg>
                                <p data="1" :class="{sort_select: sortByType == 1}">
                                    <span>价格降序</span>
                                    <svg v-if="sortByType == 1">
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
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#speed"></use>
                                </svg>
                                <p data="2" :class="{sort_select: sortByType == 2}">
                                    <span>库存</span>
                                    <svg v-if="sortByType == 2">
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
                        <section v-for="property in properties" v-if="property.Options.length>0" style="width: 100%;">
                            <header class="filter_header_style">{{property.PropertyName}}</header>
                            <ul class="filter_ul">
                                <li v-for="(item,index) in property.Options" class="filter_li" @click="selectFilter(item,property.Id)">
                                    <svg v-show="filters[property.Id]==item" class="activity_svg">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                    <span class="ellipsis" :class="{selected_filter: true}">{{item}}</span>
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
        <goods-list></goods-list>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import headerSearch from 'src/components/header/header-search'
import goodsList from 'src/components/common/goods-list'
import { getCategories, getProperties } from 'src/service/getData'

export default {
    data() {
        return {
            headerTitle: '',     // 页面标题
            sortBy: '',          // 筛选的条件
            categoryTitle: '分类',    // 业务区域标题
            categories: [],        // 商品分类
            categoryDetail: [],     // 二级分类
            categoryId: 0,        //当前选中业务区域
            secondCategoryId: 0,     // 选中的二级分类
            sortByType: '',      // 根据何种方式排序
            filters: {},
            filterNum: 0,        // 所选中的所有样式的集合
            properties: [],      //商品属性
        }
    },
    mounted() {
        this.initData();
    },
    components: {
        headerSearch,
        goodsList
    },
    methods: {
        // 点击顶部三个选项，展示不同的列表，选中当前选项进行展示，同时收回其他选项
        async chooseType(type) {
            if (this.sortBy !== type) {
                this.sortBy = type;
                //food选项中头部标题发生改变，需要特殊处理
                if (type == 'category') {
                    this.categoryTitle = '分类';
                } else {
                    //将foodTitle 和 headTitle 进行同步
                    //this.bizAreaTitle = this.headTitle;
                }
            } else {
                //再次点击相同选项时收回列表
                this.sortBy = '';
                if (type == 'category') {
                    //将foodTitle 和 headTitle 进行同步
                    //this.bizAreaTitle = this.headTitle;
                }
            }
        },
        //点击某个排序方式，获取事件对象的data值，并根据获取的值重新获取数据渲染
        sortList(event) {
            console.log(this.filterNum)
            this.sortByType = event.target.getAttribute('data');
            this.sortBy = '';
        },
        selectFilter(txt, propertyid) {
            if (this.filters[propertyid] == txt)
                this.filters[propertyid] = '';
            else
                this.filters[propertyid] = txt;

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
            this.filters = {};
            this.filterNum = 0;
        },
        //点击确认时，将需要筛选的id值传递给子组件，并且收回列表
        confirmSelectFun() {
            //状态改变时，因为子组件进行了监听，会重新获取数据进行筛选
            //this.confirmStatus = !this.confirmStatus;
            this.sortBy = '';
        },
        selectCategory(item) {
            this.categoryId = item.Id;
        },
        selectCategoies(item) {

        },
        initData() {
            let categories = this.categories;
            let detail = this.categoryDetail;
            getCategories().then(res => {
                res.Items.forEach(function (i) {
                    if (i.ParentId == 1) {
                        categories.push(i);
                        let detailItem = { Id: i.Id, Children: [] };
                        res.Items.forEach(function (j) {
                            if (j.ParentId == detailItem.Id)
                                detailItem.Children.push(j);
                        });
                        detail.push(detailItem);
                    }
                });
            });
            getProperties().then(res => this.properties = res);
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
