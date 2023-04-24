<template>
  <div class="reply" v-if="currentItem.com_id">
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '70%' }"
      @close="close"
    >
      <van-cell title="当前评论"></van-cell>
      <comment :info="currentItem" :isReply="true"></comment>
      <!-- 回复评论 -->
      <van-cell title="评论回复"></van-cell>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- isReply 判断是新增评论还是回复评论 新增isReply===false -->
        <comment
          v-for="(item, index) in replyList"
          :key="index"
          :info="item"
          :isReply="true"
        ></comment
      ></van-list>
      <write
        v-if="currentItem.com_id"
        @addwrite="addwrite"
        :comId="currentItem.com_id.toString()"
        :isReply="true"
      ></write>
    </van-popup>
  </div>
</template>

<script>
import comment from './comment'
import write from './write'
import bus from '@/utils/bus' // 获取传入的评论数据
import { apiGetCommentReply, apiGetComment } from '@/api/comment.js'
export default {
  components: {
    comment,
    write
  },
  data () {
    return {
      show: false, // 控制显示
      currentItem: {}, // 当前评论
      replyList: [], // 回复列表
      loading: false, // list加载状态
      finished: false,
      offset: null, // 评论数据的偏移量 不传为从第一页开始读取数据
      limit: 10, // 获取评论的个数
      endId: null // 评论或回复的最后一个id
    }
  },
  methods: {
    // 新增评论 从子组件中获取新增信息
    addwrite (newObj) {
      this.replyList = newObj
      this.$toast.success('添加成功')
    },
    // 下拉加载更多
    async onLoad () {
      const res = await apiGetCommentReply({
        commid: this.currentItem.com_id.toString(),
        offset: this.offset,
        limit: this.limit
      })
      console.log('文章评论', res)
      this.replyList.push(...res.data.data.results.reverse()) // 先回复的在前面，需翻转
      this.offset = res.data.data.last_id
      this.endId = res.data.data.end_id
      // 加载停止
      this.loading = false
      // 判断结束
      if (this.offset === this.endId) {
        this.finished = true
      }
    },
    // 关闭时重新获取评论列表
    async close () {
      // 刷新  重新获取评论列表
      const res = await apiGetComment({
        artid: this.$route.params.artid
      })
      //   console.log('文章评论2', res.data.data.results)
      const newObj = res.data.data.results
      this.$emit('addReply', newObj) // 调用父组件方法刷新页面
      this.value = ''
    }
  },
  //   获取当前评论数据
  created () {
    bus.$on('getInfo', info => {
      // 清空之前的数据
      this.loading = false
      this.finished = false
      this.offset = null
      this.enid = 0
      this.replyList = []
      this.currentItem = info
      console.log('获取当前评论数据', this.currentItem)
    })
  }
}
</script>

<style></style>
