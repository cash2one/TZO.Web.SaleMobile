import App from '../App'


const corpList = r => require.ensure([], () => r(require('../page/corp-list/corp-list')), 'corp-list')

const customer = r => require.ensure([], () => r(require('../page/customer/customer')), 'customer')
const customerBill = r => require.ensure([], () => r(require('../page/customer/bill/customer-bill')), 'customer-bill')
const customerDetail = r => require.ensure([], () => r(require('../page/customer/detail/customer-detail')), 'customer-detail')
const customerDetailWeChat = r => require.ensure([], () => r(require('../page/customer/detail/customer-detail-we-chat')), 'customer-detail-we-chat')
const customerNew = r => require.ensure([], () => r(require('../page/customer/new/customer-new')), 'customer-new')
const customerSearch = r => require.ensure([], () => r(require('../page/customer/search/customer-search')), 'customer-search')
const customerSignIn = r => require.ensure([], () => r(require('../page/customer/sign-in/customer-sign-in')), 'customer-sign-in')

const deliveryList = r => require.ensure([], () => r(require('../page/delivery/list/delivery-list')), 'delivery-list')
const deliveryDetail = r => require.ensure([], () => r(require('../page/delivery/detail/delivery-detail')), 'delivery-detail')

const expressList = r => require.ensure([], () => r(require('../page/express/list/express-list')), 'express-list')
const expressDetail = r => require.ensure([], () => r(require('../page/express/detail/express-detail')), 'express-detail')

const goods = r => require.ensure([], () => r(require('../page/goods/goods')), 'goods')
const goodsDetail = r => require.ensure([], () => r(require('../page/goods/detail/goods-detail')), 'goods-detail')
const goodsDetailStocks = r => require.ensure([], () => r(require('../page/goods/detail/goods-detail-stocks')), 'goods-detail-stocks')
const goodsSearch = r => require.ensure([], () => r(require('../page/goods/search/goods-search')), 'goods-search')
const goodsStock = r => require.ensure([], () => r(require('../page/goods/stock/goods-stock')), 'goods-stock')

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')

const knowledge = r => require.ensure([], () => r(require('../page/knowledge/knowledge')), 'knowledge')
const knowledgeDetail = r => require.ensure([], () => r(require('../page/knowledge/detail/knowledge-detail')), 'knowledge-detail')
const knowledgeSearch = r => require.ensure([], () => r(require('../page/knowledge/search/knowledge-search')), 'hnowledge-search')

const location = r => require.ensure([], () => r(require('../page/location/location')), 'location')

const order = r => require.ensure([], () => r(require('../page/order/order')), 'order')
const orderConfirm = r => require.ensure([], () => r(require('../page/order/confirm/order-confirm')), 'order-confirm')
const orderConfirmChooseAddress = r => require.ensure([], () => r(require('../page/order/confirm/order-confirm-choose-address')), 'order-confirm-choose-address')
const orderConfirmRemark = r => require.ensure([], () => r(require('../page/order/confirm/order-confirm-remark')), 'order-confirm-remark')
const orderDetail = r => require.ensure([], () => r(require('../page/order/detail/order-detail')), 'order-detail')
const orderList = r => require.ensure([], () => r(require('../page/order/list/order-list')), 'order-list')
const orderRetail = r => require.ensure([], () => r(require('../page/order/retail/order-retail')), 'order-retail')
const orderReturn = r => require.ensure([], () => r(require('../page/order/return/order-return')), 'order-return')

const path = r => require.ensure([], () => r(require('../page/path/path')), 'path')

const payment = r => require.ensure([], () => r(require('../page/payment/payment')), 'payment')
const paymentDetail = r => require.ensure([], () => r(require('../page/payment/detail/payment-detail')), 'payment-detail')
const paymentList = r => require.ensure([], () => r(require('../page/payment/list/payment-list')), 'payment-list')
const paymentNew = r => require.ensure([], () => r(require('../page/payment/new/payment-new')), 'payment-new')

const profile = r => require.ensure([], () => r(require('../page/profile/profile')), 'profile')
const profileInfo = r => require.ensure([], () => r(require('../page/profile/profile-info')), 'profileInfoinfo')

const settings = r => require.ensure([], () => r(require('../page/profile/settings/settings')), 'settings')

const shopBack = r => require.ensure([], () => r(require('../page/shop/back/shop-back')), 'shop-back')
const shopGo = r => require.ensure([], () => r(require('../page/shop/go/shop-go')), 'shop-go')

export default [{
    path: '/',
    component: App, // 顶层路由，对应index.html
    children: [ // 二级路由。对应App.vue
        // 地址为空时跳转home页面
        {
            path: '',
            redirect: '/home'
        },
        // 首页
        {
            path: '/home',
            component: home
        },
        // 可选公司列表
        {
            path: '/corp-list',
            component: corpList,
            meta: { keepAlive: true },
        },
        {
            path: '/customer',
            component: customer,
            redirect: '/customer/search',
            children: [
                {
                    path: 'new', // 新增客户
                    component: customerNew,
                },
                {
                    path: 'detail/:customerId', // 客户详情
                    component: customerDetail,
                    children: [{
                        path: 'we-chat',
                        component: customerDetailWeChat
                    }]
                },
                {
                    path: 'search', // 客户搜索
                    component: customerSearch
                },
                {
                    path: 'sign-in', // 签到
                    component: customerSignIn
                },
                {
                    path: 'bill/:customerId', // 客户账单
                    component: customerBill
                },
            ]
        },
        // 送货
        {
            path: '/delivery',
            component: deliveryList,
            children: [{
                path: '/detail', // 送货详情
                component: deliveryDetail
            }]
        },
        // 发货
        {
            path: '/express',
            component: expressList,
            children: [{
                path: '/detail', // 发货详情
                component: expressDetail
            }]
        },
        // 商品
        {
            path: '/goods',
            component: goods,
            redirect: '/goods/search',
            children: [
                {
                    path: 'search', // 商品搜索
                    component: goodsSearch
                },
                {
                    path: 'detail', // 商品详情
                    component: goodsDetail,
                    children: [
                        {
                            path: 'stocks',
                            component: goodsDetailStocks
                        }
                    ]
                },
                {
                    path: 'stock', // 当前仓库有库存商品
                    component: goodsStock
                },
            ]
        },
        // 知识库搜索
        {
            path:'/knowledge',
            component:knowledge,
            redirect: '/knowledge/search',
            children: [
                {
                    path: 'search',
                    component: knowledgeSearch,
                },
                {
                    path: 'detail', // 知识库详情
                    component: knowledgeDetail
                }
            ]
        },
        // 定位
        {
            path: '/location',
            component: location
        },
        // 订单
        {
            path: '/order',
            component: order,
            redirect: '/order/list',
            children: [
                {
                    path: 'list',// 订单列表
                    component: orderList
                },
                {
                    path: 'detail', // 订单详情
                    component: orderDetail
                },
                {
                    path: 'confirm', // 确认订单页
                    component: orderConfirm,
                    children: [{
                        path: 'remark', // 订单备注
                        component: orderConfirmRemark
                    }, {
                        path: 'choose-address', // 选择地址
                        component: orderConfirmChooseAddress
                    },]
                },
                {
                    path: 'retail', // 销售出库
                    component: orderRetail
                },
                {
                    path: 'return', // 销售退货
                    component: orderReturn
                },
            ]
        },
        // 路径
        {
            path: '/path',
            component: path
        },
        // 支付
        {
            path: '/payment',
            component: payment,
            redirect: '/payment/new',
            children: [
                {
                    path: 'new', // 支付
                    component: paymentNew
                },
                {
                    path: 'list',// 支付列表
                    component: paymentList
                },
                {
                    path: 'detail', // 支付明细
                    component: paymentDetail
                }
            ]
        },
        // 个人信息页
        {
            path: '/profile',
            component: profile,
            children: [{
                path: 'info', //个人信息详情页
                component: profileInfo
            },
            {
                path: 'settings',
                component: settings
            }]
        },
        // 回店
        {
            path: '/shop-back',
            component: shopBack
        },
        // 离店
        {
            path: '/shop-go',
            component: shopGo
        },
    ]
}]