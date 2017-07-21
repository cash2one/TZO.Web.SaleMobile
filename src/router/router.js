import App from '../App'


const corpList = r => require.ensure([], () => r(require('../page/corp-list/corp-list')), 'corp-list')

const index = r => require.ensure([], () => r(require('../page/index/index')), 'index')

const customer = r => require.ensure([], () => r(require('../page/customer/customer')), 'customer')
const customerBill = r => require.ensure([], () => r(require('../page/customer/bill/customer-bill')), 'customer')
const customerDetail = r => require.ensure([], () => r(require('../page/customer/detail/customer-detail')), 'customer')
const customerDetailWeChat = r => require.ensure([], () => r(require('../page/customer/detail/customer-detail-we-chat')), 'customer')
const customerNew = r => require.ensure([], () => r(require('../page/customer/new/customer-new')), 'customer')
const customerSearch = r => require.ensure([], () => r(require('../page/customer/search/customer-search')), 'customer')
const customerSignIn = r => require.ensure([], () => r(require('../page/customer/sign-in/customer-sign-in')), 'customer')

const deliveryList = r => require.ensure([], () => r(require('../page/delivery/list/delivery-list')), 'delivery')
const deliveryDetail = r => require.ensure([], () => r(require('../page/delivery/detail/delivery-detail')), 'delivery')

const expressList = r => require.ensure([], () => r(require('../page/express/list/express-list')), 'express')
const expressDetail = r => require.ensure([], () => r(require('../page/express/detail/express-detail')), 'express')

const goods = r => require.ensure([], () => r(require('../page/goods/goods')), 'goods')
const goodsDetail = r => require.ensure([], () => r(require('../page/goods/detail/goods-detail')), 'goods')
const goodsDetailStocks = r => require.ensure([], () => r(require('../page/goods/detail/goods-detail-stocks')), 'goods')
const goodsSearch = r => require.ensure([], () => r(require('../page/goods/search/goods-search')), 'goods')
const goodsStock = r => require.ensure([], () => r(require('../page/goods/stock/goods-stock')), 'goods')

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')

const knowledge = r => require.ensure([], () => r(require('../page/knowledge/knowledge')), 'knowledge')
const knowledgeDetail = r => require.ensure([], () => r(require('../page/knowledge/detail/knowledge-detail')), 'knowledge')
const knowledgeSearch = r => require.ensure([], () => r(require('../page/knowledge/search/knowledge-search')), 'knowledge')

const location = r => require.ensure([], () => r(require('../page/location/location')), 'location')
const path = r => require.ensure([], () => r(require('../page/path/path')), 'location')

const order = r => require.ensure([], () => r(require('../page/order/order')), 'order')
const orderConfirm = r => require.ensure([], () => r(require('../page/order/confirm/order-confirm')), 'order')
const orderConfirmChooseAddress = r => require.ensure([], () => r(require('../page/order/confirm/order-confirm-choose-address')), 'order')
const orderConfirmRemark = r => require.ensure([], () => r(require('../page/order/confirm/order-confirm-remark')), 'order')
const orderDetail = r => require.ensure([], () => r(require('../page/order/detail/order-detail')), 'order')
const orderList = r => require.ensure([], () => r(require('../page/order/list/order-list')), 'order')
const orderRetail = r => require.ensure([], () => r(require('../page/order/retail/order-retail')), 'order')
const orderReturn = r => require.ensure([], () => r(require('../page/order/return/order-return')), 'order')

const payment = r => require.ensure([], () => r(require('../page/payment/payment')), 'payment')
const paymentDetail = r => require.ensure([], () => r(require('../page/payment/detail/payment-detail')), 'payment')
const paymentList = r => require.ensure([], () => r(require('../page/payment/list/payment-list')), 'payment')
const paymentNew = r => require.ensure([], () => r(require('../page/payment/new/payment-new')), 'payment')

const profile = r => require.ensure([], () => r(require('../page/profile/profile')), 'profile')
const profileInfo = r => require.ensure([], () => r(require('../page/profile/profile-info')), 'profile')
const settings = r => require.ensure([], () => r(require('../page/profile/settings/settings')), 'profile')

const shopBack = r => require.ensure([], () => r(require('../page/shop/back/shop-back')), 'shop')
const shopGo = r => require.ensure([], () => r(require('../page/shop/go/shop-go')), 'shop')

const cart = r => require.ensure([],()=>r(require('../page/cart/cart')),'cart')

export default [{
    path: '/',
    component: App, // 顶层路由，对应index.html
    children: [ // 二级路由。对应App.vue
        {
            path: '',
            redirect: '/corp-list'
        },
        {
            path: '/corp-list', // 可选公司列表
            component: corpList
        },
        {
            path: '/',
            component: index,
            children: [
                {
                    path: 'home', // 首页
                    component: home,
                },
                {
                    path: 'profile', // 个人信息页
                    component: profile,
                    meta: { keepAlive: true },
                    children: [{
                        path: 'info', //个人信息详情页
                        component: profileInfo
                    },
                    {
                        path: 'settings',
                        component: settings
                    }]
                },
            ]
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
                path: 'detail', // 送货详情
                component: deliveryDetail
            }]
        },
        // 发货
        {
            path: '/express',
            component: expressList,
            children: [{
                path: 'detail', // 发货详情
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
            path: '/knowledge',
            component: knowledge,
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
        {
            path: '/cart',
            component: cart
        }
    ]
}]