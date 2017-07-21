<template>
    <div class="search_container">
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
            <div class="sort_item" :class="{choose_type:sortBy == 'category'}">
                <div class="sort_item_container" @click="chooseType('category')">
                    <div class="sort_item_border">
                        <span :class="{category_title: sortBy == 'category'}">类目</span>
                        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                            <polygon points="0,3 10,3 5,8" />
                        </svg>
                    </div>
                </div>
                <transition name="showlist">
                    <section v-show="sortBy == 'category'" class="category_container sort_detail_type">
                        <section class="category_left">
                            <ul>
                                <li>
                                    <section class="category_left_li ellipsis" :class="{category_active:categoryId==0}" @click="selectCategory(0)">
                                        <span>全部</span>
                                    </section>
                                </li>
                                <li v-for="(first, index) in categoryList" :key="index" class="category_left_li ellipsis" :class="{category_active:firstCategoryId==first.Id}" @click="selectCategory(first.Id,0)">
                                    <section>
                                        <!--<img :src="getImgPath(item.image_url)" v-if="index" class="category_icon">-->
                                        <span>{{first.Name}}</span>
                                    </section>
                                    <section>
                                        <!-- <span class="category_count"></span> -->
                                        <svg class="icon category_arrow">
                                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#chevron-right"></use>
                                        </svg>
                                    </section>
                                </li>
                            </ul>
                        </section>
                        <section class="category_right">
                            <ul v-for="item in categoryDetailList" :key="item.Id" v-if="item.Id==firstCategoryId">
                                <li v-for="second in item.Children" :key="second.Id" class="category_right_li" @click="selectCategory(item.Id,second.Id)" :class="{category_right_choosed: secondCategoryId == second.Id}">
                                    <span>{{second.Name}}</span>
                                    <span></span>
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
                            <li class="sort_list_li" @click="selectSort('GoodsName','asc')">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#default"></use>
                                </svg>
                                <p :class="{sort_select: sort.sortByFiled == 'GoodsName'}">
                                    <span>商品名称</span>
                                    <svg v-if="sort.sortByFiled == 'GoodsName'">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                </p>
                            </li>
                            <li v-for="item in globalPropertyList" :key="item.Id" class="sort_list_li" @click="selectSort('Property',item.Id)">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#default"></use>
                                </svg>
                                <p :class="{sort_select: sort.sortByFiled == 'Property' && sort.sortByType == item.Id }">
                                    <span>{{item.Name}}</span>
                                    <svg v-if="sort.sortByFiled == 'Property' && sort.sortByType == item.Id">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                </p>
                            </li>
                            <li class="sort_list_li" @click="selectSort('RangeSaleNum','desc')">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hot"></use>
                                </svg>
                                <p data="6" :class="{sort_select: sort.sortByFiled == 'RangeSaleNum'}">
                                    <span>客户销量</span>
                                    <svg v-if="sort.sortByFiled == 'RangeSaleNum'">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                </p>
                            </li>
                            <li class="sort_list_li" @click="selectSort('StockNum','desc')">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#speed"></use>
                                </svg>
                                <p data="2" :class="{sort_select: sort.sortByFiled == 'StockNum'}">
                                    <span>库存</span>
                                    <svg v-if="sort.sortByFiled == 'StockNum'">
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
                        <section v-for="property in propertyList" :key="property.Id" v-if="property.Options.length>0" style="width: 100%;">
                            <header class="filter_header_style">{{property.PropertyName}}</header>
                            <ul class="filter_ul">
                                <li v-for="(item,index) in property.Options" :key="index" class="filter_li" @click="selectProperty(property.Id,item)">
                                    <svg v-show="filters.properties[property.Id]==item" class="activity_svg">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                    <span class="ellipsis" :class="{selected_filter: filters.properties[property.Id]==item}">{{item}}</span>
                                </li>
                            </ul>
                        </section>
                        <section style="width: 100%;">
                            <header class="filter_header_style">销售</header>
                            <ul class="filter_ul">
                                <li class="filter_li" @click="selectFilter('LastSaleTime',7)">
                                    <svg v-show="filters.LastSaleTime == 7" class="activity_svg">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                    <span :class="{selected_filter: filters.LastSaleTime == 7}">一周</span>
                                </li>
                                <li class="filter_li" @click="selectFilter('LastSaleTime',30)">
                                    <svg v-show="filters.LastSaleTime == 30" class="activity_svg">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                    <span :class="{selected_filter: filters.LastSaleTime == 30}">一月</span>
                                </li>
                                <li class="filter_li" @click="selectFilter('LastSaleTime',365)">
                                    <svg v-show="filters.LastSaleTime == 365" class="activity_svg">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                    <span :class="{selected_filter: filters.LastSaleTime == 365}">一年</span>
                                </li>
                            </ul>
                        </section>
                        <section style="width: 100%;">
                            <header class="filter_header_style">库存</header>
                            <ul class="filter_ul">
                                <li class="filter_li" @click="selectFilter('ZeroStock')">
                                    <svg v-show="filters.ZeroStock" class="activity_svg">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                    <span :class="{selected_filter: filters.ZeroStock}">0库存</span>
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
        <goods-list :keyword='keyword' :categoryId='categoryId' :sortByFiled='sort.sortByFiled' :sortByType='sort.sortByType' :filters='filters' :confirmSelect="confirmStatus" @DidConfrim="clearSelect"></goods-list>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import goodsList from 'src/components/common/goods-list'

export default {
    data() {
        return {
            sortBy: '',                     // 选项卡控制
            keyword: '',
            categoryId: 0,                  // 当前选中业务区域
            firstCategoryId: 0,              // 选中的一级分类
            secondCategoryId: 0,            // 选中的二级分类
            sort: {
                sortByFiled: 'GoodsName',
                sortByType: 'asc',          // 根据何种方式排序
            },

            filters: {
                properties: {},
                LastSaleTime: 7,
            },
            filterNum: 0,                   // 所选中的所有样式的集合
            confirmStatus: false,           // 确认选择
        }
    },
    mounted() {
        this.initData();
    },
    components: {
        goodsList
    },
    methods: {
        ...mapActions([
            'getGlobalProperty',
            'getPorpertyList',
            'getCategoryList'
        ]),
        // 点击顶部三个选项，展示不同的列表，选中当前选项进行展示，同时收回其他选项
        async chooseType(type) {
            if (this.sortBy !== type) {
                this.sortBy = type;
            } else {
                //再次点击相同选项时收回列表
                this.sortBy = '';
            }
        },
        selectCategory(first, second) {
            this.firstCategoryId = first;
            this.secondCategoryId = second;
            if (second)
                this.categoryId = second;
            else
                this.categoryId = first;
        },
        //点击某个排序方式，获取事件对象的data值，并根据获取的值重新获取数据渲染
        selectSort(filed, type) {
            this.sort.sortByFiled = filed;
            this.sort.sortByType = type;
            this.clearSelect();
        },
        selectProperty(id, txt) {
            if (this.filters.properties[id] && this.filters.properties[id] == txt)
                delete this.filters.properties[id];
            else
                this.filters.properties[id] = txt;

            this.countFilterNum();
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
            this.filters = {
                properties: {},
                LastSaleTime: 7,
            };
            this.filterNum = 0;
        },
        // 点击确认时，将需要筛选的id值传递给子组件，并且收回列表
        confirmSelectFun() {
            //状态改变时，因为子组件进行了监听，会重新获取数据进行筛选
            this.confirmStatus = !this.confirmStatus;
            this.sortBy = '';
        },
        async initData() {
            await this.getGlobalProperty();
            await this.getPorpertyList();
            await this.getCategoryList();
        }
    },
    computed: {
        ...mapState([
            'globalPropertyList',
            'propertyList',
            'categoryList',
            'categoryDetailList'
        ]),
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';
// .search_container {
//     display: flex;
//     flex-direction: column;
// }
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
