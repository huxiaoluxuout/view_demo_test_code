import {getCurrentInstance,onMounted} from "vue";
import store from "@/store";
export const getPageInfo = (pageInfo) => {
    const instance = getCurrentInstance(); // 获取组件实例上下文
    console.log(instance.proxy)
    onMounted(()=>{

        /*uni.createSelectorQuery()
            .in(instance.proxy)
            .select(selector)
            .boundingClientRect((rect) => {
                // console.log('getViewInfo-rect', rect)
                callback(rect)

            })
            .exec()*/
        store.dispatch('updatePageInfo', {type: 156,...pageInfo})
    })
}
