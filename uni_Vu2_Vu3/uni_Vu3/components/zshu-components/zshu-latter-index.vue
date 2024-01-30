<template>
  <view class="zshu-latter-index">
    <view class="fixd-right">
      <view class="fixd-right-main">
        <text class="text" :class="{'active':rightIndex===index}" v-for="(item,index) in letterList" :key="index"
              @click="choiceLetter(index,item)"
        >{{ item }}
        </text>

      </view>
    </view>

  </view>
</template>

<script>
export default {
  name: "zshu-latter-index",
  props: {
    updateViewId: {
      type: Function,
      default: () => {
      }
    },

    latterIndex: {
      type: Array,
      default: () => []
    },

  },

  data() {
    return {
      rightIndex: '',
      letterList: [
        ...this.latterIndex,
        'A', 'B', 'C', 'D', 'E',
        'F', 'G', 'H', 'I', 'J',
        'K', 'L', 'M', 'N', 'O',
        'P', 'Q', 'R', 'S', 'T',
        'U', 'V', 'W', 'X', 'Y',
        'Z'
      ]
    }
  },

  methods: {
    //关联字母
    choiceLetter(index, item) {

      this.updateViewId(`viewId-${index}`, item, () => {
        this.rightIndex = index
      })
    },

  }
}
</script>

<style lang="scss">

.zshu-latter-index {
  width: 50px;
  position: relative;
  box-sizing: border-box;
  overflow: auto;
  z-index: 200;

  .fixd-right-main {
    width: 100%;
    box-sizing: border-box;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    text-align: center;

    .text {
      padding: 10rpx 0;
      font-size: 14px;
      color: #919199;
    }

    & .text:last-child {
      padding-bottom: 30rpx;
    }

    .active {
      color: #33A6FF;
    }

  }

}

</style>
