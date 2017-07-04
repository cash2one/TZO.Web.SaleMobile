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