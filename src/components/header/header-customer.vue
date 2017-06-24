<template>
    <header id='header_customer' class="customer_detail_header" ref="customerheader">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position:absolute;width:0;height:0">
            <defs>
                <symbol viewBox="0 0 24 24" id="header_signIn">
                    <path fill="#fff" d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" />
                </symbol>
                <symbol viewBox="0 0 24 24" id="header_signInActive">
                    <path fill="#000000" d="M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                </symbol>
                <svg viewBox="0 0 24 24" id="header_location">
                    <path fill="#fff" d="M12,2C15.31,2 18,4.66 18,7.95C18,12.41 12,19 12,19C12,19 6,12.41 6,7.95C6,4.66 8.69,2 12,2M12,6A2,2 0 0,0 10,8A2,2 0 0,0 12,10A2,2 0 0,0 14,8A2,2 0 0,0 12,6M20,19C20,21.21 16.42,23 12,23C7.58,23 4,21.21 4,19C4,17.71 5.22,16.56 7.11,15.83L7.75,16.74C6.67,17.19 6,17.81 6,18.5C6,19.88 8.69,21 12,21C15.31,21 18,19.88 18,18.5C18,17.81 17.33,17.19 16.25,16.74L16.89,15.83C18.78,16.56 20,17.71 20,19Z" />
                </svg>
            </defs>
        </svg>
        <img :src="imgBaseUrl+'15cc9bbe3981688.jpg'" class="header_cover_img">
        <section class="description_header">
            <router-link to="/shop/shopDetail" class="description_top">
                <section class="description_left">
                    <img :src="imgBaseUrl+'15cc9bbe3981688.jpg'">
                </section>
                <section class="description_right">
                    <h4 class="description_title ellipsis">客户名称</h4>
                    <p class="description_text">联系人：李四</p>
                    <p class="description_promotion ellipsis">联系电话：11112222919</p>
                </section>
                <svg class="sign_in">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#header_signIn"></use>
                </svg>
            </router-link>
            <footer class="description_footer">
                <p class="ellipsis">
                    地址：济南市高新区舜泰广场8号楼东404
                </p>
            </footer>
        </section>
    </header>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { imgBaseUrl } from 'src/config/env'
export default {
    data() {
        return {
            imgBaseUrl,
        }
    },
    mounted() {
    },
    props: ['customerId']
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.customer_detail_header {
    overflow: hidden;
    position: relative;
    .header_cover_img {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9;
        filter: blur(10px);
    }
    .description_header {
        position: relative;
        z-index: 10;
        background-color: rgba(119, 103, 137, .43);
        padding: 0.4rem 0 0.4rem 0.4rem;
        width: 100%;
        overflow: hidden;
        .description_top {
            display: flex;
            .description_left {
                margin-right: 0.3rem;
                img {
                    @include wh(2.9rem, 2.9rem);
                    display: block;
                    border-radius: 0.15rem;
                }
            }
            .description_right {
                flex: 1;
                .description_title {
                    @include sc(.8rem, #fff);
                    font-weight: bold;
                    width: 100%;
                    margin-bottom: 0.3rem;
                }
                .description_text {
                    @include sc(.5rem, #fff);
                    margin-bottom: 0.3rem;
                }
                .description_promotion {
                    @include sc(.5rem, #fff);
                    width: 11.5rem;
                }
            }
            .sign_in {
                position: absolute;
                top: 1rem;
                right: .8rem;
                z-index: 11;
                width: 2rem;
                height: 2rem;
                color: #fff;
            }
        }
        .description_footer {
            @include fj;
            margin-top: 0.5rem;
            padding-right: 1.3rem;
            p {
                @include sc(.5rem, #fff);
                span {
                    color: #fff;
                }
                .tip_icon {
                    padding: 0 .04rem;
                    border: 0.025rem solid #fff;
                    border-radius: 0.1rem;
                    font-size: .4rem;
                    display: inline-block;
                }
            }
            .ellipsis {
                width: 84%;
            }
        }
    }
}
</style>