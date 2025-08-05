
<template>


  <div class="h-full flexCol bg-primary-900 ">
    <TheHeader/>
    <div class="flex-1 bg-screenMain p-4 mt-22  " :class="route.name !== 'profile-id'?'pb-30':''">
      <slot/>
    </div>
    <TheBottomNavigation2 v-if="route.name !== 'profile-id'"/>
  </div>

</template>

<script setup lang="ts">
const route = useRoute()
</script>
