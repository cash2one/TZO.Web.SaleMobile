<template>
    <section class="page rating">
        <header-title header-title="订单备注" goback="true"></header-title>
        <section v-if="!showLoading">
            <section class="input_remark quick_remark">
                <header class="header_style">其他备注</header>
                <textarea class="input_text" v-model="inputText" placeholder="请输入备注内容(可不填)"></textarea>
            </section>
            <div class="determine" @click="confirmRemark">确定</div>
        </section>
        <loading v-if="showLoading"></loading>
    </section>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import headerTitle from 'src/components/header/header-title'
import loading from 'src/components/common/loading'

export default {
    data() {
        return {
            customerId: 0,
            inputText: null,
            showLoading: true, //显示加载动画
        }
    },
    mounted() {
        this.initData();
    },
    computed: {
        ...mapState([
            'cartList'
        ]),
        cart: function () {
            return Object.assign({}, this.cartList[this.customerId]);
        },
    },
    components: {
        headerTitle,
        loading
    },
    methods: {
        ...mapMutations([
            'CONFIRM_REMARK'
        ]),
        async initData() {
            this.customerId = this.$route.params.customerId;

            this.showLoading = false;
        },
        //确认选择
        confirmRemark() {
            this.CONFIRM_REMARK({ customerId: this.customerId, remark: this.inputText });
            this.$router.go(-1);
        }
    },
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
@import '../order';

.header_style {
    @include sc(.65rem, #333);
    line-height: 2rem;
}

.input_remark {
    background-color: #fff;
    .input_text {
        width: 100%;
        background-color: #f9f9f9;
        border: 0.025rem solid #eee;
        resize: none;
        min-height: 4.5rem;
        border-radius: .2rem;
        @include sc(.6rem, #666);
        padding: .5rem;
    }
}

.quick_remark {
    background-color: #fff;
    margin-top: .4rem;
    padding: 0 .6rem 1rem;
}


.determine {
    background-color: #4cd964;
    @include sc(.7rem, #fff);
    text-align: center;
    margin: 0.5rem .7rem;
    line-height: 1.8rem;
    border-radius: 0.2rem;
}
</style>
