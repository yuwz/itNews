<template>
  <van-cell is-link>
    <template #title>
      <span>{{ title }}</span>
    </template>
    <template>
      <div v-if="title == '头像'">
        <van-image class="touxaing" :src="value"></van-image>
      </div>
      <div v-else-if="title == '昵称'">
        <span>{{ value }}</span>
      </div>
      <div v-else-if="title == '介绍'">
        <span>{{ value }}</span>
      </div>
      <div v-else-if="title == '性别'">
        <span v-if="value == 0">男</span>
        <span v-else>女</span>
      </div>
      <div v-else-if="title == '生日'">
        <span class="blue" v-if="value == ''">待完善</span>
        <span v-else>{{ value }}</span>
      </div>
      <div v-else-if="title == '地区'">
        <span class="blue">{{ value }}</span>
      </div>
    </template>
  </van-cell>
</template>

<script>
export default {
  props: ['title', 'value'],
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.touxaing {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.blue {
  color: #3296fa;
}
</style>
