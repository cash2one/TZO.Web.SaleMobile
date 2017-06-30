<template>
    <div class="rating_page">
        <header-title header-title="设置"></header-title>
        <select-slid-up title="仓库" :model="storage" :selected="chooseStorage" :items="storages"></select-slid-up>
        <select-slid-up title="物流" :model="expressCorp" :selected="chooseExpress" :items="expressCorps"></select-slid-up>
        <select-slid-up title="打印机" :model="printer" :selected="choosePrinter" :items="printers"></select-slid-up>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import headerTitle from 'src/components/header/header-title'
import selectSlidUp from 'src/components/common/select-slid-up'
import { getStorages, getExpressCorps } from 'src/service/getData'

export default {
    data() {
        return {
            storages: [],
            expressCorps: [],
            printers: []
        }
    },
    mounted() {
        this.initData();
    },
    components: {
        headerTitle,
        selectSlidUp
    },
    computed: {
        ...mapState([
            'storage', 'expressCorp', 'printer'
        ]),
    },
    methods: {
        ...mapMutations([
            'SAVE_STORAGE', 'SAVE_EXPRESS_CORP', 'SAVE_PRINTER'
        ]),
        // 选择仓库
        chooseStorage(id, name) {
            this.SAVE_STORAGE({ Id: id, Name: name });
        },
        // 选择物流
        chooseExpress(id, name) {
            this.SAVE_EXPRESS_CORP({ Id: id, Name: name });
        },
        // 选择打印机
        choosePrinter(id, name) {
            this.SAVE_PRINTER({ Id: id, Name: name });
        },
        initData() {
            getStorages().then(res => { this.storages = res.Items; });
            getExpressCorps().then(res => { this.expressCorps = res.Items; });
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';

.container_style {
    background-color: #fff;
    margin-top: .4rem;
    padding: 0 .7rem;
}

.pay_way {
    .header_style {
        @include fj;
        line-height: 2rem;
        span:nth-of-type(1) {
            @include sc(.7rem, #666);
        }
        .more_type {
            span:nth-of-type(1) {
                @include sc(.6rem, #aaa);
                width: 10rem;
                display: inline-block;
                text-align: right;
                vertical-align: middle;
            }
            svg {
                @include wh(.5rem, .5rem);
                fill: #ccc;
            }
        }
    }
    .support_is_available {
        span {
            color: #666;
        }
    }
}

.cover {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .3);
    z-index: 203;
}

.choose_type_Container {
    min-height: 10rem;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 204;
    header {
        background-color: #fafafa;
        @include sc(.7rem, #333);
        text-align: center;
        line-height: 2rem;
    }
    ul {
        li {
            @include fj;
            padding: 0 .7rem;
            line-height: 2.5rem;
            align-items: center;
            span {
                @include sc(.7rem, #ccc);
            }
            svg {
                @include wh(.8rem, .8rem);
                fill: #eee;
            }
        }
        .choose {
            span {
                color: #333;
            }
            svg {
                fill: #4cd964;
            }
        }
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .3s;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}

.slid_up-enter-active,
.slid_up-leave-active {
    transition: all .3s;
}

.slid_up-enter,
.slid_up-leave-active {
    transform: translate3d(0, 10rem, 0)
}
</style>