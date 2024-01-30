<template>
  <view class="visit-time-wrapper">
    <u-form-item
        :label="label"
        :borderBottom="false"
    >
      <u-input
          v-model="visit_time"
          disabled
          disabledColor="#ffffff"
          placeholder="请选择上门日期"
          border="none"
      ></u-input>
      <u-icon name="arrow-right" @click="showCalendarHandle"></u-icon>
    </u-form-item>
    <view class="visit-time">
      <u-form-item
          label="开始时间"
          :borderBottom="false"
      >
        <u-input
            v-model="visit_time_start"
            disabled
            disabledColor="#ffffff"
            placeholder="请选择开始时间"
            border="none"
        ></u-input>
        <u-icon name="arrow-right" @click="timeStart=true"></u-icon>
      </u-form-item>
      <u-form-item
          label="结束时间"
          :borderBottom="false"
      >
        <u-input
            v-model="visit_time_end"
            disabled
            disabledColor="#ffffff"
            placeholder="请选择结束时间"
            border="none"
        ></u-input>
        <u-icon name="arrow-right" @click="timeEnd=true"></u-icon>
      </u-form-item>

    </view>

    <u-calendar :show="showCalendar" @confirm="confirmCalendar"></u-calendar>

    <u-datetime-picker
        :show="timeStart"
        mode="time"
        title="开始时间"
        v-model="visit_time_start"
        @confirm="confirmTimeStart"
        @cancel="timeStart=false"
        :closeOnClickOverlay="true"
    ></u-datetime-picker>
    <u-datetime-picker
        title="结束时间"
        :show="timeEnd"
        mode="time"
        v-model="visit_time_end"
        @confirm="confirmTimeEnd"
        @cancel="timeEnd=false"
        :closeOnClickOverlay="true"
    ></u-datetime-picker>
  </view>

</template>
<script>


export default {
  props: {
    label:{
      type:String,
      default:'上门日期'
    },

  },
  data() {
    return {
      // -----------------------------
      visit_time:'',
      visit_time_start:'',
      visit_time_end:'',
      // -----------------------------
      show: false,
      showCalendar: false,

      timeStart: false,
      timeEnd: false,
    }
  },
  watch:{
    visit_time(newVal) {
      console.log(newVal)
      this.$emit('updateVisitTime',newVal)
    },
    visit_time_start(newVal) {
      console.log(newVal)
      this.$emit('updateVisitTimeStart',newVal)

    },
    visit_time_end(newVal) {
      console.log(newVal)
      this.$emit('updateVisitTimeEnd',newVal)


    },
  },

  methods: {
    showCalendarHandle() {
      console.log('showCalendarHandle-----')
      this.showCalendar = true
    },
    confirmCalendar(e) {
      console.log('confirmCalendar-----', e)
      this.visit_time=e[0]
      this.showCalendar = false
    },
    confirmTimeStart(e) {
      console.log(e, 'confirmTimeStart')
      this.timeStart = false

    },
    confirmTimeEnd(e) {
      console.log(e, 'confirmTimeEnd')
      this.timeEnd = false
    },
  },


}

</script>

<style scoped>
.visit-time{
  display: flex;
  gap: 20px;

}
.visit-time >>> .u-form-item{
  flex: 1;
}
</style>
