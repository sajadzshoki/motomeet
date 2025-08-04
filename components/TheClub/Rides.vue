
<template>
  <NuxtLink :to="{name:'ride-id',params:{id:ride.id}}"
            class="!min-h-30 relative flexCol justify-between rounded-2xl  overflow-hidden p-4 children:(z-1)">
    <div class="absolute inset-0 w-full h-full bg-gradient-to-b  opacity-20  from-gray-800 to-primary-600"></div>
    <TheNuxtIcon icon-type="img"
                 name="map2.png"
                 class="absolute !z-0 left-0 top-0 !w-full !h-full object-cover   scale-120 brightness-60 "/>
    <TheNuxtIcon icon-type="img" name="locationAlert.png" class="!w-auto !h-10 absolute right-40 top-10"/>
    <!---------------->

    <div class="rounded-full bg-(secondary-500 ) self-end px-2 w-fit">
      <p class="text-(2.5) leading-5 flex gap-1">
        <TheNuxtIcon icon-type="svg" name="circle-outline" class=""/>
        {{ ride?.user?.profile?.nickName || (ride.user?.profile?.firstName + ' ' + ride.user?.profile?.lastName)  }} یک سفر تنظیم کرد
      </p>
    </div>

    <!---------------->
    <div class="flex justify-between items-center">
    <div class="flexCol gap-2 mt-5">
        <p class="text-(xs) font-semibold">
<!--          چهارشنبه، ۱۲ خرداد-->
          {{isoToStandard(ride.date)}}
        </p>
      <TheUsersAvatar/>
    </div>
      <div class="flexCol items-end gap-2 mt-5">
        <p class="text-(2.5) px-1.5 leading-5 rounded-full border-(1 solid white opacity-30 )  font-600 font-semibold bg-(primary-200 opacity-20)">
          {{ (ride.hour).replace('.',':') }}
        </p>
        <div class="!w-6 !h-6 rounded-full flex flexCenter bg-primary-800 ">
          <TheNuxtIcon icon-type="svg" name="arrow-left" class="text-sm"/>
        </div>
    </div>
    </div>
  </NuxtLink>

</template>

<script setup lang="ts">
import type {Ride} from "~/types/models";

defineProps<{
  ride:Ride
}>()
</script>