<template>
  <div class="bg-secondary-500 sticky top-0 z-5 w-full flex items-center gap-2 p-3 ">
    <TheNuxtIcon name="nav-right" icon-type="svg" class="text-xl cursor-pointer" @click="router.back()"/>
    <TheSearchbar v-model="search" :placeholder="placeholder"/>
  </div>

</template>

<script setup lang="ts">
const search = defineModel()
defineProps<{ placeholder?: string }>()
const router = useRouter()
</script>
