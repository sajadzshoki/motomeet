<template>
  <div class="w-full flexCol gap-6">
    <TheInput placeholder="09121234567" label="شماره تلفن" v-model="phoneNumber"/>
<!--    <TheInput placeholder="*******" label="رمز عبور" password/>-->
<!--    <NuxtLink :to="{name:''}" class="text-(primary-600 sm) self-end">فراموشی رمز عبور</NuxtLink>-->
   <div class="flexCol gap-4">

    <TheButton label="ورود" class="w-full" link="login-otp"/>
    <TheButton label="Continue with Google" icon="google" class="w-full bg-white !children:text-gray-900" />
   </div>
<!--    <p class="text-(xs center)">-->
<!--      حساب کاربری ندارید؟-->
<!--      <NuxtLink :to="{name:'login-register'}" class="text-(primary-600 xs) px-2">ثبت نام</NuxtLink>-->
<!--    </p>-->
  </div>
</template>
<script setup lang="ts">
definePageMeta({layout: 'login'})
const loginHead = useState('loginHead')
const loginInfo = useState('loginInfo')
loginHead.value = 'وارد حساب کاربری خود شوید'
loginInfo.value = 'شماره تلفن خود را وارد کنید'

const phoneNumber = useLocalStorage('phoneNumber','')
</script>
