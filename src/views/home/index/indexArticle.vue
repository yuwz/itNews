<template>
  <div class="index-article">
    <div class="content">
      <div class="title" @click="toDetail">
        {{ title }}
      </div>
      <!-- 图片 -->
      <div class="pt1" v-if="type === 1" @click="toDetail">
        <img v-for="(item, index) in imgArr" :key="index" :src="item" alt="" />
      </div>
    </div>
    <div v-if="type >= 2" class="pt3" @click="toDetail">
      <img v-for="(item, index) in imgArr" :key="index" :src="item" alt="" />
    </div>
    <div class="bottom">
      <div class="b1" v-if="istop == 1">置顶</div>
      <div class="b2">{{ author }}</div>
      <div class="b3">{{ comment }}评论</div>
      <div class="b4">{{ data | fromtime }}</div>
      <div
        class="b5"
        @click="
          show = true
          showP1 = true
        "
      >
        <van-icon name="cross"></van-icon>
      </div>
    </div>
    <!-- 弹出层 -->
    <van-popup v-model="show" round>
      <div class="pop" v-if="showP1">
        <div class="pop1">
          <van-cell center @click="noHobby">
            <template #title
              ><van-icon class="pop-icon" name="bill-o"></van-icon
              >不感兴趣</template
            >
          </van-cell>
        </div>
        <div class="pop2">
          <van-cell is-link center @click="feedback">
            <template #title
              ><van-icon class="pop-icon" name="warn-o"></van-icon
              >反馈垃圾内容</template
            >
          </van-cell>
        </div>
        <div class="pop3">
          <van-cell @click="black" center>
            <template #title
              ><van-icon class="pop-icon" name="delete"></van-icon
              >拉黑作者</template
            >
          </van-cell>
        </div>
      </div>
      <div class="popTwo" v-if="showP2">
        <van-nav-bar @click.native="back">
          <template #left>
            <van-icon @ class="popTwo-left" name="arrow-left" />
          </template>
        </van-nav-bar>
        <van-cell
          @click="jubao(id, item.type)"
          v-for="(item, index) in jubaoArr"
          :key="index"
          >{{ item.name }}</van-cell
        >
      </div>
    </van-popup>
  </div>
</template>

<script>
import {
  apiDislike,
  apiReportArticle,
  apiBlackAuthor
} from '../../../api/article'
export default {
  name: 'indexArticle',
  props: [
    'nav_id', // 该文章所属频道
    'author_id', // 作者id
    'id', // 文章id
    'title', // 标题
    'data', // 上传日期
    'comment', // 评论数
    'imgArr', // 图片数组
    'author', // 作者
    'type', // 图片数量
    'istop' // 是否置顶
  ],
  data () {
    return {
      jubaoArr: [
        { type: 0, name: '其他问题' },
        { type: 1, name: '标题夸张' },
        { type: 2, name: '低俗色情' },
        { type: 3, name: '错别字多' },
        { type: 4, name: '旧闻重复' },
        { type: 5, name: '广告软文' },
        { type: 6, name: '内容不实' },
        { type: 7, name: '涉嫌违法犯罪' },
        { type: 8, name: '侵权' }
      ],
      show: false,
      showP1: false,
      showP2: false
    }
  },
  watch: {
    show (newVal, oldVal) {
      if (!newVal) {
        // 关闭
        this.showP1 = false
        this.showP2 = false
      }
    }
  },
  methods: {
    // 跳转至详情
    toDetail () {
      this.$router.push('/detail/' + this.id + '?num=' + this.nav_id)
    },
    // 举报
    async jubao (id, type) {
      console.log(id, type)
      const res = await apiReportArticle({ artid: id, type: type })
      // 提交到文章黑名单
      this.$emit('juBao', res.data.data.target)
      this.$toast('已经举报')
      this.show = false
      console.log('已经举报', res)
    },
    async noHobby () {
      console.log('不感兴趣')
      console.log(this.id)
      const res = await apiDislike(this.id)
      console.log(res)
      console.log('id', this.id, 'target', res.data.data.target)
      // 提交黑名单
      this.$emit('nohobby', res.data.data.target)
      //
      this.$toast('已屏蔽该文章')
      this.show = false
    },
    feedback () {
      console.log('反馈')
      // 弹出层内容替换
      // 切换到二级弹出层
      this.showP1 = false
      this.showP2 = true
    },
    async black () {
      console.log('拉黑')
      const res = await apiBlackAuthor(this.author_id)
      console.log('我是拉黑', res)
      this.show = false
      this.$toast.success('拉黑成功')
    },
    // 回退一级pop
    back () {
      // 切换到一级弹出层
      this.showP1 = true
      this.showP2 = false
    }
  }
}
</script>

<style lang="less" scoped>
.index-article {
  .content {
    display: flex;
    justify-content: space-between;
  }
  .title {
    margin: 12px 0px 10px;
    font-size: 16px;
    font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
    font-weight: 400;
    text-align: left;
    color: #3a3a3a;
    letter-spacing: 1px;
  }
  .pt3 {
    display: flex;
    img {
      height: 75px;
      width: 120px;
      margin: 0 3px;
      overflow: hidden;
    }
  }
  .pt1 {
    img {
      height: 75px;
      width: 120px;
      margin: 0 3px;
      overflow: hidden;
    }
  }
  .bottom {
    display: flex;
    margin: 10px 0 12px;
    .b1 {
      color: #e22829;
    }
    .b1,
    .b2,
    .b3 {
      margin-right: 10px;
    }
    .b4 {
      flex: 1;
    }
    font-size: 12px;
    font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
    font-weight: 400;
    text-align: left;
    color: #bdbdbd;
    letter-spacing: 1px;
  }
  .pop {
    border-radius: 18px;

    .pop-icon {
      margin-right: 5px;
      font-size: 16px;
    }
    width: 320px;
    .pop2 {
      border-top: 2px solid #dedede;
      border-bottom: 2px solid #dedede;
    }
  }
  .popTwo {
    width: 320px;
    .popTwo-left {
      color: black;
    }
  }
}
</style>
