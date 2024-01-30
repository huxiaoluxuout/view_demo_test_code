<template>
  <image v-if="preview" class="zshu-scale-img" :src="url" mode="aspectFill" :style="customStyles" @click.stop="previewImage"></image>
  <image v-else class="zshu-scale-img" :src="url" mode="aspectFill" :style="customStyles" @click="$emit('click')"></image>
</template>

<script>


export default {
  name: "zshu-scale-img",

  props: {

    // 宽高比例
    scale: {
      type: [Number, String],
      default: 1
    },
    // 当前可用总宽度
    width: {
      type: String,
      default: `calc(750rpx)`
    },

    url: {
      type: String,
      default: `https://xcx.jxgxsmt.com/static/images/add-img.png`
    },

    preview: Boolean,

  },
  data() {
    return {};
  },

  computed: {
    localStyleViewWidth() {
      return this.convertCalcExpression(this.width)
    },

    customStyles() {
      return {
        '--scale': Number(this.scale),
        '--view-width': this.localStyleViewWidth,
      }
    },

  },

  methods: {
    // 将 rpx 转换为 px
    convertCalcExpression(expression) {
      const regex = /(\d+)(rpx|px)/g;
      return expression.replace(regex, (match, number, unit) => {
        // 将 rpx 转换为 px
        if (unit === 'rpx') {
          number = number / 2;
        }
        // 返回转换后的数字和单位
        return `${number}px`;
      });
    },
    // 预览图片
    previewImage() {
      const that = this
      if (!that.preview) return

      uni.previewImage({
        urls: [that.url],
        current: that.url
      })
    },


  }

}
</script>

<style scoped>
//宽高比例（不能直接写成分数形式）
.zshu-scale-img {
  --scale: 1;
  --view-width: 100%;
  --item-width: var(--view-width);
  --item-height-scale: calc(var(--item-width) / var(--scale));


  width: var(--item-width);
  height: var(--item-height-scale);
  box-sizing: border-box;
  position: relative;
  display: block;
}


</style>

