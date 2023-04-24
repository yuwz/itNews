<template>
  <div class="my">
    <!-- <div class="top">
      <div>
        <van-icon name="star-o" />
      </div>
    </div> -->
    <div class="top">
      <div class="top-top">
        <div class="img-top" @click="goInfo">
          <img :src="userInfo.photo" class="img" alt="" />
        </div>
        <div class="middle-top">
          <span class="span-1">{{ userInfo.name }}</span>
          <span class="span-2">申请认证</span>
        </div>
        <div class="right-top">
          <van-icon name="medal-o" />
          <span>今日阅读5分钟</span>
        </div>
      </div>
      <div class="botton-top">
        <div class="list" @click="$router.push('/gzfs')">
          <span class="list-span1">{{ userInfo.art_count }}</span>
          <span class="list-span2">动态</span>
        </div>
        <div class="list">
          <span class="list-span1">{{ userInfo.follow_count }}</span>
          <span class="list-span2">关注</span>
        </div>
        <div class="list">
          <span class="list-span1">{{ userInfo.fans_count }}</span>
          <span class="list-span2">粉丝</span>
        </div>
      </div>
    </div>
    <div class="middle">
      <ul class=" userInfo">
        <li @click="goMyshoucang(1)">
          <van-icon name="like-o" class="icon1" />
          <div>收藏</div>
        </li>
        <li class="two" @click="goMyshoucang(2)">
          <van-icon name="clock-o" class="icon2" />
          <div>历史</div>
        </li>
        <li @click="$router.push('/gzfs')">
          <van-icon name="description" class="icon3" />
          <div>作品</div>
        </li>
      </ul>
    </div>
    <div class="footer">
      <van-cell title="消息通知" is-link />
      <van-cell title="实名认证" is-link style="margin-bottom:5px" />
      <van-cell title="用户反馈" is-link />
      <van-cell title="小智同学" is-link />
      <van-cell title="系统设置" is-link @click.native="$router.push('/xt')" />
    </div>
  </div>
</template>

<script>
import { apiGetUserInfo } from '@/api/use.js'
import { localGet } from '@/utils/mylocal'
export default {
  data () {
    return {
      login: true,
      userInfo: ''
    }
  },
  async created () {
    if (localGet('token')) {
      const res = await apiGetUserInfo()
      window.console.log(res)
      this.userInfo = res.data.data
    } else {
      this.userInfo = ''
    }
  },
  methods: {
    goInfo () {
      this.$router.push('/info')
    },
    goMyshoucang (num) {
      this.$router.push(`/myshoucang?active=${num}`)
    }
  }
}
</script>

<style lang="less" scoped>
.my {
  color: #000;
  .top {
    height: 183px;
    background: #41a0fa;
    overflow: hidden;
    padding-left: 20px;
    .top-top {
      margin-top: 40px;
      display: flex;
      align-items: center;
      .img-top {
        width: 66px;
        height: 66px;
        overflow: hidden;
        border-radius: 50%;
        background-color: #fff;
        .img {
          width: 100%;
        }
      }
      .middle-top {
        display: flex;
        flex-direction: column;
        flex: 1;
        margin: 10px;
        .span-1 {
          font-size: 16px;
          font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
          font-weight: 400;
          text-align: left;
          color: #ffffff;
          letter-spacing: 1px;
        }
        .span-2 {
          width: 62px;
          height: 16px;
          margin-top: 15px;
          font-size: 10px;
          font-family: Microsoft YaHei Bold, Microsoft YaHei Bold-Bold;
          font-weight: 700;
          text-align: left;
          color: #3296fa;
          letter-spacing: 1px;
          background-color: #fff;
          padding-left: 8px;
          border-radius: 8px;
        }
      }
      .right-top {
        width: 98px;
        display: flex;
        align-items: center;
        height: 40px;
        background-color: #3681ca;
        border-radius: 20px 0 0 20px;
        /deep/.van-icon {
          font-size: 30px;
          line-height: 40px;
        }
        span {
          font-size: 12px;
          margin-left: 10px;
          font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
          font-weight: 400;
          text-align: left;
          color: #ffffff;
          letter-spacing: 1px;
        }
      }
    }
    .botton-top {
      display: flex;
      margin-top: 20px;
      .list {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        .list-span2 {
          font-size: 12px;
          font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
          font-weight: 400;
          text-align: left;
          color: #ffffff;
          letter-spacing: 1px;
        }
        .list-span1 {
          font-size: 18px;
          font-family: Arial Regular, Arial Regular-Regular;
          font-weight: 400;
          text-align: left;
          color: #ffffff;
          letter-spacing: 1px;
        }
      }
    }
  }
  .middle {
    .userInfo {
      display: flex;
      margin-bottom: 10px;
      li.two {
        border-left: 1px solid #edeff3;
        border-right: 1px solid #edeff3;
      }
      li {
        flex: 1;
        text-align: center;
        margin-top: 10px;
        div {
          font-size: 14px;
          font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
          font-weight: 400;
          color: #333333;
          letter-spacing: 1px;
        }
        /deep/.van-icon {
          font-size: 23px;
        }
        /deep/.icon1 {
          color: red;
        }
        /deep/.icon2 {
          color: #ff9d1d;
        }
        /deep/.icon3 {
          color: #678eff;
        }
      }
    }
  }
}
</style>
