<template>
  <div class="info">
    <van-nav-bar
      title="个人信息"
      left-arrow
      right-text="保存"
      @click-left="$router.push('/my')"
      @click-right="saveInfo"
    >
      <template #left>
        <van-icon
          name="arrow-left
"
          color="#fff"
          size="18"
        />
      </template>
    </van-nav-bar>
    <div class="info-context">
      <div class="top">
        <!-- 头像 -->
        <infoCell
          islink
          :title="typeObj.photo"
          @click.native="txShow = true"
          center
          :value="infoFrom.photo"
        >
        </infoCell>
        <!-- 昵称 -->
        <infoCell
          islink
          :title="typeObj.name"
          @click.native="ncShow = true"
          center
          :value="infoFrom.name"
        >
        </infoCell>
        <!-- 介绍 -->
        <infoCell
          islink
          :title="typeObj.jieshao"
          @click.native="jjShow = true"
          center
          :value="infoFrom.jieshao"
        >
        </infoCell>
      </div>
      <div class="bottom">
        <!-- 性别 -->
        <infoCell
          islink
          :title="typeObj.gender"
          @click.native="showPicker = true"
          center
          :value="infoFrom.gender"
        >
        </infoCell>
        <!-- 生日 -->
        <infoCell
          islink
          :title="typeObj.birthday"
          @click.native="dateShow = true"
          center
          :value="infoFrom.birthday"
        >
        </infoCell>
        <!-- 地区 -->
        <infoCell
          islink
          :title="typeObj.region"
          @click.native="$toast.fail('别点,这个功能我不会')"
          center
          value="待完善"
        >
        </infoCell>
      </div>
    </div>
    <div class="tan">
      <!-- 头像 -->
      <van-popup
        class="showC"
        v-model="txShow"
        round
        position="bottom"
        :style="{ height: '20%' }"
      >
        <div class="op ttt" @click="touxiang">
          <!-- 文件上传 -->
          <van-uploader
            :after-read="afterRead"
            multiple
            :before-read="beforeRead"
            >从相册中选择</van-uploader
          >
        </div>
        <div class="pai ttt" @click="paiClick">拍照</div>
        <div class="quxiao ttt" @click="txShow = false">取消</div>
      </van-popup>
      <!-- 昵称 -->
      <van-dialog
        close-on-click-overlay
        @cancel="ncShow = false"
        @confirm="ncConfirm"
        v-model="ncShow"
        title="修改昵称"
        show-cancel-button
      >
        <van-field v-model="infoFrom.name" required placeholder="请输入昵称" />
      </van-dialog>
      <!-- 简介 -->
      <van-dialog
        close-on-click-overlay
        v-model="jjShow"
        title="修改介绍"
        show-cancel-button
      >
        <van-field
          v-model="infoFrom.jieshao"
          rows="2"
          autosize
          type="textarea"
          maxlength="99"
          placeholder="请输入您的介绍"
          show-word-limit
        />
      </van-dialog>
      <!-- 性别 -->
      <van-popup v-model="showPicker" round position="bottom">
        <van-picker
          show-toolbar
          title="性别"
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="genderConfirm"
          :default-index="infoFrom.gender"
        />
      </van-popup>
      <!-- 生日 -->
      <van-popup v-model="dateShow" round position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
          @confirm="timeConfirm"
          @cancel="dateShow = false"
      /></van-popup>
      <van-image-preview v-model="imgShow" v-if="imgShow" :images="fileList">
        <template #index>
          <div class="uptop">
            <van-button class="cel" @click="imgShow = false">取消</van-button
            ><van-button class="sub" type="primary" @click="sub"
              >确定</van-button
            >
          </div>
        </template>
      </van-image-preview>
    </div>
  </div>
</template>

<script>
// 导入组件
import infoCell from './infoCell'
// import { apiGetProfile } from '@/api/use'
import { apiGetProfile, apiUpdate } from '@/api/use'
// import bus from '../../utils/bus.js'
export default {
  data () {
    return {
      imgShow: false, // 文件预览组件
      fileList: [], // 文件上传存储数组
      // 头像
      txShow: false,
      // 昵称
      ncShow: false,
      // 简介
      jjShow: false,
      showPicker: false,
      dateShow: false,
      typeObj: {
        photo: '头像',
        name: '昵称',
        jieshao: '介绍',
        gender: '性别',
        birthday: '生日',
        region: '地区'
      },
      infoFrom: {},
      columns: ['男', '女'],
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date()
    }
  },
  async created () {
    const res = await apiGetProfile()
    this.infoFrom = res.data.data
  },
  components: {
    infoCell
  },
  methods: {
    sub () {
      this.imgShow = false
      this.$toast.fail('接口已崩')
    },
    beforeRead (file) {
      const isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'image/gif' ||
        file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 3

      if (!isJPG) {
        this.$toast.fail('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$$toast.fail('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },

    //  文件读取后
    afterRead (file) {
      // 调用图片预览
      // this.txShow = false
      this.imgShow = true
      this.fileList[0] = URL.createObjectURL(file.file)
    },

    async saveInfo () {
      await apiUpdate({
        name: this.infoFrom.name,
        gender: this.infoFrom.gender,
        birthday: this.infoFrom.birthday,
        intro: this.infoFrom.jieshao
      })
      this.$toast.success('修改成功')
    },
    changeImg () {
      console.log(111)
    },
    paiClick () {
      this.$toast.fail('太丑了，相机奔溃')
      this.txShow = false
    },
    // 昵称
    ncConfirm () {

    },
    // 性别indexs
    genderConfirm (value, index) {
      this.infoFrom.gender = index
      this.showPicker = false
    },
    // 生日
    timeConfirm (val) {
      const year = val.getFullYear()
      const month = val.getMonth() + 1
      const day = val.getDate()
      this.timeValue = `${year}-${month}-${day}`
      this.infoFrom.birthday = this.timeValue
      this.dateShow = false
    },
    formatter (type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
        return `${value}日`
      }
      return value
    },
    touxiang () {
      // this.$toast.fail('这个功能写不了')
      // this.txShow = false
      // 显示文件上传组件
      this.txShow = false
      this.showUp = true
    }
  }
}
</script>

<style lang="less" scoped>
.info {
  /deep/.van-nav-bar {
    background-color: #2e97fa;
  }
  /deep/.van-nav-bar__title {
    color: #fff;
  }
  /deep/.van-nav-bar__text {
    color: #fff;
  }
  .ttt {
    text-align: center;
    margin: 10px 0 0 10px;
  }
  .tan {
  }

  /deep/ .uptop {
    width: 100%;
    display: flex;
    background-color: rgba(255, 255, 255, 0.123);
    margin-top: -15px;
    justify-content: space-between;
    .cel,
    .sub {
      // margin: 0 10px;

      border-radius: 2px;
    }
  }
  /deep/ .van-image-preview__index {
    width: 100%;
    display: block;
  }
}
</style>
