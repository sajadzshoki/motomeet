
<template>
  <NuxtLink :to="{name:'profile-id',params:{id:user.id}}"
            class="flex justify-between items-center border-b-(1 solid secondary-500) pb-4 hover:">
    <div class="flex gap-1 items-center  ">
      <TheNuxtIcon icon-type="img" :name="user.profile?.avatar|| 'noProfile.png'" class="!w-11 !h-11 rounded-full object-cover"/>
      <div class="flexCol ">
        <div class="flex gap-1">
          <p class="text-(xs) leading-6">{{ user.profile?.firstName + ' ' + user.profile?.lastName }}</p>
          <div
              class="flex gap-1 items-center px-1.5 bg-secondary-500 border-(1 solid secondary-300) w-fit rounded-full">
            <TheNuxtIcon icon-type="svg" name="star" class=" !svg:(w-3) "/>
            <span class="text-(2.5) leading-5">{{ getCommentsAvg(user.comments) }}</span>
          </div>
        </div>
        <p class="text-(2.5 gray-400) leading-6">بنلی ۱۸۰</p>
      </div>
    </div>


    <TheNuxtIcon icon-type="svg" name="nav-left" class=" !svg:(w-7) bg-secondary-300 p-2px rounded-full "/>
  </NuxtLink>


</template>

<script setup lang="ts">
import type {User} from "~/types/models";

defineProps<{user:User}>()
</script>
