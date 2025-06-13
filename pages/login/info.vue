<template>
  <div class="flexCol gap-4 items-center ">
    <div class='flex gap-4 w-full'>
      <TheInput placeholder="مثلا سارا" label="نام" class="w-full"/>
      <TheInput placeholder="مثلا راد" label="نام خانوادگی" class="w-full"/>
    </div>
      <TheInput placeholder="sample@gmail.com" label="ایمیل" class="w-full"/>
    <TheButton label="ورود" class="w-full" link="index"/>

  </div>
</template>

<script setup lang="ts">
definePageMeta({layout: 'login'})
const loginHead = useState('loginHead')
const loginInfo = useState('loginInfo')
loginHead.value = 'خوش اومدی'
loginInfo.value = 'اطلاعات اولیه خود را وارد کنید'

</script>