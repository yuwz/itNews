<template>
  <div class="gzfs">
    <comNav
      :title="userList.name"
      left-arrow
    >
      <template #right>
        <van-icon name="ellipsis" size="25" />
      </template>
    </comNav>
    <div class=" top">
      <div class="userInfo">
        <div class="user_left">
          <van-image class="wh62" :src="userList.photo"></van-image>
        </div>
        <div class="user_right">
          <ul>
            <li>
              <p>{{ userList.art_count }}</p>
              <span>发布</span>
            </li>
            <li>
              <p>{{ userList.follow_count }}</p>
              <span>关注</span>
            </li>
            <li>
              <p>{{ userList.fans_count }}</p>
              <span>粉丝</span>
            </li>
            <li>
              <p>{{ userList.like_count }}</p>
              <span>获赞</span>
            </li>
          </ul>
          <van-button class="r8" color="#6bb6ff" type="info">关注</van-button>
        </div>
      </div>
      <div class="rzinfo">
        <div v-if="userList.is_media == 1">
          <p><span>认证：</span>{{ userList.certi }}</p>
        </div>
        <div>
          <p><span>简介：</span>{{ userList.intro }}</p>
        </div>
      </div>
      <van-list
        v-model="loadfa"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ul class="user_list">
          <li>
            <div class="user_list_top">
              <van-image
                class="w37"
                src="https://img.yzcdn.cn/vant/cat.jpeg"
              ></van-image>
              <div class="user_name_list">
                <p>黑马蔡徐坤</p>
                <span>2018-09-08</span>
              </div>
            </div>
            <p class="info_title">阿斯蒂芬哈吉考虑是否</p>
            <ul class="user_list_img">
              <li>
                <van-image src="https://img.yzcdn.cn/vant/cat.jpeg"></van-image>
              </li>
            </ul>
            <div class="bottom-box">
              <div class="comment">
                <van-icon class="f25" name="comment-o" /><i>评论</i>
              </div>

              <div class="good">
                <van-icon class="f25" name="like-o" />
                <i>点赞</i>
              </div>
              <div class="share">
                <van-icon class="f25" name="star-o" /><i>收藏</i>
              </div>
            </div>
          </li>
        </ul>
      </van-list>
    </div>
  </div>
</template>

<script>
import { apiGetUser } from '@/api/use'
import comNav from '@/views/comCell/comNav.vue'
export default {
  data () {
    return {
      finished: true,
      loadfa: false,
      userList: {},
      id: []
    }
  },
  components: {
    comNav
  },
  async created () {
    const res = await apiGetUser()
    this.userList = res.data.data
    // this.id = this.userList.id
    // let res = await userIdArticles({ page: this.page, per_page: this.per_page })
  },
  methods: {
    onLoad () {}
  }
}
</script>

<style lang="less" scoped>
p {
  margin: 0;
}
/deep/.van-image__error {
  border-radius: 50%;
}
.gzfs {
  background-color: #f7f7f7;
  height: 100%;
  /deep/.van-nav-bar {
    background-color: #2d95ff;
  }
  /deep/.van-nav-bar__title {
    color: #fff;
  }
  /deep/.van-nav-bar .van-icon {
    color: #fff;
  }
  .top {
    .userInfo {
      padding: 15px;
      background-color: #fff;

      display: flex;
      justify-content: space-between;
      .user_left {
        flex: 1;
        .wh62 {
          width: 100px;
          height: 100px;
        }
        /deep/ .van-image__img {
          border-radius: 50%;
        }
      }
      .user_right {
        flex: 2;
        text-align: center;
        ul {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          height: 50%;
          li {
            flex: 1;
            p {
              font-size: 18px;
            }
            span {
              font-size: 14px;
              color: #a9a9aa;
            }
          }
        }
      }
      .r8 {
        width: 60%;
        height: 30px;
        border-radius: 8px;
      }
    }
    .rzinfo {
      padding: 15px;
      background-color: #fff;
      margin-top: 5px;
      margin-bottom: 5px;
      p {
        font-size: 14px;
        span {
          font-size: 12px;
          color: #848384;
        }
      }
    }
    .user_list {
      padding: 15px;
      background-color: #fff;
      .user_list_top {
        display: flex;
        justify-content: space-between;
        line-height: 1;
        .w37 {
          width: 37px;
          height: 37px;
          border-radius: 50%;
        }
        /deep/ .van-image__img {
          border-radius: 50%;
        }
        .user_name_list {
          margin-left: 10px;
          flex: 8;
          height: 50%;
          p {
            font-size: 14px;
            text-align: left;
            color: #222222;
            letter-spacing: 1px;
          }
          span {
            font-size: 12px;
            font-family: Arial Regular, Arial Regular-Regular;
            font-weight: 400;
            text-align: left;
            color: #999999;
            letter-spacing: 1px;
          }
        }
      }
      .info_title {
        margin-top: 5px;
        margin-bottom: 5px;
        font-size: 15px;
        font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
        font-weight: 400;
        text-align: left;
        color: #3a3a3a;
        letter-spacing: 2px;
      }
      .user_list_img {
        display: flex;
        justify-content: space-between;
        li {
          flex: 1;
        }
      }
    }
    .bottom-box {
      display: flex;
      justify-content: space-between;
      text-align: center;
      div {
        width: 100%;
        height: 100%;
      }
      .f25 {
        font-size: 25px;
        margin-right: 9px;
      }
      i {
        vertical-align: middle;
        font-size: 14px;
      }
      .good {
        text-align: center;
      }
      .share {
      }
      .red {
        color: red;
      }
    }
  }
}
</style>
