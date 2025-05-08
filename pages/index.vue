<template>
  <div class="flexCol gap-5" v-if="ride">
    <TheHomeActiveRide/>
    <TheCardsHeader title="راید های نزدیک شما"/>
    <div  class="flex gap-3 overflow-x-auto -mx-4 px-4">
      <TheRideCard v-for="n in 5"/>
    </div>
    <TheHomeJoinRide/>
    <TheCardsHeader title="رایدهای دنبال شوندگان شما"/>
    <div  class="flex gap-3 overflow-x-auto -mx-4 px-4">
      <TheRideCard v-for="n in 5"/>
    </div>
  </div>
  <TheHomeNoRides v-else/>
</template>

<script setup lang="ts">
const ride = ref(true)
</script>
