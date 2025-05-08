<script setup lang="ts">

</script>

<template>
  <div class="h-full flexCol">
    <TheHeader/>
    <div class="grow-1 bg-gradient-to-t  h-max from-primary-900 to-gray-900  p-4 mt-22 ">
      <slot/>
    </div>
    <TheBottomNavigation/>
  </div>
</template>

<style scoped>

</style>