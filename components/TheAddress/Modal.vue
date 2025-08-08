<script setup lang="ts">
const emit = defineEmits(['close'])
</script>

<template>
<TheModal :center="false" :with-close="false" @close="emit('close')">
  <div class="flex items-center justify-between">
    <p class="text-lg font-500">انتخاب آدرس</p>
    <NuxtLink :to="{name:'address-map'}" class="text-(sm primary-500) font-400 " @click="emit('close')">
      + افزودن آدرس
    </NuxtLink>
  </div>
  <div class="flexCol">
    <p class="text-xs mx-auto text-red-500">هنوز هیچ آدرسی ثبت نکردید</p>

  </div>
</TheModal>
</template>

<style scoped>

</style>