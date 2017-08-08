<template>
    <div class="page rating paddingTop">
        <header-title header-title="设置" goback="true"></header-title>
        <select-slid-up title="订单仓库" :model="orderStorage" :selected="chooseOrderStorage" :items="storageList"></select-slid-up>
        <select-slid-up title="移动仓库" :model="curStorage" :selected="chooseStorage" :items="myStorageList"></select-slid-up>
        <select-slid-up title="物流" :model="curExpress" :selected="chooseExpress" :items="expressList"></select-slid-up>
        <select-slid-up title="打印机" :model="curPrinter" :selected="choosePrinter" :items="printerList"></select-slid-up>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import headerTitle from 'src/components/header/header-title'
import selectSlidUp from 'src/components/common/select-slid-up'
import { getStorages, getExpressCorps } from 'src/service/getData'

export default {
    mounted() {
        this.initData();
    },
    components: {
        headerTitle,
        selectSlidUp
    },
    computed: {
        ...mapState([
            'orderStorage',
            'curStorage',
            'curExpress',
            'curPrinter',
            'storageList',
            'myStorageList',
            'expressList',
            'printerList'
        ]),
    },
    methods: {
        ...mapActions([
            'getStorageList',
            'getMyStorageList',
            'getExpressList'
        ]),
        ...mapMutations([
            'SAVE_ORDER_STORAGE',
            'SAVE_CUR_STORAGE',
            'SAVE_CUR_EXPRESS',
            'SAVE_CUR_PRINTER'
        ]),
        // 订单仓库
        chooseOrderStorage(id, name) {
            this.SAVE_ORDER_STORAGE({ Id: id, Name: name });
        },
        // 选择仓库
        chooseStorage(id, name) {
            this.SAVE_CUR_STORAGE({ Id: id, Name: name });
        },
        // 选择物流
        chooseExpress(id, name) {
            this.SAVE_CUR_EXPRESS({ Id: id, Name: name });
        },
        // 选择打印机
        choosePrinter(id, name) {
            this.SAVE_CUR_PRINTER({ Id: id, Name: name });
        },
        initData() {
            this.getStorageList();
            this.getMyStorageList();
            this.getExpressList();
        },
    },
}
</script>