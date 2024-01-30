import useDoQueue from "@/common/hooks/useDoQueue"

import useCallbackOnDataReady from "@/common/hooks/useCallbackOnDataReady";

const {setFunction, addFunctions, DoFunQueue} = useDoQueue()

const {readyCallback, registerCallbacks, unReadyCallback} = useCallbackOnDataReady();


const pullDownRefreshFunctions = () => {
    return {
        // 只能加一个,多了会被覆盖
        pullDownRefreshSetFunction: setFunction,
        pullDownRefreshAddFunctions: addFunctions,
        // 刷新重置回调
        onReload: readyCallback,

        // 下拉刷新完成
        funQueue: () => {
            DoFunQueue();
            uni.stopPullDownRefresh();
            registerCallbacks();
            console.log('下拉刷新完成');
        }
    }
}


export default {
    data() {
        return {
            pullDownRefresh: pullDownRefreshFunctions()
        }
    },
    onPullDownRefresh() {
        this.pullDownRefresh.funQueue()
    },

}
