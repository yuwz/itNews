<template>
  <div class="search">
    <van-nav-bar right-text="取消" @click-right="onClickRight">
      <template #left>
        <van-field v-model="text" center @input="think" @keydown="keyDown">
          <template #left-icon>
            <van-icon name="search" size="15px" />
          </template>
        </van-field>
      </template>
    </van-nav-bar>
    <div>
      <div v-if="text != ''">
        <van-cell title="联想区域" />
        <van-cell
          v-for="(item, index) in this.options"
          :key="index"
          @click="itemList(item,index)"
        >
          <template #title>
            <span v-html="item"></span>
          </template>
        </van-cell>
      </div>
      <div v-else>
        <van-cell title="历史区域">
          <template>
            <span @click="deteleAll">X</span>
          </template>
        </van-cell>
        <van-cell
          v-for="(item, index) in this.history"
          :key="index"
          @click="itemList(item,index)"
        >
          <template #title>
            <span v-html="item"></span>
          </template>
          <template>
            <span @click.stop="deteleItem(index)">X</span>
          </template>
        </van-cell>
      </div>
    </div>
  </div>
</template>

<script>
import { apiThink } from '@/api/other'
import { localSet, localDel } from '@/utils/mylocal'
export default {
  data () {
    return {
      text: '',
      options: [],
      history: [],
      textOptions: []
    }
  },
  created () {
    this.history = JSON.parse(window.localStorage.getItem('history')) || []
  },
  methods: {
    onClickRight () {
      this.text = ''
      this.options = []
    },
    async think (options) {
      const res = await apiThink(this.text)
      window.console.log(res)
      this.options = res.data.data.options
      this.options.forEach((item, index) => {
        this.textOptions.push(item)
      })
      // console.log(this.textOptions);
      this.options.map((item, index) => {
        window.console.log(this.options[index])
      })
      if (this.text === '') {
        this.options = []
      }
      this.options.map((item, index) => {
        if (this.text.length > 0) {
          const replaceReg = new RegExp(this.text, 'g')
          const replaceString = `<span class="change-color">${this.text}</span>`
          this.options[index] = item.replace(replaceReg, replaceString)
        }
      })
    },
    itemList (item, index) {
      this.$router.push({ path: `/searchResult/${this.textOptions[index]}` })
      this.text = item
      this.history.unshift(this.text)
      this.history = [...new Set(this.history)]
      localSet('history', this.history)
    },
    keyDown (e) {
      e = window.event || e
      if (event.keyCode === 13) {
        this.$router.push({ path: `/searchResult/${this.text}` })
        this.history.unshift(this.text)
        localSet('history', this.history)
      }
    },
    deteleAll () {
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否删除所有数据'
        })
        .then(() => {
          this.history = []
          localDel('history')
        })
    },
    deteleItem (index) {
      this.history.splice(index, 1)
      localSet('history', this.history)
    }
  }
}
</script>

<style lang="less">
.search {
  .van-nav-bar {
    background-color: #2e97fa;
    height: 48px;
  }
  .van-nav-bar__text {
    color: #fff;
  }
  .van-field {
    width: 295px;
    height: 30px;
    background: #f4f5f6;
    border: 1px solid #e8e8e8;
    border-radius: 6px;
  }
  .change-color {
    color: #2e97fa;
  }
}
</style>
