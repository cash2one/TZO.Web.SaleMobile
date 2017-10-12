## 技术栈

vue2 + vuex + vue-router + webpack + ES6/7 + fetch + sass + flex + svg

## 项目运行

#### 注意：由于涉及大量的 ES6/7 等新属性，nodejs 必须是 6.0 以上版本 ，node 7 是先行版，有可能会出问题，建议使用 node 6 稳定版

```
npm install

npm run dev (访问线上后台系统)

npm run local (访问本地后台系统，需运行node-elm后台系统)

```

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
