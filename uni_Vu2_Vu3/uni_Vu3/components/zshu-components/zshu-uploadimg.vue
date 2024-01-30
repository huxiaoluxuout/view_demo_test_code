<template>

  <view class="flex-container page-gap"
        :style="{'--num-columns':columnsLimit,'--scale':scale,'--view-width':localStyleViewWidth,'--gap':localStyleGap}">
    <!--图片-->

    <view v-if="!onlyUpload" class="flex-item flex-item__scale container"
          v-for="(item,index) in localFileList" :key="item.thumb+index">
      <image class="image-item" :src="item.thumb" mode="aspectFill" @click.stop="previewImage(index)"/>

      <view class="del-icon" @click.stop="delImage(index)">
        <uni-icons type="close" color="#ff3c3c" size="26"></uni-icons>
      </view>

<!--      <view class="loading" v-show="item.status==='uploading'"></view>-->

    </view>

    <!--图片 视频 上传-->
    <view v-show="isShowUpload"
          class="flex-item__scale container upload-icon-position"
          @click="chooseFile"
    >
      <slot name="upload">
        <image class="image-item" mode="aspectFill" :src="uploadDefaultIcon"/>
      </slot>
    </view>
  </view>

</template>

<script>


import {uploadImg} from "@/Http/apis/feiying";

export default {
  name: "zshu-upload-img",

  props: {
    fileImageList: {
      type: Array,
      default: () => []
    },

    // ======================
    // 总共允许上传数量
    limit: {
      type: [Number, String],
      default: 3
    },
    // 一行有几列
    columnsLimit: {
      type: [Number, String],
      default: 3
    },
    // 宽高比例
    scale: {
      type: [Number, String],
      default: `calc(${1})`
    },
    // 当前可用总宽度
    width: {
      type: [Number, String],
      default: `calc(750rpx - 30rpx)`
    },
    gap: {
      type: String,
      default: `30rpx`
    },

    _that_: {
      type: Object,
      default: () => {
      }
    },
    _fileImageList_: {
      type: String,
      default: 'fileImageList'
    },
    hiddenUploadIcon: Boolean,
    onlyUpload: Boolean,

  },
  data() {
    return {

      uploadDefaultIcon: 'https://xcx.jxgxsmt.com/static/images/add-img.png',
    };
  },

  computed: {
    localStyleViewWidth() {
      return this.convertCalcExpression(this.width)
    },
    localStyleGap() {
      return this.convertCalcExpression(this.gap)
    },

    localFileList() {
      this.fileImageList.forEach(item => {
        if (!item.status && item.url) {
          item.status = 'success'
          item.thumb = item.url
        }
      })
      return this.fileImageList
    },

    isShowUpload() {
      return this.hiddenUploadIcon ? false : Number(this.limit) > this.localFileList.length;
    },
    chooseCountLimit() {
      return Number(this.limit) - this.localFileList.length;
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

    chooseFile() {
      const that = this
      uni.chooseImage({
        count: that.chooseCountLimit,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          // console.log('chooseImage', res)
          that.afterRead(res)
        },
        fail: function (fail) {
          console.warn(fail)
        }
      });

    },

    // 删除图片
    delImage(index) {
      const that = this
      uni.showModal({
        title: '确定删除吗?',
        success: function (res) {
          if (res.confirm) {
            that._that_[that._fileImageList_].splice(index, 1)
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });

    },

    // 预览图片
    previewImage(index) {
      const that = this
      uni.previewImage({
        urls: that.localFileList.map(item => item.thumb),
        current: that.localFileList[index].thumb,
      })
    },

    // 新增图片
    async afterRead(event) {
      const that = this
      let arrFile = []
      event.tempFiles.forEach(item => {
        arrFile.push({size: item.size, thumb: item.path, url: item.path})
      })
      let lists = [].concat(arrFile)
      let fileImageListLen = that.localFileList.length
      lists.map((item) => {
        that._that_[that._fileImageList_].push({
          ...item,
          status: 'uploading',
          message: '上传中'
        })
      })
      for (let i = 0; i < lists.length; i++) {
        const result = await that.uploadFilePromise(lists[i].url)
        let item = that.localFileList[fileImageListLen]
        that._that_[that._fileImageList_].splice(fileImageListLen, 1, Object.assign(item, {
          status: 'success',
          message: '',
          url: result
        }))
        fileImageListLen++
      }
      console.log(that._that_[that._fileImageList_]);

    },
    // 上传图片
    uploadFilePromise(url) {
      return new Promise((resolve) => {
        uni.uploadFile({
          url: uploadImg,
          filePath: url,
          name: 'file',
          success: (res) => {
            let resData = JSON.parse(res.data)
            // console.log('resData', resData)

            if (resData.code === 200) {
              resolve(resData.data.url)
            } else {
              console.error('', resData.msg)
            }
          }
        });
      })
    },


  }

}
</script>

<style scoped>


.loading {
  position: absolute;
  z-index: 2;
  border-radius: 5px;
  background-color: rgba(130, 130, 130, .5);
  inset: 0;
}

.loading:after {
  content: '';
  position: absolute;
  z-index: 2;
  inset: 0;
  background: url("./static/loading.svg") no-repeat;

  animation: uni-loading 1s steps(12) infinite;
  background-size: 100%;
  scale: .5;


}

.page-gap {
  position: relative;
}

.container {
  position: relative;
}

.del-icon {
  position: absolute;
  top: 0;
  right: 0;
  box-sizing: border-box;
  z-index: 1;
  transform: translate(50%, -50%);
}

.icon__play {
  width: 40px;
  height: 40px;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  z-index: 1;
}


.image-item, .video-item {
  display: block;
  height: var(--item-height-scale);
  width: var(--item-width);
  border-radius: 5px;
}


.upload-icon-position {
//border: 1px solid #000;

}

.upload-icon-ab {
  position: absolute;
  left: 0;
  bottom: calc(-1 * var(--item-height-scale));
  right: calc(-1 * var(--gap));
  z-index: 4;
  height: calc(var(--item-height-scale) / 2 - 30rpx);
  background-color: rgba(45, 45, 45, .6);
}

.position-ab {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: calc(-1 * var(--gap));

}

</style>

