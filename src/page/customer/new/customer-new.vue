<template>
    <div class="page rating paddingTop">
        <header-title header-title="新增客户" goback='true'>
        </header-title>
        <section class="m-form-list">
            <section class="item start">
                <h3>名称<span style="color:red;">*</span></h3>
                <input type="text" v-model="bizObjInfo.Name" class="input-text" placeholder="请输入客户名称">
            </section>
            <section class="item">
                <h3>业务区域<span style="color:red;">*</span></h3>
                <p @click="showEditItem('bizArea')">{{(customerInfo.BizAreaName)?customerInfo.BizAreaName:"请输入业务区域"}}</p>
            </section>
            <section class="item">
                <h3>客户等级<span style="color:red;">*</span></h3>
                <p @click="showEditItem('customerLevel')">{{(customerInfo.CustomerLevelName)?customerInfo.CustomerLevelName:"请选择客户等级"}}</p>
            </section>
            <section class="item">
                <h3>发货仓库<span style="color:red;">*</span></h3>
                <p @click="showEditItem('storage')">{{(customerInfo.SendStorageName)?customerInfo.SendStorageName:"请选择发货仓库"}}</p>
            </section>
            <section class="item">
                <h3>行政区划</h3>
                <input type="text" v-model="bizObjInfo.DistrictId" class="input-text" placeholder="请输入行政区划">
            </section>
            <section class="item">
                <h3>编码</h3>
                <input type="text" v-model="bizObjInfo.Code" class="input-text" placeholder="请输入编码">
            </section>
            <section class="item">
                <h3>助记符</h3>
                <input type="text" v-model="bizObjInfo.Spell" class="input-text" placeholder="请输入助记符">
            </section>
            <section class="item end">
                <h3>备注</h3>
                <input type="text" v-model="bizObjInfo.Note" class="input-text" placeholder="请输入备注">
            </section>
        </section>
        <section class="m-form-list">
            <router-link to="" class="item start end">
                <h2>
                    联系人:{{contactArr.length}}
                </h2>
                <div class="content">
                    <p>详情</p>
                    <svg class="icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#chevron-right"></use>
                    </svg>
                </div>
            </router-link>
        </section>
        <section class="m-form-list">
            <router-link to="" class="item start end">
                <h2>
                    地址:{{addrArr.length}}
                </h2>
                <div class="content">
                    <p>详情</p>
                    <svg class="icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#chevron-right"></use>
                    </svg>
                </div>
            </router-link>
        </section>
    
        <section>
            <transition name="fade">
                <div class="edit_cover" v-if="showBizAreaEdit" @click="closeEditItem('bizArea')"></div>
            </transition>
            <transition name="fadeBounce" v-if="showBizAreaEdit">
                <div class="edit">
                    <header class="header">
                        <h4 class="ellipsis">选择业务区域</h4>
                        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" version="1.1" class="cancel" @click="closeEditItem('bizArea')">
                            <line x1="0" y1="0" x2="16" y2="16" stroke="#666" stroke-width="1.2" />
                            <line x1="0" y1="16" x2="16" y2="0" stroke="#666" stroke-width="1.2" />
                        </svg>
                    </header>
                    <section class="details">
                        <div class="item_container">
                            <ul>
                                <li v-for="item in bizAreaList" :key="item.Id" :class="{selected: customerInfo.BizAreaId == item.Id}" @click="selectBizAreaItem(item.Id,item.Name)">
                                    <span>
                                        {{item.Name}}
                                    </span>
                                    <svg class="icon">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
                                    </svg>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
            </transition>
        </section>
    
        <section>
            <transition name="fade">
                <div class="edit_cover" v-if="showCustomerLevelEdit" @click="closeEditItem('customerLevel')"></div>
            </transition>
            <transition name="fadeBounce" v-if="showCustomerLevelEdit">
                <div class="edit">
                    <header class="header">
                        <h4 class="ellipsis">选择客户等级</h4>
                        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" version="1.1" class="cancel" @click="closeEditItem('customerLevel')">
                            <line x1="0" y1="0" x2="16" y2="16" stroke="#666" stroke-width="1.2" />
                            <line x1="0" y1="16" x2="16" y2="0" stroke="#666" stroke-width="1.2" />
                        </svg>
                    </header>
                    <section class="details">
                        <div class="item_container">
                            <ul>
                                <li v-for="item in customerLevels" :key="item.Id" :class="{selected: customerInfo.CustomerLevelId == item.Id}" @click="selectCustomerLevelItem(item.Id,item.Name)">
                                    <span>
                                        {{item.Name}}
                                    </span>
                                    <svg class="icon">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
                                    </svg>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
            </transition>
        </section>
    
        <section>
            <transition name="fade">
                <div class="edit_cover" v-if="showStorageEdit" @click="closeEditItem('storage')"></div>
            </transition>
            <transition name="fadeBounce" v-if="showStorageEdit">
                <div class="edit">
                    <header class="header">
                        <h4 class="ellipsis">选择仓库</h4>
                        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" version="1.1" class="cancel" @click="closeEditItem('storage')">
                            <line x1="0" y1="0" x2="16" y2="16" stroke="#666" stroke-width="1.2" />
                            <line x1="0" y1="16" x2="16" y2="0" stroke="#666" stroke-width="1.2" />
                        </svg>
                    </header>
                    <section class="details">
                        <div class="item_container">
                            <ul>
                                <li v-for="item in storageList" :key="item.Id" :class="{selected: customerInfo.SendStorageId == item.Id}" @click="selectStorageItem(item.Id,item.Name)">
                                    <span>
                                        {{item.Name}}
                                    </span>
                                    <svg class="icon">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
                                    </svg>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
            </transition>
        </section>
    
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import headerTitle from 'src/components/header/header-title'
import selectSlidUp from 'src/components/common/select-slid-up'
import { apiGetCustomerLevels } from 'src/service/getData'

export default {
    data() {
        return {
            bizObjInfo: {},     //BizObj所需属性
            customerInfo: {},    //customer所需属性
            contactArr: [],      //联系人集合
            addrArr: [],        //地址集合
            customerLevels: [],          //客户等级集合
            showBizAreaEdit: false,      //业务区域片段显示变量
            showCustomerLevelEdit:false, //客户等级片段显示变量
            showStorageEdit: false,     //发货仓库片段显示变量
        }
    },
    mounted() {
        this.initData();
    },
    computed: {
        ...mapState([
            'bizAreaList',
            'storageList'
        ]),
    },
    components: {
        headerTitle,
        selectSlidUp
    },
    methods: {
        ...mapActions([
            'getBizAreaList',
            'getStorageList'
        ]),

        initData() {
            this.getStorageList();
            this.getBizAreaList();
            apiGetCustomerLevels().then(res => {
                this.customerLevels = res.Items;
            })
        },

        showEditItem(type) {
            switch (type) {
                case "storage":
                    this.showStorageEdit = true;
                    break;
                case "bizArea":
                    this.showBizAreaEdit = true;
                    break;
                case "customerLevel":
                    this.showCustomerLevelEdit = true;
                    break;
                default:
                    break;
            }

        },
        closeEditItem(type) {
            switch (type) {
                case "storage":
                    this.showStorageEdit = false;
                    break;
                case "bizArea":
                    this.showBizAreaEdit = false;
                    break;
                case "customerLevel":
                    this.showCustomerLevelEdit = false;
                    break;
                default:
                    break;
            }
        },

        selectStorageItem(id, name) {
            this.showStorageEdit = false;
            this.customerInfo.SendStorageId = id;
            this.customerInfo.SendStorageName = name;
        },
        selectBizAreaItem(id, name) {
            this.showBizAreaEdit = false;
            this.customerInfo.BizAreaId = id;
            this.customerInfo.BizAreaName = name;
        },
        selectCustomerLevelItem(id, name) {
            this.showCustomerLevelEdit = false;
            this.customerInfo.CustomerLevelId = id;
            this.customerInfo.CustomerLevelName = name;
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';

.edit_cover {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .4);
    z-index: 17;
}

.edit {
    position: fixed;
    top: 35%;
    left: 15%;
    width: 70%;
    background-color: #fff;
    z-index: 18;
    border: 1px;
    border-radius: 0.2rem;
    .header {
        h4 {
            @include sc(.7rem, #222);
            font-weight: normal;
            text-align: center;
            padding: .5rem;
            border-bottom: 1px solid #ccc;
        }
        .cancel {
            position: absolute;
            right: .5rem;
            top: .5rem;
        }
    }
    .details {
        padding: .75rem;
        position: relative;
        height: 12rem; //高度，滚动条使用
        overflow-y: auto; //滚动条属性
        span {
            @include sc(.7rem, $font-color);
        }
        input {
            @include sc(.7rem, $font-color);
            width: 3rem;
            display: inline-block;
            text-align: right;
        }
    }
    .footer {
        @include fj;
        align-items: center;
        background-color: #f9f9f9;
        padding: 0.5rem;
        border: 1px;
        border-bottom-left-radius: .2rem;
        border-bottom-right-radius: .2rem;
        .addto_cart {
            @include wh(4rem, 1.3rem);
            background-color: $blue;
            border-radius: 0.15rem;
            @include sc(.6rem, $blue-font-color);
            text-align: center;
            line-height: 1.3rem;
        }
    }
}

.item_container {

    ul {
        li {
            @include fj;
            padding: 0 .7rem;
            line-height: 2.5rem;
            align-items: center;
            span {
                @include sc(.7rem, $font-color1);
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
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}
</style>