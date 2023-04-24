<template>
  <div class="xt">
    <comNav title="系统设置" left-arrow  />
    <van-cell title="手机号" is-link />
    <van-cell title="修改密码" is-link />
    <van-cell-group title="开启后,我们将推送每日广告"
      ><xtCell center :title="typeObj.tuijian"> </xtCell>
    </van-cell-group>

    <van-cell-group title="开启后,可以让好友找到你">
      <xtCell center :title="typeObj.haoyou"> </xtCell>
    </van-cell-group>
    <van-cell-group title="开启后,可以向你推荐好友">
      <xtCell center :title="typeObj.renshi"> </xtCell>
    </van-cell-group>
    <van-cell-group title="开启后,分享到微信QQ等平台的页面会展示你的头像">
      <xtCell center :title="typeObj.touxiang"> </xtCell>
    </van-cell-group>
    <xtCell class="hauncuna" center :title="typeObj.huancun" value="清除缓存">
    </xtCell>
    <div class="tuichu">
      <van-button class="w50" @click="tuichudenglu" round type="info"
        >退出登录
      </van-button>
    </div>
  </div>
</template>

<script>
import xtCell from './xtCell'
import { localGet, localDel } from '@/utils/mylocal'
import comNav from '@/views/comCell/comNav.vue'
export default {
  components: {
    xtCell, comNav
  },
  data () {
    return {
      tuichecked: true,
      userGet: '',
      typeObj: {
        tuijian: '每日推荐',
        huancun: '本地缓存',
        haoyou: '允许将我推荐给好友',
        renshi: '允许给我推荐可能认识的人',
        touxiang: '分享页显示我的头像'
      }
    }
  },
  created () {},
  methods: {
    onClickLeft () {
      this.$router.push('/my')
    },
    tuichudenglu () {
      if (localGet('token')) {
        this.$dialog
          .confirm({
            title: '提醒',
            message: '是否退出登录？'
          })
          .then(() => {
            localDel('token')
            localDel('suoyin')
            this.$router.push('/login')
          })
      } else {
        this.$dialog
          .confirm({
            title: '提醒',
            message: '你还没登录，是否跳转？'
          })
          .then(() => {
            this.$router.push('/login')
          })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.xt {
  height: 100%;
  background-color: #f5f7f9;
}
/deep/.van-nav-bar {
  background-color: #2e97fa;
  .van-nav-bar__title {
    color: #fff;
  }
}
.tuichu {
  margin-top: 10px;
}
.hauncuna {
  margin-top: 10px;
}
/deep/.van-cell-group__title {
  background-color: #f5f7f9;
}
/deep/.van-nav-bar .van-icon {
  color: #fff !important;
}
/deep/.van-divider {
  margin: 10px 0 10px 0;
}
.tuichu {
  text-align: center;
}
.w50 {
  width: 50%;
}
</style>
