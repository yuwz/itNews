<template>
  <div class="index">
    <div class="head">
      <!-- 头部跳转首页按钮 -->
      <div class="header">
        <van-button
          class="search"
          icon="search"
          to="search"
          block
          color="rgba(255, 255, 255, 0.219)"
          round
          >搜索
        </van-button>
      </div>
      <!-- 导航栏 -->
      <div class="nav">
        <van-tabs v-model="id" @click="getNewsList">
          <van-tab
            v-for="(item, index) in myNavList"
            :title="item.name"
            :key="index"
            :name="item.id"
          >
          </van-tab>
        </van-tabs>
        <!-- 右边按钮 -->
        <van-icon
          class="nav-icon"
          @click.native="show = true"
          name="bars"
        ></van-icon>
      </div>
    </div>
    <!-- 文章列表 -->
    <div class="content">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <transition-group name="xxx">
            <indexArticle
              :nav_id="id"
              @nohobby="nohobby"
              @juBao="jubao"
              :id="item.art_id"
              :author_id="item.aut_id"
              :title="item.title"
              :data="item.pubdate"
              :comment="item.comm_count"
              :imgArr="item.cover.images"
              :author="item.aut_name"
              :key="index + 1"
              :istop="item.is_top"
              :type="item.cover.type"
              v-for="(item, index) in articleList"
            ></indexArticle>
          </transition-group>
        </van-list>
      </van-pull-refresh>
    </div>

    <!-- 右上角弹出框 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '80%' }"
      ><van-cell center title="我的频道"
        ><template #default>
          <div class="edit" @click="edit" v-if="!tag">编辑</div>
          <div class="edit" @click="editSubmit" v-else>完成</div>
        </template></van-cell
      >
      <div class="navList">
        <div v-for="(item, index) in myNavList" :key="index">
          <transition name="xxx">
            <van-tag
              color="#f4f5f6"
              :class="{ active: item.id === id }"
              text-color="black"
              :closeable="tag && index != 0"
              class="navList-item"
              @close="closeTag(item, index)"
            >
              <template #default>
                <div class="list-txt" @click="toggleNav(item, index)">
                  {{ item.name }}
                </div>
              </template>
            </van-tag>
          </transition>
        </div>
        <div class="none"></div>
        <div class="none"></div>
        <div class="none"></div>
        <div class="none"></div>
        <div class="none"></div>
        <div class="none"></div>
      </div>
      <van-cell title="频道推荐"></van-cell>
      <div class="navList">
        <div v-for="(item, index) in allNavList" :key="index + 1">
          <transition name="xxx">
            <van-tag color="#f4f5f6" text-color="black" class="navList-item">
              <template #default>
                <div class="list-txt">
                  <van-icon
                    @click="addTag(item, index)"
                    v-if="tag"
                    class="navList-icon"
                    name="plus"
                  />
                  {{ item.name }}
                </div>
              </template>
            </van-tag>
          </transition>
        </div>
        <div class="none"></div>
        <div class="none"></div>
        <div class="none"></div>
        <div class="none"></div>
        <div class="none"></div>
        <div class="none"></div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import indexArticle from './indexArticle'
import {
  apiGetAllChannel,
  apiGetChannelsList,
  apiUpdateChannel
} from '@/api/channel.js'
import { apiGetArticle } from '../../../api/article'
export default {
  name: 'index',
  components: {
    indexArticle
  },
  data () {
    return {
      blackList: [], // 文章 黑名单
      // authorBlackList: [], //作者 黑名单
      loading: false,
      isLoading: false,
      finished: false,
      navTab: '',
      // 频道id
      id: 0,
      vai: [],
      page: 0,
      articleList: [],
      tag: false,
      myNavList: [],
      allNavList: [],
      // 弹出列表
      show: false
    }
  },

  async created () {
    // 获取我的频道
    // this.id = 0

    console.log(this.id)
    console.log('this.$route.query.num', this.$route)
    this.id = +this.$route.query.num
    this.navTab = this.id

    const res = await apiGetChannelsList()
    this.myNavList = res.data.data.channels
    // this.id = this.myNavList[0].id

    console.log('进来频道的id', this.id)

    console.log('我是我的频道', this.myNavList)
    // 获取所有频道
    const res2 = await apiGetAllChannel()
    // console.log(res.data.data.channels)
    this.allNavList = res2.data.data.channels
    console.log(this.allNavList)
    // 全部频道减去我的频道
    this.allNavList.forEach((item, index) => {
      this.myNavList.forEach((item2, index2) => {
        if (item.id === item2.id) {
          // 去掉该频道
          item.del = true
          // this.allNavList.splice(index, 1)
        }
      })
    })
    this.allNavList = this.allNavList.filter((item, index) => {
      return !item.del
    })

    // 获取推荐文章列表
    this.getList()
  },
  methods: {
    // 弹框切换频道
    toggleNav (item, index) {
      this.navTab = item.id
      this.id = item.id
      //
      this.articleList = []
      this.getList()
    },
    // 不感兴趣
    nohobby (val) {
      console.log('哈哈哈', val)
      // 添加到黑名单
      this.blackList.push(val)
      // 刷新

      this.getList()
    },
    // 举报
    jubao (val) {
      console.log('哈哈哈', val)
      // 添加到黑名单
      this.blackList.push(val)
      // 刷新

      this.getList()
    },
    // 完成频道编辑按钮
    async editSubmit () {
      this.tag = !this.tag
      // 提交编辑后的myNavList
      console.log('修改用户频道', this.myNavList)

      const _temp = JSON.parse(JSON.stringify(this.myNavList))
      _temp.forEach((item, index) => {
        item.seq = index + 1
      })
      _temp.splice(0, 1)
      console.log('temp', _temp)
      await apiUpdateChannel(_temp)
      // console.log(res)
    },
    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        // 清空文章数组
        this.articleList = []
        this.getList()
        this.$toast.success('刷新成功')
        this.isLoading = false
      }, 1000)
    },

    onLoad () {
      this.getList()
    },
    // 获取文章列表
    async getList () {
      console.log('哈哈', this.id)
      const res3 = await apiGetArticle(this.id)
      this.articleList.push(...res3.data.data.results)
      if (this.blackList.length) {
        // 黑名单有长度
        // 去掉黑名单中的文章
        console.log('前', this.articleList)
        this.articleList.forEach((item, index) => {
          this.blackList.forEach((item2, index2) => {
            if (item2 === item.art_id) {
              // 删除该文章
              this.articleList.splice(index, 1)
              index--
            }
          })
        })
        this.blackList.forEach((item, index) => {
          this.articleList.forEach((item2, index2) => {
            if (item === item2.art_id) {
              // 删除该文章
              this.articleList.splice(index2, 1)
              index--
            }
          })
        })
        console.log(this.blackList)
        console.log('后', this.articleList)
        // for (let i = 0; i < articleList.length; i++) {
        //   console.log(arr[i])

        // }
      }
      console.log('我是文章列表', res3)
      this.loading = false
      if (this.articleList.length >= 80) {
        this.finished = true
      }
    },

    // 点击频道获取文章列表
    async getNewsList (name, title) {
      // 先清空文章数组
      this.articleList = []
      console.log('我被点了')

      console.log(name, title)
      this.id = name
      this.getList()
    },
    // 添加频道
    addTag (item, index) {
      console.log('我是添加')
      const res = this.allNavList.splice(index, 1) //
      // 在我的频道新增
      this.myNavList.push(res[0])
    },
    // 删除频道 关闭标签事件
    closeTag (item, index) {
      console.log('我是关闭标签事件')
      if (index === 0) {
        return
      }
      const res = this.myNavList.splice(index, 1) // 删除该频道
      console.log(res)
      // 在全部频道新增该频道
      this.allNavList.push(res[0])
    },
    // 频道编辑按钮
    edit () {
      this.tag = !this.tag

      if (this.tag) {
        // 进入编辑状态
        // 按钮变成完成
      }
    }
  }
}
</script>
<style lang="less" scoped>
// transition
.xxx-enter-active {
  transition: all 1s;
}
.xxx-leave-active {
  transition: all 1s;
}
.xxx-enter {
  opacity: 0;
}
.xxx-leave-to {
  opacity: 0;
}
.index {
  .active {
    color: red !important;
  }
  padding-top: 110px;
  .head {
    position: fixed;
    z-index: 999;
    top: 0;
    width: 100%;
  }
  .list-txt {
    text-align: center;
    flex: 1;
  }
  .none {
    width: 83px;
  }
  .navList {
    padding: 0 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .navList-icon {
      font-size: 12px;
      display: inline-block;
    }
    .navList-item {
      text-align: center !important;
      height: 43px;
      width: 75px;
      margin-bottom: 10px;
      // flex: 1;
    }
  }

  .header {
    background-color: #2e97fa;
    padding: 10px 56px 6px 41px;
    .search {
      font-size: 14px;
      font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
      font-weight: 400;
    }
  }
  .nav {
    padding-right: 30px;
    position: relative;
    .nav-icon {
      position: absolute;
      right: 0;
      top: 0;
      background-color: rgb(119, 184, 245);
      // opacity: 0.8;
      height: 100%;
      width: 40px;
      text-align: center;
      line-height: 41px;
    }
  }
  .content {
    padding: 0 12px;
  }
  .edit {
    font-size: 12px;
    border-radius: 18px;
    border: 1px solid red;
    padding: 0 14px;
    color: red;
    display: inline-block;
  }
}
</style>
