## 技术栈

vue2 + vuex + vue-router + webpack + ES6/7 + fetch + sass + flex + svg

## 项目运行

#### 注意：由于涉及大量的 ES6/7 等新属性，nodejs 必须是 6.0 以上版本 ，node 7 是先行版，有可能会出问题，建议使用 node 6 稳定版

```
npm install

npm run dev (访问线上后台系统)

npm run local (访问本地后台系统，需运行node-elm后台系统)

```

# 目标功能 x
- [x] 0.1.0 认证集成 -- 完成 李季
- [x] 0.1.0 选择分公司 corp-list -- 完成 李季
- [x] 0.1.0 首页 home -- 完成 李季
- [x] 0.1.0 客户列表 customer-list -- 完成 李季
- [x] 0.1.0 客户搜索 customer/search -- 完成 李季
- [x] 0.1.0 商家详情页 customer/detail -- 完成 李广波
- [x] 0.1.0 客户对账 customer/bill -- 未完成 李广波
- [x] 0.1.0 购物车 cart -- 完成 李季
- [x] 0.1.0 添加购物车功能 buy-cart -- 完成 李季
- [x] 0.1.0 商品列表 goods-list -- 完成 李季
- [x] 0.1.0 商品搜索 goods/search -- 完成 李季
- [x] 0.1.0 商品信息 goods/detail -- 完成 李广波
- [x] 0.1.0 商品价格 goods/detail/prices -- 完成 李广波
- [x] 0.1.0 商品库存 goods/detail/stocks -- 完成 李广波
- [x] 0.1.0 下单功能 订货\意向 confirm-order -- 完成 李季
- [x] 0.1.0 下单功能 收货地址 confirm-order/address -- 完成 李季
- [x] 0.1.0 下单功能 发货方式 confirm-order/express -- 完成 李季
- [x] 0.1.0 下单功能 备注 confirm-order/remoark -- 完成 李季
- [x] 0.1.0 订单列表 order/list -- 完成 李海全
- [x] 0.1.0 订单详情 order/detail -- 完成 李海全
- [x] 0.1.0 个人中心 profile -- 完成 李季
- [x] 0.1.0 设置 profile/settings -- 完成 李季
- 
- [x] 0.2.0 库存商品列表 goods-stock -- 未完成 李季
- [x] 0.2.0 销售出库 order-retail -- 未完成 李季
- [ ] 0.2.0 退货 order/return -- 未完成
- [ ] 0.2.0 收款 payment/new-- 未完成 李海全
- [ ] 0.2.0 收款列表 payment/list -- 未完成 李海全
- [ ] 0.2.0 收款单详情 payment/detail -- 未完成 李海全
- [ ] 0.2.0 商家签到页 customer/sign-in -- 未完成 李广波
- [ ] 0.2.0 新客户 customer/new -- 未完成 李广波
- [ ] 0.2.0 微信推广 customer-detail／we-chat-- 未完成 李广波
- [ ] 0.2.0 出店 shop-go -- 未完成 李季
- [ ] 0.2.0 回店 shop-back -- 未完成 李季
- [ ] 0.2.0 送货 delivery/list -- 未完成
- [ ] 0.2.0 送货明细 delivery/detail -- 未完成
- [ ] 0.2.0 物流发货 express/list -- 未完成
- [ ] 0.2.0 物流发货 express/detail -- 未完成
- [ ] 0.2.0 路线规划 path -- 未完成 
- [ ] 0.2.0 定位功能 location -- 未完成
- 
- [ ] 0.3.0 蓝牙打印 -- 未完成
- [ ] 0.3.0 知识库-车型搜索 knowledge-search -- 未完成
- [ ] 0.3.0 知识库-车型详情 knowledge-detail -- 未完成


# 项目布局

```
.
├── build                                       // webpack配置文件
├── config                                      // 项目打包路径
├── elm                                         // 上线项目文件，放在服务器即可正常访问
├── screenshots                                 // 项目截图
├── src                                         // 源码目录
│   ├── components                              // 组件
│   │   ├── common                              // 公共组件
│   │   │   ├── alert-tip.vue                   // 弹出框组件
│   │   │   ├── buy-cart.vue                    // 购物车组件
│   │   │   ├── compute-time.vue                // 倒计时组件
│   │   │   ├── customer-list.vue               // 客户列表组件
│   │   │   ├── goods-list.vue                  // 商品列表组件
│   │   │   ├── loading.vue                     // 页面初始化加载数据的动画组件
│   │   │   ├── mixin.js                        // 组件混合(包括：指令-下拉加载更多，处理图片地址)
│   │   │   └── select-slid-up.vue              // 浮动选择组件
│   │   ├── footer
│   │   │   └── foot-guide.vue                  // 底部公共组件
│   │   └── header
│   │       ├── header-customer.vue             // 头部客户信息组件
│   │       ├── header-search.vue               // 头部搜索组件
│   │       └── header-title.vue                // 头部标题组件
│   ├── config                                  // 基本配置
│   │   ├── env.js                              // 环境切换配置
│   │   ├── fetch.js                            // 获取数据
│   │   ├── mUtils.js                           // 常用的js方法
│   │   └── rem.js                              // px转换rem
│   ├── images                                  // 公共图片
│   ├── page
│   │   ├── cart
│   │   │   └── cart.vue                        // 购物车
│   │   ├── corp-list
│   │   │   └── corp-list.vue                   // 公司身份选择
│   │   ├── customer
│   │   │   ├── bill
│   │   │   ├── detail
│   │   │   ├── new
│   │   │   ├── search
│   │   │   ├── sign-in
│   │   │   └── customer.vue
│   │   ├── delivery
│   │   │   ├── detail
│   │   │   └── list
│   │   ├── express
│   │   │   ├── detail
│   │   │   └── list
│   │   ├── goods
│   │   │   ├── detail
│   │   │   ├── search
│   │   │   ├── stock
│   │   │   └── goods.vue
│   │   ├── home
│   │   │   └── home.vue                        // 首页
│   │   ├── index
│   │   │   └── index.vue  
│   │   ├── knowledge
│   │   │   ├── detail
│   │   │   ├── search
│   │   │   └── knowledge.vue
│   │   ├── location
│   │   │   └── location.vue 
│   │   ├── order
│   │   │   ├── confirm
│   │   │   ├── detail
│   │   │   ├── list
│   │   │   ├── retail
│   │   │   ├── return
│   │   │   ├── order.scss
│   │   │   └── order.vue
│   │   ├── path
│   │   │   └── path.vue 
│   │   ├── payment
│   │   │   ├── detail
│   │   │   ├── list
│   │   │   ├── new
│   │   │   └── payment.vue
│   │   ├── profile
│   │   │   ├── settings
│   │   │   ├── profile-info.vue
│   │   │   └── profile.vue
│   │   └── shop
│   │       ├── back
│   │       └── go
│   ├── plugins                                 // 引用的插件
│   ├── router
│   │   └── router.js                           // 路由配置
│   ├── service                                 // 数据交互统一调配
│   │   ├── getData.js                          // 获取数据的统一调配文件，对接口进行统一管理
│   │   └── tempdata                            // 开发阶段的临时数据
│   ├── store                                   // vuex的状态管理
│   │   ├── action.js                           // 配置actions
│   │   ├── getters.js                          // 配置getters
│   │   ├── index.js                            // 引用vuex，创建store
│   │   ├── modules                             // store模块
│   │   ├── mutation-types.js                   // 定义常量muations名
│   │   └── mutations.js                        // 配置mutations
│   └── style
│       ├── common.scss                         // 公共样式文件
│       ├── mixin.scss                          // 样式配置文件
│       └── swiper.min.css
│   ├── App.vue                                 // 页面入口文件
│   ├── main.js                                 // 程序入口文件，加载各种公共组件
├── favicon.ico                                 // 图标
├── index.html                                  // 入口html文件
.

56 directories, 203 files
```


# License

[GPL](https://github.com/bailicangdu/vue2-elm/blob/master/COPYING)
