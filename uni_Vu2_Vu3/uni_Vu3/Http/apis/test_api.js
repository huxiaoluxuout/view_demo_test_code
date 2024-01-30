import {request} from '@/Http/request'

export const getHomeBannerList = (data) => request({url: '/mall/api.Goods/getHomeBannerList', method: 'post', data});

