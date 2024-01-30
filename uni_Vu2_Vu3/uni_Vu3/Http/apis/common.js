import {request} from '@/Http/request'
// 按层级返回省市区
export const getAllAreaList = (data) => request({url: '/api/common/getAllAreaList',method: 'post',data})

// 获取网站配置
export const webConfig = (data) => request({url: '/api/common/config',method: 'post',data})


