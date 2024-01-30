<template>
  <view class="zshu-upload">
    <u-upload
        :fileList="localFileList"
        @afterRead="afterRead"
        @delete="deletePic"
        multiple
        :maxCount="maxCount"
        :accept="accept"
    ></u-upload>
  </view>
</template>

<script>

import {uploadImgUrl} from "@/Http/config";

export default {
  name: "zshu-upload",

  props: {
    fileImageList: {
      type: Array,
      default: () => []
    },

    multiple: Boolean,
    maxCount: {
      type: [String, Number],
      default: 3
    },
    accept: {
      type: String,
      default: 'image'
    },
    _that_: {
      type: Object,
      default: () => {
      }
    },
  },
  data() {
    return {};
  },
  computed: {

    localFileList() {
      return this.fileImageList
    },
  },

  methods: {

    // 删除图片
    deletePic(event) {
      const that = this
      uni.showModal({
        title: '确定删除吗?',
        success: function (res) {
          if (res.confirm) {
            that._that_.fileImageList.splice(event.index, 1)
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });

    },

    // 新增图片
    async afterRead(event) {

      let lists = [].concat(event.file)
      let fileImageListLen = this._that_.fileImageList.length
      lists.map((item) => {
        this._that_.fileImageList.push({
          ...item,
          status: 'uploading',
          message: '上传中'
        })
      })

      for (let i = 0; i < lists.length; i++) {
        const result = await this.uploadFilePromise(lists[i].url)
        let item = this._that_.fileImageList[fileImageListLen]
        this._that_.fileImageList.splice(fileImageListLen, 1, Object.assign(item, {
          status: 'success',
          message: '',
          url: result
        }))
        fileImageListLen++
      }

    },

    uploadFilePromise(url) {
      return new Promise((resolve) => {
        uni.uploadFile({
          url: uploadImgUrl,
          filePath: url,
          name: 'file',
          success: (res) => {
            setTimeout(() => {
              resolve(JSON.parse(res.data).data.url)
            }, 800)
          }
        });
      })
    },


  }

}
</script>

<style scoped>
.zshu-upload {
  position: relative;
  width: 100%;
}
</style>
