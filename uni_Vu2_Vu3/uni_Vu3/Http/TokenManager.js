import {baseURL, fetchTokenApi, TOKEN_EXPIRY_INTERVAL} from "@/Http/config";


import {getLoginCode} from "@/utils/tools";



// Token 相关操作模块
export const TokenManager = {
    getToken() {
        return uni.getStorageSync("token") || '';
    },

    setToken(resData) {
        console.log(resData)
        setStorageInfo({key: 'token', data: resData.data.token});
        setStorageInfo({key: 'setTokenTime', data: Date.now()});
    },

    isTokenExpired() {
        const time = uni.getStorageSync('setTokenTime') || 0;
        return Date.now() - time > TOKEN_EXPIRY_INTERVAL;
    },

    async updateToken() {
        const token = this.getToken();

        if (!token || this.isTokenExpired()) {
            console.log('需要更新 Token');
            await this.fetchToken();
        } else {
            console.log('Token 正常');
        }
    },

    // 添加一个队列来存储因为 Token 失效而中断的请求
    requestQueue: [],

    testToken() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    data: {
                        data: {
                            token: 'xxx-token'
                        },
                    },
                    code: 0
                })
            }, 200)
        })
    },
    async fetchToken() {
        const {code} = await getLoginCode()
        const response = await this.testToken()

        /* const response = await uni.request({
            url: baseURL + fetchTokenApi,
            method: 'post',
            data: {code}
        });*/

        const resData = response.data;
        this.setToken(resData);

        // 重新执行之前因为 Token 失效而中断的请求
        while (this.requestQueue.length > 0) {
            const {options, resolve, reject} = this.requestQueue.shift();
            try {
                const response = await uni.request({
                    ...options,
                    header: {
                        token: this.getToken(),
                    }
                });
                const resData = response.data;
                if (resData.code === 0) {
                    resolve(resData);
                } else {
                    console.error(resData.msg);
                    reject(new Error(resData.msg));
                }
            } catch (error) {
                console.error('TokenManager-请求失败', error);
                reject(error);
            }
        }
    }

};

// 其他辅助函数
const setStorageInfo = ({key, data}) => {
    uni.setStorage({
        key,
        data,
        success: function () {
            console.log(`${key} 保存成功`);
        }
    });
};
