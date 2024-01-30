import {onLoad, onUnload} from "@dcloudio/uni-app";

export default function updateReload(getUpdateFunc,eventName='reload') {

    onLoad(() => {

        getUpdateFunc()
        uni.$on(eventName, getUpdateFunc)
    })
    onUnload(() => {
        uni.$off(eventName, getUpdateFunc)
    })

}
