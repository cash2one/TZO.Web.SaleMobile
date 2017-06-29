<template>
    <div>
        <header-title header-title="回店" go-back='true'>
        </header-title>
        <section class="info-data">
            <ul class="clear">
                <router-link to="/balance" tag="li" class="info-data-link">
                    <span class="info-data-top">
                        <b>11.00</b>元</span>
                    <span class="info-data-bottom">现金</span>
                </router-link>
                <router-link to="/benefit" tag="li" class="info-data-link">
                    <span class="info-data-top">
                        <b>111.00</b>单</span>
                    <span class="info-data-bottom">欠款</span>
                </router-link>
                <router-link to="/points" tag="li" class="info-data-link">
                    <span class="info-data-top">
                        <b>222.00</b>单</span>
                    <span class="info-data-bottom">退货</span>
                </router-link>
            </ul>
        </section>
    </div>
</template>

<script>
import headerTitle from 'src/components/header/header-title'
export default {
    components: {
        headerTitle
    },
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';

.info-data {
    padding-top: 1.95rem;
    width: 100%;
    background: $fc;
    box-sizing: border-box;
    ul {
        .info-data-link {
            float: left;
            width: 33.33%;
            display: inline-block;
            border-right: 1px solid #f1f1f1;
            span {
                display: block;
                width: 100%;
                text-align: center;
            }
            .info-data-top {
                @include sc(.55rem, #333);
                padding: .853333rem 0 .453333rem;
                b {
                    display: inline-block;
                    @include sc(.8rem, #f90);
                    font-weight: 700;
                    line-height: 1rem;
                    font-family: Helvetica Neue, Tahoma;
                }
            }
            .info-data-bottom {
                @include sc(.57333rem, #666);
                font-weight: 400;
                padding-bottom: .453333rem;
            }
        }
        .info-data-link:nth-of-type(2) {
            .info-data-top {
                b {
                    color: #ff5f3e;
                }
            }
        }
        .info-data-link:nth-of-type(3) {
            border: 0;
            .info-data-top {
                b {
                    color: #6ac20b;
                }
            }
        }
    }
}
</style>
