<template>
  <view class="root-flex-container">
    <view class="flex-container" :style="cssVar">
      <view class="flex-item is__view__root" v-for="slotItem in dataList" :key="slotItem.id" v-show="!slotItem.isHide">
        <slot name="default" :item="slotItem"></slot>
      </view>
    </view>
  </view>

</template>
<script>


export default {
  props: {
    // css 变量
    cssVar: {
      type: [Object, String],
      default: () => ({})
    },

    dataList: {
      type: Array,
      default: () => (
          [
            {id: 1, text: 'js'},
            {id: 2, text: 'css'},
            {id: 3, text: 'vue'},
          ])
    }
  }

}
</script>

<style scoped lang="scss">


.root-flex-container {
  --gap: var(--page-gap);
  --num-columns: 2;
  --item-width: calc(100% / var(--num-columns) - var(--gap));
  overflow-x: hidden;
  width: 100%;
  box-sizing: border-box;
}


</style>
