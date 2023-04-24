<template>
  <div class="comNav">
    <van-nav-bar
      fixed
      placeholder
      class="top-nav"
      left-arrow
      @click-left="onClickLeft"
    >
      <template #title>
        <div>{{ title }}</div>
      </template>
      <template #right>
        <div class="right">
          <van-icon v-if="title == '文章详情页'" name="ellipsis" />
        </div>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  props: ['title', 'right'],
  data () {
    return {}
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-nav-bar {
  background-color: #2e97fa;
  z-index: 9999;
}
/deep/.van-nav-bar__title {
  color: #fff;
}
</style>
