<template>
  <div class="w-full flexCol gap-6">
    <TheInput input-mode="numeric" :max-length="11" className="bg-secondary-800" :validation="validation" placeholder="09121234567" label="شماره تلفن"
              v-model="phoneNumber" @keydown.enter="submit"/>
    <TheButton label="ورود" class="w-full" @click="submit" :loading="loading" :disable="!phoneNumber"/>
  </div>
</template>
<script setup lang="ts">
definePageMeta({layout: 'login'})
const loginHead = useState('loginHead')
const loginInfo = useState('loginInfo')
loginHead.value = 'وارد حساب کاربری خود شوید'
loginInfo.value = 'شماره تلفن خود را وارد کنید'
const otpCode = useState('otp')
const phoneNumber = useLocalStorage('phoneNumber', '')
const phoneRegex = /^(\+98|0)?9\d{9}$/
const isValidPhone = computed(() => phoneRegex.test(phoneNumber.value))
const {$toast} = useNuxtApp()
const validation = ref(false)
const loading = ref(false)
const userIdTest = useCookie('userIdTest')
const submit = async () => {
  if (loading.value) return
  loading.value = true
  if (!isValidPhone.value) {
    $toast.error('شماره تلفن اشتباه است')
    validation.value = true
    loading.value = false
    return
  }
  try {
    const {result} = await usePost(`login-by-phone-otp`, {
      phoneNumber: phoneNumber.value,
      digit:4
    })
    if (result) {
      userIdTest.value = result?.smsResult?.userId;
      console.log('OTP Code : ', result?.code)
      otpCode.value = result?.code
      // $toast.success('کد ارسال شد')
      navigateTo({name: 'login-otp'})
    }
  } catch (error) {
    console.log('login error', error)
    $toast.error('مشکلی پیش آمده لطفا دوباره تلاش کنید')
  }
  loading.value = false
}

</script>
