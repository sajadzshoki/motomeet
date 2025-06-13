<template>
  <div class="flexCol gap-5 pb-50">
    <TheRideHeader/>
    <TheTab :items="tabs" v-model="selectedTab"/>
    <TheRideDescription v-if="selectedTab == 'detail'"/>
    <TheRideDetailCard v-if="selectedTab == 'detail'"/>
    <TheRideMembers v-for="n in 4" v-else/>
    <div class="fixed flexCol gap-2 bottom-0 right-0 w-full p-4 bg-secondary-800 ">
      <NuxtLink :to="{name:'chat-id',params:{id:1}}">
        <TheButton label="رفتن به چت گروهی" :fill="false" class="w-full" icon="chat2"/>
      </NuxtLink>

      <NuxtLink :to="{name:'ride-id-requests',params:{id:1}}">
        <TheButton label="درخواست ها" class="w-full"/>
      </NuxtLink>

      <TheButton @click="handleRequest"
                 :label="request?'درخواست عضویت':'درخواست فرستاده شد'"
                 class="w-full" :icon="request?'add':''" icon-class="text-xs"
                 :disable="!request"/>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({layout: 'backward'})
const title = useState('backwardTitle')
title.value = 'ride name'
const tabs = ref([
  {
    label: 'جزئیات راید',
    value: 'detail'
  }, {
    label: 'همسفر',
    value: 'riders'
  },
])
const selectedTab = ref('detail')
const request = ref(true)
const handleRequest = () => {
  request.value = !request.value
}
</script>