import {request} from '@/Http/request'
export const getApiPhone = (data) => request({url: '/api/user/getPhone', method: 'post', data});
export const registerUser = (data) => request({url: '/api/user/register', method: 'post', data});
