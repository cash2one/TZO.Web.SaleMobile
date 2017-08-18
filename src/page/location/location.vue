<template>
    <div class="page rating">
        <header-title header-title="路径" goback='true'></header-title>
        <section class="rating paddingTop">
            <iframe v-bind:src="getlocationMap" frameborder=0 seamless="seamless"></iframe>
        </section>
    </div>
</template>

<script>
import headerTitle from 'src/components/header/header-title'
export default {
    data() {
        return {
            //lon经度
            lon: '117.145287',
            //lat纬度
            lat: '36.664081',
            //用户自定义显示名称
            name: '舜泰广场',
            //使用方来源信息
            map_src: '保证服务质量',
            //坐标系参数coordinate=gaode,表示高德坐标（gcj02坐标），
            //coordinate=wgs84,表示wgs84坐标（GPS原始坐标）
            coordinate: 'gaode',
            //是否尝试调起高德地图APP并在APP中查看，0表示不调起，1表示调起, 默认值为0
            callnative: 1
        }
    },
    computed: {
        getlocationMap: function () {
            var srcValue = '//uri.amap.com/marker?position=' + this.lon + ',' + this.lat + '&name=' + this.name + '&src=' + this.map_src + '&coordinate=' + this.coordinate + '&callnative=' + this.callnative;
            return srcValue;
        }
    },
    components: {
        headerTitle
    }
}
</script>

<style lang="scss" scoped>
.header_title {
    z-index: 300;
}

iframe {
    width: 100%;
    height: 100%;
}
</style>