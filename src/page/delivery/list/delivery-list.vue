<template>
    <div class="page">
        <header-title header-title="送货" goback='true'></header-title>
        <section v-if="!showLoading" class="scroll_container paddingTop">
            <section class="m-tabs" ref="chooseType">
                <div class="item">
                    <span :class='{active: changeShowType =="undone"}' @click="changeShowType='undone'">待送</span>
                </div>
                <div class="item">
                    <span :class='{active: changeShowType =="complete"}' @click="changeShowType='complete'">完成</span>
                </div>
            </section>
            <transition name="m-tab-choose">
                <section v-show="changeShowType =='undone'" class="m-tab-container order-list">
                    <router-link v-for="item in Undone" :key="item.Id" :to="'/delivery/detail/'+item.Id+'/'+item.BillId" tag="section" class="item">
                        <section class="title">
                            <h3 class="name ellipsis">
                                <strong>{{item.CustomerName}}</strong>
                            </h3>
                            <section>
                                {{item.BizDateTime | time}}
                            </section>
                        </section>
                        <section class="content">
                            <section>
                                <span>单号:</span>
                                <span>{{item.BillNo}}</span>
                            </section>
                            <section>
                                <span>状态:</span>
                                <b :class="{money:item.LogisticsStatus==2,number:item.LogisticsStatus==3}">{{item.LogisticsStatusName}}</b>
                            </section>
                            <section>
                                <span>仓库:</span>
                                <span>{{item.StorageName}}</span>
                            </section>
                        </section>
                    </router-link>
                </section>
            </transition>
            <transition name="m-tab-choose">
                <section v-show="changeShowType =='complete'" class="m-tab-container order-list">
                    <router-link v-for="item in Complete" :key="item.Id" :to="'/delivery/detail/'+item.Id+'/'+item.BillId" tag="section" class="item">
                        <section class="title">
                            <h3 class="name ellipsis">
                                <strong>{{item.CustomerName}}</strong>
                            </h3>
                            <section>
                                {{item.BizDateTime | time}}
                            </section>
                        </section>
                        <section class="content">
                            <section>
                                <span>单号:</span>
                                <span>{{item.BillNo}}</span>
                            </section>
                            <section>
                                <span>状态:</span>
                                <b :class="{money:item.LogisticsStatus==2,number:item.LogisticsStatus==3}">{{item.LogisticsStatusName}}</b>
                            </section>
                            <section>
                                <span>仓库:</span>
                                <span>{{item.StorageName}}</span>
                            </section>
                        </section>
                    </router-link>
                </section>
            </transition>
        </section>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import headerTitle from 'src/components/header/header-title'
import loading from 'src/components/common/loading'
import { apiGetExpresses } from 'src/service/getData'

export default {
    data() {
        return {
            showLoading: true,
            changeShowType: 'undone',
            expressList: []
        }
    },
    mounted() {
        this.initData();
    },
    computed: {
        ...mapState([
            'curExpress',
        ]),
        Undone: function () {
            return this.expressList.filter(function (item) {
                return item.LogisticsStatus === 2;
            });
        },
        Complete: function () {
            return this.expressList.filter(function (item) {
                return item.LogisticsStatus === 3;
            });
        }
    },
    components: {
        headerTitle,
        loading
    },
    methods: {
        async initData() {
            let startDate = new Date();
            startDate.setHours(0, 0, 0, 0);
            let endDate = new Date();
            endDate.setHours(23, 59, 59, 999);

            await apiGetExpresses([2, 3], startDate, endDate, this.curExpress.Id).then(res => this.expressList = res.Items);

            this.showLoading = false;
        }
    }
}
</script>

<style lang="scss" scoped>
.number,
.money {
    font-size: .55rem;
}
</style>
