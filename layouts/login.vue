
<template>
  <div class="bg-screenGray h-full flexCol items-center gap-20 p-6">
    <TheNuxtIcon name="starBg.png" icon-type="img" class="absolute top-0 left-0 !w-full !h-100"/>
    <div class="mt-9 flexCol items-center gap-3">
    <h3 class="text-2xl leading-10 ">{{ loginHead }}</h3>
      <p class="text-sm leading-6.5">{{ loginInfo }}</p>
    </div>
    <div class="bg-secondary-500 w-full z-1 rounded-lg shadow-lg px-4 py-6 ">
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">
const loginHead = useState('loginHead')
const loginInfo = useState('loginInfo')
</script>
