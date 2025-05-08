<script setup lang="ts">

</script>

<template>
  <div class="h-full h-dvh">
    <TheHeader/>
    <div class="bg-gradient-to-t from-primary-900 to-gray-900 h-dvh p-4 mt-22">
      <slot/>
    </div>
    <TheBottomNavigation/>
  </div>
</template>

<style scoped>

</style>