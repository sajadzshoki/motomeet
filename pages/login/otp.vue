

<template>
<div class="flexCol gap-4 items-center">
  <TheCodeInput/>
  <p class="text-(primary-500) font-600 ml-auto">2:00</p>
  <TheButton label="بعدی" class="w-full" link="login-info"/>

</div>
</template>

<script setup lang="ts">
definePageMeta({layout: 'login'})
const loginHead = useState('loginHead')
const loginInfo = useState('loginInfo')
loginHead.value = 'کد OTP'

const phoneNumber = useLocalStorage('phoneNumber','')
loginInfo.value = 'کد به شماره '  + phoneNumber.value  + ' ارسال شد '

</script>