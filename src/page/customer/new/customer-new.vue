<template>
    <div class="page rating paddingTop">
        <header-title header-title="新增客户" goback='true'>
        </header-title>
        <section class="m-form-list">
            <section class="item start">
                <h3>名称
                    <span style="color:red;">*</span>
                </h3>
                <input type="text" v-model="bizObjInfo.Name" class="input-text" placeholder="请输入客户名称">
            </section>
            <section class="item">
                <h3>业务区域
                    <span style="color:red;">*</span>
                </h3>
                <p @click="showEditItem('bizArea')">{{(customerInfo.BizAreaName)?customerInfo.BizAreaName:"请输入业务区域"}}</p>
            </section>
            <section class="item">
                <h3>客户等级
                    <span style="color:red;">*</span>
                </h3>
                <p @click="showEditItem('customerLevel')">{{(customerInfo.CustomerLevelName)?customerInfo.CustomerLevelName:"请选择客户等级"}}</p>
            </section>
            <section class="item">
                <h3>发货仓库
                    <span style="color:red;">*</span>
                </h3>
                <p @click="showEditItem('storage')">{{(customerInfo.SendStorageName)?customerInfo.SendStorageName:"请选择发货仓库"}}</p>
            </section>
            <!--<section class="item">
                                                <h3>行政区划</h3>
                                                <input type="text" v-model="bizObjInfo.DistrictId" class="input-text" placeholder="请输入行政区划">
                                            </section>-->
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
                    联系人:{{contactArr.length}}个
                </h2>
                <div class="content" @click="showEditItem('contact')">
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
                    地&nbsp;&nbsp;&nbsp;&nbsp;址:{{addrArr.length}}个
                </h2>
                <div class="content" @click="showEditItem('addr')">
                    <p>详情</p>
                    <svg class="icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#chevron-right"></use>
                    </svg>
                </div>
            </router-link>
        </section>
    
        <section class="confirm_button">
            <p @click="preSaveCustomer()">保存</p>
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
    
        <transition name="router-slid" mode="out-in">
            <div class="page" v-if="showContactEdit">
                <section class="scroll_container paddingTop">
                    <section class="m-list">
                        <header>联系人
                            <router-link to="" tag="a" class="right" @click.native="addContact">
                                添加
                            </router-link>
                        </header>
                        <section v-for="item in contactArrTemp" :key="item.Id">
                            <div class="item">
                                <p class="content">联系人:
                                    <input type="text" v-model="item.Contact" class="input-text" placeholder="请输入姓名">
                                </p>
                            </div>
                            <div class="item">
                                <p class="content">电&nbsp;&nbsp;&nbsp;话:
                                    <input type="text" v-model="item.PhoneNum" class="input-text" placeholder="请输入电话">
                                </p>
                            </div>
                            <br>
                        </section>
                    </section>
                    <br>
                    <br>
                    <br>
                    <br>
                    <section class="toggle_confirm_button">
                        <div class="cancelbutton" @click="closeEditItem('contact')">取消</div>
                        <div class="confirmbutton" @click="confirmEditContact()">确认</div>
                    </section>
    
                </section>
            </div>
        </transition>
    
        <transition name="router-slid" mode="out-in">
            <div class="page" v-if="showAddrEdit">
                <section class="scroll_container paddingTop">
                    <section class="m-list">
                        <header>地址
                            <router-link to="" tag="a" class="right" @click.native="addAddr">
                                添加
                            </router-link>
                        </header>
                        <section v-for="item in addrArrTemp" :key="item.Id">
                            <div class="item">
                                <p class="content">地址:
                                    <input type="text" v-model="item.Addr" class="input-text" placeholder="请输入地址">
                                </p>
                            </div>
                            <div class="item">
                                <p class="content">邮编:
                                    <input type="text" v-model="item.PostCode" class="input-text" placeholder="请输入邮编">
                                </p>
                            </div>
                            <br>
                        </section>
                    </section>
                    <br>
                    <br>
                    <br>
                    <br>
                    <section class="toggle_confirm_button">
                        <div class="cancelbutton" @click="closeEditItem('addr')">取消</div>
                        <div class="confirmbutton" @click="confirmEditAddr()">确认</div>
                    </section>
                </section>
            </div>
        </transition>
    
        <section>
            <transition name="fade">
                <div class="edit_cover" v-if="showConfirmButton" @click="closeEditItem('confirm')"></div>
            </transition>
            <transition name="fadeBounce" v-if="showConfirmButton">
                <div class="edit">
                    <header class="header">
                        <h4 class="ellipsis">提示</h4>
                        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" version="1.1" class="cancel" @click="closeEditItem('confirm')">
                            <line x1="0" y1="0" x2="16" y2="16" stroke="#666" stroke-width="1.2" />
                            <line x1="0" y1="16" x2="16" y2="0" stroke="#666" stroke-width="1.2" />
                        </svg>
                    </header>
                    <section class="details" style="height:2.4rem">
                        <span>是否确认提交该客户信息？</span>
                    </section>
                    <footer class="footer">
                        <div class="addto_cart" style="background-color: #ccc;" @click="closeEditItem('confirm')">取消</div>
                        <div class="addto_cart" @click="saveCustomer()">确认</div>
                    </footer>
                </div>
            </transition>
        </section>
    
        <alert-tip v-if="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import headerTitle from 'src/components/header/header-title'
import alertTip from 'src/components/common/alert-tip'
import { apiGetCustomerLevels, apiCreateCustomer } from 'src/service/getData'

export default {
    data() {
        return {
            bizObjInfo: {},     //BizObj所需属性
            customerInfo: {},    //customer所需属性
            contactArr: [],      //联系人集合
            contactArrTemp: [],        //临时联系人集合
            addrArr: [],        //地址集合
            addrArrTemp: [],        //临时地址集合
            customerLevels: [],          //客户等级集合
            showBizAreaEdit: false,      //业务区域片段显示变量
            showCustomerLevelEdit: false, //客户等级片段显示变量
            showStorageEdit: false,     //发货仓库片段显示变量
            showContactEdit: false,      //联系人片段显示变量
            showAddrEdit: false,          //地址片段显示变量
            showConfirmButton: false,        //保存提示片段变量

            showAlert: false,         //错误提示片段显示变量
            alertText: null,            //错误提示信息
        }
    },
    mounted() {
        this.initData();
    },
    computed: {
        ...mapState([
            'bizAreaList',
            'storageList',
            'userInfo'
        ]),
    },
    components: {
        headerTitle,
        alertTip
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
        //提示错误信息函数
        closeTip() {
            this.showAlert = false;
        },

        //保存按钮函数
        preSaveCustomer() {

            //检查名称
            if (!this.bizObjInfo.Name) {
                this.showAlert = true;
                this.alertText = "请输入客户名称！";
                return;
            }
            //检查业务区域
            if (!this.customerInfo.BizAreaId || this.customerInfo.BizAreaId <= 0) {
                this.showAlert = true;
                this.alertText = "请选择业务区域！";
                return;
            }
            //检查客户等级
            if (!this.customerInfo.CustomerLevelId || this.customerInfo.CustomerLevelId <= 0) {
                this.showAlert = true;
                this.alertText = "请选择客户等级！";
                return;
            }
            //检查发货仓库
            if (!this.customerInfo.SendStorageId || this.customerInfo.SendStorageId <= 0) {
                this.showAlert = true;
                this.alertText = "请选择发货仓库！";
                return;
            }

            this.showEditItem('confirm');
        },

        //提交客户信息函数
        async saveCustomer() {
            let res = await apiCreateCustomer(this.userInfo.UserId, this.bizObjInfo, this.customerInfo, this.contactArr, this.addrArr);
            if (res.Message) {
                this.showAlert = true;
                this.alertText = res.ExceptionMessage;
                return;
            }
            else {
                this.$router.push('/home');
            }
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
                case "contact":
                    this.showContactEdit = true;
                    this.contactArrTemp = JSON.parse(JSON.stringify(this.contactArr));
                    this.addContact();
                    break;
                case "addr":
                    this.showAddrEdit = true;
                    this.addrArrTemp = JSON.parse(JSON.stringify(this.addrArr));//Object.assign([], this.addrArr); 
                    this.addAddr();
                    break;
                case "confirm":
                    this.showConfirmButton = true;
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
                case "contact":
                    this.showContactEdit = false;
                    this.checkContact();
                    break;
                case "addr":
                    this.showAddrEdit = false;
                    this.checkAddr();
                    break;
                case "confirm":
                    this.showConfirmButton = false;
                    break;
                default:
                    break;
            }
        },
        //选中发货仓库
        selectStorageItem(id, name) {
            this.closeEditItem('storage');
            this.customerInfo.SendStorageId = id;
            this.customerInfo.SendStorageName = name;
        },
        //选中业务区域
        selectBizAreaItem(id, name) {
            this.closeEditItem('bizArea');
            this.customerInfo.BizAreaId = id;
            this.customerInfo.BizAreaName = name;
        },
        //选中客户等级
        selectCustomerLevelItem(id, name) {
            this.closeEditItem('customerLevel');
            this.customerInfo.CustomerLevelId = id;
            this.customerInfo.CustomerLevelName = name;
        },
        //添加联系人
        addContact() {
            this.contactArrTemp.push({ Contact: "", PhoneNum: "", IsPrimaryPhone: false });
        },
        //检查联系人
        checkContact() {
            for (let i = this.contactArrTemp.length - 1; i >= 0; i--) {
                if (this.contactArrTemp[i].Contact == "" && this.contactArrTemp[i].PhoneNum == "")
                    this.contactArrTemp.splice(i, 1);
            }
        },
        //确定添加联系人
        confirmEditContact(){
            this.closeEditItem('contact');
            this.contactArr = JSON.parse(JSON.stringify(this.contactArrTemp));
        },
        //添加地址
        addAddr() {
            this.addrArrTemp.push({ Addr: "", PostCode: "", IsPrimaryAddr: false, IsInvoiceAddr: false });
        },
        //检查地址
        checkAddr() {
            for (let i = this.addrArrTemp.length - 1; i >= 0; i--) {
                if (this.addrArrTemp[i].Addr == "" && this.addrArrTemp[i].PostCode == "")
                    this.addrArrTemp.splice(i, 1);
            }
        },
        //确认添加地址
        confirmEditAddr() {
            this.closeEditItem('addr');
            this.addrArr = JSON.parse(JSON.stringify(this.addrArrTemp));//Object.assign([], this.addrArrTemp);
        }
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

.confirm_button {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 2rem;
    p {
        line-height: 2rem;
        @include sc(.75rem, #fff);
        background-color: #56d176;
        text-align: center;
    }
}

.toggle_confirm_button {
    @include fj;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 2rem;
    .confirmbutton {
        width: 50%;
        background-color: #56d176;
        @include sc(.75rem, #fff);
        text-align: center;
        line-height: 2rem;
    }
    .cancelbutton {
        width: 50%;
        background-color: #ccc;
        @include sc(.75rem, #fff);
        text-align: center;
        line-height: 2rem;
    }
}

.m-list {
    header {
        @include fj();
        .right {
            color: $blue;
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