<template>
  <div class="flexCol gap-5" v-if="ride">
    <TheHomeActiveRide/>
    <TheCardsHeader title="راید های نزدیک شما" link="ride"/>
    <div  class="flex gap-3 overflow-x-auto -mx-4 px-4">
      <TheRideCard v-for="item in images" :item="item"/>
    </div>
    <TheHomeJoinRide/>
    <TheCardsHeader title="رایدهای دنبال شوندگان شما"/>
    <div  class="flex gap-3 overflow-x-auto -mx-4 px-4">
      <TheRideCard v-for="item in images" :item="item"/>
    </div>
  </div>
  <TheHomeNoRides v-else/>
  <TheFab/>
</template>

<script setup lang="ts">
const ride = ref(true)
const images=[
  'ride1.png',
  'ride2.png',
  'ride3.png',
  'ride4.png',
  'ride5.png',
  'ride6.png',
  'ride7.png',
  'ride8.png',
  'ride1.png',
  'ride2.png',
  'ride3.png',
  'ride4.png',
]

</script>
