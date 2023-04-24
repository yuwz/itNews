<template>
  <div>
    <!-- 评论部分 -->
    <van-cell>
      <div class="comment">
        <!-- 图片加载失败处理 -->
        <van-image round class="img" :src="info.aut_photo">
          <template v-slot:error
            ><img src="@/assets/imgFail.gif" alt=""
          /></template>
        </van-image>
        <div class="content">
          <div class="authorName">{{ info.aut_name }}</div>
          <div class="txt">
            {{ info.content }}
          </div>
          <div class="bottom">
            <span class="time">{{ info.pubdate | fromtime }}</span>
            <span class="reply" @click="openReply" v-if="isReply === false"
              >回复{{ info.reply_count }}</span
            >
          </div>
        </div>
        <div class="lick">
          <van-icon
            name="good-job-o"
            class="myIcon red"
            v-if="info.like_count > 0 && info.is_liking == true"
            @click="diszan(info)"
            >{{ info.like_count }}</van-icon
          >
          <van-icon
            name="good-job-o"
            class="myIcon"
            v-else
            @click="dianz(info)"
            >{{ info.like_count }}</van-icon
          >
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
// 给回复评论组件转入评论信息
import bus from '@/utils/bus.js'
import { apiCommentZan, apiDisCommentZan } from '@/api/comment.js'
export default {
  props: {
    info: {
      type: Object
    },
    isReply: {
      type: Boolean // 从回复点进来时隐藏点击
    }
  },
  methods: {
    openReply () {
      this.$parent.$parent.$refs.reply.show = true
      bus.$emit('getInfo', this.info)
    },
    // 评论或回复点赞
    async dianz (info) {
      this.$toast.success('点赞评论成功')
      info.is_liking = true
      info.like_count++
      const res = await apiCommentZan(info.com_id)
      console.log('评论点赞', res)
    },
    // 取消评论或回复点赞
    async diszan (info) {
      if (info.is_liking === true) {
        this.$toast.success('取消点赞评论')
        info.is_liking = false
        info.like_count--
        const res = await apiDisCommentZan(info.com_id)
        console.log('取消评论点赞', res)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.comment {
  display: flex;
  .img {
    width: 30px;
    height: 30px;
    margin-right: 6px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .content {
    flex: 1;
    .authorName {
      color: #839cbd;
      font-weight: 600;
      font-size: 12px;
    }
    .txt {
      word-break: break-all; // 解决数字不能自动换行
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      color: #323233;
      font-size: 14px;
      margin: 6px 0;
    }
  }
  .bottom {
    .time {
      margin-right: 10px;
    }
    .reply {
      background-color: #f4f5f6;
      padding: 4px 8px;
      border-radius: 10px;
    }
  }
  .red {
    color: red;
  }
}
</style>
