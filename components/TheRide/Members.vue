<script setup lang="ts">

</script>

<template>
  <NuxtLink :to="{name:'profile-id',params:{id:1}}"
            class="flex justify-between items-center border-b-(1 solid secondary-500) pb-4 hover:">
    <div class="flex gap-1 items-center  ">
      <TheNuxtIcon icon-type="img" name="profile1.png" class="!w-11 !h-11 rounded-full object-cover"/>
      <div class="flexCol ">
        <div class="flex gap-1">
          <p class="text-(xs) leading-6">سهیل محمدی</p>
          <div
              class="flex gap-1 items-center px-1.5 bg-secondary-500 border-(1 solid secondary-300) w-fit rounded-full">
            <TheNuxtIcon icon-type="svg" name="star" class=" !svg:(w-3) "/>
            <span class="text-(2.5) leading-5">۴.۵</span>
          </div>
        </div>
        <p class="text-(2.5 gray-400) leading-6">بنلی ۱۸۰</p>
      </div>
    </div>


    <TheNuxtIcon icon-type="svg" name="nav-left" class=" !svg:(w-7) bg-secondary-300 p-2px rounded-full "/>
  </NuxtLink>


</template>

<style scoped>

</style>