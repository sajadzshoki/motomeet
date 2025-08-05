

<template>

<div class=" h-[calc(100dvh-60px)] -m-4 !z-0">
  <TheMap v-model="location"/>
</div>
  <div class="fixed bottom-0 right-0 p-4 !z-1 bg-secondary-700 w-full">
    <TheButton label="انتخاب مبدا" class="w-full"/>
  </div>
<TheLog :data="location"/>
</template>

<script setup lang="ts">
definePageMeta({layout:'backward'})
const backward = useState('backwardTitle')
backward.value = 'انتخاب مبدا'
// -------------------------------------------
const location = ref({
  latitude: 0,
  longitude: 0,
  address: '',
})
</script>