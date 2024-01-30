import {baseURL} from '@/Http/request'
import {uploadFile} from '@/Http/apis/common'


const uploadsFile = (filePaths, config = {
    url: baseURL + uploadFile,
    formData: {
        'token': uni.getStorageSync('token')  // token
    },
}) => {
    // 创建一个 Promise 对象
    return new Promise((resolve, reject) => {
        let successCount = 0 // 上传成功的数量
        let failCount = 0 // 上传失败的数量
        const totalCount = filePaths.length // 需要上传的图片总数
        const uploadedImages = [] // 已上传成功的图片路径

        // 循环遍历 filePaths 数组，依次上传每一张图片
        filePaths.forEach(filePath => {
            uni.uploadFile({
                filePath: filePath,
                name: 'file',
                ...config,
                success: res => {
                    // 将上传成功的图片路径保存到 uploadedImages 数组中

                    uploadedImages.push(res.data)

                    // 判断是否全部上传完成
                    successCount++
                    if (successCount + failCount === totalCount) {
                        if (uploadedImages.length === totalCount) {
                            // 所有上传成功
                            resolve(uploadedImages)
                        } else {
                            // 存在上传失败的图片
                            reject({
                                code: -1,
                                msg: '部分上传失败',
                                data: {
                                    success: uploadedImages,
                                    fail: filePaths.filter(filePath => !uploadedImages.includes(filePath))
                                }
                            })
                        }
                    }
                },
                fail: err => {
                    // 将上传失败的图片路径保存到 uploadedImages 数组中
                    uploadedImages.push(filePath)

                    // 判断是否全部上传完成
                    failCount++
                    if (successCount + failCount === totalCount) {
                        reject({
                            code: -1,
                            msg: '部分上传失败',
                            data: {
                                success: uploadedImages.filter(image => !filePaths.includes(image)),
                                fail: filePaths.filter(filePath => !uploadedImages.includes(filePath))
                            }
                        })
                    }
                }
            })
        })
    })
}
// 路径补全
const filterPath = (path) => {
    return /^\//.test(path) ? path : '/' + path
}

const $msg = (title, duration = 1500, mask = true, icon = 'none') => {
    //统一提示方便全局修改
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

export {
    uploadsFile, filterPath, $msg,
}
