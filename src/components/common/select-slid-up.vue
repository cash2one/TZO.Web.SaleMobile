<template>
    <div class="select">
        <section class="m-form-list">
                <section class="item start end" @click="showItems">
                    <h2>
                       {{title}}
                    </h2>
                    <div class="content">
                        <p>{{model.Name}}</p>
                        <svg class="icon">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#chevron-right"></use>
                        </svg>
                    </div>
                </section>
            </section>
        <transition name="fade">
            <div class="cover" v-if="show" @click="showItems"></div>
        </transition>
        <transition name="slid_up">
            <div class="item_container" v-if="show">
                <header>{{title}}</header>
                <ul>
                    <li v-for="item in items" :key="item.Id" :class="{selected: model.Id == item.Id}" @click="selectItem(item.Id,item.Name)">
                        <span>
                            {{item.Name}}
                        </span>
                        <svg class="icon">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
                        </svg>
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
        }
    },
    methods: {
        showItems() {
            this.show = !this.show;
        },
        selectItem(id, name) {
            this.show = !this.show;
            this.selected(id, name);
        },
    },
    props: ['title', 'items', 'model', 'selected']
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';

.select {
    .cover {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, .3);
        z-index: 203;
    }
    .item_container {
        min-height: 10rem;
        background-color: $background-light-color;
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 204;
        header {
            background-color: $background-darklight-color;
            @include sc(.7rem, $font-color);
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
                    @include sc(.7rem, $font-light-color);
                }
                svg {
                    @include wh(.8rem, .8rem);
                    fill: $icon-color;
                }
            }
            .selected {
                span {
                    color: $font-color;
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
}
</style>
