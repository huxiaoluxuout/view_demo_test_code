export default function useCallbackOnDataReady() {
    // 创建一个 Set 存储回调函数
    const callbacks = new Set();
    // 判断数据是否已准备好
    let isDataReady = false;

    // 注册回调函数
    const registerCallbacks = () => {
        // 数据已准备好
        isDataReady = true;
        // 遍历回调函数集合，执行每个回调函数
        callbacks.forEach(callback => {
            callback();
        });
    };
    // 触发回调函数
    const readyCallback = (callback) => {

        if (typeof callback !== 'function') {
            throw new Error('必须是一个函数');
        }

        // 如果数据已准备好，则立即执行回调函数
        if (isDataReady) {
            callback();
        } else {
            // 否则将回调函数添加到集合中
            callbacks.add(callback);
        }
    };
    // 取消注册回调函数
    const unReadyCallback = (callback) => {
        // 从集合中删除指定的回调函数
        callbacks.delete(callback);
    };

    return {
        registerCallbacks,
        readyCallback,
        unReadyCallback
    };
}
