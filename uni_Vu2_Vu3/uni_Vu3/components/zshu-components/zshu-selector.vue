<template>
  <view class="zshu-selector">
    <view class="selector-container">
      <view class="selector" @click="toggleSelector">
        <text class="selector-text">
          {{ localSelectorTitle }}
        </text>
        <view :class="{'rotate-down':rotateActive==1,'rotate-top':rotateActive==2}">
          <u-icon name="arrow-down-fill" size="12"></u-icon>
        </view>
      </view>

      <view class="select__selector_content" v-if="showSelector">
        <view class="arrow"></view>
        <scroll-view :scroll-y="true" class="select__selector_content-scroll" scroll-with-animation :scroll-into-view="'id-'+selectorId">
          <view class="select__selector_content-empty" v-if="selectDataList.length === 0" @click="toggleSelector">
            <text>{{ emptyTips }}</text>
          </view>
          <view :id="'id-'+item[selectIdKey]" v-else class="select__selector_content-item" :class="{'active-selector-item':selectorId==item[selectIdKey]}"
                v-for="(item,index) in selectDataList" :key="index" @click="updateSelectorId(item[selectIdKey])">
            {{ item[selectTextKey] }}
          </view>
        </scroll-view>
      </view>
    </view>

    <view class="select--mask" v-show="showSelector" @click="toggleSelector"/>


  </view>
</template>

<script>

export default {
  name: "zshu-select",

  props: {

    selectorTitle: {
      type: String,
      default: ''
    },
    selectorId: {
      type: [String, Number],
      default: ''
    },

    emptyTips: {
      type: String,
      default: '无选项'
    },
    clear: {
      type: Boolean,
      default: true
    },

    disabled: {
      type: Boolean,
      default: false
    },
    selectDataList: {
      type: Array,
      default: () => []
    },

    selectTextKey: {
      type: String,
      default: 'text'
    },
    selectIdKey: {
      type: String,
      default: 'id'
    },
  },
  data() {
    return {
      showSelector: false,
      rotateActive: 0

    };
  },
  computed: {
    selectorVal() {
      if (this.selectDataList.length) {
        let info = this.selectDataList.find(item => item[this.selectIdKey] == this.selectorId)
        // if(info){
          return this.selectorId ? info[this.selectTextKey] : ''
        // }
      }
    },

    localSelectorTitle() {
      return this.selectorVal ? this.selectorVal : this.selectorTitle
    },

  },
  methods: {

    toggleSelector() {
      this.rotateActive = !this.showSelector ? 1 : 2
      this.showSelector = !this.showSelector
    },
    updateSelectorId(e) {
      this.$emit('updateId',e)
      this.toggleSelector()
    },
  }

}
</script>

<style lang="scss" scoped>
.rotate-top {
  transform: rotate(360deg);
  transition: transform 0.2s ease;
}

.rotate-down {
  transform: rotate(180deg);
  transition: transform 0.2s ease;
}

.zshu-selector {
  position: relative;
  width: 100%;
}


.selector-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx;
  box-sizing: border-box;
  background-color: #f6f5f8;
  border-radius: 100px;

  .selector {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    //border: 1px solid #000;
  }

  .selector-text {
    font-size: 12px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

}

.select__selector_content {
  /* #ifndef APP-NVUE */
  box-sizing: border-box;
  /* #endif */
  position: absolute;
  top: calc(100% + 12px);
  left: 0;
  width: 100%;
  background-color: #FFFFFF;
  border: 1px solid #EBEEF5;
  border-radius: 6px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  z-index: 3;
  padding: 4px 0;
}

.select__selector_content-scroll {
  /* #ifndef APP-NVUE */
  max-height: 200px;
  box-sizing: border-box;
  /* #endif */
}

/* #ifdef H5 */
@media (min-width: 768px) {
  .select__selector_content-scroll {
    max-height: 600px;
  }
}

/* #endif */

.select__selector_content-empty,
.select__selector_content-item {
  /* #ifndef APP-NVUE */
  display: flex;
  cursor: pointer;
  /* #endif */

  font-size: 14px;
  //text-align: center;
  padding: 10px 10px;
}

.select__selector_content-item:hover {
  background-color: #f9f9f9;
}

.active-selector-item {
  background-color: #f9f9f9;

}

.select__selector_content-empty:last-child,
.select__selector_content-item:last-child {
  /* #ifndef APP-NVUE */
  border-bottom: none;
  /* #endif */
}

.select--mask {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 2;
  //background-color: rgba(0,0,0,.2);
}

/* picker 弹出层通用的指示小三角 */
.arrow,
.arrow::after {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
  border-width: 6px;
}

.arrow {
  filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
  top: -6px;
  left: 10%;
  margin-right: 3px;
  border-top-width: 0;
  border-bottom-color: #EBEEF5;
}

.arrow::after {
  content: " ";
  top: 1px;
  margin-left: -6px;
  border-top-width: 0;
  border-bottom-color: #fff;
}

.disabled {
  opacity: 0.4;
  cursor: default;
}

</style>

<!--
<style lang="scss">
$uni-base-color: #6a6a6a !default;
$uni-main-color: #333 !default;
$uni-secondary-color: #909399 !default;
$uni-border-3: #e5e5e5;


/* #ifndef APP-NVUE */
@media screen and (max-width: 500px) {
  .hide-on-phone {
    display: none;
  }
}

/* #endif */
.uni-stat__select {
  display: flex;
  align-items: center;
  // padding: 15px;
  /* #ifdef H5 */
  cursor: pointer;
  /* #endif */
  width: 100%;
  flex: 1;
  box-sizing: border-box;
}

.uni-stat-box {
  width: 100%;
  flex: 1;
}

.uni-stat__actived {
  width: 100%;
  flex: 1;
  // outline: 1px solid #2979ff;
}

.uni-label-text {
  font-size: 14px;
  font-weight: bold;
  color: $uni-base-color;
  margin: auto 0;
  margin-right: 5px;
}

.uni-select {
  font-size: 14px;
  border: 1px solid $uni-border-3;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 0 5px;
  padding-left: 10px;
  position: relative;
  /* #ifndef APP-NVUE */
  display: flex;
  user-select: none;
  /* #endif */
  flex-direction: row;
  align-items: center;
  border-bottom: solid 1px $uni-border-3;
  width: 100%;
  flex: 1;
  height: 35px;

  &&#45;&#45;disabled {
    background-color: #f5f7fa;
    cursor: not-allowed;
  }
}

.uni-select__label {
  font-size: 16px;
  // line-height: 22px;
  height: 35px;
  padding-right: 10px;
  color: $uni-secondary-color;
}

.uni-select__input-box {
  height: 35px;
  position: relative;
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex: 1;
  flex-direction: row;
  align-items: center;
}

.uni-select__input {
  flex: 1;
  font-size: 14px;
  height: 22px;
  line-height: 22px;
}

.uni-select__input-plac {
  font-size: 14px;
  color: $uni-secondary-color;
}


.uni-select__selector__disabled {
  opacity: 0.4;
  cursor: default;
}



.uni-select__input-text {
  // width: 280px;
  width: 100%;
  color: $uni-main-color;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  overflow: hidden;
}

.uni-select__input-placeholder {
  color: $uni-base-color;
  font-size: 12px;
}


</style>

-->
