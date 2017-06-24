import App from '../App'

const bill = r => require.ensure([], () => r(require('../page/bill/bill')), 'bill')
const corpList = r => require.ensure([], () => r(require('../page/corp-list/corp-list')), 'corp-list')
const customer = r => require.ensure([], () => r(require('../page/customer/customer')), 'home')
const customerDetail = r => require.ensure([], () => r(require('../page/customer-detail/customer-detail')), 'customer-detail')
const weChat = r => require.ensure([], () => r(require('../page/customer-detail/we-chat/we-chat')), 'we-chat')
const customerSearch = r => require.ensure([], () => r(require('../page/customer-search/customer-search')), 'customer-search')
const delivery = r => require.ensure([], () => r(require('../page/delivery/delivery')), 'delivery')
const deliveryDetail = r => require.ensure([], () => r(require('../page/delivery-detail/delivery-detail')), 'delivery-detail')
const express = r => require.ensure([], () => r(require('../page/express/express')), 'express')
const expressDetail = r => require.ensure([], () => r(require('../page/express-detail/express-detail')), 'express-detail')
const goodsDetail = r => require.ensure([], () => r(require('../page/goods-detail/goods-detail')), 'goods-detail')
const stocks = r => require.ensure([], () => r(require('../page/goods-detail/stocks/stocks')), 'stocks')
const goodsSearch = r => require.ensure([], () => r(require('../page/goods-search/goods-search')), 'goods-search')
const goodsStock = r => require.ensure([], () => r(require('../page/goods-stock/goods-stock')), 'goods-stock')
const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const knowledgeDetail = r => require.ensure([], () => r(require('../page/knowledge-detail/knowledge-detail')), 'knowledge-detail')
const knowledgeSearch = r => require.ensure([], () => r(require('../page/knowledge-search/knowledge-search')), 'hnowledge-search')
const location = r => require.ensure([], () => r(require('../page/location/location')), 'location')
const orderConfirm = r => require.ensure([], () => r(require('../page/order-confirm/order-confirm')), 'order-confirm')
const chooseAddress = r => require.ensure([], () => r(require('../page/order-confirm/choose-address')), 'choose-address')
const remark = r => require.ensure([], () => r(require('../page/order-confirm/remark')), 'remark')
const orderDetail = r => require.ensure([], () => r(require('../page/order-detail/order-detail')), 'order-detail')
const orderList = r => require.ensure([], () => r(require('../page/order-list/order-list')), 'order-list')
const orderRetail = r => require.ensure([], () => r(require('../page/order-retail/order-retail')), 'order-retail')
const orderReturn = r => require.ensure([], () => r(require('../page/order-return/order-return')), 'order-return')
const path = r => require.ensure([], () => r(require('../page/path/path')), 'path')
const payment = r => require.ensure([], () => r(require('../page/payment/payment')), 'payment')
const paymentDetail = r => require.ensure([], () => r(require('../page/payment-detail/payment-detail')), 'payment-detail')
const paymentList = r => require.ensure([], () => r(require('../page/payment-list/payment-list')), 'payment-list')
const profile = r => require.ensure([], () => r(require('../page/profile/profile')), 'profile')
const info = r => require.ensure([], () => r(require('../page/profile/info')), 'info')
const settings = r => require.ensure([], () => r(require('../page/profile/settings')), 'settings')
const shopBack = r => require.ensure([], () => r(require('../page/shop-back/shop-back')), 'shop-back')
const shopGo = r => require.ensure([], () => r(require('../page/shop-go/shop-go')), 'shop-go')
const signIn = r => require.ensure([], () => r(require('../page/sign-in/sign-in')), 'sign-in')

export default [{
    path: '/',
    component: App, // 顶层路由，对应index.html
    children: [ // 二级路由。对应App.vue
        // 地址为空时跳转home页面
        {
            path: '',
            redirect: '/home'
        },
        // 首页客户资料
        {
            path: '/home',
            component: home
        },
        // 客户账单
        {
            path: '/bill/:customerId',
            component: bill
        },
        // 可选公司列表
        {
            path: '/corp-list',
            component: corpList,
            meta: { keepAlive: true },
        },
        // 新增客户
        {
            path: '/customer',
            component: customer
        },
        // 客户详情
        {
            path: '/customer-detail/:customerId',
            component: customerDetail,
            children: [{
                path: 'we-chat',
                component: weChat
            }]
        },
        // 客户搜索
        {
            path: '/customer-search',
            component: customerSearch
        },
        // 送货
        {
            path: '/delivery',
            component: delivery,
            children: [{
                path: '/delivery-detail', // 送货详情
                component: deliveryDetail
            }]
        },
        // 发货
        {
            path: '/express',
            component: express,
            children: [{
                path: '/express-detail', // 发货详情
                component: expressDetail
            }]
        },
        // 商品详情
        {
            path: '/goods-detail',
            component: goodsDetail
        },
        // 商品搜索
        {
            path: '/goods-search',
            component: goodsSearch
        },
        // 当前仓库有库存商品
        {
            path: '/goods-stock',
            component: goodsStock
        },
        // 知识库搜索
        {
            path: '/knowledge-search',
            component: knowledgeSearch,
            children: [{
                path: 'detail', // 知识库详情
                component: knowledgeDetail
            }]
        },
        // 定位
        {
            path: '/location',
            component: location
        },
        // 确认订单页
        {
            path: '/order-confirm',
            component: orderConfirm,
            children: [{
                path: 'remark', // 订单备注
                component: remark
            }, {
                path: 'choose-address', // 选择地址
                component: chooseAddress
            },]
        },
        // 订单列表
        {
            path: '/order-list',
            component: orderList,
            children: [{
                path: '/order-detail', // 订单详情
                component: orderDetail
            }]
        },
        // 销售出库
        {
            path: '/order-retail',
            component: orderRetail
        },
        // 销售退货
        {
            path: '/order-return',
            component: orderReturn
        },
        // 路径
        {
            path: '/path',
            component: path
        },
        // 支付
        {
            path: '/payment',
            component: payment
        },
        // 支付列表
        {
            path: '/payment-list',
            component: paymentList,
            children: [{
                path: '/payment-detail', // 支付明细
                component: paymentDetail
            }]
        },
        //个人信息页
        {
            path: '/profile',
            component: profile,
            children: [{
                path: 'info', //个人信息详情页
                component: info
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
        // 签到
        {
            path: '/sign-in',
            component: signIn
        },
    ]
}]