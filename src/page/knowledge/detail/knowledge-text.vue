<template>
    <div class="page rating">
        <header-title header-title="文章信息" goback='true'></header-title>
        <section v-if="!showLoading" class="scroll_container paddingTop">
            <h2>{{text.Title}}</h2>
            <p>{{text.Content}}</p>
        </section>
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
    </div>
</template>
<script>
import headerTitle from 'src/components/header/header-title'
import loading from 'src/components/common/loading'
import { apiGetKnowledgeText } from 'src/service/getData'

export default {
    data() {
        return {
            text: {},
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

            this.text = await apiGetKnowledgeText(this.$route.params.Id);

            this.showLoading = false;
        }
    }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';

h2 {
    background-color: $background-light-color;
    @include indent05();
    @include sc(.8rem, $font-color);
    border-top: 1px solid $border-color;
}

p {
    @include indent05();
    border-top: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
    background: $background-light-color;
    min-height: 30rem;
}
</style>
