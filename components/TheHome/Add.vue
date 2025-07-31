

<template>
  <TheFab @click="addModal=true"/>
  <div v-show="addModal" class="fixed inset-0 bg-black bg-opacity-30 z-30  flex   transition-all duration-400"
       :class="addModal ? 'opacity-100' : 'opacity-0'"
       @click.self="addModal=false">
    <div class="flexCol gap-1 absolute right-15 bottom-30 min-w-30 bg-secondary-600 pb-1 py-2 px-1 rounded-lg ">
      <NuxtLink :to="{name:'club-add'}" class="text-xs border-b-(1 solid gray-900)  leading-6 px-3">
        ساخت کلاب
      </NuxtLink>
      <NuxtLink :to="{name:'ride-add'}" class="text-xs  leading-6 px-3">
        ساخت راید
      </NuxtLink>

    </div>

  </div>
</template>

<script setup lang="ts">
const addModal = ref(false)
</script>