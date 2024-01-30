<template>
  <view class="zshu-navbar" :style="{'--navbar-height':zshuBavbarHeight+'px'}">
    <view class="zshu-navbar-wrap" :style="navbarStyle_">
      <view class="navbar-content__container">
        <view class="zshu-navbar-container" :style="zahuNavbarContainerStyle">
          <view class="zshu-navbar-container__left" v-if="configNavBar_.isTabBarPage">
            <slot name="left"></slot>
          </view>
          <view class="zshu-navbar-container__left" v-else>

            <template v-if="!showHomeIcon&&pageHierarchy>1">
              <slot name="left_back_icon">
                <u-icon name="arrow-left" :color="iconColor" size="22" @click="leftIconClick"></u-icon>
              </slot>
            </template>
            <template v-else-if="showHomeIcon||pageHierarchy===1">
              <slot name="left_back_icon">
                <u-icon name="home" :color="iconColor" size="22" @click="leftIconClick"></u-icon>
              </slot>
            </template>

          </view>
          <view class="zshu-navbar-container__center">
            <view class="zshu-navbar-content-title">
              <view class="title">{{ configNavBar_.title }}</view>
              <slot name="center"></slot>
            </view>
          </view>
          <view class="zshu-navbar-container__right" v-if="configNavBar_.right">
            <slot name="right"></slot>
          </view>
        </view>
      </view>
    </view>
    <view class="temp-view" :style="zshuNavbarTempViewStyle"></view>
  </view>
</template>
<script>
import pagesConfig from "@/pages.json";
import {filterPath, navigateTo} from "@/utils/zshuTools";

const {tabBar: {list: tabBarPages}} = pagesConfig

export default {
  props: {
    configNavBar: {
      type: Object,
      default: () => {
        return {}
      }
    },
    navbarStyle: {
      type: Object,
      default: () => {
        return {}
      }
    },
    title: {
      type: String,
      default: '',
    },
    backgroundImage: {
      type: String,
      default: ''
    },
    // 用于显示跳转到首页的icon
    showHomeIcon: Boolean
  },
  data() {
    return {
      menuButtonWidth: 0,
      menuButtonTop: 10,
      menuButtonHeight: 24,
      statusBarHeight: 0,
      pageHierarchy: 1,
      zshuBavbarHeight: 44,

      bgColor: 'transparent',

      currentPagePath: '',
    }
  },

  computed: {
    configNavBar_() {

      const isTabBarPage = tabBarPages.map(item => filterPath(item.pagePath)).includes(filterPath(this.currentPagePath));

      return Object.assign({
        title: this.title,//标题名称
        isTabBarPage: isTabBarPage,
        right: false,
      }, this.configNavBar);
    },

    zahuNavbarContainerStyle() {
      this.zshuBavbarHeight = (this.menuButtonHeight + this.menuButtonTop + this.statusBarHeight + 12)
      this.$emit('navbarHeight', this.zshuBavbarHeight)
      return {
        height: this.zshuBavbarHeight + 'px'
      }
    },

    zshuNavbarTempViewStyle() {
      this.zshuBavbarHeight = (this.menuButtonHeight + this.menuButtonTop + this.statusBarHeight + 12)
      this.$emit('navbarHeight', this.zshuBavbarHeight)
      return {
        height: this.zshuBavbarHeight + 'px'
      }
    },


    navbarStyle_() {
      return Object.assign({
        ...this.zshuNavbarTempViewStyle,
        background: this.bgColor,
        backgroundPosition: 'top',
        backgroundSize: 'cover',
      }, this.navbarStyle)
    },


    iconColor() {
      return this.calculateIconColor(this.navbarStyle)
    },


  },
  mounted() {
    const pages = getCurrentPages();
    this.currentPagePath = pages[pages.length - 1]['route'];
    this.pageHierarchy = pages.length;

    // #ifdef MP-WEIXIN || MP-ALIPAY
    const menuButtonInfoALI = uni.getMenuButtonBoundingClientRect();
    this.menuButtonTop = Math.ceil(menuButtonInfoALI.top);
    this.menuButtonHeight = Math.ceil(menuButtonInfoALI.height);
    this.menuButtonWidth = Math.ceil(menuButtonInfoALI.width);
    // #endif


    // #ifdef APP-PLUS
    this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
    // #endif


  },


  methods: {
    calculateIconColor(navbarStyle) {
      const cssKeyValuePairs = [
        {key: 'background', keyword: /linear-gradient|url/},
        {key: 'backgroundImage', keyword: /url/},
        // 添加更多的属性和匹配关键字对
        // { key: 'anotherProperty', keyword: /anotherKeyword/ },
      ];

      for (const {key, keyword} of cssKeyValuePairs) {

        if (key in navbarStyle) {
          const cssValue = navbarStyle[key];
          // console.log(key, cssValue)

          if (keyword.test(cssValue)) {
            return '#fff';
          }
        }
      }

      return '#fff';
    },

    leftIconClick() {
      try {
        if (this.pageHierarchy.value > 1) {
          uni.navigateBack({delta: 1});
        } else {
          const ROUTE_HOME = '/pagesFeiying/orderingDesk/orderingDesk';

          navigateTo(ROUTE_HOME);
        }
      } catch (error) {
        console.error('Error while handling leftIconClick:', error);
      }
    },


    // 页面上下滚动
    handlePageScroll(e) {
      this.bgColor = `rgba(255,255,255,${Math.ceil(e.scrollTop / this.zshuBavbarHeight)})`

      console.log('this.bgColor',this.bgColor)
    }

  },


}

</script>

<style scoped lang="scss">
.zshu-navbar {
  box-sizing: border-box;
}

.zshu-navbar-wrap {
  position: fixed;
  top: var(--window-top);
  left: 0;
  right: 0;
  box-sizing: border-box;
  z-index: 9999;
  display: flex;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
}

.temp-view {
  width: 100%;
}

.navbar-content__container {
  position: relative;
  width: 100%;
  height: 100%;
}


.zshu-navbar-container {
  box-sizing: border-box;
  word-break: break-all;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  left: 0;
}

.zshu-navbar-container__left:not(:empty) {
  min-width: 1em;
  border-radius: 50%;
  box-sizing: border-box;
  margin-right: 10px;
  margin-top: 2px;
}


.zshu-navbar-container__center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.zshu-navbar-container__right {
  min-width: 1em;
  display: flex;
  justify-content: flex-end;
}

.zshu-navbar-content-title {
  font-size: 16px;
  color: #303030;
  display: flex;
  align-items: center;
  flex: 1;
  //justify-content: center;

}

.title {
  flex-shrink: 0;
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  //color: #333333;
  mix-blend-mode: hard-light;

}


</style>
