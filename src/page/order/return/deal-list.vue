<template>
    <section class="page">
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
                <input v-model="keyword" type="text" placeholder="请输规格型号" class="search_text" />
            </section>
        </header>
        <section class="scroll_container paddingTop">
            <section v-load-more="loaderMore" v-if="dealItems.length" class="m-list">
                <section v-for="item in dealItems" :key="item.Id" class="item">
                    <section class="title">
                        <h3 class="name ellipsis">
                            <strong>{{item.Goods.Name}}</strong>
                        </h3>
                        <section class="content">
                            <section v-for="prop in globalPropertyList" :key="prop.Id">
                                <span>{{prop.Name}}</span>:
                                <span>{{item.Goods.Properties['p'+prop.Id]}}</span>
                            </section>
                        </section>
                        <return-cart :dealId="item.DealId" :customer="curCustomer" :item="item"></return-cart>
                        <section class="content">
                            单号:{{item.BizBillNo}}
                        </section>
                    </section>
                    <div class="detail">
                        <div>
                            <span>x</span>
                            <span class="number">{{item.CanReturnNum}}</span>
                        </div>
                        <div>
                            <span>¥</span>
                            <span class="money">{{item.Price}}</span>
                        </div>
                    </div>
                </section>
            </section>
            <section v-else class="m-list">
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
    </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { loadMore, getImgPath } from 'src/components/common/mixin'
import { showBack, animate } from 'src/config/mUtils'
import headerTitle from 'src/components/header/header-title'
import loading from 'src/components/common/loading'
import returnCart from 'src/components/common/return-cart'
import { apiGetSaleDealItem } from 'src/service/getData'

export default {
    data() {
        return {
            offset: 0,
            keyword: '',
            dealItems: [],

            preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
            showBackStatus: false, //显示返回顶部按钮
            showLoading: true, //显示加载动画
            touchend: false, //没有更多数据
        }
    },
    created() {
        if (!this.curCustomer || !this.curCustomer.CustomerId) this.$router.push('/customer/search');
    },
    mounted() {
        this.initData();
    },
    methods: {
        ...mapActions([
            'getGlobalProperty'
        ]),
        async getSaleDealItem() {
            let startDate = new Date();
            startDate.setHours(0, 0, 0, 0);
            startDate.setFullYear(startDate.getFullYear() - 1);
            let endDate = new Date();
            endDate.setHours(23, 59, 59, 999);

            return await apiGetSaleDealItem(this.curCustomer.CustomerId, this.keyword, startDate, endDate, this.offset);
        },
        async initData() {
            await this.getGlobalProperty();

            let res = await this.getSaleDealItem();
            this.dealItems = [...res.Items];

            //开始监听scrollTop的值，达到一定程度后显示返回顶部按钮
            showBack(status => {
                this.showBackStatus = status;
            });

            this.showLoading = false;
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
            let res = await this.getSaleDealItem();
            this.hideLoading();
            this.dealItems = [...this.dealItems, ...res.Items];
            //当获取数据小于20，说明没有更多数据，不需要再次请求数据
            if (res.Items.length < 20) {
                this.touchend = true;
                return
            }
            this.preventRepeatReuqest = false;
        },
        //监听父级传来的数据发生变化时，触发此函数重新根据属性值获取数据
        async listenPropChange() {
            this.showLoading = true;
            this.offset = 0;
            let res = await this.getSaleDealItem();
            this.hideLoading();
            //考虑到本地模拟数据是引用类型，所以返回一个新的数组
            this.dealItems = [...res.Items];
        },
        //返回顶部
        backTop() {
            animate(document.body, { scrollTop: '0' }, 400, 'ease-out');
        },
        //开发环境与编译环境loading隐藏方式不同
        hideLoading() {
            this.showLoading = false;
        },

    },
    computed: {
        ...mapState([
            'globalPropertyList',
            'curCustomer'
        ])
    },
    components: {
        headerTitle,
        loading,
        returnCart
    },
    mixins: [loadMore, getImgPath],
    watch: {
        keyword: function (val) {
            this.listenPropChange();
        },
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';
@import '../order';

.m-list {
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
            width: 8rem;
        }
        .detail {
            flex: 1;
            @include fj();
            line-height: 1.5rem;
        }
    }
}
</style>