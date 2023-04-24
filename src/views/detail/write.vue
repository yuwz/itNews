<template>
  <div class="write">
    <van-search
      v-model="value"
      placeholder="写评论"
      shape="round"
      left-icon="none"
      background="#fff"
      show-action
      @search="onSearch"
    >
      <template #action>
        <van-button @click="onSearch(value)" class="myBtn" type="primary"
          >发送</van-button
        >
      </template>
    </van-search>
  </div>
</template>

<script>
import {
  apiGetComment,
  apiAddComment,
  apiAddCommentReply,
  apiGetCommentReply
} from '@/api/comment'
export default {
  props: {
    isReply: {
      type: Boolean
    },
    comId: {
      type: String
    }
  },
  data () {
    return {
      value: ''
    }
  },
  methods: {
    async onSearch (value) {
      // 新增文章时isReply为false,回复时
      if (this.isReply === false) {
        //  发表评论
        const res = await apiAddComment({
          artid: this.$route.params.artid,
          content: value
        })
        console.log('发表评论', res) // 新接口无返回的内容，无法添加至父组件，只能刷新获取数据
        // 刷新  重新获取评论列表
        const res2 = await apiGetComment({
          artid: this.$route.params.artid
        })
        //   console.log('文章评论2', res2.data.data.results)
        const newObj = res2.data.data.results
        this.$emit('addwrite', newObj) // 调用父组件方法刷新页面
        this.value = ''
      } else {
        const res = await apiAddCommentReply({
          commid: this.comId, // 评论目标的id
          artid: this.$route.params.artid,
          content: value
        })
        console.log('回复评论', res)
        // 刷新  重新获取回复评论列表
        const res2 = await apiGetCommentReply({
          commid: this.comId
        })
        //   console.log('文章评论2', res2.data.data.results)
        const newObj = res2.data.data.results.reverse() // 先回复的在前面，需翻转
        this.$emit('addwrite', newObj) // 调用父组件方法刷新页面
        this.value = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.write {
  /deep/ .van-search__content {
    background-color: #fff;
    border: 1px solid #e6e6e6;
  }
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  .myBtn {
    height: 36px;
  }
}
</style>
