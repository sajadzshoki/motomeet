
<template>
  <div class="!h-75 -m-4 mb-0 relative rounded-bl-20 overflow-hidden children:(z-1) ">
    <div class="absolute inset-0 bg-gradient-to-t  from-secondary-700 to-transparent"></div>
    <TheNuxtIcon name="ride2.png"
                 icon-type="img"
                 class="absolute !z-0  object-cover !w-full !h-full top-0 left-0"
    />
    <p class="bg-gray-900 text-sm font-medium absolute top-0 right-0 px-4 py-1 rounded-bl-3xl leading-6.5">عمومی</p>
    <div class="flex gap-1 items-center absolute bottom-4 right-4 ">
      <TheNuxtIcon icon-type="img" name="profile1.png" class="!w-12 !h-12 rounded-full object-cover"/>
      <div class="flexCol gap-1">
        <p class="text-(xs) leading-6">سجاد شکرایی (تیم لیدر)</p>
        <div class="flex gap-1 items-center px-1.5 bg-secondary-500 border-(1 solid secondary-300) w-fit rounded-full">
          <TheNuxtIcon icon-type="svg" name="star" class=" text-xs "/>
          <span class="text-(2.5) leading-5">۴.۵</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

</script>
