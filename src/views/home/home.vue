<template>
  <div class="home">
    <!-- 设置路由出口 -->
    <router-view></router-view>
    <van-tabbar
      v-if="$route.meta.needTab"
      route
      placeholder
      active-color="#3399fa"
      inactive-color="#717171"
    >
      <van-tabbar-item to="/index" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/search" icon="search">搜索</van-tabbar-item>
      <van-tabbar-item icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item to="/my" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
}
</style>
