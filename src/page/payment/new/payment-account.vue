<template>
    <div class="page rating">
        <header-title header-title="选择账户" goback='true'></header-title>
        <section v-if="!showLoading" class="scroll_container paddingTop">
            <section class="m-form-list">
                <div class="h3">现金账户</div>
                <section class="item" v-for="item in cash" :key="item.Id" @click="tempRecAccount = item">
                    <h2>
                        <svg v-if="tempRecAccount.Id==item.Id" class="icon">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
                        </svg>
                        <section v-else class="icon"></section>
                        <p>{{item.Name}}</p>
                    </h2>
                </section>
                <div class="h3">银行账户</div>
                <section class="item" v-for="item in bank" :key="item.Id" @click="tempRecAccount = item">
                    <h2>
                        <svg v-if="tempRecAccount.Id==item.Id" class="icon">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
                        </svg>
                        <section v-else class="icon"></section>
                        <p>{{item.Name}}</p>
                    </h2>
                </section>
            </section>
            <br>
            <br>
            <br>
            <br>
            <section class="confirm_order">
                <p @click="confirmRecAccount">确认</p>
            </section>
        </section>
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
    </div>
</template>
<script>
import headerTitle from 'src/components/header/header-title'
import loading from 'src/components/common/loading'
import { apiGetRecPayAccountList } from 'src/service/getData'

export default {
    data() {
        return {
            cash: [],
            bank: [],
            tempRecAccount: {},                     // 收款账户列表选择的

            showLoading: true,
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
            // 收款账户
            let res = await apiGetRecPayAccountList();
            res.Items.forEach(item => {
                if (item.AccountType == 1) {
                    this.cash.push(item);
                    // 默认现金，后期可以记录上次使用的
                    if (item.IsDefault == true) {
                        this.recAccount = item;
                    }
                } else {
                    this.bank.push(item);
                }
            });

            this.tempRecAccount = this.$parent.recAccount;
            this.showLoading = false;
        },
        confirmRecAccount() {
            this.$parent.recAccount = this.tempRecAccount;
            this.$router.go(-1);
        },
    }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';

.confirm_order {
    position: fixed;
    bottom: 0;
    width: 100%;
    p {
        line-height: 2rem;
        @include sc(.75rem, #fff);
        background-color: #56d176;
        text-align: center;
    }
}
</style>

