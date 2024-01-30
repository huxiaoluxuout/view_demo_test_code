<template>
  <view class="root-zshu-grid">

    <zshu-layout-flex-container :cssVar="`--num-columns:${columns}`" :dataList="list">
      <template #default="{item}">
        <view class="zshu-grid__container" @click="clickHandler(item)">

          <view class="container__up">

            <image v-if="!topText" class="up-icon" mode="aspectFill" :src="item.iconUrl"/>
            <view v-else class="up-text">
              {{item.topText}}
            </view>


          </view>

          <view class="container__down">

            <text class="down-text">{{ item.text }}</text>

          </view>
          <!--分享-->
          <button v-if="item.isShare" class="share" open-type="share" @click.stop="()=>{}"></button>
          <view v-if="isFunction(item.handler)" class="share share-mask"></view>

        </view>
      </template>
    </zshu-layout-flex-container>


  </view>

</template>

<script>


export default {
  props: {

    topText:Boolean,
    gridId:{
      type:[String,Number],
      default:'id'
    },
    columns:{
      type:[String,Number],
      default:'3'
    },
    list: {
      type: Array,
      default: () => ([
        {
          id: 1,
          text: '我的收藏',
          iconUrl: 'https://xcx.jxgxsmt.com/static/images/mine/icon-list-item-1.png',
        }, {
          id: 2,
          text: '我的收藏',
          iconUrl: 'https://xcx.jxgxsmt.com/static/images/mine/icon-list-item-2.png',
        }, {
          id: 3,
          text: '我的收藏',
          iconUrl: 'https://xcx.jxgxsmt.com/static/images/mine/icon-list-item-3.png',
        }, {
          id: 4,
          text: '我的收藏',
          iconUrl: 'https://xcx.jxgxsmt.com/static/images/mine/icon-list-item-1.png',
        }
      ])
    }
  },
  computed: {
    filteredList() {
      return this.list.filter(item => !item['isHide'])
    },

   /* columns() {
      return this.filteredList.length
    }*/

  },
  methods: {
    isFunction(value) {
      return typeof value === 'function';
    },

    clickHandler(item) {

      if (this.isFunction(item.handler)) {
        item.handler(item);
      } else {
        console.log('clickHandler', item.id)
        // this.$emit('gridId', item.id)
        // this.$emit('clickGrid', item.id)
      }

    }
  }

}

</script>
<style scoped lang="scss">

.root-zshu-grid {
  width: 100%;
  display: flex;
  gap: 20rpx;
  background-color: #fff;
  padding-top: 10rpx;
  padding-bottom: 10rpx;

}

.zshu-grid__container {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 10rpx;
  align-items: center;

  box-sizing: border-box;
  position: relative;

  .container__up {


    .up-icon {
      width: 30px;
      height: 30px;
      display: block;
    }
    .up-text {
      font-size: 18px;
      font-weight: bold;
      color: #333333;
    }
  }

  .container__down {
    display: inline-flex;

    .down-text {
      font-size: 12px;
      color: #3a3a3a;
      text-align: center;
    }

  }
}

.share {
  background-color: transparent;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;

  &:after {
    border: none;
  }
}

.share-mask {
  z-index: 101;

}

</style>

