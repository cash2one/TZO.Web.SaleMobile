<template>
    <div class="page rating">
        <header-title header-title="添加发货人" goback="true"></header-title>
        <section class="scroll_container paddingTop">
            <section class="m-form-list">
                <section class="item" v-for="item in this.$parent.shipperList" :key="item.Id" @click="chooseShipper(item)">
                    <h2>
                        <svg v-if="item.checked" class="icon">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
                        </svg>
                        <section v-else class="icon"></section>
                        <strong>{{item.Name}}</strong>
                    </h2>
                    <section class="content">
                        <input type="text" class="input-text red" v-model="item.workload" />
                    </section>
                </section>
            </section>
        </section>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import headerTitle from 'src/components/header/header-title'
import loading from 'src/components/common/loading'

export default {
    mounted() {
        this.initData();
    },
    computed: {
        ...mapState([
            'employeeList',
        ]),
    },
    components: {
        headerTitle,
        loading
    },
    methods: {
        ...mapActions([
            'getEmployees'
        ]),
        async initData() {
            await this.getEmployees();
        },
        chooseShipper(item) {
            item.checked = !item.checked;
            
            if (item.checked && !item.workload)
                item.workload = 1;
            else
                item.workload = undefined;

            this.$parent.shipperList = [...this.$parent.shipperList];
        },
    }
}
</script>
<style lang="scss" scoped>
.input-text {
    text-align: right;
    font-size: .65rem;
}
</style>
