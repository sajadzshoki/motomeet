<template>
  <div class="fixed  z-10 top-0 w-full bg-secondary-500 bg-opacity-40 backdrop-blur-md p-3 flex items-center gap-2">
    <!--    profile pic-->
    <div class="relative">
      <NuxtLink :to="{name:'profile'}">

      <TheNuxtIcon icon-type="img" :name="avatar || 'noProfile.png'" class="!w-14 !h-14 rounded-full object-cover"/>
      </NuxtLink>
<!--      <TheNuxtIcon icon-type="svg" name="add"-->
<!--                   class="absolute bottom-2 right-0 bg-white rounded-full p-1 text-(primary-700 2.5)"/>-->
    </div>
    <!--    name and location-->
    <div class="flexCol gap-1.5 ">
      <p class="text-sm font-semibold leading-6.5">{{ user?.profile?.firstName }} 👋</p>
      <div class="flex items-center gap-1 bg-primary-700 px-1 rounded-full">
        <TheNuxtIcon icon-type="svg" name="locationFill" class="text-xs"/>
        <p class="text-xs font-medium">{{ truncateText(' تهران، شهرک غرب کوچه بیستم پلاک 2', 20) }}</p>
        <TheNuxtIcon icon-type="svg" name="arrow-downFill" class="text-2xl "/>
      </div>
    </div>
    <!--    map and theme -->
    <div class="flex gap-4 mr-auto">
<!--      <TheNuxtIcon @click="toggleTheme" icon-type="svg" class="text-2xl" :name="theme === 'dark' ?'sun':'moon'"/>-->
<!--    <NuxtLink class="relative ">-->
<!--      <TheNuxtIcon icon-type="svg" name="map" class="text-2xl "/>-->
<!--      <span class="w-2.5 h-2.5 rounded-full absolute bottom-0 -right-0.5 bg-red-500"></span>-->
<!--    </NuxtLink>-->

      <TheNuxtIcon icon-type="svg" :name="sidebar?'close':'hamburgerMenu'" class="text-2xl cursor-pointer  " @click="sidebar=true"/>
  </div>
    </div>
    <TheSidebar v-if="sidebar" @close="sidebar=false"/>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
// const { theme, toggleTheme } = useTheme()
const sidebar = ref(false)
const {user, avatar, loading} = await useUser()
</script>
