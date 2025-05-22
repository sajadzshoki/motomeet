<template>
  <div class="flexCol gap-5">
    <div v-for="n in 15" class="flex justify-between items-center">
      <div class="flex gap-1 items-center  ">
        <TheNuxtIcon icon-type="img" name="profile1.png" class="!w-15 !h-15 rounded-full object-cover"/>
        <div class="flexCol gap-1">
          <p class="text-(xs) leading-6">سهیل محمدی</p>
          <div
              class="flex gap-1 items-center px-1.5 bg-secondary-500 border-(1 solid secondary-300) w-fit rounded-full">
            <TheNuxtIcon icon-type="svg" name="star" class=" text-sm "/>
            <span class="text-(2.5) leading-5">۴.۵</span>
          </div>
        </div>
      </div>
      <div class="flex gap-1" :class="!test && 'opacity-50 children:'">
        <TheButton label="قبول"  :mini="true" class="!px-6 !h-8" :disable="!test"/>
        <TheButton label="رد" :fill="false" :mini="true" :cancel="true" class="!px-7 !h-8" :disable="!test"/>

      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
definePageMeta({layout: 'backward'})
const title = useState('backwardTitle')
title.value = 'درخواست ها'
const test = ref(true)
</script>
