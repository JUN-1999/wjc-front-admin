<template>
  <el-form ref="formRef" :model="formData">
    <h1>登录</h1>
    <el-form-item prop="username" :rules="{ required: true, message: '请输入账号', trigger: 'blur' }">
      <el-input v-model="formData.username" prefix-icon="el-icon-user" placeholder="请输入账号" clearable :disabled="state.loading" />
    </el-form-item>
    <el-form-item prop="password" :rules="{ required: true, message: '请输入密码', trigger: 'blur' }">
      <el-input
        v-model="formData.password"
        show-password
        prefix-icon="el-icon-lock"
        placeholder="请输入密码"
        clearable
        :disabled="state.loading"
      />
    </el-form-item>
    <el-form-item>
      <el-row justify="space-between">
        <el-checkbox v-model="state.remember">
          记住我 <span style="color: #909399; margin-left: 4px; font-size: 12px">请勿在公共电脑上勾选此项</span>
        </el-checkbox>

        <el-link type="primary" :underline="false" @click="$emit('update:modelValue', 'reset')">忘记密码？</el-link>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="state.loading" class="btn-long" @click="loginChange"> 登 录 </el-button>
    </el-form-item>

    <el-form-item>
      <el-row justify="space-between" :gutter="16">
        <el-col :span="8">
          <el-button class="btn-long" size="small" @click="$emit('update:modelValue', 'mobile')">手机号登录</el-button>
        </el-col>
        <el-col :span="8">
          <el-button class="btn-long" size="small" @click="$emit('update:modelValue', 'qrCode')">二维码登录</el-button>
        </el-col>
        <el-col :span="8">
          <el-button class="btn-long" size="small" @click="$emit('update:modelValue', 'register')">注册</el-button>
        </el-col>
      </el-row>
    </el-form-item>
    <el-divider>其他登录方式</el-divider>
    <el-row justify="space-around" :gutter="16">
      <el-tooltip v-for="(item, index) in state.otherLoginIcon" :key="index" :content="item.info" placement="bottom" effect="light">
        <component class="other-login-icon" role="button" :is="item.icon" :class="{ 'github-dark': item.icon === 'github-logo-icon' }" />
      </el-tooltip>
    </el-row>
  </el-form>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { useStorage } from '@vueuse/core'
import useFormValid from '@/hooks/useFormValid'
import { useUserStore } from '@/store/modules/user'
import { encrypt, decrypt } from '@/utils/secret'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
defineEmits(['update:modelValue'])
const rememberData = useStorage('rememberMe', null) //存储账号密码

const state = reactive({
  otherLoginIcon: [
    {
      icon: 'github-logo-icon',
      info: 'GitHub',
    },
    {
      icon: 'weChat-logo-icon',
      info: '微信',
    },
    {
      icon: 'alipay-logo-icon',
      info: '支付宝',
    },
    {
      icon: 'google-logo-icon',
      info: 'Google',
    },
    {
      icon: 'QQ-logo-icon',
      info: 'QQ',
    },
  ],
  loading: false,
  remember: !!rememberData.value,
})

const { username = 'admin', password = '123456' } = decrypt(rememberData.value)
const formData = reactive({
  username,
  password,
})

//账号密码验证 登陆
const formRef = ref()
const { validForm } = useFormValid(formRef)
async function loginChange() {
  try {
    await validForm()
    state.loading = true
    await userStore.getToken(formData)
    await router.replace({ path: route.query?.redirect || '/' })
    //加密保存用户名密码
    state.remember ? (rememberData.value = encrypt(formData)) : (rememberData.value = null)
    ElNotification.success({
      title: '提示',
      message: '登陆成功！',
    })
  } finally {
    state.loading = false
  }
}
</script>

<style lang="scss" scoped>
.btn-long {
  width: 100%;
}
.other-login-icon {
  cursor: pointer;
  height: 22px;
  width: 22px;
  transition: filter 0.25s;
  &:hover {
    color: #0d84ff;
  }
}

.dark {
  .other-login-icon {
    filter: brightness(90%);
    &.github-dark {
      filter: invert(1) brightness(90%);
    }
  }
}
</style>
