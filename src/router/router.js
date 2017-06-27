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
        // 可选公司列表
        {
            path: '/corp-list',
            component: corpList,
            meta: { keepAlive: true },
        },
        {
            path: '/customer',
            children: [
                {
                    path: '/new', // 新增客户
                    component: customer,
                },
                {
                    path: '/detail/:customerId', // 客户详情
                    component: customerDetail,
                    children: [{
                        path: 'we-chat',
                        component: weChat
                    }]
                },
                {
                    path: '/search', // 客户搜索
                    component: customerSearch
                },
                {
                    path: '/sign-in', // 签到
                    component: signIn
                },
                {
                    path: '/bill/:customerId', // 客户账单
                    component: bill
                },
            ]
        },
        // 送货
        {
            path: '/delivery',
            component: delivery,
            children: [{
                path: '/detail', // 送货详情
                component: deliveryDetail
            }]
        },
        // 发货
        {
            path: '/express',
            component: express,
            children: [{
                path: '/detail', // 发货详情
                component: expressDetail
            }]
        },
        {
            path: '/goods',
            children: [
                {
                    path: '/search', // 商品搜索
                    component: goodsSearch
                },
                {
                    path: '/detail', // 商品详情
                    component: goodsDetail
                },
                {
                    path: '/stock', // 当前仓库有库存商品
                    component: goodsStock
                },
            ]
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
        {
            path: '/order',
            children: [
                {
                    path: '/list',// 订单列表
                    component: orderList
                },
                {
                    path: '/detail', // 订单详情
                    component: orderDetail
                },
                {
                    path: '/confirm', // 确认订单页
                    component: orderConfirm,
                    children: [{
                        path: 'remark', // 订单备注
                        component: remark
                    }, {
                        path: 'choose-address', // 选择地址
                        component: chooseAddress
                    },]
                },
                {
                    path: '/retail', // 销售出库
                    component: orderRetail
                },
                {
                    path: '/return', // 销售退货
                    component: orderReturn
                },
            ]
        },
        // 路径
        {
            path: '/path',
            component: path
        },
        // 定位
        {
            path: '/location',
            component: location
        },
        {
            path: '/payment',
            children: [
                {
                    path: '/new', // 支付
                    component: payment
                },
                {
                    path: '/list',// 支付列表
                    component: paymentList
                },
                {
                    path: '/detail', // 支付明细
                    component: paymentDetail
                }
            ]
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

    ]
}]