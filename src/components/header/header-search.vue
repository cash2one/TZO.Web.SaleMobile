<template>
    <header id='header_search'>
        <section class="header_search_icon">
            <svg class="icon">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#search"></use>
            </svg>
        </section>
        <section class="search_keyword">
            <input type="text" placeholder="请输关键字或拼音码" class="search_text" />
        </section>
    </header>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    data() {
        return {

        }
    },
    mounted() {

    },
    props: ['searchKeyword']
}
</script>


<style lang="scss" scoped>
@import '../../style/mixin';

#header_search {
    background-color: $blue;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    @include wh(100%, 1.95rem);
}

.header_search_icon {
    left: .4rem;
    margin-top: .35rem;
    margin-left: .6rem;
}

.header_search_icon .icon {
    margin-top: .2rem;
    @include wh(1.1rem, 1.1rem);
}

.search_keyword {
    @include ct();
    width: 100%;
    padding-left: 0.7rem;
    padding-right: 0.7rem;
    .search_text {
        @include sc(0.8rem, #fff);
        width: 100%;
        background-color: transparent;
        border-bottom: #fff 2px solid;
        padding-left: 1.1rem;
        font-weight: bold;
    }
    .search_text::-webkit-input-placeholder {
        color: #ddd;
        font-weight: normal;
        font-style:italic;
    }
}
</style>