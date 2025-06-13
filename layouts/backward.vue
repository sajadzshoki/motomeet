<template>
  <div class="h-full flexCol ">
    <div class="bg-secondary-500 sticky top-0 z-5 w-full flex items-center justify-between p-4">
      <TheNuxtIcon name="nav-right" icon-type="svg" class="text-2xl cursor-pointer" @click="router.back()"/>
      <p class="font-semibold !text-(sm center)">{{ title }}</p>
      <NuxtLink class="relative ">
        <TheNuxtIcon icon-type="svg" name="map" class="text-xl "/>
      </NuxtLink>
    </div>
    <div class="flex-1 bg-screenMain p-4 ">
      <slot/>
    </div>
  </div>

</template>

<script setup lang="ts">
const title = useState('backwardTitle')
title.value = ''
const router = useRouter()
</script>
