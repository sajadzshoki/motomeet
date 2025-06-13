
<template>
  <div class="flex">
    <TheNuxtIcon v-for="n in 2" icon-type="img" name="profile2.png"
                 class=" shadow-md  rounded-full object-cover"
    :class="mini?'!w-5 !h-5 -mx-0.3':'!w-6 !h-6 -mx-1'"/>
    <span class="  rounded-full flex flexCenter text-(2.5 center)  bg-secondary-400"
    :class="mini?'!w-5 !h-5 -mx-0.3':'!w-6 !h-6 -mx-1'">10+</span>
  </div>
</template>


<script setup lang="ts">
defineProps<{
  mini?: boolean;
  items?:any,
}>()
</script>
