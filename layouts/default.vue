
<template>
<div class="flex h-full w-full">
  <TheSidebar/>
  <div class="h-full flexCol ">
    <TheHeader/>
    <div class="flex-1 bg-gray-900 p-4 mt-22 pb-30 ">
      <slot/>
    </div>
    <TheBottomNavigation/>
  </div>
  </div>
</template>

<script setup lang="ts">

</script>
