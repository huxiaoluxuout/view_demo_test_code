<template>
  <view class="zshu-index-list">
    <scroll-view class="scroll-view-container" :scroll-y="true" :scroll-with-animation="true" :scroll-into-view="activeViewId">
      <view class="index-list-item" v-for="(item,INDEX) in list" :key="INDEX">
        <view class="title" :id="`viewId-${INDEX}`">{{ item.initials }}</view>
        <view class="indexed-list-item-container">
          <view class="list-main-item" v-for="(Item ,index) in item.second" :key="Item.id" @click="choose(INDEX,index)">
            <view class="text" :class="{'active':Item.active}">{{ Item.brand_name }}
              <view v-show="item.showCloseIcon" class="close-circle" @click.stop="closeIcon(INDEX,index)">
                <u-icon name="close-circle" color="#878787" size="22"></u-icon>
              </view>

            </view>
          </view>
          <view class="list-main-item custom" v-show="item.customBtn">
            <view class="text custom-text" @click="customBtn">
              <u-icon name="plus" color="#303030" size="16"></u-icon>
              <text class="custom-content">自定义</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    <u-loading-page :loading="isLoading"></u-loading-page>

  </view>
</template>

<script>


import {getBrandList} from "@/Http/apis/feiying";

export default {
  name: "indexed-board",
  props: {
    activeViewId: {
      type: String,
      default: 'viewId-0'
    },

    topIndexList: {
      type: Array,
      default: () => []
    },
    updateActiveId: {
      type: Function,
      default: () => {
      }
    },
    checkbox: Boolean,
    activeBrandIds: {
      type: Array,
      default: () => []
    },
  },

  data() {
    return {
      list: [...this.topIndexList],
      isLoading: true,
    }
  },

  created() {
    this.getBrandListH()
  },

  watch: {
    activeIds(newVal) {
      this.updateActiveId(newVal)
    }
  },
  methods: {

    getBrandListH() {
      this.isLoading = true
      getBrandList().then(res => {
        let arr = this.getArr(res.data)

        this.resetActive(arr)

        this.list = [...this.list, ...arr]
        this.isLoading = false
      })

    },

    getArr(arr) {

      return arr.reduce((results, item) => {
        let existingGroup = results.find(group => group.initials === item.initials);
        if (existingGroup) {
          existingGroup.second.push(item);
        } else {
          results.push({initials: item.initials, second: [item]});
        }
        return results;
      }, []);

    },

    choose(INDEX, index) {
      if (this.checkbox) {
        if (this.list[INDEX].second[index].active === 1) {
          this.list[INDEX].second[index].active = 0;
        } else {
          this.list[INDEX].second[index].active = 1;
        }
        this.updateActiveId(this.list[INDEX].second[index])

      } else {
        this.resetActive(this.list)
        this.list[INDEX].second[index].active = 1;
        this.updateActiveId(this.list[INDEX].second[index])
      }


    },
    // 删除
    closeIcon(INDEX, index) {
      this.list[INDEX].second.splice(index, 1);

    },
    // 自定义
    customBtn() {
      console.log('自定义')
    },
    resetActive(list) {
      let active_brand_ids = this.activeBrandIds
      for (let i = 0; i < list.length; i++) {
        const secondData = list[i].second;
        if (Array.isArray(secondData)) {
          for (let j = 0; j < secondData.length; j++) {
            if (secondData[j] && typeof secondData[j] === 'object') {
              let info = active_brand_ids.find(ID => ID === secondData[j].brand_id)
              if (info) {
                secondData[j].active = 1;
              }else {
                secondData[j].active = 0;
              }
            }
          }
        }
      }
    }

  }
}
</script>

<style lang="scss">


.zshu-index-list {
  --gap: 10px;
  flex: 1;

  .scroll-view-container {
    box-sizing: border-box;
    height: calc(100vh - var(--window-top) - var(--status-bar-height));
  }

  .index-list-item {
    .title {
      display: flex;
      align-items: center;
      color: #303033;
      font-size: 16px;
      font-weight: bold;
      margin: var(--gap)
    }

    .indexed-list-item-container {
      --gap: 14px;
      margin-left: 10px;
      margin-right: 5px;
      font-size: 14px;
      display: flex;
      flex-wrap: wrap;


      .list-main-item {
        min-width: 33.33%;
        max-width: 100%;
        flex-shrink: 0;
        display: flex;
        box-sizing: border-box;
        padding: 0 14rpx;
        margin-bottom: var(--gap);


        .text {
          --top-gap: 10px;
          --right-gap: 10px;

          height: 100%;
          width: 100%;
          color: #303033;
          background: #F9F9FC;
          padding: var(--top-gap) var(--right-gap);
          text-align: center;
          box-sizing: border-box;
          border-radius: 5px;
          position: relative;

        }

        .active {
          color: #33A6FF;
          border-radius: 6px;
          background-color: #e6f4ff;
        }

        .close-circle {
          position: absolute;
          top: calc(-1 * var(--top-gap));
          right: calc(-1 * var(--right-gap));
        }
      }
    }
  }

}

.custom {
  width: 100%;

  .custom-text {
    display: inline-flex;
    justify-content: center;
    border: 1px solid #e7e7e7;
    border-radius: 6px;
    gap: 10px;

    .custom-content {
      font-size: 16px;
    }
  }

}
</style>
