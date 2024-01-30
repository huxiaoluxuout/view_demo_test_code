<template>
  <view class="root-zshu-tabs">
    <view id="zshu-tabs" class="zshu-tabs" :style="{background:bgColor}">
      <scroll-view class="scroll-row" :scroll-x="true" scroll-with-animation :scroll-into-view="'id-'+viewId">
        <view class="tabs">
          <view :id="'id-'+item.id" class="tabs-container" v-for="item in listTabs" :key="item.id" @click="clickId(item.id)">
            <view class="item-text" :class="{'active-opacity':item.id===activeId}">
              <text>{{ item.text }}</text>
              <text :class="{'active2':item.id===activeId}">{{ item.text2 }}</text>
            </view>
          </view>
        </view>

      </scroll-view>

    </view>

    <view v-show="!isRelative" :style="{height: rectHeight+'px'}"></view>

  </view>

</template>
<script>
import {cssVar as cssVar_,} from "@/components/zshu-components/JS/cssVar"

export default {
  props: {
    listTabs: {
      type: Array,
      default: () => [
        {
          id: 1,
          text: '抢单',
          text2: '大厅',
        }, {
          id: 2,
          text: '派送',
          text2: '大厅',
        },
      ]
    },
    activeId: {
      type: Number,
      default: 1,
    },
    // isFixed: Boolean,
    isRelative: Boolean,

    // css 变量
    cssVar: cssVar_,

    bgColor: {
      type: String,
      default: '#fff',
    },

  },
  data() {
    return {
      viewId: '1',
      rectHeight: '44',
    }
  },
  computed: {
    zshuTabStyle() {

      // if (!this.isRelative) {
      return {
        position: 'fixed',
        borderBottom: `1px solid #f4f4f4`,
        top: `calc(var(--window-top))`
        // }
      }
    }
  },

  methods: {
    clickId(id) {
      console.log('clickId', id, this.activeId)
      this.viewId = id
      this.activeId !== id && this.$emit('updateActiveId', id)
    },
  },


}

</script>

<style scoped lang="scss">

.root-zshu-tabs {
  --page-gap: 30rpx;
  --gap-l-r: var(--page-gap);
  --gap: 34rpx;

  //margin:0  calc(-1 * var(--gap));
}

.zshu-tabs {

  //background-color: #fff;

  z-index: 10;
  position: relative;
  width: 100%;

  .scroll-row {
    height: 100%;
    white-space: nowrap;
    overflow-x: auto;
    padding-top: 20rpx;
    padding-bottom: 20rpx;
  }
}


.tabs {
  display: flex;

  gap: var(--gap);

  .tabs-container:first-child:before, .tabs-container:last-child:after {
    content: '';
    height: 100%;
    width: var(--gap-l-r);

  }


  .tabs-container {
    display: flex;
    align-content: center;
    justify-content: center;
    position: relative;
    flex: 1;
  }


  .item-text {
    color: #666666;
    font-size: 16px;
    position: relative;
  }

  .item-text:after {
    content: '';
    height: 6px;
    width: 100%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 2px;
    background-color: #33A6FF;
    border-radius: 100px;
    opacity: 0;
  }

  .active-opacity {
    font-size: 18px;
    font-weight: bold;
    color: #33A6FF;
  }

  .active-opacity:after {
    opacity: .6;
  }

  .active2 {
    color: #333;
    font-weight: bold;

  }
}

</style>
