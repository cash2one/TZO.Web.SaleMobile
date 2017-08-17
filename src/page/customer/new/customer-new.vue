<template>
    <div class="page rating paddingTop">
        <header-title header-title="新增客户" goback='true'></header-title>
        <section v-if="!showLoading" class="scroll_container paddingTop">
            <section class="m-form-list">
                <section class="item start end">
                    <h3>名称
                        <span class="red">*</span>
                    </h3>
                    <div class="content">
                        <input type="text" v-model="info.bizObj.Name" class="input-text" placeholder="请输入客户名称">
                    </div>
                </section>
    
                <section class="item start">
                    <h3>行政区划</h3>
                    <div class="content">
                        <input type="text" v-model="info.bizObj.DistrictId" class="input-text" placeholder="请输入行政区划" />
                    </div>
                </section>
                <section class="item">
                    <h3>编码</h3>
                    <div class="content">
                        <input type="text" v-model="info.bizObj.Code" class="input-text" placeholder="请输入编码" />
                    </div>
                </section>
                <section class="item">
                    <h3>助记符</h3>
                    <div class="content">
                        <input type="text" v-model="info.bizObj.Spell" class="input-text" placeholder="请输入助记符" />
                    </div>
                </section>
                <section class="item end">
                    <h3>备注</h3>
                    <div class="content">
                        <input type="text" v-model="info.bizObj.Note" class="input-text" placeholder="请输入备注" />
                    </div>
                </section>
    
                <select-slid-up title="业务区域" :model="info.bizArea" :selected="selectBizAreaItem" :items="bizAreaList"></select-slid-up>
                <select-slid-up title="客户等级" :model="info.level" :selected="selectCustomerLevelItem" :items="customerLevels"></select-slid-up>
                <select-slid-up title="发货仓库" :model="info.storage" :selected="selectStorageItem" :items="storageList"></select-slid-up>
                
                <section v-for="item in info.contactArr" :key="item.Id">
                    <div class="item start">
                        <h3>联系人</h3>
                        <div class="content">
                            <input type="text" v-model="item.Contact" class="input-text" placeholder="请输入姓名">
                        </div>
                    </div>
                    <div class="item end">
                        <h3>电话</h3>
                        <div class="content">
                            <input type="text" v-model="item.PhoneNum" class="input-text" placeholder="请输入电话">
                        </div>
                    </div>
                </section>
                <section class="item start end add_icon_footer" @click="addContact()">
                    <img src="../../../images/add_address.png" height="24" width="24">
                    <span>新增联系人</span>
                </section>
                <section v-for="item in info.addrArr" :key="item.Id">
                    <div class="item start">
                        <h3>地址</h3>
                        <div class="content">
                            <input type="text" v-model="item.Addr" class="input-text" placeholder="请输入地址">
                        </div>
                    </div>
                    <div class="item end">
                        <h3>邮编</h3>
                        <div class="content">
                            <input type="text" v-model="item.PostCode" class="input-text" placeholder="请输入邮编">
                        </div>
                    </div>
                </section>
                <section class="item start end add_icon_footer" @click="addAddr()">
                    <img src="../../../images/add_address.png" height="24" width="24">
                    <span>新增收货地址</span>
                </section>
            </section>
            <br />
            <br />
            <br />
            <br />
        </section>
    
        <section class="confirm_button" @click="preSaveCustomer()">
            <p>保存</p>
        </section>
    
        <section v-if="showConfirmButton">
            <transition name="fade">
                <div class="edit_cover" @click="closeConfirm()"></div>
            </transition>
            <transition name="fadeBounce">
                <div class="edit">
                    <header class="header">
                        <h4 class="ellipsis">提示</h4>
                        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" version="1.1" class="cancel" @click="closeConfirm()">
                            <line x1="0" y1="0" x2="16" y2="16" stroke="#666" stroke-width="1.2" />
                            <line x1="0" y1="16" x2="16" y2="0" stroke="#666" stroke-width="1.2" />
                        </svg>
                    </header>
                    <section class="details" style="height:2.4rem">
                        <span>是否确认提交该客户信息？</span>
                    </section>
                    <footer class="footer">
                        <div class="addto_cart" style="background-color: #ccc;" @click="closeConfirm()">取消</div>
                        <div class="addto_cart" @click="saveCustomer()">确认</div>
                    </footer>
                </div>
            </transition>
        </section>
    
        <alert-tip v-if="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import headerTitle from 'src/components/header/header-title'
import alertTip from 'src/components/common/alert-tip'
import selectSlidUp from 'src/components/common/select-slid-up'
import loading from 'src/components/common/loading'
import { apiGetCustomerLevels, apiCreateCustomer } from 'src/service/getData'

export default {
    data() {
        return {
            info: {
                bizObj: {},     //BizObj所需属性
                storage: {
                    Name: ''
                },
                bizArea: {
                    Name: ''
                },
                level: {
                    Name: ''
                },
                contactArr: [],      //联系人集合
                addrArr: [],        //地址集合
            },

            customerLevels: [],          //客户等级集合

            showLoading: true,

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
        alertTip,
        selectSlidUp,
        loading
    },
    methods: {
        ...mapActions([
            'getBizAreaList',
            'getStorageList'
        ]),

        async initData() {
            await this.getStorageList();
            await this.getBizAreaList();
            await apiGetCustomerLevels().then(res => {
                this.customerLevels = res.Items;
            })
            this.showLoading = false;
        },
        //提示错误信息函数
        closeTip() {
            this.showAlert = false;
        },
        closeConfirm() {
            this.showConfirmButton = false;
        },
        //保存按钮函数
        preSaveCustomer() {

            //检查名称
            if (!this.info.bizObj.Name) {
                this.showAlert = true;
                this.alertText = "请输入客户名称！";
                return;
            }
            //检查业务区域
            if (!this.info.BizAreaId || this.info.BizAreaId <= 0) {
                this.showAlert = true;
                this.alertText = "请选择业务区域！";
                return;
            }
            //检查客户等级
            if (!this.info.CustomerLevelId || this.info.CustomerLevelId <= 0) {
                this.showAlert = true;
                this.alertText = "请选择客户等级！";
                return;
            }
            //检查发货仓库
            if (!this.info.SendStorageId || this.info.SendStorageId <= 0) {
                this.showAlert = true;
                this.alertText = "请选择发货仓库！";
                return;
            }

            this.showConfirmButton = true;
        },

        //提交客户信息函数
        async saveCustomer() {

            for (let i = this.info.contactArr.length - 1; i >= 0; i--) {
                if (this.info.contactArr[i].Contact == "" && this.info.contactArr[i].PhoneNum == "")
                    this.info.contactArr.splice(i, 1);
            }

            for (let i = this.info.addrArr.length - 1; i >= 0; i--) {
                if (this.info.addrArr[i].Addr == "" && this.info.addrArr[i].PostCode == "")
                    this.info.addrArr.splice(i, 1);
            }

            let res = await apiCreateCustomer(this.userInfo.UserId, this.info.bizObj, this.info, this.info.contactArr, this.info.addrArr);
            if (res.Message) {
                this.showAlert = true;
                this.alertText = res.ExceptionMessage;
                return;
            }
            else {
                this.$router.push('/home');
            }
        },

        //选中发货仓库
        selectStorageItem(id, name) {
            this.info.storage = { Id: id, Name: name };
            this.info.SendStorageId = id;
        },
        //选中业务区域
        selectBizAreaItem(id, name) {
            this.info.bizArea = { Id: id, Name: name };
            this.info.BizAreaId = id;
        },
        //选中客户等级
        selectCustomerLevelItem(id, name) {
            this.info.level = { Id: id, Name: name };
            this.info.CustomerLevelId = id;
        },
        //添加联系人
        addContact() {
            this.info.contactArr.push({ Contact: "", PhoneNum: "", IsPrimaryPhone: false });
        },
        //添加地址
        addAddr() {
            this.info.addrArr.push({ Addr: "", PostCode: "", IsPrimaryAddr: false, IsInvoiceAddr: false });
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';

.input-text {
    text-align: right;
    font-size: .65rem;
}

.add_icon_footer {
    height: 2.5rem;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 204;
    span {
        @include sc(.7rem, $blue);
        margin-left: .275rem;
    }
}

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


.confirm_button {
    position: fixed;
    bottom: 0;
    width: 100%;
    p {
        line-height: 2rem;
        @include sc(.75rem, #fff);
        background-color: #56d176;
        text-align: center;
    }
}
</style>