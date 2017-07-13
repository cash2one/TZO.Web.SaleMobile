<template>
    <header id='header_title'>
        <section v-if="goback" class="header_title_goback" @click="$router.go(-1)">
            <svg class="icon">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#chevron-left"></use>
            </svg>
        </section>
        <section class="title_head ellipsis">
            <span class="title_text">{{headerTitle}}</span>
        </section>
    </header>
</template>

<<script>
export default {
    props: ['headerTitle','goback']
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';

#header_title {
    background-color: $blue;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    @include wh(100%, 1.95rem);
}

.header_title_goback {
    left: .4rem;
    margin-top: .35rem;
    margin-left: .4rem;
    @include wh(1rem, 1rem);
    .icon {
        fill: $icon-light-color;
    }
}

.title_head {
    @include center;
    width: 50%;
    color: #fff;
    text-align: center;
    .title_text {
        @include sc(0.8rem, #fff);
        text-align: center;
        font-weight: bold;
    }
}
</style>

