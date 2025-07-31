
<template>
  <div class="flex">
    <TheNuxtIcon v-for="item in items?.slice(0,3)" icon-type="img" :name="item.avatar || 'noProfile.png'"
                 class=" shadow-md  rounded-full object-cover"
    :class="mini?'!w-5 !h-5 -mx-0.3':'!w-6 !h-6 -mx-1'"/>
    <span class="  rounded-full flex flexCenter text-(2.5 center)  bg-secondary-400"
    :class="mini?'!w-5 !h-5 -mx-0.3':'!w-6 !h-6 -mx-1'" v-if="items?.length>3">{{ Math.round(items.length) }}+</span>
  </div>
</template>


<script setup lang="ts">
defineProps<{
  mini?: boolean;
  items?:any,
}>()
</script>
