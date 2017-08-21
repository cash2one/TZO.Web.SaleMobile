<template>
    <div class="page">
        <header-title header-title="知识库搜索" goback='true'></header-title>
        <section class="paddingTop">
            <div class="cartype_form">
                <div>
                    <input type="search" name="city" placeholder="输入车型" class="city_input input_style" required v-model='inputVaule' />
                </div>
                <div>
                    <input type="button" name="submit" class="city_submit input_style" value="提交" @click="search()" />
                </div>
            </div>
            <section v-if="showHistory">
                <header>搜索历史</header>
                <ul class="list">
                    <li v-for="(item, index) in cartypeHistory" @click='selectedCarType(item)' :key="index">
                        <h3 class="ellipsis">{{item.Name}}</h3>
                    </li>
                </ul>
                <footer v-if="cartypeHistory.length" class="clear_all_history" @click="clearAll">清空所有</footer>
            </section>
            <section v-if="showCarType">
                <header></header>
                <footer class="clear_all_history" @click="toggleCarType">车系 {{cartypeList.length}} 系 </footer>
                <ul v-if="toggleCarTypeList" class="list">
                    <li v-for="(item, index) in cartypeList" @click='selectedCarType(item)' :key="index">
                        <h3 class="ellipsis">{{item.Name}}</h3>
                    </li>
                </ul>
            </section>
            <section v-if="showYear">
                <header>{{curType.Name}}</header>
                <footer class="clear_all_history" @click="toggleYear">年款 {{yearList.length}} 款 </footer>
                <ul v-if="toggleYearList" class="list">
                    <li v-for="(item, index) in yearList" @click='selectedYear(item)' :key="index">
                        <h3 class="ellipsis">{{item.ModelYear}}</h3>
                    </li>
                </ul>
            </section>
        </section>
        <header>{{curType.Name}}&nbsp;{{curYear.ModelYear}}</header>
        <div v-load-more="loaderMore" v-if="carList.length" class="item-list">
            <section v-for="(item,index) in carList" :key="index" class="item" @click="nextpage(item)" :class="{start:index==0}">
                <section class="item-left">
                    <section class="title">
                        <h3 class="name ellipsis">
                            <strong>{{item.Title}}</strong>
                        </h3>
                    </section>
                    <section class="content">
                        <section v-for="prop in item.Descriptions" :key="prop.Id">
                            <span>{{prop.Key}}</span>:
                            <span>{{prop.Value}}</span>
                        </section>
                    </section>
                </section>
                <section class="type">
                    <h3>{{item.TypeName}}</h3>
                </section>
            </section>
        </div>
        <p v-if="touchend" class="empty_data">没有更多了</p>
        <aside class="return_top" @click="backTop" v-if="showBackStatus">
            <svg class="back_top_svg">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
            </svg>
        </aside>
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { showBack, animate } from 'src/config/mUtils'
import headerTitle from 'src/components/header/header-title'
import { loadMore } from 'src/components/common/mixin'
import loading from 'src/components/common/loading'
import { apiGetCarTypes, apiGetCarTypeYears, apiGetKnowledgeList } from 'src/service/getData'
import { getStore, setStore, removeStore } from 'src/config/mUtils'

export default {
    data() {
        return {
            offset: 0,
            inputVaule: "",
            curType: {},
            curYear: {},
            cartypeList: [],
            cartypeHistory: [],
            yearList: [],
            carList: [],

            showHistory: true,
            showCarType: false,
            toggleCarTypeList: false,
            showYear: false,
            toggleYearList: false,
            preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
            showBackStatus: false, //显示返回顶部按钮
            showLoading: false,
            touchend: false, //没有更多数据
        }
    },
    mounted() {
        this.initData();
    },
    components: {
        headerTitle,
        loading
    },
    mixins: [loadMore],
    methods: {
        initData() {
            // 获取搜索历史记录
            if (getStore('cartypeHistory')) {
                this.cartypeHistory = JSON.parse(getStore('cartypeHistory'));
            } else {
                this.cartypeHistory = [];
            }

            //开始监听scrollTop的值，达到一定程度后显示返回顶部按钮
            showBack(status => {
                this.showBackStatus = status;
            });
        },
        async search() {
            if (!this.inputVaule) return;

            this.showLoading = true;
            this.showHistory = false;
            this.showYear = false;
            this.curType = {};
            this.curYear = {};

            this.cartypeList = await apiGetCarTypes(this.inputVaule);

            this.offset = 0;
            await this.loadCar();

            this.showCarType = true;
            this.hideLoading();
        },
        async selectedCarType(type) {
            this.showLoading = true;

            this.showHistory = false;
            this.showCarType = false;

            this.curType = type;

            let history = getStore('cartypeHistory');
            if (history) {
                let checkrepeat = false;
                history = JSON.parse(history);
                history.forEach(item => {
                    if (item.Id == type.Id) {
                        checkrepeat = true;
                    }
                })
                if (!checkrepeat) {
                    history.push(type)
                }
            } else {
                history = [];
                history.push(type)
            }
            setStore('cartypeHistory', history)

            this.yearList = await apiGetCarTypeYears(type.Id);

            this.offset = 0;
            await this.loadCar();

            this.showYear = true;
            this.hideLoading();
        },
        async selectedYear(year) {
            this.showLoading = true;
            this.showYear = false;

            this.curYear = year;
            this.offset = 0;
            await this.loadCar();
            this.hideLoading();
        },
        async loadCar() {
            let res = await apiGetKnowledgeList(this.inputVaule, this.curType.Id, this.curYear.ModelYear, this.offset);
            this.carList = res.Items;
        },
        async getCar() {
            return await apiGetKnowledgeList(this.inputVaule, this.curType.Id, this.curYear.ModelYear, this.offset);
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
            let res = await this.getCar();
            this.hideLoading();
            this.carList = [...this.carList, ...res.Items];
            // 当获取数据小于20，说明没有更多数据，不需要再次请求数据
            if (res.Items.length < 20) {
                this.touchend = true;
                return
            }
            this.preventRepeatReuqest = false;
        },
        //返回顶部
        backTop() {
            animate(document.body, { scrollTop: '0' }, 400, 'ease-out');
        },
        //开发环境与编译环境loading隐藏方式不同
        hideLoading() {
            this.showLoading = false;
        },
        nextpage(car) {
            if (car.Type == 2)
                this.$router.push('/knowledge/search/text/' + car.Id);
            if (car.Type == 3)
                this.$router.push('/knowledge/search/detail/' + car.Id);
        },
        clearAll() {
            removeStore('cartypeHistory');
            this.initData();
        },
        toggleCarType() {
            this.toggleCarTypeList = !this.toggleCarTypeList;
        },
        toggleYear() {
            this.toggleYearList = !this.toggleYearList;
        },
    }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';

.paddingTop {
    padding-top: 6.1rem;
}

.cartype_form {
    position: fixed;
    left: 0;
    right: 0;
    top: 1.95rem;
    z-index: 200;
    background-color: #fff;
    border-bottom: 1px solid $bc;
    padding-top: 0.4rem;
    div {
        width: 90%;
        margin: 0 auto;
        text-align: center;
        .input_style {
            border-radius: 0.1rem;
            margin-bottom: 0.4rem;
            @include wh(100%, 1.4rem);
        }
        .city_input {
            border: 1px solid $bc;
            padding: 0 0.3rem;
            @include sc(0.65rem, #333);
        }
        .city_submit {
            background-color: $blue;
            @include sc(0.65rem, #fff);
        }
    }
}

.page {
    header {
        border-bottom: 1px solid $bc;
        @include indent05;
        font-size: .65rem;
        line-height: .975rem;
    }
}

.list {
    background-color: #fff;
    li {
        border-bottom: 1px solid $bc;
        @include indent10;
    }
}

.item-list {
    .type {
        width: 3rem;
        text-align: right;
        @include indent05();
    }
}

.clear_all_history {
    @include sc(0.7rem, #666);
    text-align: center;
    line-height: 2rem;
    background-color: #fff;
    border-bottom: 1px solid $bc;
}

.return_top {
    bottom: 1rem;
}
</style>
