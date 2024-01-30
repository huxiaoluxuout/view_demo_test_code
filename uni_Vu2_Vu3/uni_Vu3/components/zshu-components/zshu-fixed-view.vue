<template>
  <view class="root-zshu-fixed" :style="{'--rectHeight':rectHeight+'px'}">
    <view class="zshu-fixed-view" :class="{'border__bottom':isBorderBottom}" :style="{background:bgColor_}">
      <slot name="content-inner"></slot>
    </view>
    <view :style="{height:rectHeight+`px`}"></view>
  </view>
</template>


<script>

export default {
  props: {
    bgColor: {
      type: String,
      default: '#fff'
    },
    rectHeight: {
      type: [String, Number],
      default: 50
    },
    transparent: Boolean
  },
  data() {
    return {}
  },

  computed: {
    bgColor_() {
      return this.transparent ? 'transparent' : this.bgColor
    },
    isBorderBottom() {
      const regex = /^(transparent)|rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*0\s*)?\)$/i;
      return this.transparent ? false : !regex.test(this.bgColor_)
    },

  },
  mounted() {


  },


  methods: {},


}

</script>


<style lang="scss" scoped>


.root-zshu-fixed {

  .zshu-fixed-view {
    position: fixed;
    top: calc(var(--window-top));
    left: 0;
    right: 0;
    width: 100%;
    z-index: 1000;
    height: var(--rectHeight);

  }

}

//底部边框
.border__bottom {
  --bdColor: #F2F2F7;
  position: relative
}

.border__bottom::after {
  content: '';
  width: 100%;
  height: 1px;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: var(--bdColor);
}

.border__top::after {
  content: '';
  width: 100%;
  height: 1px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--bdColor);

}


</style>
