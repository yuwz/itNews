<template>
  <div class="shoucang">
    <comNav title="收藏/历史" left-arrow  />

    <div class="topOptions">
      <van-tabs
        v-model="active"
        name
        color="#29a4fc"
        title-active-color="#29a4fc"
      >
        <van-tab title="我的收藏" :name="1" class="p15">
          <van-list
            v-model="loadfa"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <ul>
              <li v-for="(item, index) in scList" :key="index">
                <div class="box-sc" @click="detailClick(item.art_id)">
                  <div class="top_box">
                    <p class="sc_title">
                      {{ item.title }}
                    </p>
                    <ul class="sc_img" v-if="item.cover.images">
                      <li
                        v-for="(item2, index2) in item.cover.images"
                        :key="index2"
                      >
                        <van-image :src="item2"></van-image>
                      </li>
                    </ul>
                  </div>
                  <div class="zuoze">
                    <span class="mr10">{{ item.aut_name }}</span
                    ><span>{{ item.pubdate | fromtime }}</span>
                  </div>
                </div>
                <div class="bottom-box">
                  <div class="comment">
                    <van-icon class="f25" name="comment-o" /><i>评论</i>
                  </div>
                  <!-- :class="{ red: item.like_count ==1}" -->
                  <div
                    class="good"
                    @click="qudzan(item, index)"
                    v-if="item.is_liking === true"
                  >
                    <van-icon class="f25 red" name="like-o" /><i>点赞</i>
                  </div>
                  <div class="good" @click="dzan(item)" v-else>
                    <van-icon class="f25" name="like-o" /><i>点赞</i>
                  </div>
                  <div class="share">
                    <van-icon class="f25" name="star-o" /><i>收藏</i>
                  </div>
                </div>
                <van-divider />
              </li>
            </ul>
          </van-list>
        </van-tab>
        <van-tab title="我的历史" :name="2" class="p15">
          <van-list
            v-model="loadfa"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <ul>
              <li v-for="(item, index) in lsList" :key="index">
                <div class="box-sc" @click="detailClick(item.art_id)">
                  <div class="top_box">
                    <p class="sc_title">
                      {{ item.title }}
                    </p>
                    <ul class="sc_img" v-if="item.cover.images">
                      <li
                        v-for="(item2, index2) in item.cover.images"
                        :key="index2"
                      >
                        <van-image :src="item2"></van-image>
                      </li>
                    </ul>
                  </div>
                  <div class="zuoze">
                    <span class="mr10">{{ item.aut_name }}</span
                    ><span>{{ item.pubdate | fromtime }}</span>
                  </div>
                </div>
                <div class="bottom-box">
                  <div class="comment">
                    <van-icon class="f25" name="comment-o" /><i>评论</i>
                  </div>
                  <!-- :class="{ red: item.like_count ==1}" -->
                  <div
                    class="good"
                    @click="qudzan(item, index)"
                    v-if="item.is_liking == true"
                  >
                    <van-icon class="f25 red" name="like-o" /><i>点赞</i>
                  </div>
                  <div class="good" @click="dzan(item)" v-else>
                    <van-icon class="f25" name="like-o" />
                    <i>点赞</i>
                  </div>
                  <div class="share">
                    <van-icon class="f25" name="star-o" /><i>收藏</i>
                  </div>
                </div>
                <van-divider />
              </li>
            </ul> </van-list
        ></van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { articleCollections, userHistories } from '@/api/use'
import { apiZan, apiDiszan } from '@/api/article'
import comNav from '@/views/comCell/comNav.vue'
export default {
  data () {
    return {
      finished: false,
      loadfa: false,
      active: 0, // 选中项
      page: 1, // 页码
      per_page: 10, // 页容量
      scList: [], // 收藏数据
      lsList: [], // 历史数据
      sctotal: 0, // 收藏总数
      lstotal: 0 // 历史总数
    }
  },
  components: {
    comNav
  },
  created () {
    this.active = this.$route.query
    this.active = parseInt(this.active.active)
  },
  methods: {
    shoucang () {},
    async onLoad () {
      const res = await articleCollections({
        page: this.page,
        per_page: (this.page - 1) * this.perpage || 10
      })
      const res2 = await userHistories({
        page: this.page,
        per_page: (this.page - 1) * this.perpage || 10
      })
      this.page++
      //   收藏总数
      this.sctotal = res.data.data.total_count
      //   历史总数
      this.lstotal = res2.data.data.total_count
      //   储存收藏数据
      this.scList.push(...res.data.data.results)
      //   储存历史数据
      this.lsList.push(...res2.data.data.results)
      this.loadfa = false
      if (this.scList.length >= this.sctotal) {
        this.finished = true
      }
    },
    // 跳转详情页
    detailClick (id) {
      this.$router.push({ path: `/detail/${id}` })
    },
    async qudzan (item) {
      await apiDiszan(item.art_id)
      item.is_liking = false
      this.onLoad()
    },
    async dzan (item) {
      await apiZan(item.art_id)
      item.is_liking = true
      this.onLoad()
    }
  }
}
</script>

<style lang="less" scoped>
.p15 {
  padding: 15px;
}
.mr10 {
  margin-right: 15px;
}
/deep/.van-divider {
  margin-top: 8px;
  margin-bottom: 5px;
}
/deep/.van-nav-bar__content {
  background-color: #2e97fa;
  .van-nav-bar__title {
    color: #fff;
  }
}
/deep/.van-nav-bar .van-icon {
  color: #fff !important;
}
.top_box {
  .sc_title {
    font-size: 16px;
    font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
    font-weight: 400;
    text-align: left;
    color: #3a3a3a;
    letter-spacing: 2px;
  }
  .sc_img {
    display: flex;
    justify-content: space-between;
    li {
      flex: 1;
    }
  }
  /deep/.van-icon-photo-fail::before {
    margin-left: 25px;
  }
}

.zuoze {
  font-size: 12px;
  font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
  font-weight: 400;
  text-align: left;
  color: #b4b4b4;
  letter-spacing: 1px;
  margin: 10px 0 10px 0;
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
</style>
