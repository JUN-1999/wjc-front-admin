<template>
  <div class="login">
    <header class="header">
      <h2 class="logo">{{ title }}</h2>
      <dark-switch />
    </header>

    <component :is="typeComponent" v-model="loginType" class="form" />
  </div>
</template>
<script setup>
import DarkSwitch from '@/layout/components/DarkSwitch/index.vue'
import BaseForm from './components/BaseForm/index.vue'
import MobileForm from './components/MobileForm/index.vue'
import ResetForm from './components/ResetForm/index.vue'
import QrCodeForm from './components/QrCodeForm/index.vue'
import RegisterForm from './components/RegisterForm/index.vue'
import { computed, ref } from 'vue'
import { useSettingStore } from '@/store/modules/setting'
const settingStore = useSettingStore()
const title = computed(() => settingStore.title)
const loginType = ref('base')
const typeComponent = computed(() => {
  const status = {
    base: BaseForm,
    mobile: MobileForm,
    qrCode: QrCodeForm,
    register: RegisterForm,
    reset: ResetForm,
  }
  return status[loginType.value]
})
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  max-width: 1400px;
  margin: auto;
  user-select: none;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding: 0 15px;
    .logo {
      flex: 1;
      font-weight: bold;
      margin: 0;
    }
  }

  .form {
    width: 450px;
    padding: 50px;
    margin: 4% auto;
  }
}
</style>
