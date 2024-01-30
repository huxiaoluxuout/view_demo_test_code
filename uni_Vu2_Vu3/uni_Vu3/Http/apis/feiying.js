import {request} from '@/Http/request'
import {baseURL} from "@/Http/config";


// 获取省份列表
export const getProvinceList = (data) => request({url: '/feiying/api.common/getProvinceList', method: 'post', data})

// 获取城市列表
export const getCityList = (data) => request({url: '/feiying/api.common/getCityList', method: 'post', data})

// 获取区、县列表
export const getCountyList = (data) => request({url: '/feiying/api.common/getCountyList', method: 'post', data})

// 获取街道列表
export const getStreetList = (data) => request({url: '/feiying/api.common/getStreetList', method: 'post', data})

// 获取品类列表
export const getCategoryList = (data) => request({url: '/feiying/api.common/getCategoryList', method: 'post', data})


// 获取品牌列表
export const getBrandList = (data) => request({url: '/feiying/api.common/getBrandList', method: 'post', data})

// 获取热门品类
export const getHotBrandList = (data) => request({url: '/feiying/api.common/getHotBrandList', method: 'post', data})

// 获取服务类型接口
export const getServiceTypeList = (data) => request({url: '/feiying/api.common/getServiceTypeList', method: 'post', data})

// 上传文件
export const uploadImg = baseURL+'/common/api.common/upload'
//=========================================================================================
//=========================================================================================



// 绑定用户信息
export const bindUserInfo = (data) => request({url: '/feiying/api.customer/bindUserInfo', method: 'post', data})

// 获取绑定的用户信息
export const getBindUserInfo = (data) => request({url: '/feiying/api.customer/getBindUserInfo', method: 'post', data})

// 上报当前位置
export const reportLocation = (data) => request({url: '/feiying/api.customer/reportLocation', method: 'post', data})

// 发布订单
export const saveOrder = (data) => request({url: '/feiying/api.order/saveOrder', method: 'post', data})

 // 抢单大厅
export const robList = (data) => request({url: '/feiying/api.order/robList', method: 'post', data})

// 抢单
export const rob = (data) => request({url: '/feiying/api.order/rob', method: 'post', data})

// 获取接单订单
export const getMineOrderList = (data) => request({url: '/feiying/api.order/getMineOrderList', method: 'post', data})

// 退单
export const refund = (data) => request({url: '/feiying/api.order/refund', method: 'post', data})

// 开始服务
export const startService = (data) => request({url: '/feiying/api.order/startService', method: 'post', data})


// 订单详情
export const orderDetail = (data) => request({url: '/feiying/api.order/orderDetail', method: 'post', data})

// 待件
export const waitParts = (data) => request({url: '/feiying/api.order/waitParts', method: 'post', data})

// 再次上门
export const againVisit = (data) => request({url: '/feiying/api.order/againVisit', method: 'post', data})

// 服务结束
export const finishService = (data) => request({url: '/feiying/api.order/finishService', method: 'post', data})


// 获取支付二维码
export const payQrcode = (data) => request({url: '/feiying/api.order/payQrcode', method: 'post', data})

// 获取支付二维码
export const delOrder = (data) => request({url: '/feiying/api.order/delOrder', method: 'post', data})

// 派单大厅
export const assignOrdersList = (data) => request({url: '/feiying/api.order/assignOrdersList', method: 'post', data})

// 接单
export const takeOrder = (data) => request({url: '/feiying/api.order/takeOrder', method: 'post', data})

