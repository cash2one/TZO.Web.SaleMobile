<template>
    <div class="page rating">
        <header-title header-title="路径" goback='true'></header-title>
        <section class="rating paddingTop">
            <div id="container" ref="map" class="amap"></div>
            <div class="address">{{address}}</div>
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
            //地图中心位置 
            conter: [117.145287, 36.664081],
            address: ''
        }
    },
    mounted() {
        this.createMap()
    },
    components: {
        headerTitle
    },
    methods: {
        createMap() {
            var map, marker;
            map = new AMap.Map('container', {
                resizeEnable: true,
                zoom: 15,
                //中心位置
                center: this.conter
            });

            // 給地图添加缩放工具条,默认显示在右下角
            var toolBar = new AMap.ToolBar({
                position: "lt"
            });
            map.addControl(toolBar);

            marker = new AMap.Marker({
                icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
                position: [this.lon, this.lat]
            });
            marker.setMap(map);

            //根据经纬度获得地址(逆地理编码)
            var geocoder = new AMap.Geocoder();

            let self = this;
            let callback = function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    self.address = result.regeocode.formattedAddress;
                } else {
                    //获取地址失败
                    self.address = "获取地址失败！";
                }
            };

            geocoder.getAddress([this.lon, this.lat], callback);
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';

.header_title {
    z-index: 300;
}

.amap {
    height: 100%;
    width: 100%;
    padding-top: 1rem;
}

.address {
    position: fixed;
    z-index: 300;
    bottom: .275rem;
    left: 1rem;
    right: 1rem;
    text-align: center;
    background-color: $background-color;
    border: 1px solid $border-color;
    border-radius: .275rem;
    @include sc(.65rem, $font-color);
    @include indent10;
}
</style>