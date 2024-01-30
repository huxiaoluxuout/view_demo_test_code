<template>
  <view>
    {{ viewDataList.length }}
    <view>ddddddd</view>
    <view>2</view>
    <view>3</view>
    <view>3</view>
    <view>3</view>
    <view>3</view>
    <view>3</view>
    <view>3</view>
    <view>3</view>
    <view>3</view>
    <view>3</view>
    <view>3</view>
    <view>3</view>
    <view>3</view>
    <view>3</view>
    <view>3</view>

    <view v-for="item in viewDataList">{{ item.add_time_text}}</view>

    <tabbar :INDEX="2"></tabbar>

  </view>
</template>

<script>
import {getHomeBannerList} from "@/Http/apis/test_api";
import mixinsNextPageManager from "@/mixins/mixinsNextPageManager";


export default {
  mixins: [mixinsNextPageManager],
  data() {
    return {
      viewDataList: [],
    }
  },
  onLoad() {
    // this._getHomeBannerList()
    console.log('this:=====:', this)

    this.nextPageManager.nexPageSetFunction(this._getHomeBannerList)

    this.pullDownRefresh.pullDownRefreshAddFunctions(this.nextPageManager.reload)

    this.nextPageManager.onReload(() => {
      console.log('响应重新加载')
      this.viewDataList = []
    })


  },
  methods: {

    _getHomeBannerList() {


      getHomeBannerList({
        "user_id": 13,
        "appscret": "47a610ee35391da40ec7f6b73e15b902",
        "token": "2b8f63cc39629f4ca92be548673978a8f80f834b40ad51add17ba6c71e896d79",

      }).then(res => {

        this.viewDataList = this.nextPageManager.setDataList(res.data)

      })
    },

  },

}
</script>

<style scoped>
view {
  line-height: 2.5;
}
</style>
