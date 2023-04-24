<template>
  <div class="searchResult">
    <comNav
      class="top-nav"
      title="搜索结果"
      left-arrow
    >
    </comNav>
    <van-list
      v-model="loadfa"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="resContext">
        <ul class="searchList">
          <li v-for="(item, index) in searchData" :key="index" @click="tiaoXq(item.art_id)">
            <p
              class="searchList-title"
              v-html="item.title"
            >
              <!-- {{ item.title }} -->
            </p>

            <ul class="cover" v-if="item.cover.type !== 0">
              <li v-for="(item2, index2) in item.cover.images" :key="index2">
                <van-image width="85" height="85" :src="item2"></van-image>
              </li>
            </ul>

            <div class="xinxi-box">
              <span class="author">{{ item.aut_name }}</span>
              <span class="com">{{ item.comm_count }}评论</span
              ><span class="toTime">{{ item.pubdate | fromtime }}</span>
            </div>
            <div class="bottom-box">
              <div class="comment">
                <van-icon class="f25" name="comment-o" /><i>{{
                  item.comm_count
                }}</i>
              </div>
              <!-- :class="{ red: item.like_count ==1}" -->
              <div
                 class="good"
                 @click="qudzan(item)"
                 v-if="item.like_count === 1"
                  >
                    <van-icon class="f25 red" name="like-o" /><i>点赞</i>
                  </div>
                  <div class="good" @click="dzan(item)" v-else>
                    <van-icon class="f25" name="like-o" /><i>点赞</i>
                  </div>
              <div class="share">
                <van-icon class="f25" name="share-o" /><i>分享</i>
              </div>
            </div>
            <van-divider />
          </li>
        </ul>
      </div>
    </van-list>
  </div>
</template>

<script>
import { apiGetSearch } from '@/api/other'
import comNav from '@/views/comCell/comNav.vue'
export default {
  data () {
    return {
      colorRed: false,
      finished: false,
      loadfa: false,
      searchData: [],
      // 总文章数
      total: 0,
      // 点赞
      dianzan: false,
      // form: {
      page: 1,
      perpage: 10,
      q: '',
      wenzData: {}
      // }
    }
  },
  components: {
    comNav
  },
  async created () {
    this.q = this.$route.params.key
    console.log('q', this.q)
  },
  methods: {
    onClickLeft () {},
    async onLoad () {
      const res = await apiGetSearch({
        page: this.page,
        perpage: (this.page - 1) * this.perpage || 10,
        q: this.q
      })
      console.log(res)
      this.page++
      // 文章总数量
      this.total = res.data.data.total_count
      this.searchData.push(...res.data.data.results)
      console.log('searchData', this.searchData)
      this.searchData.forEach(item => {
        const str = item.title.split(this.q)
        item.title = str.join(`<span style="color:red;">${this.q}</span>`)
        // .join(`<span style="color:red;">${this.q}</span>`)

        // item.title.join(`<span style="color:red;">${this.q}</span>`)
      })
      // console.log('高亮后', this.searchData)
      this.loadfa = false
      if (this.searchData.length >= this.total) {
        this.finished = true
      }
    },
    async tiaoXq (id) {
      this.$router.push({ path: `/detail/${id}` })
    }

  }
}
</script>

<style lang="less" scoped>
.searchResult {
  // .top-nav {
  //   position: fixed;
  //   width: 100%;
  //   top: 0;

  //   background-color: #3296fa;
  // }
  /deep/.van-nav-bar .van-icon {
    color: #fff;
    font-size: 24px;
  }
  /deep/.van-nav-bar__title {
    color: #fff;
    font-size: 20px;
  }
  .resContext {
    padding: 15px;
    .searchList-title {
      font-size: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .cover {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      li {
        width: 85px;
        height: 85px;
        img {
          width: 100%;
          height: 100%;
          background-size: 100%;
        }
      }
    }
    .xinxi-box {
      color: #949494;
      font-size: 12px;
      margin-bottom: 11px;
      .com {
        margin: 0 14px;
      }
    }
    .bottom-box {
      display: flex;
      justify-content: space-between;
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
        text-align: right;
      }
    }
  }
  .red {
    color: red;
  }
}
</style>
