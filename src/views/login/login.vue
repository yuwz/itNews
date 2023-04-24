<template>
  <div class="login">
    <van-nav-bar title="登录" id="navBar" />
    <van-form ref="form">
      <van-field
        v-model="form.mobile"
        placeholder="请输入手机号"
        :rules="rules.mobile"
      >
        <template #left-icon>
          <i class="iconfont icon-iphone"></i>
        </template>
      </van-field>
      <van-field
        v-model="form.code"
        placeholder="请输入验证码"
        :rules="rules.code"
      >
        <template #left-icon><i class="iconfont icon-lock"></i>
        </template>
        <template #button>
          <span @click="getcode" v-if="codeNum === 6">获取验证码</span>
          <span @click="getcode" v-else>{{ codeNum }}S后获取验证码</span>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" @click="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { apiLogin } from '@/api/use.js'
import { localSet, localDel } from '@/utils/mylocal.js'
export default {
  data () {
    return {
      codeNum: 6,
      flng: true,
      form: {
        mobile: '13911111199',
        code: '246810'
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'onChange' },
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '请输入正确的电话号码',
            trigger: 'onChange'
          }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'onChange' },
          {
            pattern: /^\d{6}$/,
            message: '验证码为六位数字',
            trigger: 'onChange'
          }
        ]
      }
    }
  },
  methods: {
    getcode () {
      if (this.flng) {
        this.flng = false
        const _interval = setInterval(() => {
          this.codeNum--
          if (this.codeNum <= 0) {
            clearInterval(_interval)
            this.codeNum = 6
            this.flng = true
          }
        }, 1000)
      }
    },
    submit () {
      apiLogin(this.form).then(res => {
        this.$toast.loading('正在登录')
        if (res.status === 201) {
          this.$toast.success('登录成功')
          // 保存token
          localSet('token', res.data.data)
          localDel('suoyin')
          this.$router.push('/home')
        } else {
          this.$toast.fail(res.data.data.message)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  #navBar {
    background: #3296fa;
    /deep/.van-nav-bar__title {
      color: #fff;
    }
  }
}
</style>
