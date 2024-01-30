import {ref} from 'vue';
import {onShareAppMessage} from "@dcloudio/uni-app";
import {filterPath, getCacheUserInfo, getPageInfo} from "@/utils/tools";


/*onReady((options) => {
    console.log('onReady:==========================useShare')
    uni.showShareMenu({
        withShareTicket: true,
        menus: ['shareAppMessage']
        // menus: ['shareAppMessage', 'shareTimeline']//开启转发好友和转发朋友圈按钮
    })
})*/
export const useShare = () => {
    const title = ref('聚心共享');

    const imageUrl = ref('');

    const setShareConfig = ({title: newTitle, imageUrl: newImageUrl}) => {
        title.value = newTitle;
        imageUrl.value = newImageUrl;
    };

    const onShareAppMessageHandler = () => {
        onShareAppMessage((res) => {
            console.log(res.from)
            if (res.from === "menu") {

            } else if (res.from === "button") {

            }

            let userInfo = {},
                pagePathStr = '',
                fullPathStr = '';

            getCacheUserInfo().then(result => {
                userInfo = result
            })


            getPageInfo(({pagePath, fullPath}) => {
                pagePathStr = filterPath(pagePath)
                fullPathStr = fullPath
            })


            return {
                title: title.value,
                path: pagePathStr + fullPathStr + '&inviteId=' + userInfo.id,
                imageUrl: imageUrl.value,
            }

        })
    }

    /**
     *  import {useShare} from "@/common/hooks/useShare";
     *  const {onShareAppMessageHandler} = useShare();
     *  onShareAppMessageHandler()
     */

    return {
        setShareConfig,
        onShareAppMessageHandler,
    };
}
