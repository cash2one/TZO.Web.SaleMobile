<template>
    <header id='header_title'>
        <section v-if="goback" class="header_title_goback" @click="$router.go(-1)">
            <svg class="icon">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#chevron-left"></use>
            </svg>
        </section>
        <section class="title_head ellipsis">
            <h2><strong>{{headerTitle}}</strong></h2>
        </section>
    </header>
</template>

<script>
export default {
    props: ['headerTitle','goback']
}
</script>

