<template>
    <section class="page rating">
        <header-title header-title="路径" goback='true'></header-title>
        <section class="scroll_container paddingTop">
            <div id="container" ref="map" class="amap"></div>
            <svg @click="showPopup" class="icon navigation" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <path d="M1021.956088 0L0 424.793081 422.749168 601.250832l168.282103 422.749168L1021.956088 0"></path>
            </svg>
            <div v-if="showPopupFlg" class="popup" @click="hidePopup">
                <div class="item">
                    <svg @click="callBaiduMap" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <path d="M606.293333 694.144c46.378667-9.984 40.064-65.408 38.698667-77.525333-2.261333-18.688-24.234667-51.328-54.101333-48.768-37.546667 3.370667-43.008 57.6-43.008 57.6C542.762667 650.538667 560 704.128 606.293333 694.144zM655.530667 790.570667c-1.365333 3.882667-4.394667 13.866667-1.749333 22.528 5.162667 19.498667 22.101333 20.352 22.101333 20.352l24.277333 0 0-59.392-26.026667 0C662.442667 777.6 656.810667 786.688 655.530667 790.570667zM692.394667 601.173333c25.642667 0 46.336-29.482667 46.336-65.962667 0-36.437333-20.693333-65.92-46.336-65.92-25.557333 0-46.336 29.482667-46.336 65.92C646.016 571.690667 666.794667 601.173333 692.394667 601.173333zM802.730667 605.525333c34.261333 4.437333 56.277333-32.085333 60.629333-59.818667 4.48-27.648-17.621333-59.818667-41.856-65.322667-24.277333-5.589333-54.613333 33.322667-57.386667 58.709333C760.789333 570.154667 768.554667 601.130667 802.730667 605.525333zM886.656 768.384c0 0-52.992-41.002667-83.925333-85.290667-41.941333-65.322667-101.504-38.741333-121.429333-5.504-19.84 33.237333-50.773333 54.229333-55.125333 59.818667-4.437333 5.461333-64 37.632-50.773333 96.341333 13.226667 58.666667 59.648 57.557333 59.648 57.557333s34.218667 3.370667 73.898667-5.504c39.722667-8.789333 73.898667 2.218667 73.898667 2.218667s92.757333 31.061333 118.144-28.757333C926.336 799.402667 886.656 768.384 886.656 768.384zM727.936 857.386667l-60.288 0c-26.026667-5.205333-36.394667-22.954667-37.717333-25.984-1.28-3.072-8.661333-17.365333-4.778667-41.642667 11.264-36.437333 43.349333-39.04 43.349333-39.04l32.085333 0 0-39.466667 27.349333 0.426667L727.936 857.386667zM840.234667 856.96l-69.376 0c-26.88-6.912-28.16-26.026667-28.16-26.026667l0-76.757333 28.16-0.469333 0 68.992c1.706667 7.338667 10.837333 8.704 10.837333 8.704l28.586667 0 0-77.184 29.952 0L840.234667 856.96zM938.496 652.074667c0-13.269333-11.008-53.162667-51.84-53.162667-40.874667 0-46.378667 37.674667-46.378667 64.298667 0 25.386667 2.133333 60.885333 52.949333 59.733333C944.042667 721.834667 938.496 665.386667 938.496 652.074667zM464.512 738.432c4.181333 9.173333 10.624 16.384 19.370667 21.674667 8.746667 5.290667 18.133333 7.936 28.117333 7.936 9.984 0 19.370667-2.645333 28.117333-7.936 8.746667-5.290667 15.36-12.501333 19.797333-21.674667l3.328-7.082667c-12.885333-5.333333-24.618667-13.610667-34.090667-25.173333-22.101333-27.050667-27.733333-62.634667-23.552-86.912 3.968-33.408 25.216-88.832 81.621333-93.909333 2.346667-0.213333 4.693333-0.298667 6.997333-0.298667 3.242667 0 6.4 0.170667 9.514667 0.554667 3.882667-56.192 41.429333-98.944 88.704-98.944 4.608 0 8.96 0.938667 13.312 1.706667l5.888-12.458667c9.173333-19.456 13.738667-44.288 13.738667-74.581333 0-58.88-20.821333-109.184-62.506667-150.826667C621.184 148.821333 570.88 128 512 128c-58.88 0-109.184 20.821333-150.826667 62.506667C319.488 232.149333 298.666667 282.453333 298.666667 341.333333c0 30.293333 4.565333 55.168 13.738667 74.581333L464.512 738.432zM436.565333 265.898667c20.821333-20.821333 45.952-31.232 75.434667-31.232 29.44 0 54.570667 10.410667 75.434667 31.232 20.821333 20.821333 31.232 45.952 31.232 75.392 0 29.44-10.410667 54.570667-31.232 75.434667-20.821333 20.821333-45.994667 31.232-75.434667 31.232-29.44 0-54.570667-10.410667-75.434667-31.232-20.821333-20.821333-31.232-45.952-31.232-75.434667C405.333333 311.893333 415.744 286.762667 436.565333 265.898667zM558.976 896 85.333333 896l170.666667-256 114.901333 0 20.138667 42.666667-112.213333 0-113.792 170.666667 371.925333 0C542.293333 870.869333 549.888 884.949333 558.976 896z"></path>
                    </svg>
                    <h2>百度地图</h2>
                </div>
                <div class="item">
                    <svg @click="callAmapMap" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <path d="M947.69922 349.141842l0-63.535035c0-115.647927-91.376127-208.451566-205.595518-208.451566l-32.837896 0 0 197.742666-68.531839 29.269627L640.733966 77.155241 283.08231 77.155241c-114.220415 0-205.595518 92.089371-205.595518 208.451566l0 63.535035 179.896206 0 0 68.531839L77.486792 417.673681 77.486792 737.489614c0 115.647927 91.376127 208.451566 205.595518 208.451566l357.651656 0 0-65.676815 68.531839 37.121456 0 28.555359 32.837896 0c114.220415 0 205.595518-92.090395 205.595518-208.451566L947.69922 417.673681l-102.084003 0 15.705704-68.531839L947.69922 349.141842zM384.452046 349.141842l157.766187 0-154.911162 68.531839-2.856048 0L384.451022 349.141842zM709.97905 891.686509 476.576209 748.650815l-112.825648 94.492094 44.974307-142.774751 0.400113 0.272199 0.314155-0.985444 454.738855-469.016023L347.349009 676.277484l-0.01842-0.181125L155.298995 551.882336l716.729801-333.379856L709.97905 891.686509z"></path>
                    </svg>
                    <h2>高德地图</h2>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
import headerTitle from 'src/components/header/header-title'

export default {
    data() {
        return {
            showPopupFlg: false,
            //地图中心位置 
            conter: [117.145287, 36.664081],
            //起点坐标
            origin: [117.270809, 36.633903],
            //终点坐标
            destination: [116.966653, 36.614417],
            //途径点
            waypoints: [[117.295884, 36.674806], [117.185783, 36.680796], [117.067968, 36.728605], [117.115727, 36.597242], [117.060044, 36.675719], [117.036271, 36.639144], [116.990989, 36.670856]],

            //起点名  调起地图APP传参
            originName: '山东商业职业技术学院',
            destinationName: '济南大学'
        }
    },
    components: {
        headerTitle
    },
    methods: {
        createMap() {
            var map, route;
            map = new AMap.Map('container', {
                resizeEnable: true,
                zoom: 10,
                //中心位置
                center: this.conter

            });

            // 給地图添加缩放工具条,默认显示在右下角
            var toolBar = new AMap.ToolBar({
                position: "lt"
            });
            map.addControl(toolBar);

            //构造路线导航类
            var driving = new AMap.Driving({
                map: map,

            });
            // 根据起终点经纬度规划驾车导航路线
            driving.search(this.origin, this.destination, { waypoints: this.waypoints });

            // 计算两点之间的距离   返回m(米)
            var lnglat = new AMap.LngLat(117.270809, 36.633903);
            console.log(lnglat.distance(this.destination))

        },
        showPopup() {
            this.showPopupFlg = true;
        },
        hidePopup() {
            this.showPopupFlg = false;
        },
        callBaiduMap() {
            this.showPopupFlg = false;

            var hrefMap = "baidumap://map/direction?origin=" + this.origin[0] + "," + this.origin[1] + "&destination=" + this.destination[0] + "," + this.destination[1] + "&mode=driving&src=yourCompanyName|yourAppName";
            window.location.href = hrefMap;
        },
        callAmapMap() {
            this.showPopupFlg = false;

            window.location.href = "amapuri://route/plan/?sid=BGVIS1&slat=" + this.origin[1] + "&slon=" + this.origin[0] + "&sname=" + this.originName + "&did=BGVIS2&dlat=" + this.destination[1] + "&dlon=" + this.destination[0] + "&dname=" + this.destinationName + "&dev=0&t=0";
        }
    },
    mounted() {
        this.createMap()
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

.navigation {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    fill: $blue;
}

.popup {
    @include fj;
    position: absolute;
    height: 4rem;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: $background-color;
    z-index: 202;
    .item {
        margin-top: .55rem;
        @include indent10;
        width: 100%;
        text-align: center;
        vertical-align: middle;
        .icon {
            fill: $blue;
        }
    }
}
</style>