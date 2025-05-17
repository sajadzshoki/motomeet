<template>
  <div class="flexCol gap-5 pb-30">
    <TheRideHeader/>
    <TheRideDescription/>
    <TheRideDetailCard/>

    <div class="fixed flexCol gap-2 bottom-0 right-0 w-full p-4 bg-secondary-800 ">
      <TheButton label="رفتن به چت گروهی" :fill="false" class="w-full" icon="chat2"   />
      <TheButton label="درخواست عضویت" class="w-full" icon="add" icon-class="text-xs"  />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({layout: 'backward'})
const title = useState('backwardTitle')
title.value = 'ride name'
</script>