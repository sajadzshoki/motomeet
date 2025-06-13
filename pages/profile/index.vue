<template>
  <div class="flexCol items-center gap-2">
    <div class=" relative">
      <NuxtLink :to="{name:'profile-edit'}">
        <TheNuxtIcon icon-type="img" name="profile1.png" class="!w-27 !h-27 rounded-full object-cover"/>
        <TheNuxtIcon icon-type="svg" name="edit" class="absolute bottom-2 right-2 text-xl"/>
      </NuxtLink>
    </div>
    <div class="flex justify-between items-center">
      <div class="flexCol items-center">
        <div class="flex gap-1">
          <p class="text-(sm) leading-6.5 font-600">سیاوش سهیلی</p>
          <div class="flex gap-1 items-center px-1.5 bg-secondary-400 bg-opacity-80 w-fit rounded-full">
            <TheNuxtIcon icon-type="svg" name="star" class=" text-xs "/>
            <span class="text-(2.5)">۴.۵</span>
          </div>
        </div>
        <p class="text-(2.5 gray-400) font-500 leading-5.5">موتور RS 200 </p>
      </div>
    </div>
    <div class="bg-secondary-500 p-6 mt-4 w-full flexCol gap-6 rounded-2xl">
      <div class="flex items-center gap-4">
        <TheNuxtIcon name="phone" icon-type="svg" class="text-xl bg-secondary-400 p-2 rounded-full"/>
        <p class="text-(sm) leading-6.5 font-600">{{ phoneNumber }}</p>
      </div>
      <div class="flex items-center gap-4">
        <TheNuxtIcon name="email" icon-type="svg" class="text-xl bg-secondary-400 p-2 rounded-full"/>
        <p class="text-(sm) leading-6.5 font-600">Example@gmail.com</p>
      </div>
      <div class="flex items-center gap-4 cursor-pointer" @click="exitModal=true">
        <TheNuxtIcon name="logout" icon-type="svg" class="text-xl bg-(red-500 ) bg-opacity-20 p-2 rounded-full"/>
        <p class="text-(sm) leading-6.5 font-600">خروج از حساب کاربری</p>
        <TheNuxtIcon name="nav-left" icon-type="svg" class="mr-auto text-(gray-300) text-2xl"/>
      </div>
      <TheModal title="خروج از حساب" v-if="exitModal" @close="exitModal =false">
        <p class="text-sm">مطمئنی می‌خوای از حسابت خارج بشی؟</p>
        <div class="flex gap-3 mt-4">

        <p class="text-(sm red-500)" @click="exitModal =false">خروج</p>
        <p class="text-sm" @click="exitModal =false">لغو</p>
        </div>
      </TheModal>
    </div>
  </div>
</template>

<script setup lang="ts">
const phoneNumber = useLocalStorage('phoneNumber', '')
const exitModal =ref(false)
</script>