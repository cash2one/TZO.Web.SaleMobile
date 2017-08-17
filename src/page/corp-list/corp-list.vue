<template>
    <div class="page paddingTop">
        <header-title header-title="选择公司"></header-title>
        <section class="m-form-list">
            <h3>最近用过的公司</h3>
            <section class="item" @click="chooseCorp(curCorp)">
                <h2>
                    <div>
                        <p>{{curCorp.CorpName}}</p>
                        <p>
                            <small>{{curCorp.DeptName}}</small>
                        </p>
                    </div>
                </h2>
                <section class="content">
                    <span class="red">{{curCorp.Position}}</span>
                </section>
            </section>
            <h3>选择公司</h3>
            <section class="item" v-for="item in corpList" :key="item.CorpId" @click="chooseCorp(item)">
                <h2>
                    <div>
                        <p>{{item.CorpName}}</p>
                        <p>
                            <small>{{item.DeptName}}</small>
                        </p>
                    </div>
                </h2>
                <section class="content">
                    <span class="red">{{item.Position}}</span>
                </section>
            </section>
        </section>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import headerTitle from 'src/components/header/header-title'

export default {
    data() {
        return {
        }
    },
    mounted() {
        console.log('corp-list mounted');
        this.initData();
    },
    components: {
        headerTitle
    },
    methods: {
        ...mapActions([
            'getUserInfo',
            'setCurCorp'
        ]),
        ...mapMutations([
            'SAVE_CUR_CORP'
        ]),
        async chooseCorp(corp) {
            await this.initAuthData(corp);
            this.$router.push('/home');
        },
        async initAuthData(corp) {
            await this.setCurCorp(corp);
            await this.getUserInfo();
        },
        async initData() {
            if (!this.corpList) await this.SAVE_CUR_CORP({});

            if (this.corpList.length == 1) {
                await this.initAuthData(this.corpList[0]);
                this.$router.push('/home');
            }
        }
    },
    computed: {
        ...mapState([
            'curCorp',
            'corpList'
        ]),
    },
}
</script>