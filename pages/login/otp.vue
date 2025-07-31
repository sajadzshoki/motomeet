<template>
  <div class="flexCol gap-4 ">
    <TheCodeInput @complete="submitOtp" v-model="otp"/>
    <p class="text-(gray-500 sm) font-400 mr-auto" v-if="isRunning">{{ formattedTime }}</p>
    <p class="text-(white sm) font-400 mr-auto cursor-pointer" @click="resendCode" v-else>ارسال دوباره</p>

    <small>{{ otpCode }}</small>
    <NuxtLink :to="{name:'login'}" class="text-(primary-500 sm) font-500">
      شماره اشتباهه ؟!
    </NuxtLink>
    <TheButton label="بعدی" class="w-full" link="login-info" @click="submitOtp" :disable="!otp"/>

  </div>
</template>

<script setup lang="ts">
definePageMeta({layout: 'login'})
const loginHead = useState('loginHead')
const loginInfo = useState('loginInfo')
loginHead.value = 'کد OTP'

const phoneNumber = useLocalStorage('phoneNumber', '')
const userIdTest = useCookie('userIdTest')
const userId = useCookie('userId')
const token = useCookie('token');
const otpCode = useState('otp')
const {$toast} = useNuxtApp();
const loading = ref(false)
const otp = ref()

loginInfo.value = 'کد به شماره ' + phoneNumber.value + ' ارسال شد '
const {timeLeft, startTimer, clearTimer, isRunning, formattedTime} = useOtpTimer()

onMounted(() => {
  startTimer()
})
const resendCode = async () => {
  const {result} = await usePost(`login-by-phone-otp`, {
    phoneNumber: phoneNumber.value,
    digit: 4
  })
  startTimer()
}
const profileForm = ref({firstName: '', lastName: '', userId: userIdTest.value,motors:[]})
const submitOtp = async () => {
  if (loading.value) return
  loading.value = true
  const {data: profile} = await useAsyncData('get-profile-login', () => getProfiles({'userId:eq': userIdTest.value}))
  if (otp.value !== otpCode.value) {
    $toast.error('کد اشتباه است')
    loading.value = false
    return
  }
  try {
    const {result, error} = await usePost('/get-token-by-otp', {
      phoneNumber: phoneNumber.value?.toString(),
      code: otp.value
    },{    headers: {'no-error': true}});
    if(result){
    token.value = `${result?.token?.type} ${result?.token?.token}`;
    userId.value=userIdTest.value;
      if(profile?.value[0]?.firstName){
        navigateTo({name: 'index'})
      }
      else{
        await postProfile(profileForm.value)
        navigateTo({name: 'login-info'})
      }
    }
  }catch(error) {
    console.log('login error', error)
    $toast.error('بروز خطای غیرمنتظره لطفا دوباره تلاش کنید')
  }
  loading.value = false

}
</script>