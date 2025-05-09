<template>
  <div class="w-full flexCol gap-4">
    <TheInput placeholder="test@example.com" label="ایمیل"/>
    <TheInput placeholder="*******" label="رمز عبور" password/>
    <NuxtLink :to="{name:''}" class="text-(primary-600 sm) self-end">فراموشی رمز عبور</NuxtLink>
    <TheButton label="ورود" class="w-full"/>
    <p class="text-(xs center)">
      حساب کاربری ندارید؟
      <NuxtLink :to="{name:'login-register'}" class="text-(primary-600 xs) px-2">ثبت نام</NuxtLink>
    </p>
  </div>
</template>
<script setup lang="ts">
definePageMeta({layout: 'login'})

</script>
