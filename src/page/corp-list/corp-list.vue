<template>
    <div class="page">
        <header-title header-title="选择公司"></header-title>
        <section class="corp_container">
            <section class="m-list">
                <header>最近用过的公司</header>
                <section class="item" @click="chooseCorp(curCorp)">
                    <strong class="name">{{curCorp.CorpName}}</strong>
                    <div class="number">
                        <span>{{curCorp.Position}}</span>
                    </div>
                    <p class="content">{{curCorp.DeptName}}</p>
                </section>
                <header>选择公司</header>
                <section class="item" v-for="item in corpList" :key="item.CorpId" @click="chooseCorp(item)">
                    <strong class="name">{{item.CorpName}}</strong>
                    <div class="number">
                        <span>{{item.Position}}</span>
                    </div>
                    <p class="content">{{item.DeptName}}</p>
                </section>
            </section>
        </section>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import headerTitle from 'src/components/header/header-title'
import { apiGetToken } from 'src/service/getData'

export default {
    mounted() {
        this.initData();
    },
    components: {
        headerTitle
    },
    methods: {
        ...mapActions([
            'refreshToken',
            'getUserInfo',
            'setCurCorp'
        ]),
        ...mapMutations([
            'GET_CORPLIST'
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
            let res = await apiGetToken(this.$route.query.code);

            await this.refreshToken(res.Token);

            this.GET_CORPLIST(res.EmployeeCorpRel);

            if (res.EmployeeCorpRel.length == 1) {
                await this.initAuthData(res.EmployeeCorpRel[0]);
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
<style lang="scss" scoped>
.corp_container {
    overflow-y: auto;
}
</style>