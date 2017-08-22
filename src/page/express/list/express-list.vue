<template>
    <section class="page">
        <header-title header-title="发货" goback="true"></header-title>
        <section v-if="!showLoading" class="scroll_container paddingTop">
            <section class="m-tabs" ref="chooseType">
                <div class="item">
                    <span :class='{active: changeShowType =="undone"}' @click="changeShowType='undone'">待发</span>
                </div>
                <div class="item">
                    <span :class='{active: changeShowType =="complete"}' @click="changeShowType='complete'">完成</span>
                </div>
            </section>
            <transition name="m-tab-choose">
                <section v-show="changeShowType =='undone'" class="m-tab-container order-list">
                    <router-link v-for="item in undone" :key="item.Id" :to="'/express/detail/'+item.Id+'/'+item.BillId" tag="section" class="item">
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
                                <span class="express">
                                    {{item.LogisticsCorpName}}
                                </span>
                            </section>
                        </section>
                    </router-link>
                </section>
            </transition>
            <transition name="m-tab-choose">
                <section v-show="changeShowType =='complete'" class="m-tab-container order-list">
                    <router-link v-for="item in complete" :key="item.Id" :to="'/express/detail/'+item.Id+'/'+item.BillId" tag="section" class="item">
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
                                <span class="express">
                                    {{item.LogisticsCorpName}}
                                </span>
                            </section>
                        </section>
                    </router-link>
                </section>
            </transition>
        </section>
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
    </section>
</template>

<script>
import headerTitle from 'src/components/header/header-title'
import loading from 'src/components/common/loading'
import { apiGetExpresses } from 'src/service/getData'

export default {
    data() {
        return {
            showLoading: true,
            changeShowType: 'undone',
            undone: [],
            complete: []
        }
    },
    mounted() {
        this.initData();
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

            await apiGetExpresses([2]).then(res => this.undone = res.Items);
            await apiGetExpresses([3], startDate, endDate).then(res => this.complete = res.Items);

            this.showLoading = false;
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';

.number,
.money {
    font-size: .55rem;
}

.express {
    position: absolute;
    right: 0.55rem;
    @include sc(.55rem, #fff);
    background-color: $blue;
    width: 2.4rem;
    text-align: center;
    border-radius: 0.12rem;
    padding: .1rem;
}
</style>