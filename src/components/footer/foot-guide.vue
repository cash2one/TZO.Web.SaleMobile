<template>
    <section id='foot_guide'>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position:absolute;width:0;height:0">
            <defs>
                <symbol viewBox="0 0 24 24" id="foot_home">
                    <path fill="#666" d="M9,19V13H11L13,13H15V19H18V10.91L12,4.91L6,10.91V19H9M12,2.09L21.91,12H20V21H13V15H11V21H4V12H2.09L12,2.09Z" />
                </symbol>
                <symbol viewBox="0 0 24 24" id="foot_homeActive">
                    <path fill="#0095FF" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
                </symbol>
                <symbol viewBox="0 0 24 24" id="foot_order">
                    <path fill="#666" d="M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z" />
                </symbol>
                <symbol viewBox="0 0 24 24" id="foot_orderActive">
                    <path fill="#0095FF" d="M14,17H7V15H14M17,13H7V11H17M17,9H7V7H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
                </symbol>
                <symbol viewBox="0 0 24 24" id="foot_search">
                    <path fill="#666" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                </symbol>
                <symbol viewBox="0 0 24 24" id="foot_searchActive">
                    <path fill="#0095FF" d="M15.5,14L20.5,19L19,20.5L14,15.5V14.71L13.73,14.43C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.43,13.73L14.71,14H15.5M9.5,4.5L8.95,4.53C8.71,5.05 8.34,5.93 8.07,7H10.93C10.66,5.93 10.29,5.05 10.05,4.53C9.87,4.5 9.69,4.5 9.5,4.5M13.83,7C13.24,5.97 12.29,5.17 11.15,4.78C11.39,5.31 11.7,6.08 11.93,7H13.83M5.17,7H7.07C7.3,6.08 7.61,5.31 7.85,4.78C6.71,5.17 5.76,5.97 5.17,7M4.5,9.5C4.5,10 4.58,10.53 4.73,11H6.87L6.75,9.5L6.87,8H4.73C4.58,8.47 4.5,9 4.5,9.5M14.27,11C14.42,10.53 14.5,10 14.5,9.5C14.5,9 14.42,8.47 14.27,8H12.13C12.21,8.5 12.25,9 12.25,9.5C12.25,10 12.21,10.5 12.13,11H14.27M7.87,8L7.75,9.5L7.87,11H11.13C11.21,10.5 11.25,10 11.25,9.5C11.25,9 11.21,8.5 11.13,8H7.87M9.5,14.5C9.68,14.5 9.86,14.5 10.03,14.47C10.28,13.95 10.66,13.07 10.93,12H8.07C8.34,13.07 8.72,13.95 8.97,14.47L9.5,14.5M13.83,12H11.93C11.7,12.92 11.39,13.69 11.15,14.22C12.29,13.83 13.24,13.03 13.83,12M5.17,12C5.76,13.03 6.71,13.83 7.85,14.22C7.61,13.69 7.3,12.92 7.07,12H5.17Z" />
                </symbol>
                <symbol viewBox="0 0 24 24" id="foot_profile">
                    <path fill="#666" d="M12,13C9.33,13 4,14.33 4,17V20H20V17C20,14.33 14.67,13 12,13M12,4A4,4 0 0,0 8,8A4,4 0 0,0 12,12A4,4 0 0,0 16,8A4,4 0 0,0 12,4M12,14.9C14.97,14.9 18.1,16.36 18.1,17V18.1H5.9V17C5.9,16.36 9,14.9 12,14.9M12,5.9A2.1,2.1 0 0,1 14.1,8A2.1,2.1 0 0,1 12,10.1A2.1,2.1 0 0,1 9.9,8A2.1,2.1 0 0,1 12,5.9Z" />
                </symbol>
                <symbol viewBox="0 0 24 24" id="foot_profileActive">
                    <path fill="#0095FF" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                </symbol>
            </defs>
        </svg>
        <router-link to="/home" class="guide_item">
            <svg class="icon_style">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="$route.path.indexOf('home') !== -1? '#foot_homeActive' : '#foot_home'"></use>
            </svg>
            <span>首页</span>
        </router-link>
        <router-link to="/customer/search" class="guide_item">
            <svg class="icon_style">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="$route.path.indexOf('search') !== -1? '#foot_searchActive' : '#foot_search'"></use>
            </svg>
            <span>搜索</span>
        </router-link>
        <router-link to="/order/list" class="guide_item">
            <svg class="icon_style">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="$route.path.indexOf('order') !== -1? '#foot_orderActive' : '#foot_order'"></use>
            </svg>
            <span>订单列表</span>
        </router-link>
        <router-link to="/profile" class="guide_item">
            <svg class="icon_style">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="$route.path.indexOf('profile') !== -1? '#foot_profileActive' : '#foot_profile'"></use>
            </svg>
            <span>我的</span>
        </router-link>
    </section>
</template>

<script>
//import { mapState } from 'vuex'
export default {
    data() {
        return {

        }
    },
    created() {

    },
    mounted() {
    },
    computed: {
    },
    methods: {
    },

}

</script>

<style lang="scss" scoped>
@import 'src/style/mixin';

#foot_guide {
    background-color: #fff;
    position: fixed;
    z-index: 100;
    left: 0;
    right: 0;
    bottom: 0;
    @include wh(100%, 1.95rem);
    display: flex;
    box-shadow: 0 -0.026667rem 0.053333rem rgba(0, 0, 0, .1);
}

.guide_item {
    flex: 1;
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
    .icon_style {
        @include wh(1rem, 1rem);
        margin-bottom: .1rem;
        margin-top: .2rem;
        fill: #ccc;
    }
    span {
        @include sc(.45rem, #666);
    }
}
</style>
