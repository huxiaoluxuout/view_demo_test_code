<template>
  <view class="zshu-order-card">

    <view class="order-card-container">
      <view class="order-card-top">
        <view class="top-left">
          <view class="time-label">上门时间</view>
          <view class="time-date">{{ orderItem.visit_time }}</view>
        </view>
        <view class="top-right">
          {{ orderItem.order_status_text }}
        </view>
      </view>
      <view class="order-card-title">
        {{ orderItem.fault }}
      </view>
      <view class="order-card-label">
        <text class="text label-active">维修</text>
        <text class="text">滚筒洗衣机</text>
        <text class="text">美的</text>
      </view>
      <view class="order-card-desc">
        <view class="card-desc-label">特殊需求:</view>
        <view class="card-desc-content">{{ orderItem.device_type }}</view>
      </view>
      <view class="order-card-map-address" @click="goMap">
        <view class="left">
          <view class="title">{{ orderItem.province_name }}{{ orderItem.city_name }}{{ orderItem.county_name }}{{ orderItem.street_name }}{{ orderItem.address }}</view>
          <view class="distance">据您约{{ orderItem.distance }}</view>
        </view>
        <view class="right">
          <u-icon name="map" size="20" color="#333"></u-icon>
        </view>

      </view>
      <view class="order-card-user">
        <view class="card-user-left">
          <view class="label">姓名:</view>
          <view class="label-info">{{ orderItem.name }}</view>
        </view>
        <view class="card-user-right">
          <view class="label">手机号:</view>
          <view class="label-info">{{ orderItem.phone }}</view>
        </view>
      </view>
      <u-line></u-line>
      <view class="order-card-bottom">
        <view class="amount">
          <text class="amount-label">预估</text>
          <text class="amount-money">{{ orderItem.offer }}</text>
        </view>
        <view class="bottom-btn-container">
          <!--接单列表-->
          <template v-if="orderItem.btn">
            <u-button v-if="orderItem.btn.refund_btn" color="#ababab" type="primary" shape="circle" :plain="true" text="退单" @click="clickHandler('refund_btn')"></u-button>
            <u-button v-if="orderItem.btn.await" color="#ababab" type="primary" shape="circle" :plain="true" text="待件" @click="clickHandler('await')"></u-button>
            <u-button v-if="orderItem.btn.contact_btn" color="#ababab" type="primary" shape="circle" :plain="true" text="联系用户" @click="clickHandler('contact_btn')"></u-button>
            <u-button v-if="orderItem.btn.logistics" color="#ababab" type="primary" shape="circle" :plain="true" text="待件物流" @click="clickHandler('logistics')"></u-button>
            <u-button v-if="orderItem.btn.del_order" color="#ababab" type="primary" shape="circle" :plain="true" text="删除订单" @click="clickHandler('del_order')"></u-button>
            <u-button v-if="orderItem.btn.start_service" type="primary" shape="circle" text="开始服务" @click="clickHandler('start_service')"></u-button>
            <u-button v-if="orderItem.btn.again_service" type="primary" shape="circle" text="再次服务" @click="clickHandler('again_service')"></u-button>
            <u-button v-if="orderItem.btn.end_service" type="primary" shape="circle" text="服务结束" @click="clickHandler('end_service')"></u-button>
            <u-button v-if="orderItem.btn.payee_code" type="primary" shape="circle" text="收款码" @click="clickHandler('payee_code')"></u-button>


          </template>
          <!--接单大厅-->
          <template v-else>
            <u-button type="primary" shape="circle" :text="btnOrderText" @click="$emit('getTask',orderItem)"></u-button>

          </template>


        </view>
      </view>
    </view>

    <ylx-u-modal ref="ylxUModal" @_confirm="_confirmDelOrder" :title="ylxUModalTitle"></ylx-u-modal>

    <u-popup :show="showPopup" mode="center" @close="close">
      <view>
        <u-modal v-if="type===1" :show="showPopup" :title="contactName" :showCancelButton="true" @confirm="confirmCall" @cancel="close">

          <template #default>
            <view class="content-call-title">
              {{ contactPhoneNumber }}
            </view>
          </template>
        </u-modal>
        <u-modal v-else-if="type===2" :show="showPopup" :title="title2" :content='content2' @confirm="confirm"></u-modal>
        <u-modal v-else-if="type===3" :show="showPopup" :title="title3" @confirm="confirmQR">
          <template #default>
            <view class="content-QR">
<!--              <view class="title">您好，这是您本次服务的收款码！</view>-->
              <!--              <view >-->
              <image :src="QRImg" class="QR"/>
              <!--              </view>-->
            </view>
          </template>
        </u-modal>
      </view>
    </u-popup>

    <u-action-sheet :actions="list" title="选择收款方式" :show="showSheet" @select="select"></u-action-sheet>
  </view>
</template>

<script>
import {getMyLocation, handleEvent, navigateTo} from "@/utils/zshuTools";
import {againVisit, delOrder, payQrcode, refund, startService} from "@/Http/apis/feiying";
import {navigationToPathMapping} from "@/common/commonMapping";

export default {
  name: "zshu-order-card",

  props: {

    selectorTitle: {
      type: String,
      default: ''
    },
    btnOrderText: {
      type: String,
      default: '立即接单'
    },
    orderItem: {
      type: Object,
      default: () => {
      }
    },

  },
  data() {
    return {
      ylxUModalTitle: '确认退订单吗?',
      showPopup: false,
      type: 1,

      contactPhoneNumber: '',
      contactName: '',

      title2: '温馨提示',
      content2: '不好意思，您的位置不在定位范围内，请前往服务点方圆500m内定位！',

      title3: '收款码',
      content3: 'content3',


      //=====
      showSheet: false,
      list: [
        {
          name: '微信',
          fontSize: '16',
          type: 'weixin'
        }, {
          name: '支付宝',
          fontSize: '16',
          type: 'alipay',
          disabled: true
        },

      ],
      QRImg: ''

    };
  },
  computed: {},
  methods: {
    navigateTo,
    goMap() {
      console.log('goMap',)

      uni.openLocation({
        latitude: Number(this.orderItem.lat),
        longitude: Number(this.orderItem.lng),
        success: function () {
          console.log('success');
        },
        fail: function (fail) {
          console.log('fail'.fail);
        }
      });

    },

    clickHandler(key) {
      let mappingKeys = {
        refund_btn: () => {
          navigateTo(navigationToPathMapping['chargeback'] + `?orderId=${this.orderItem.id}`)
        },
        contact_btn: () => {
          this.showPopup = true
          this.type = 1
          this.contactPhoneNumber = this.orderItem.phone
          this.contactName = this.orderItem.name
          uni.makePhoneCall({
            phoneNumber: this.orderItem.phone //仅为示例
          });

        },
        start_service: () => {

          getMyLocation().then(res => {

            startService({order_id: this.orderItem.id, lng: res.longitude, lat: res.latitude}).then(res => {
              if (res.code === 200) {
                this.refreshCallback()
              }
            })
          })

        },
        again_service: () => {
          getMyLocation().then(res => {

            againVisit({order_id: this.orderItem.id, lng: res.longitude, lat: res.latitude}).then(res => {
              if (res.code === 200) {
                this.refreshCallback()
              }
            })
          })
        },
        end_service: () => {
          navigateTo(navigationToPathMapping['serviceEnd'] + `?orderId=${this.orderItem.id}`)
        },
        await: () => {
          navigateTo(navigationToPathMapping['waitingParts'] + `?orderId=${this.orderItem.id}`)
        },
        logistics: () => {
        },

        del_order: () => {
          this.$refs.ylxUModal.show = true
          this.ylxUModalTitle = '确定删除订单吗'
        },
        payee_code: () => {
          this.showSheet = true
        },
      }
      mappingKeys[key]()
    },
    refreshCallback() {
      this.$emit('refreshCallback')
    },


    confirm() {

      this.close()
    },
    close() {
      this.showPopup = false
    },

    _confirmDelOrder() {
      delOrder({order_id: this.orderItem.id}).then(res => {
        if (res.code === 200) {
          this.refreshCallback()
        }
      })
    },
    confirmCall() {
      console.log('confirmCall')
      this.close()
    },
    confirmQR() {
      console.log('confirmQR')
      this.close()
    },
    // 选择付款方式
    select(e) {
      payQrcode({
        order_id: this.orderItem.id,
        pay_type: e.type,
        other_money: '',
        order_money_desc: '',
      }).then(res => {
        if (res.code === 200) {
          this.showSheet = false
          this.QRImg = res.data
          this.showPopup = true
          this.type = 3
        }
      })


    },
  }

}
</script>

<style lang="scss" scoped>
.zshu-order-card {
  background-color: #fff;
  border: 1px solid #e7e7e7;
  border-radius: 20rpx;
  margin-top: 10px;

}

.order-card-container {
  margin: 20rpx;

  .order-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 0;

    .top-left {
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 10px;

      .time-label {
        color: #ababab;
      }

      .time-date {
        color: #606060;

      }
    }

    .top-right {
      font-size: 14px;
    }

  }

  .order-card-title {
    font-size: 16px;
    font-weight: bold;
    line-height: 1.5;
    color: #303030;
    margin: 10px 0;

  }

  .order-card-label {
    display: inline-flex;
    gap: 5px;

    .text {
      border-radius: 6px;
      padding: 1px 4px;
      font-size: 12px;
      color: #33A6FF;
      border: 1px solid;
    }

    .label-active {
      --color: #fff;
      --bgColor: #ff6c6c;
      color: var(--color);
      background-color: var(--bgColor);
      border: 1px solid var(--bgColor);

    }


  }

  .order-card-desc {
    padding: 10px 0;
    display: flex;
    gap: 5px;

    .card-desc-label {
      color: #ababab;
      font-size: 14px;
      flex-shrink: 0;
    }

    .card-desc-content {
      color: #303030;
      font-size: 14px;
    }
  }

  .order-card-map-address {
    display: flex;
    justify-content: space-between;
    gap: 10px;

    .title {
      color: #373737;
      font-size: 16px;
      font-weight: bold;
    }

    .distance {
      color: #5d5d5d;
      font-size: 14px;
      line-height: 1.5;
    }
  }

  .order-card-user {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20rpx 0;

    .card-user-left,
    .card-user-right {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .label {
      color: #ababab;
      font-size: 14px;
    }

    .label-info {
      color: #303030;
      font-size: 14px;
    }
  }

  .order-card-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;

    .amount {
      display: inline-flex;
      align-items: center;
      --color: #f85050;

      .amount-label {
        color: #ababab;
        font-size: 14px;
      }

      .amount-money:before {
        content: '￥';
        color: var(--color);
        font-size: 12px;

      }

      .amount-money {
        font-size: 16px;
        color: var(--color);

      }
    }

    .bottom-btn-container {
      display: flex;
      gap: 6px;
      font-size: 14px;

      .u-button {
        height: 28px;
        font-size: 12px;
      }

      .u-button:after {
        border: none;
      }
    }


  }

}

//=====================================
.content-call-title {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
}

.content-QR {
  .title {
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }

  .QR {
    display: block;
    width: 240px;
    height: 240px;
    margin: 15px auto auto;
  }

}
</style>
