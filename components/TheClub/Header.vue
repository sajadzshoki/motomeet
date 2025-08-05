
<template>
  <TheNuxtIcon icon-type="img" :name="club?.logo||'post2.png'" class="!w-full !h-85 object-cover absolute top-0 right-0  brightness-30"/>
  <div class="z-5 relative  w-full flex items-start justify-between p-4 h-240">
    <TheNuxtIcon name="nav-right" icon-type="svg" class="text-2xl  cursor-pointer" @click="route.query.made?navigateTo({name:'index'}):router.back()"/>
    <p class="font-semibold !text-(sm center) mt-1">{{ club?.name }}</p>
    <div class="flex gap-4 items-center mt-1">

    <NuxtLink >
      <TheNuxtIcon icon-type="svg" name="add" class="text-md "/>
    </NuxtLink>
      <NuxtLink :to="{name:'club-add',query:{id:club?.id}}" >
        <TheNuxtIcon icon-type="svg" name="edit2" class="text-md "/>
      </NuxtLink>
    </div>
    <div class="flex items-end w-full  justify-between absolute bottom-4 right-0 px-4  ">

      <div class="flex gap-1 items-center  ">
        <TheNuxtIcon icon-type="img" :name="club?.user?.profile?.avatar||'noProfile.png'" class="!w-16 !h-16 rounded-full object-cover"/>
        <div class="flexCol gap-1 ">
          <div class="flex gap-1">
            <p class="text-(sm) font-700 ">{{ club?.name }}</p>
            <div class="flex gap-1 items-center px-1.5 bg-secondary-500 bg-opacity-80 w-fit rounded-full">
              <TheNuxtIcon icon-type="svg" name="star" class=" text-xs "/>
              <span class="text-(2.5) ">{{getCommentsAvg(club?.comments)}}</span>
            </div>
          </div>
          <p class="text-(xs) leading-6">
            {{club?.user?.profile?.nickName ||  (club?.user?.profile?.firstName + ' ' + club?.user?.profile?.lastName) }} (تیم لیدر)</p>
          <TheUsersAvatar :mini="true" :items="club?.clubUsers?.map(i=>i.user?.profile)"/>
        </div>
      </div>
      <div class="flexCol gap-4 ">
        <p class="text-2xl font-600 flexCol items-end">{{ club?.clubUsers?.filter(i=>i.status==='ACCEPTED')?.length }}<span class="text-(2.5) leading-4 font-400">نفر</span></p>
        <p class="text-2xl font-600 flexCol items-end">{{ club?.rides?.length }}<span
            class="text-(2.5) leading-4 font-400">راید تاکنون</span></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {Club} from "~/types/models";
defineProps<{club:Club}>()
const router = useRouter()
const route = useRoute()
</script>
