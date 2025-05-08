<template>
  <div
      class="!min-w-50 !min-h-50 rounded-3xl bg-gray-300 overflow-hidden justify-end flexCol gap-2 relative p-4 children:(z-1)">
    <div class="absolute inset-0 w-full h-full bg-gradient-to-t  from-gray-800 to-transparent"></div>
    <TheNuxtIcon icon-type="img" name="ride1.png" class="absolute !z-0 left-0 top-0 !w-full !h-full object-cover"/>
    <!--    creator-->
    <div class="flex gap-1 items-center ">
      <TheNuxtIcon icon-type="img" name="profile1.png" class="!w-4 !h-4 rounded-full object-cover"/>
      <p class="text-(2)">سجاد شکرایی یک راید گروهی تنظیم کرد</p>
    </div>
    <!--    name and time -->
    <div class="flex justify-between items-center ">
      <p class="text-(xs) font-semibold">هم مسیر</p>
      <p class="text-(2.5) ">شنبه ۲۴ اردیبهشت ۲۲:۰۰</p>
    </div>
    <!--    users-->
    <div class="flex justify-between items-center ">
      <TheUsersAvatar/>
      <div class="!w-6 !h-6 rounded-full flex flexCenter bg-primary-800 ">
        <TheNuxtIcon icon-type="svg" name="arrow-left" class="text-sm"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>
