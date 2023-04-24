<template>
  <div class="txCell">
    <van-cell center>
      <template #title>
        <span>{{ title }}</span>
      </template>
      <template #right-icon>
        <van-switch :value="checked" v-if="title=='每日推荐'" @input="onInput" />
        <van-switch :value="checked" v-if="title=='允许将我推荐给好友'" @input="ontuijian" />
        <van-switch :value="checked" v-if="title=='允许给我推荐可能认识的人'" @input="onrenshi" />
        <van-switch :value="checked" v-if="title=='分享页显示我的头像'" @input="ontouxiang" />
        <van-button round v-if="title=='本地缓存'" @click="qingchu1" >{{value}}</van-button>
      </template>
    </van-cell>

  </div>
</template>

<script>
import { localDel } from '@/utils/mylocal'
export default {
  props: ['title', 'value'],
  data () {
    return {
      tuichecked: true,
      checked: true
    }
  },
  methods: {
    onInput (checked) {
      if (!checked) {
        this.$dialog
          .confirm({
            title: '提醒',
            message: '是否关闭每日推荐？'
          })
          .then(() => {
            this.checked = checked
          })
      } else {
        this.$dialog
          .confirm({
            title: '提醒',
            message: '是否开启每日推荐？'
          })
          .then(() => {
            this.checked = checked
          })
      }
    },
    ontuijian (checked) {
      if (!checked) {
        this.$dialog
          .confirm({
            title: '提醒',
            message: '是否关闭推荐好友？'
          })
          .then(() => {
            this.checked = checked
          })
      } else {
        this.$dialog
          .confirm({
            title: '提醒',
            message: '是否开启推荐好友？'
          })
          .then(() => {
            this.checked = checked
          })
      }
    },
    onrenshi (checked) {
      if (!checked) {
        this.$dialog
          .confirm({
            title: '提醒',
            message: '是否关闭推荐给认识的人？'
          })
          .then(() => {
            this.checked = checked
          })
      } else {
        this.$dialog
          .confirm({
            title: '提醒',
            message: '是否开启推荐给认识的人？'
          })
          .then(() => {
            this.checked = checked
          })
      }
    },
    ontouxiang (checked) {
      if (!checked) {
        this.$dialog
          .confirm({
            title: '提醒',
            message: '是否关闭分享页头像展示？'
          })
          .then(() => {
            this.checked = checked
          })
      } else {
        this.$dialog
          .confirm({
            title: '提醒',
            message: '是否开启分享页头像展示？'
          })
          .then(() => {
            this.checked = checked
          })
      }
    },
    qingchu1 () {
      this.$dialog
        .confirm({
          title: '提醒',
          message: '是否清除？'
        })
        .then(() => {
          localDel(['suoyin'])
          localDel(['history'])
        })
    }
  }
}
</script>

<style lang="less" scoped>
.txCell{
}
</style>
