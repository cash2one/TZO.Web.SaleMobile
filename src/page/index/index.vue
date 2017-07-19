<template>
    <div class="page">
        <transition name="router-fade" mode="out-in">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
        </transition>
        <transition name="router-fade" mode="out-in">
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </transition>
        <foot-guide></foot-guide>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import footGuide from 'src/components/footer/foot-guide'

export default {
    components: {
        footGuide
    }
}
</script>