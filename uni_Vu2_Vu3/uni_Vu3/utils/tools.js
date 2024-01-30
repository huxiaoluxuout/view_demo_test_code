// import {baseURL} from "@/http/config";

// 封装语音授权判断和引导函数
function checkAndGuideRecordAuth() {
    return new Promise((resolve, reject) => {
        uni.getSetting({
            success(res) {
                if (!res.authSetting['scope.record']) {
                    // 未授权，请求授权或引导用户开启授权
                    uni.authorize({
                        scope: 'scope.record',
                        success() {
                            resolve(true);
                        },
                        fail() {
                            guideUserToEnableRecordAuth()
                                .then((enabled) => {
                                    resolve(enabled);
                                })
                                .catch((error) => {
                                    reject(error);
                                });
                        },
                    });
                } else {
                    resolve(true);
                }
            },
            fail(err) {
                reject(err);
            },
        });
    });
}

// 引导用户开启语音授权
function guideUserToEnableRecordAuth() {
    return new Promise((resolve, reject) => {
        uni.showModal({
            title: '授权提示',
            content: '为了正常使用语音功能，请点击确定前往开启语音授权。',
            success(res) {
                if (res.confirm) {
                    uni.openSetting({
                        success(settingRes) {
                            if (settingRes.authSetting['scope.record']) {
                                resolve(true);
                            } else {
                                resolve(false);
                            }
                        },
                        fail() {
                            resolve(false);
                        },
                    });
                } else {
                    resolve(false);
                }
            },
            fail(err) {
                reject(err);
            },
        });
    });
}

// 封装位置授权判断和引导函数
function checkAndGuideLocationAuth() {
    return new Promise((resolve, reject) => {
        uni.getSetting({
            success(res) {
                if (!res.authSetting['scope.userLocation']) {
                    // 未授权，请求授权或引导用户开启授权
                    uni.authorize({
                        scope: 'scope.userLocation',
                        success() {
                            resolve(true);
                        },
                        fail() {
                            guideUserToEnableLocationAuth()
                                .then((enabled) => {
                                    resolve(enabled);
                                })
                                .catch((error) => {
                                    reject(error);
                                });
                        },
                    });
                } else {
                    resolve(true);
                }
            },
            fail(err) {
                reject(err);
            },
        });
    });
}

// 引导用户开启位置授权
function guideUserToEnableLocationAuth() {
    return new Promise((resolve, reject) => {
        uni.showModal({
            title: '授权提示',
            content: '为了获取您的位置信息，请点击确定前往开启位置授权。',
            success(res) {
                if (res.confirm) {
                    uni.openSetting({
                        success(settingRes) {
                            if (settingRes.authSetting['scope.userLocation']) {
                                resolve(true);
                            } else {
                                resolve(false);
                            }
                        },
                        fail() {
                            resolve(false);
                        },
                    });
                } else {
                    resolve(false);
                }
            },
            fail(err) {
                reject(err);
            },
        });
    });
}

// IOS 底部兼容
const getIOSBottomHeight = () => {
    const {model} = uni.getSystemInfoSync()
    const models = ['X', 'XR', 'XS', '11', '12', '13', '14', '15'];
    if (model.indexOf('iPhone') !== -1 && models.some(item => model.indexOf(item) !== -1)) {
        return 35
    } else {
        return 0
    }
};
// 登录 code
const getLoginCode = () => {
    return new Promise((resolve, reject) => {
        // #ifdef MP-WEIXIN
        uni.login({
            provider: 'weixin',
            success: function (res) {
                resolve(res);
            },
            fail: function (fail) {
                reject(fail);
            },
        });
        // #endif

    });
};

//微信支付
const payMoney = function (data) {
    return new Promise((resolve, reject) => {
        uni.requestPayment({
            'timeStamp': data.timeStamp,
            'nonceStr': data.nonceStr,
            'package': data.package,
            'signType': data.signType,
            'paySign': data.paySign,
            'success': function (success) {
                resolve(success);
            },
            'fail': function (fail) {
                resolve(fail);
            }
        });
    })
}

// 获取当前位置
const getMyLocation = () => {
    return new Promise((resolve, reject) => {
        uni.getLocation({
            type: 'gcj02',
            isHighAccuracy: 'true',
            geocode: 'true',
            success: (res) => {
                console.log('res', res)
                resolve(res);
            },
            fail: (fail) => {
                console.log(fail)
            }
        })
    });

}

// 打开地图选择位置
const getChooseLocation = () => {
    return new Promise((resolve, reject) => {
        uni.chooseLocation({
            success: (res) => {
                const addressInfo = {

                    province: res.address.slice(0, res.address.indexOf('省') + 1),
                    city: res.address.slice(res.address.indexOf('省') + 1, res.address.indexOf('市') + 1),
                    area: res.address.slice(res.address.indexOf('市') + 1, res.address.indexOf('区') + 1)
                }
                resolve(Object.assign(res, addressInfo));
                console.log('res', res)

            },
            fail: function (err) {
                reject(err);
            }
        });
    });
}

//统一提示方便全局修改
const $msg = (title, duration = 1500, mask = true, icon = 'none') => {
    if (Boolean(title) === false) {
        return;
    }
    uni.showToast({
        title,
        duration,
        mask,
        icon
    });
}

// 获取页面栈
const getPageInfo = (callback, task = 1) => {

    // #ifdef MP

    const pages = getCurrentPages();
    if (pages.length < task + 1) {
        console.error('获取的页面不在栈内')
        return
    }
    console.log('pages', pages[pages.length - 1 - task].$vm)
    const {$vm, options, route: pagePath, onLoad, $page: {fullPath}} = pages[pages.length - 1 - task];
    callback && callback({...$vm, options, pagePath, onLoad, fullPath})

    // #endif


    // #ifdef WEB
    console.error('WEB')
    // #endif

}

const getRoute = () => {
    const pages = getCurrentPages();
    return pages[pages.length - 1].route
}

// 页面路由跳转 --start

import pagesConfig from "@/pages.json";

import {$DataInfo} from "@/utils/envBus";

const {tabBar: {list: tabBarPages}} = pagesConfig

// 路径补全
const filterPath = (path) => {
    return /^\//.test(path) ? path : '/' + path
};

const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


function getTabBarParams(pagePath) {
    // 对输入的pagePath进行验证和过滤，确保安全性
    if (typeof pagePath !== 'string') {
        throw new Error('Invalid pagePath');
    }
    let paramsStr = pagePath;
    const paramsIndex = paramsStr.indexOf('??');
    if (paramsIndex > -1) {
        const matchResult = paramsStr.match(/([^?]+)\?{2}(.*)/);
        if (!matchResult) {
            throw new Error('Invalid pagePath');
        }
        const url = matchResult[1];
        const paramString = matchResult[2];
        const params = {};
        paramString.split('&&').forEach((pair) => {
            const [key, value] = pair.split('=');
            // 对键和值进行验证和过滤，确保安全性
            if (typeof key === 'string' && typeof value === 'string') {
                params[key] = value;
            }
        });
        console.log('URL:', url);
        console.log('参数:', params);
        return {
            url,
            params
        };
    } else {
        return {
            url: pagePath,
            params: ''
        };
    }
}

const toTargetPage = (pagePath, parseInfo = {}, api) => {
    console.log('pagePath', pagePath)
    if (!pagePath) return;

    const pattern = /\/?([^?]+)/;
    const route = pagePath.match(pattern)[1];

    const isTabBarPage = tabBarPages.map(item => filterPath(item.pagePath)).includes(filterPath(route));


    if (isTabBarPage) {
        uni.switchTab({
            url: filterPath(route),
            fail: function (fail) {
                $msg(fail.errMsg)
            }
        })
    } else {
        const eventId = uuid() // 事件标识
        let env = pagePath.indexOf('?') === -1 ? '?' : '&'

        uni[api]({
            url: filterPath(pagePath + env + 'eventId=' + eventId),
            fail: function (fail) {
                $msg(fail.errMsg)
                console.error(fail.errMsg);
            },
            success: function (res) {
                $DataInfo.setDataInfo(filterPath(route), {...parseInfo})
            }
        })
    }
}
export const $getPrevPageInfo = () => {
    return $DataInfo.getDataInfo(filterPath(getRoute()))
}

const navigateTo = (pagePath, parse) => toTargetPage(pagePath, parse, 'navigateTo');
const redirectTo = (pagePath, parse) => toTargetPage(pagePath, parse, 'redirectTo');

const getPageEvent = (eventId, callback) => {
    uni.$once('post' + eventId, (data) => {
        console.log('post:======')
        callback(data)
    })
    uni.$emit('get' + eventId)

}


// 事件处理器函数，根据条件执行操作或回调
const handleEvent = ({condition, errorCallback}, actionFunction, ...actionArgs) => {
    // const context = this;
    if (condition) {
        // 执行操作函数
        // actionFunction.apply(context, actionArgs);
        actionFunction(...actionArgs);
    } else {
        // 调用错误回调
        errorCallback();
    }
};

// 页面路由跳转 --end


// 将参数转换为查询字符串
const convertToQueryString = (params, starStr = '?') => {
    if (Object.keys(params).length === 0) {
        return '';
    }

    const separator = Object.keys(params)[0] === starStr ? '' : '&';
    return separator + Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
}

// 解析查询字符串
const parseQueryString = (queryString) => {
    const params = {};

    if (queryString.startsWith('?')) {
        queryString = queryString.slice(1);
    }

    const keyValues = queryString.split('&');
    keyValues.forEach(keyValue => {
        const [key, value] = keyValue.split('=');
        params[decodeURIComponent(key)] = decodeURIComponent(value);
    });

    return params;
};


/**
 * 节流
 * @param func
 * @param delay
 * @returns {(function(): void)|*}
 */
const throttle = (func, delay = 200) => {
    // console.log('throttle')
    let timerId;

    return function () {
        if (!timerId) {
            timerId = setTimeout(() => {
                func.apply(this, arguments);
                timerId = null;
            }, delay);
        }
    };
}

/**
 * 防抖
 * @param func
 * @param delay
 * @returns {(function(): void)|*}
 */

const debounce = (func, delay = 500, immediate = true) => {
    let timerId;

    return function () {
        const context = this;
        const args = arguments;

        const later = function () {
            timerId = null;

            if (!immediate) {
                func.apply(context, args);
            }
        };

        const callNow = immediate && !timerId;

        clearTimeout(timerId);
        timerId = setTimeout(later, delay);

        if (callNow) {
            func.apply(context, args);
        }
    };
}

// 获取缓存数据
const getCacheUserInfo = () => {

    return new Promise(resolve => {
        const userInfo = uni.getStorageSync('MY_USER_INFO') || {}
        resolve(userInfo)
    })

}


// 图片上传函数
function uploadImages(filePaths, config = {}) {
    if (!Array.isArray(filePaths)) {
        console.warn('filePaths 必须是数组')
        return
    }
    return new Promise((resolve, reject) => {

        const defaultConfig = {
            url: 'baseURL' + '/api/common/upload',
        };
        config = {...defaultConfig, ...config};

        const uploadPromises = filePaths.map(filePath => {
            return new Promise((resolve, reject) => {
                uni.uploadFile({
                    filePath: filePath,
                    name: 'file',
                    ...config,
                    success: res => {
                        resolve(JSON.parse(res.data));
                    },
                    fail: err => {
                        reject(filePath);
                    }
                });
            });
        });

        Promise.all(uploadPromises)
            .then(results => {

                resolve(results);
            })
            .catch(failedFilePaths => {

                const successFiles = filePaths.filter(filePath => !failedFilePaths.includes(filePath));
                reject({
                    code: -1,
                    msg: '部分图片上传失败',
                    data: {
                        success: successFiles,
                        fail: failedFilePaths
                    }
                });
            });
    });
}


export {
    throttle,
    debounce,
    getIOSBottomHeight,
    filterPath,
    $msg,
    getLoginCode,
    navigateTo,
    redirectTo,
    convertToQueryString,
    parseQueryString,
    payMoney,
    getMyLocation,
    getChooseLocation,
    checkAndGuideRecordAuth,
    checkAndGuideLocationAuth,
    getPageInfo,
    getCacheUserInfo,
    handleEvent,
    uploadImages,
    uuid,
    getPageEvent,

}

