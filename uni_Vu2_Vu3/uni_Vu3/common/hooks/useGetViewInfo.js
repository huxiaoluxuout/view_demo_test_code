import {getCurrentInstance,onMounted} from "vue";
export const getViewInfo = (selector,callback) => {
    const instance = getCurrentInstance(); // 获取组件实例上下文

    onMounted(()=>{
        uni.createSelectorQuery()
            .in(instance.proxy)
            .select(selector)
            .boundingClientRect((rect) => {
                // console.log('getViewInfo-rect', rect)
                callback(rect)

            })
            .exec()
    })
}
