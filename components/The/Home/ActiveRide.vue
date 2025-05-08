<template>
  <div class="h-45 rounded-b-30 bg-secondary-500 px-8 mb-8 -m-4 ">
    <div class="min-h-52 relative flexCol justify-between rounded-2xl  overflow-hidden p-4 children:(z-1)">
      <div class="absolute inset-0 w-full h-full bg-gradient-to-b  opacity-20  from-gray-800 to-primary-600"></div>
      <TheNuxtIcon icon-type="img"
                   name="map.png"
                   class="absolute !z-0 left-0 top-0 !w-full !h-full object-cover"/>
      <TheNuxtIcon icon-type="img" name="locationAlert.png" class="!w-auto !h-17 absolute left-15 "/>
      <!---------------->
      <div class="rounded-full bg-(primary-400 opacity-30) px-2 w-fit">
        <p class="text-(2.5) leading-5 flex gap-1">
          <TheNuxtIcon icon-type="svg" name="circle-outline" class=""/>
          در این راید حضور دارید
        </p>
      </div>
      <!---------------->
      <div class="flex gap-2">
        <TheNuxtIcon icon-type="svg" name="circle-outline" class=""/>
        <div class="flexCol gap-3">
          <p class="text-(xs) font-semibold">تهران، شهرک غرب</p>
          <p class="text-(xs) font-semibold">{{ truncateText('تهران، میدان جهاد، میدان سلماس ...', 35) }}</p>
        </div>
      </div>
      <!---------------->
      <div class="self-end">
        <TheUsersAvatar/>
      </div>
      <!---------------->

        <TheButton label="رفتن به مسیر " link="profile"/>

    </div>
  </div>
</template>
<script setup lang="ts">

</script>
