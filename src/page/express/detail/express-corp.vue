<template>
    <div class="page rating">
        <header-title header-title="选择物流" goback="true"></header-title>
        <section class="scroll_container paddingTop">
            <section class="m-form-list">
                <section class="item" v-for="item in expressCorpsList" :key="item.Id" @click="chooseExpress(item)">
                    <h2>
                        <svg v-if="$parent.express.LogisticsCorpId==item.Id" class="icon">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
                        </svg>
                        <section v-else class="icon"></section>
                        <strong>{{item.Name}}</strong>
                    </h2>
                    <section class="content">
                        <p>
                            <span v-if="item.Phone">
                                联系电话：{{item.Phone}}
                            </span>
                            <span v-if="item.IsCollect" class="green">可代收</span>
                        </p>
                    </section>
                </section>
            </section>
        </section>
    </div>
</template>
<script>
import headerTitle from 'src/components/header/header-title'
import loading from 'src/components/common/loading'
import { apiGetExpressCorps } from 'src/service/getData'

export default {
    data() {
        return {
            showLoading: true,
            expressCorpsList: [],
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
            let res;

            if (this.$parent.express.CollectCost == 1)
                res = await apiGetExpressCorps(true);
            else
                res = await apiGetExpressCorps();

            this.expressCorpsList = res.Items;
        },
        chooseExpress(express) {
            this.$parent.express.LogisticsCorpId = express.Id;
            this.$parent.express.LogisticsCorpName = express.Name;
        },
    }
}
</script>

