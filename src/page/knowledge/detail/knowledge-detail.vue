<template>
    <div class="page rating">
        <header-title header-title="车辆详情" goback='true'></header-title>
        <section v-if="!showLoading" class="scroll_container paddingTop">
            <section class="m-form-list">
                <div class="item start">
                    <h2>车系</h2>
                    <div class="content">
                        <p class="ellipsis">{{info.Car.CarTypeName}}</p>
                    </div>
                </div>
                <div class="item">
                    <h2>名称</h2>
                    <div class="content">
                        <p class="ellipsis">{{info.Car.Name}}</p>
                    </div>
                </div>
                <div class="item">
                    <h2>年款</h2>
                    <div class="content">
                        <p class="ellipsis">{{info.Car.ModelYear}}</p>
                    </div>
                </div>
                <div class="item">
                    <h2>排量</h2>
                    <div class="content">
                        <p class="ellipsis">{{info.Car.OutputeVolume}}</p>
                    </div>
                </div>
                <div class="item">
                    <h2>排量</h2>
                    <div class="content">
                        <p class="ellipsis">{{info.Car.OutputeVolume}}</p>
                    </div>
                </div>
                <div class="item">
                    <h2>发动机型号</h2>
                    <div class="content">
                        <p class="ellipsis">{{info.Car.EngineVersion}}</p>
                    </div>
                </div>
                <div class="item">
                    <h2>变速箱型号</h2>
                    <div class="content">
                        <p class="ellipsis">{{info.Car.GearBoxVersion}}</p>
                    </div>
                </div>
                <div class="item end">
                    <h2>更新时间</h2>
                    <div class="content">
                        <p class="ellipsis">{{info.Car.ModifyTime}}</p>
                    </div>
                </div>
                <h3>通用件</h3>
                <div v-for="(item,index) in global.Items" :key="index" class="item" :class="{end:index==(global.Count-1)}">
                    <h2>{{item.Name}}</h2>
                    <div class="content">
                        <p class="ellipsis">{{getGlobalPart(item.Id)}}</p>
                    </div>
                </div>
            </section>
            <br>
            <section v-if="text.Count" class="item-list">
                <footer class="clear_all_history" @click="toggleText()">文章 {{text.Count}} 篇 </footer>
                <div v-show="text.show" v-for="item in text.Items" :key="item.Id" class="item">
                    <div>
                        <h2>{{item.Title}}</h2>
                        <div class="content">
                            <p>{{item.Content}}</p>
                        </div>
                    </div>
                </div>
            </section>
            <section v-for="(group,index) in partGroup" :key="index">
                <footer class="clear_all_history" @click="toggleGroup(group)">{{group.name}} {{group.items.length}} 品 </footer>
                <section v-if="group.show" class="item-list">
                    <section v-for="(item,index) in group.items" :key="index" class="item">
                        <section class="item-left">
                            <section class="title">
                                <h3 class="name ellipsis">
                                    <strong>{{item.Goods.Name}}</strong>
                                </h3>
                            </section>
                            <section class="content">
                                <section v-for="prop in globalPropertyList" :key="prop.Id">
                                    <span>{{prop.Name}}</span>:
                                    <span>{{item.Goods.Properties['p'+prop.Id]}}</span>
                                </section>
                            </section>
                        </section>
                        <div class="detail">
                            {{item.PartsTypeName}}
                        </div>
                    </section>
                </section>
            </section>
            <br />
        </section>
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import headerTitle from 'src/components/header/header-title'
import loading from 'src/components/common/loading'
import { apiGetGlobalParts, apiGetCar, apiGetMatchParts, apiGetTextList } from 'src/service/getData'

export default {
    data() {
        return {
            car: {},
            info: {},
            text: {
                show: false
            },
            partGroup: {},
            global: {},
            showLoading: true,
        }
    },
    mounted() {
        this.initData();
    },
    computed: {
        ...mapState([
            'globalPropertyList',
        ]),
    },
    components: {
        headerTitle,
        loading
    },
    methods: {
        ...mapActions([
            'getGlobalProperty',
        ]),
        async initData() {
            await this.getGlobalProperty();

            this.car = await apiGetCar(this.$route.params.Id);

            this.info = await apiGetMatchParts(this.$route.params.Id);

            this.info.Parts.forEach(function (ele) {
                if (!this.partGroup[ele.PartsTypeId]) {
                    this.partGroup[ele.PartsTypeId] = {};
                    this.partGroup[ele.PartsTypeId].show = false;
                    this.partGroup[ele.PartsTypeId].name = ele.PartsTypeName;
                    this.partGroup[ele.PartsTypeId].items = [];
                }
                this.partGroup[ele.PartsTypeId].items.push(ele);
            }, this);

            this.text = await apiGetTextList(this.$parent.inputVaule);

            this.global = await apiGetGlobalParts();

            this.showLoading = false;
        },
        getGlobalPart(partId) {
            let res;
            this.car.PartsViews.forEach(function (ele) {
                if (ele.PartsTypeId == partId) {
                    res = ele.Note;
                }
            });
            return res;
        },
        toggleText() {
            this.text.show = !this.text.show;
            this.text = { ...this.text };
        },
        toggleGroup(item) {
            item.show = !item.show;

            this.partGroup = { ...this.partGroup };
        },
    }
}
</script>

<style lang="scss">
@import 'src/style/mixin';

.group {
    margin-top: .4rem;
}

.m-form-list {
    h3 {
        @include indent05();
    }
}

.item-list {
    .item {
        .detail {
            position: absolute;
            right: .55rem;
            @include sc(0.65rem, $green);
            width: initial;
        }
    }
}

.clear_all_history {
    @include sc(0.7rem, #666);
    text-align: center;
    line-height: 2rem;
    background-color: #fff;
    border-bottom: 1px solid $bc;
}
</style>
