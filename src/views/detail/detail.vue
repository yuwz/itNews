<template>
  <div class="detail" v-if="bol">
    <!-- 顶部栏 -->
    <van-sticky>
      <van-nav-bar class="detailBar" left-arrow @click-left="toIndx">
        <template #title>
          <div class="title">文章详情页</div>
        </template>
        <template #right>
          <div class="right">
            <van-icon name="ellipsis" />
          </div>
        </template>
      </van-nav-bar>
      <!-- <comNav class="detailBar" title="文章详情页" left-arrow>
        <template #right>
          <div class="right">
            <van-icon name="ellipsis" />
          </div>
        </template>
      </comNav> -->
    </van-sticky>

    <!-- 标题 -->
    <h4>
      {{ detail.title }}
    </h4>
    <!-- 用户信息 -->
    <van-sticky :offset-top="55">
      <van-cell class="myCell">
        <template #title>
          <div class="author">
            <!-- 图片加载失败处理 -->
            <van-image round class="img" :src="detail.aut_photo">
              <template v-slot:error
                ><img src="@/assets/imgFail.gif" alt=""
              /></template>
            </van-image>
            <div class="name">
              <div class="authorName">{{ detail.aut_name }}</div>
              <div class="time">{{ detail.pubdate | fromtime }}</div>
            </div>
            <div class="btn">
              <van-button
                class="myBtn"
                type="info"
                round
                @click="follow"
                v-if="detail.is_followed === false"
                ><van-icon name="plus" class="myIcon" />关注</van-button
              >
              <van-button
                class="myBtn"
                type="info"
                round
                v-else
                @click="unFollow"
                ><van-icon name="plus" class="myIcon" />已关注</van-button
              >
            </div>
          </div>
        </template>
      </van-cell>
    </van-sticky>
    <!-- 文章 -->
    <van-cell>
      <template #title>
        <div class="content" v-html="detail.content"></div>
      </template>
    </van-cell>
    <!-- 点赞/不喜欢 -->
    <div class="btnCheck">
      <div class="left">
        <van-button
          plain
          round
          color="red"
          @click="diszan"
          v-if="detail.attitude == 1"
          ><van-icon name="good-job-o" class="myIcon" />点赞</van-button
        >
        <van-button plain round v-else @click="zan"
          ><van-icon name="good-job-o" class="myIcon" />点赞</van-button
        >
      </div>
      <div class="right">
        <van-button
          plain
          round
          color="red"
          v-if="detail.attitude == 0"
          @click="like"
          ><van-icon name="delete" class="myIcon" />不喜欢</van-button
        >
        <van-button plain round v-else @click="diLike"
          ><van-icon name="delete" class="myIcon" />不喜欢</van-button
        >
      </div>
    </div>
    <!-- 评论部分 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- isReply 判断是新增评论还是回复评论 新增isReply===false -->
      <comment
        v-for="(item, index) in commentList"
        :isReply="false"
        :key="index"
        :info="item"
      ></comment
    ></van-list>
    <!-- 新增评论框 -->
    <write @addwrite="addwrite" :isReply="false" comId=""></write>
    <!-- 回复框 -->
    <reply @addReply="addReply" ref="reply"></reply>
  </div>
</template>

<script>
// 导入评论
import comment from './comment'
// 导入评论框
import write from './write'
// 导入回复框
import reply from './reply'

// 获取详细文章数据
import {
  apiGetDetail,
  apiZan,
  apiDiszan,
  apiDislike,
  apiNoDislike
} from '@/api/article.js'
// 关注/取消关注
import { apiFollow, apiUnFollow } from '@/api/use.js'
// 获取评论
import { apiGetComment } from '@/api/comment.js'
export default {
  name: 'detail',
  components: {
    comment,
    write,
    reply
  },
  data () {
    return {
      artid: this.$route.params.artid, // 获取动态路由传入的id
      detail: {}, // 储存文章信息
      loading: false, // list加载状态
      finished: false,
      offset: null, // 评论数据的偏移量 不传为从第一页开始读取数据
      limit: 10, // 获取评论的个数
      commentList: [], // 储存评论
      endId: null, // 评论或回复的最后一个id
      bol: true // 静默刷新初始值
    }
  },
  methods: {
    // 跳转至首页
    toIndx () {
      if (this.$route.query.num) {
        this.$router.push('/index?num=' + this.$route.query.num)
      } else {
        this.$router.back()
      }
    },
    // 下拉加载更多
    async onLoad () {
      const res = await apiGetComment({
        artid: this.artid,
        offset: this.offset,
        limit: this.limit
      })
      console.log('文章评论', res)
      this.commentList.push(...res.data.data.results)
      this.offset = res.data.data.last_id
      this.endId = res.data.data.end_id
      // 加载停止
      this.loading = false
      // 判断结束
      if (this.offset === this.endId) {
        console.log('评论数', this.commentList.length)
        this.finished = true
      }
      // if (this.commentList.length >= res.data.data.total_count) {
      //   console.log('评论数', this.commentList.length)
      //   this.finished = true
      // }
    },
    // 获取文章信息
    async getDetail () {
      const res = await apiGetDetail(this.artid)
      console.log('根据id获取的文章信息', res)
      this.detail = res.data.data
    },
    // 关注
    async follow () {
      // 获取用户id
      const autid = this.detail.aut_id
      // console.log(this.detail.aut_id)
      this.$toast.success('关注成功')
      this.detail.is_followed = true
      const res = await apiFollow(autid)
      console.log('关注', res)
    },
    // 取消关注
    async unFollow () {
      // 获取用户id
      const autid = this.detail.aut_id
      this.$toast.fail('取消关注')
      this.detail.is_followed = false
      const res = await apiUnFollow(autid)
      console.log('取消关注', res)
    },
    // 取消点赞
    async diszan () {
      this.$toast.fail('取消点赞')
      this.detail.attitude = -1
      const res = await apiDiszan(this.artid)
      console.log('取消点赞', res)
    },
    // 点赞
    async zan () {
      this.$toast.success('点赞成功')
      this.detail.attitude = 1
      const res = await apiZan(this.artid)
      console.log('点赞', res)
    },
    // 不喜欢文章
    async diLike () {
      this.$toast.success('不喜欢文章')
      this.detail.attitude = 0
      const res = await apiDislike(this.artid)
      console.log('不喜欢', res)
    },
    // 取消不喜欢文章
    async like () {
      this.$toast.fail('取消不喜欢')
      this.detail.attitude = -1
      const res = await apiNoDislike(this.artid)
      console.log('取消不喜欢', res)
    },
    // 新增评论 从子组件中获取新增信息
    async addwrite (newObj) {
      // this.commentList.unshift()
      // location.reload() //刷新页面
      this.commentList = newObj
      this.$toast.success('添加成功')
      // 设置静默刷新
      this.bol = false
      // nextTick()为同步属性完成后再执行
      this.$nextTick(() => {
        this.bol = true
      })
    },
    // 回复评论框关闭时刷新页面
    async addReply (newObj) {
      this.commentList = newObj
    }
  },
  created () {
    this.getDetail()
  }
}
</script>

<style lang="less" scoped>
.detail {
  margin-bottom: 80px;
  .detailBar {
    padding: 0;
    background-color: #3296fa;
    .title {
      font-size: 16px;
      color: #fff;
      font-weight: 600;
    }
    .right {
      margin-top: 10px;
    }
  }

  h4 {
    display: -webkit-box;
    word-break: break-all; //解决数字不能自动换行
    overflow: hidden;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    text-align: center;
    padding: 0px 30px;
    font-size: 20px;
    font-family: Microsoft YaHei Bold, Microsoft YaHei Bold-Bold;
    font-weight: 700;
    text-align: left;
    color: #3a3a3a;
    line-height: 32px;
    letter-spacing: 2px;
  }
  .myCell {
    .author {
      display: flex;
      align-items: center;
      .img {
        width: 40px;
        height: 40px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .name {
        margin-left: 6px;
        flex: 1;
        .authorName {
          color: #3a3a3a;
        }
        .time {
          font-size: 12px;
          color: #b9b9b9;
        }
      }
      .btn {
        .myBtn {
          padding: 0 40px;
        }
      }
    }
  }
  .content {
    font-size: 16px;
    word-break: break-all; //解决数字不能自动换行
  }
  .btnCheck {
    margin: 30px 0;
    display: flex;
    justify-content: center;
    .left,
    .right {
      margin-right: 14px;
      text-align: center;
    }
  }
  .myIcon {
    font-size: 16px;
    margin-right: 6px;
  }
  /deep/ .van-nav-bar .van-icon {
    font-size: 24px;
    color: #fff !important;
  }
}
</style>
