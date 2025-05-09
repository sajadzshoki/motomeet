<template>
  <div class="bg-primary-600 min-w-60 p-4 ">
    <div class="flexCol gap-8 fixed top-4  ">
      <div class="flex w-full items-center gap-3 border-b-(1 solid gray-300)  pb-4">
      <TheNuxtIcon name="profile2.png" class="!w-10 !h-10 object-cover"/>
        <p class="font-semibold text-base">اسم سایت</p>
      </div>
      <div v-for="item in items" class="flex items-center gap-2 bg-primary-600 ">
        <TheNuxtIcon :name="item.icon" icon-type="svg" class="text-xl"/>
        <p class="text-sm">{{item.label}}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const items = ([
  {
    label:'خانه',
    icon:'home',
    link:'index',
  },
  {
    label:'خانه ',
    icon:'home',
    link:'index',
  },
      {
    label:'خانه',
    icon:'home',
    link:'index',
  },
      {
    label:'خانه',
    icon:'home',
    link:'index',
  },
      {
    label:'خانه',
    icon:'home',
    link:'index',
  },
      {
    label:'خانه',
    icon:'home',
    link:'index',
  },
      {
    label:'خانه',
    icon:'home',
    link:'index',
  },
      {
    label:'خانه',
    icon:'home',
    link:'index',
  },
      {
    label:'خانه',
    icon:'home',
    link:'index',
  },

])
</script>
