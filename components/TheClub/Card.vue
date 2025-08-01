<template>
  <TheSkeletonLoader :loading="status==='pending'" class="relative">
    <NuxtLink class="!w-30 !h-30 !relative rounded-3xl overflow-hidden justify-end flexCol  relative p-3 children:(z-1)" :to="{name: 'club-id',params:{id:club.id}}">
      <div class="!absolute inset-0 top-5 right-0 w-full h-full bg-gradient-to-t  from-black to-transparent  "></div>
      <TheNuxtIcon :name='club.logo' icon-type="img" class="!absolute !z-0  !w-full !h-full object-cover top-0 right-0 "/>
      <div class="flex gap-2 items-center">
        <p class="font-700 leading-6.5 text-sm">{{club.name}}</p>
        <div class="flex gap-1 items-center  w-fit rounded-full">
          <TheNuxtIcon icon-type="svg" name="star" class=" text-xs "/>
          <span class="text-(xs) ">{{getCommentsAvg(club?.comments)}}</span>
        </div>
      </div>

    </NuxtLink>
  </TheSkeletonLoader>
</template>

<script setup lang="ts">
import type {Club} from "~/types/models";

defineProps<{
  status: string;
  club: Club
}>()
</script>
